import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import FollowUpActions from "@/components/admin/follow-up-actions";


function formatDateTime(date: Date | null) {
  if (!date) return "Not scheduled";

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function getWhatsAppNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");

  if (digits.length === 10) {
    return `91${digits}`;
  }

  return digits;
}

function getWhatsAppMessage(name: string, topic: string) {
  return `Hi ${name}, this is Safvan from BizzFi. Following up regarding your consultation enquiry about ${topic}. Please let us know a convenient time to connect. Thank you.`;
}

export default async function FollowUpsPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const consultations = await prisma.consultationRequest.findMany({
    where: {
      nextFollowUpAt: {
        not: null,
      },
    },
    orderBy: {
      nextFollowUpAt: "asc",
    },
  });

  const now = new Date();

  const dueFollowUps = consultations.filter(
    (consultation) =>
      consultation.nextFollowUpAt &&
      consultation.nextFollowUpAt <= now
  );

  const upcomingFollowUps = consultations.filter(
    (consultation) =>
      consultation.nextFollowUpAt &&
      consultation.nextFollowUpAt > now
  );

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm text-slate-400">Admin CRM</p>

            <h1 className="text-3xl font-bold">
              Follow-up Management
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Manage due and upcoming consultation follow-ups.
            </p>
          </div>
          <Link
  href="/admin/follow-up-history"
  className="inline-flex rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-slate-200"
>
  View Completed History
</Link>

          <Link
            href="/admin"
            className="inline-flex w-fit rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-slate-200"
          >
            Back to Dashboard
          </Link>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-5">
            <p className="text-sm text-red-200">Due Follow-ups</p>
            <p className="mt-2 text-3xl font-bold text-red-100">
              {dueFollowUps.length}
            </p>
          </div>

          <div className="rounded-2xl border border-blue-400/30 bg-blue-500/10 p-5">
            <p className="text-sm text-blue-200">Upcoming Follow-ups</p>
            <p className="mt-2 text-3xl font-bold text-blue-100">
              {upcomingFollowUps.length}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-300">Total Scheduled</p>
            <p className="mt-2 text-3xl font-bold">
              {consultations.length}
            </p>
          </div>
        </div>

        <section className="mb-8 overflow-hidden rounded-2xl border border-red-400/20 bg-white text-slate-900">
          <div className="border-b border-red-100 bg-red-50 px-5 py-4">
            <h2 className="text-xl font-bold text-red-700">
              Due Follow-ups
            </h2>

            <p className="mt-1 text-sm text-red-600">
              These consultations require attention.
            </p>
          </div>

          {dueFollowUps.length === 0 ? (
            <div className="p-5 text-sm text-slate-500">
              No due follow-ups.
            </div>
            
          ) : (
            <div className="divide-y divide-slate-200">
              {dueFollowUps.map((consultation) => (
                <div
                  key={consultation.id}
                  className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <h3 className="font-semibold">
                      {consultation.name}
                    </h3>

                    <p className="text-sm text-slate-600">
                      {consultation.company || "Individual customer"}
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                      {consultation.phone} · {consultation.email}
                    </p>

                    <p className="mt-2 text-sm font-medium text-red-600">
                      Due: {formatDateTime(consultation.nextFollowUpAt)}
                    </p>

                    {consultation.followUpNote && (
                      <p className="mt-2 text-sm text-slate-700">
                        Note: {consultation.followUpNote}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
  <a
    href={`https://wa.me/${getWhatsAppNumber(
      consultation.phone
    )}?text=${encodeURIComponent(
      getWhatsAppMessage(consultation.name, consultation.topic)
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
  >
    WhatsApp
  </a>

  <a
    href={`tel:${consultation.phone}`}
    className="inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
  >
    Call
  </a>

  <FollowUpActions consultationId={consultation.id} />
</div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="overflow-hidden rounded-2xl border border-blue-400/20 bg-white text-slate-900">
          <div className="border-b border-blue-100 bg-blue-50 px-5 py-4">
            <h2 className="text-xl font-bold text-blue-700">
              Upcoming Follow-ups
            </h2>

            <p className="mt-1 text-sm text-blue-600">
              Scheduled future follow-ups.
            </p>
          </div>

          {upcomingFollowUps.length === 0 ? (
            <div className="p-5 text-sm text-slate-500">
              No upcoming follow-ups.
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {upcomingFollowUps.map((consultation) => (
                <div
                  key={consultation.id}
                  className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <h3 className="font-semibold">
                      {consultation.name}
                    </h3>

                    <p className="text-sm text-slate-600">
                      {consultation.company || "Individual customer"}
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                      {consultation.phone} · {consultation.email}
                    </p>

                    <p className="mt-2 text-sm font-medium text-blue-600">
                      Scheduled:{" "}
                      {formatDateTime(consultation.nextFollowUpAt)}
                    </p>

                    {consultation.followUpNote && (
                      <p className="mt-2 text-sm text-slate-700">
                        Note: {consultation.followUpNote}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
  <a
    href={`https://wa.me/${getWhatsAppNumber(
      consultation.phone
    )}?text=${encodeURIComponent(
      getWhatsAppMessage(consultation.name, consultation.topic)
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
  >
    WhatsApp
  </a>

  <a
    href={`tel:${consultation.phone}`}
    className="inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
  >
    Call
  </a>

 <FollowUpActions consultationId={consultation.id} />
</div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}