"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";

type MetaForm = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  campaignName: string | null;
  isActive: boolean;
  createdAt: string;
  _count?: {
    fields: number;
    submissions: number;
  };
};

export default function MetaFormsPage() {
  const [forms, setForms] = useState<MetaForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [description, setDescription] = useState("");

  async function loadForms() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/meta-forms", {
        method: "GET",
        cache: "no-store",
      });

      const responseText = await response.text();

      let data: any = {};

      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch {
        data = {
          raw: responseText,
        };
      }

      if (!response.ok) {
        console.error("META FORMS API ERROR:", {
          status: response.status,
          data,
        });

        throw new Error(
          data?.details ||
            data?.error ||
            `API request failed with status ${response.status}`,
        );
      }

      setForms(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("LOAD FORMS ERROR:", error);

      setError(
        error instanceof Error ? error.message : "Unable to load forms",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadForms();
  }, []);

  function generateSlug(value: string) {
    setName(value);

    const generatedSlug = value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setSlug(generatedSlug);
  }

  function handleSlugChange(value: string) {
    const cleanedSlug = value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");

    setSlug(cleanedSlug);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!name.trim() || !slug.trim()) {
      setError("Form name and slug are required.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch("/api/admin/meta-forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          slug: slug.trim().toLowerCase(),
          campaignName: campaignName.trim() || null,
          description: description.trim() || null,
        }),
      });

      const responseText = await response.text();

      let data: any = {};

      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch {
        data = {
          raw: responseText,
        };
      }

      if (!response.ok) {
        console.error("CREATE META FORM API ERROR:", {
          status: response.status,
          data,
        });

        throw new Error(
          data?.details ||
            data?.error ||
            `Form creation failed with status ${response.status}`,
        );
      }

      setName("");
      setSlug("");
      setCampaignName("");
      setDescription("");

      await loadForms();
    } catch (error) {
      console.error("CREATE FORM ERROR:", error);

      setError(
        error instanceof Error ? error.message : "Unable to create form.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 text-gray-900 sm:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Meta Ads Forms
          </h1>

          <p className="mt-2 text-gray-600">
            Manage campaign-specific landing page forms.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          {/* Create Form Section */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 text-gray-900 shadow-sm sm:p-6">
            <h2 className="mb-5 text-xl font-semibold text-gray-900">
              Create New Form
            </h2>

            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Form Name */}
              <div>
                <label
                  htmlFor="form-name"
                  className="mb-2 block text-sm font-semibold text-gray-900"
                >
                  Form Name
                </label>

                <input
                  id="form-name"
                  type="text"
                  value={name}
                  onChange={(event) => generateSlug(event.target.value)}
                  placeholder="CCTV Installation Enquiry"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3
                    text-gray-900 placeholder:text-gray-400
                    outline-none transition
                    focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
                  required
                />
              </div>

              {/* Slug */}
              <div>
                <label
                  htmlFor="form-slug"
                  className="mb-2 block text-sm font-semibold text-gray-900"
                >
                  Slug
                </label>

                <input
                  id="form-slug"
                  type="text"
                  value={slug}
                  onChange={(event) =>
                    handleSlugChange(event.target.value)
                  }
                  placeholder="cctv-installation-enquiry"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3
                    text-gray-900 placeholder:text-gray-400
                    outline-none transition
                    focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
                  required
                />

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  Unique name used in the public URL.
                </p>
              </div>

              {/* Campaign Name */}
              <div>
                <label
                  htmlFor="campaign-name"
                  className="mb-2 block text-sm font-semibold text-gray-900"
                >
                  Campaign Name
                </label>

                <input
                  id="campaign-name"
                  type="text"
                  value={campaignName}
                  onChange={(event) =>
                    setCampaignName(event.target.value)
                  }
                  placeholder="CCTV Meta Campaign September"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3
                    text-gray-900 placeholder:text-gray-400
                    outline-none transition
                    focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-semibold text-gray-900"
                >
                  Description
                </label>

                <textarea
                  id="description"
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  placeholder="Form purpose..."
                  rows={4}
                  className="w-full resize-y rounded-lg border border-gray-300 bg-white px-3 py-3
                    text-gray-900 placeholder:text-gray-400
                    outline-none transition
                    focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-lg bg-black px-4 py-3
                  font-semibold text-white transition
                  hover:bg-gray-800
                  disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Saving..." : "Create Form"}
              </button>
            </form>
          </section>

          {/* Existing Forms Section */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 text-gray-900 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Existing Forms
              </h2>

              <button
                type="button"
                onClick={loadForms}
                disabled={loading}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2
                  text-sm font-medium text-gray-700 transition
                  hover:bg-gray-50
                  disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Loading..." : "Refresh"}
              </button>
            </div>

            {loading ? (
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-gray-500">Loading forms...</p>
              </div>
            ) : forms.length === 0 ? (
              <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
                <p className="text-gray-600">No forms created yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {forms.map((form) => (
                  <div
                    key={form.id}
                    className="rounded-xl border border-gray-200 bg-white p-4 transition hover:shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="break-words font-semibold text-gray-900">
                          {form.name}
                        </h3>

                        <div className="mt-2 flex flex-wrap items-center gap-2">
  <a
    href={`https://www.bizzfi.com/lead/${form.slug}`}
    target="_blank"
    rel="noopener noreferrer"
    className="break-all text-sm font-medium text-blue-600 underline hover:text-blue-800"
  >
    {`https://www.bizzfi.com/lead/${form.slug}`}
  </a>

  <button
    type="button"
    onClick={() =>
      navigator.clipboard.writeText(
        `https://www.bizzfi.com/lead/${form.slug}`,
      )
    }
    className="rounded-md border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100"
  >
    Copy
  </button>
</div>

                        {form.campaignName && (
                          <p className="mt-2 text-sm text-gray-700">
                            <span className="font-medium">Campaign:</span>{" "}
                            {form.campaignName}
                          </p>
                        )}

                        {form.description && (
                          <p className="mt-2 text-sm leading-6 text-gray-600">
                            {form.description}
                          </p>
                        )}
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                          form.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {form.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-600">
                      <span>
                        <span className="font-medium text-gray-900">
                          Fields:
                        </span>{" "}
                        {form._count?.fields ?? 0}
                      </span>

                      <span>
                        <span className="font-medium text-gray-900">
                          Submissions:
                        </span>{" "}
                        {form._count?.submissions ?? 0}
                      </span>
                    </div>

                    <div className="mt-4">
                      <Link
                        href={`/admin/meta-forms/${form.id}`}
                        className="inline-flex rounded-lg bg-gray-900 px-4 py-2
                          text-sm font-medium text-white transition
                          hover:bg-gray-700"
                      >
                        Manage Fields
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}