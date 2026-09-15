"use client";

import { useEffect, useState } from "react";

type MetaLead = {
  id: string;
  fullName: string | null;
  email: string | null;
  phone: string | null;
  metaLeadId: string | null;
  createdAt: string;
  form: {
    name: string;
    campaignName: string | null;
  };
  answers: {
    id: string;
    value: string | null;
    field: {
      label: string;
      fieldKey: string;
    };
  }[];
};

function getWhatsAppNumber(phone: string | null) {
  if (!phone) return "";

  const digits = phone.replace(/\D/g, "");

  if (digits.length === 10) {
    return `91${digits}`;
  }

  return digits;
}

export default function MetaLeadsPage() {
  const [leads, setLeads] = useState<MetaLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadLeads() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/meta-leads");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to load leads");
      }

      setLeads(data);
    } catch (error) {
      console.error("LOAD META LEADS ERROR:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to load Meta Ads leads",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLeads();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold">
              Meta Ads Leads
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              All enquiries received through Meta lead forms.
            </p>
          </div>

          <button
            type="button"
            onClick={loadLeads}
            className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:bg-white/10"
          >
            Refresh
          </button>
        </div>

        {loading && (
          <p className="text-sm text-slate-400">
            Loading leads...
          </p>
        )}

        {error && (
          <div className="rounded-lg border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {!loading && !error && leads.length === 0 && (
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-8 text-center text-slate-400">
            No Meta Ads leads found.
          </div>
        )}

        {!loading && !error && leads.length > 0 && (
          <div className="space-y-4">
            {leads.map((lead) => {
              const whatsappNumber = getWhatsAppNumber(lead.phone);

              return (
                <div
                  key={lead.id}
                  className="rounded-xl border border-white/10 bg-white/[0.04] p-5"
                >
                  <div className="flex flex-col justify-between gap-4 lg:flex-row">
                    <div>
                      <h2 className="text-lg font-semibold">
                        {lead.fullName || "Unknown Customer"}
                      </h2>

                      <p className="mt-1 text-sm text-slate-400">
                        Form: {lead.form.name}
                      </p>

                      {lead.form.campaignName && (
                        <p className="text-sm text-slate-500">
                          Campaign: {lead.form.campaignName}
                        </p>
                      )}

                      <p className="mt-2 text-xs text-slate-500">
                        {new Date(lead.createdAt).toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-start gap-2">
                      {lead.phone && (
                        <>
                          <a
                            href={`https://wa.me/${whatsappNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium hover:bg-emerald-700"
                          >
                            WhatsApp
                          </a>

                          <a
                            href={`tel:${lead.phone}`}
                            className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium hover:bg-blue-700"
                          >
                            Call
                          </a>
                        </>
                      )}

                      {lead.email && (
                        <a
                          href={`mailto:${lead.email}`}
                          className="rounded-lg bg-purple-600 px-3 py-2 text-sm font-medium hover:bg-purple-700"
                        >
                          Email
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
                    {lead.phone && (
                      <p>
                        <span className="text-slate-500">
                          Phone:
                        </span>{" "}
                        {lead.phone}
                      </p>
                    )}

                    {lead.email && (
                      <p className="break-all">
                        <span className="text-slate-500">
                          Email:
                        </span>{" "}
                        {lead.email}
                      </p>
                    )}
                  </div>

                  {lead.answers.length > 0 && (
                    <div className="mt-4 border-t border-white/10 pt-4">
                      <h3 className="mb-2 text-sm font-semibold text-slate-300">
                        Form Answers
                      </h3>

                      <div className="grid gap-2 sm:grid-cols-2">
                        {lead.answers.map((answer) => (
                          <div
                            key={answer.id}
                            className="rounded-lg bg-black/20 p-3"
                          >
                            <p className="text-xs text-slate-500">
                              {answer.field.label}
                            </p>

                            <p className="mt-1 text-sm text-slate-200">
                              {answer.value || "-"}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}