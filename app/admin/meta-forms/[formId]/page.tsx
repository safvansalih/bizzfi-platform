"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type MetaField = {
  id: string;
  label: string;
  fieldKey: string;
  fieldType: string;
  required: boolean;
  sortOrder: number;
  options: string[] | null;
};

type MetaForm = {
  id: string;
  name: string;
  slug: string;
};

const fieldTypes = [
  { value: "text", label: "Text" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "number", label: "Number" },
  { value: "textarea", label: "Textarea" },
  { value: "select", label: "Select / Dropdown" },
  { value: "date", label: "Date" },
];

export default function ManageMetaFormFieldsPage() {
  const params = useParams();
  const formId = params.formId as string;

  const [form, setForm] = useState<MetaForm | null>(null);
  const [fields, setFields] = useState<MetaField[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [label, setLabel] = useState("");
  const [fieldKey, setFieldKey] = useState("");
  const [fieldType, setFieldType] = useState("text");
  const [required, setRequired] = useState(false);
  const [optionsText, setOptionsText] = useState("");

  async function loadFields() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/admin/meta-forms/${formId}/fields`,
        {
          cache: "no-store",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to load fields");
      }

      setForm(data.form);
      setFields(data.fields || []);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to load fields",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (formId) {
      loadFields();
    }
  }, [formId]);

  function generateFieldKey(value: string) {
    setLabel(value);

    const generatedKey = value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");

    setFieldKey(generatedKey);
  }

  function cleanFieldKey(value: string) {
    setFieldKey(
      value
        .toLowerCase()
        .replace(/[^a-z0-9_]/g, "_")
        .replace(/_+/g, "_"),
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!label.trim() || !fieldKey.trim()) {
      setError("Field label and field key are required.");
      return;
    }

    const options =
      fieldType === "select"
        ? optionsText
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : [];

    if (fieldType === "select" && options.length === 0) {
      setError("Please enter at least one dropdown option.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        `/api/admin/meta-forms/${formId}/fields`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            label: label.trim(),
            fieldKey: fieldKey.trim(),
            fieldType,
            required,
            options,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create field");
      }

      setLabel("");
      setFieldKey("");
      setFieldType("text");
      setRequired(false);
      setOptionsText("");

      setSuccess("Field added successfully.");
      await loadFields();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to create field",
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteField(fieldId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this field?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      const response = await fetch(
        `/api/admin/meta-forms/${formId}/fields?fieldId=${fieldId}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete field");
      }

      setSuccess("Field deleted successfully.");
      await loadFields();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to delete field",
      );
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 text-gray-900 sm:p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <Link
            href="/admin/meta-forms"
            className="text-sm font-medium text-gray-600 hover:text-black"
          >
            ← Back to Meta Ads Forms
          </Link>

          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Manage Form Fields
          </h1>

          {form && (
            <p className="mt-2 text-gray-600">
              Form:{" "}
              <span className="font-semibold text-gray-900">
                {form.name}
              </span>{" "}
              <span className="text-gray-500">/{form.slug}</span>
            </p>
          )}
        </div>

        {error && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
            {success}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          {/* Add Field */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold text-gray-900">
              Add New Field
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="field-label"
                  className="mb-2 block text-sm font-semibold text-gray-900"
                >
                  Field Label
                </label>

                <input
                  id="field-label"
                  type="text"
                  value={label}
                  onChange={(event) =>
                    generateFieldKey(event.target.value)
                  }
                  placeholder="Full Name"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3
                    text-gray-900 placeholder:text-gray-400 outline-none
                    focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="field-key"
                  className="mb-2 block text-sm font-semibold text-gray-900"
                >
                  Field Key
                </label>

                <input
                  id="field-key"
                  type="text"
                  value={fieldKey}
                  onChange={(event) =>
                    cleanFieldKey(event.target.value)
                  }
                  placeholder="full_name"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3
                    text-gray-900 placeholder:text-gray-400 outline-none
                    focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
                  required
                />

                <p className="mt-2 text-xs text-gray-500">
                  Unique key used to store the submitted value.
                </p>
              </div>

              <div>
                <label
                  htmlFor="field-type"
                  className="mb-2 block text-sm font-semibold text-gray-900"
                >
                  Field Type
                </label>

                <select
                  id="field-type"
                  value={fieldType}
                  onChange={(event) => setFieldType(event.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3
                    text-gray-900 outline-none focus:border-gray-900
                    focus:ring-2 focus:ring-gray-200"
                >
                  {fieldTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {fieldType === "select" && (
                <div>
                  <label
                    htmlFor="field-options"
                    className="mb-2 block text-sm font-semibold text-gray-900"
                  >
                    Dropdown Options
                  </label>

                  <textarea
                    id="field-options"
                    value={optionsText}
                    onChange={(event) =>
                      setOptionsText(event.target.value)
                    }
                    placeholder="CCTV Installation, Website Development, E-commerce"
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3
                      text-gray-900 placeholder:text-gray-400 outline-none
                      focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
                  />

                  <p className="mt-2 text-xs text-gray-500">
                    Separate options using commas.
                  </p>
                </div>
              )}

              <label className="flex items-center gap-3 text-sm font-medium text-gray-900">
                <input
                  type="checkbox"
                  checked={required}
                  onChange={(event) => setRequired(event.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />

                Required Field
              </label>

              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-lg bg-black px-4 py-3
                  font-semibold text-white transition hover:bg-gray-800
                  disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Adding..." : "Add Field"}
              </button>
            </form>
          </section>

          {/* Existing Fields */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                Existing Fields
              </h2>

              <button
                type="button"
                onClick={loadFields}
                disabled={loading}
                className="rounded-lg border border-gray-300 px-3 py-2
                  text-sm font-medium text-gray-700 hover:bg-gray-50
                  disabled:opacity-50"
              >
                {loading ? "Loading..." : "Refresh"}
              </button>
            </div>

            {loading ? (
              <p className="text-gray-500">Loading fields...</p>
            ) : fields.length === 0 ? (
              <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
                <p className="text-gray-600">
                  No fields added to this form yet.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="rounded-xl border border-gray-200 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {index + 1}. {field.label}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          Key: {field.fieldKey}
                        </p>

                        <p className="mt-1 text-sm text-gray-600">
                          Type: {field.fieldType}
                        </p>

                        {field.fieldType === "select" &&
                          field.options &&
                          field.options.length > 0 && (
                            <p className="mt-2 text-sm text-gray-600">
                              Options: {field.options.join(", ")}
                            </p>
                          )}
                      </div>

                      <div className="flex shrink-0 flex-col items-end gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            field.required
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {field.required ? "Required" : "Optional"}
                        </span>

                        <button
                          type="button"
                          onClick={() => deleteField(field.id)}
                          className="rounded-lg border border-red-200 px-3 py-1.5
                            text-sm font-medium text-red-600 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
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