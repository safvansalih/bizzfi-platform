"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { useParams } from "next/navigation";

type FormField = {
  id: string;
  label: string;
  fieldKey: string;
  fieldType: string;
  required: boolean;
  options: unknown;
  placeholder?: string | null;
};

type PublicForm = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  campaignName: string | null;
  fields: FormField[];
};

export default function PublicMetaFormPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [form, setForm] = useState<PublicForm | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadForm() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/public/meta-forms/${slug}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success || !data.form) {
          throw new Error(
            data.message || "Form not found"
          );
        }

        // Important: API response contains form inside data.form
        setForm(data.form);
      } catch (error) {
        console.error(
          "Public form loading error:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load form"
        );
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadForm();
    }
  }, [slug]);

  function updateValue(
    fieldKey: string,
    value: string
  ) {
    setValues((previous) => ({
      ...previous,
      [fieldKey]: value,
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!form) {
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      const response = await fetch(
        `/api/public/meta-forms/${form.slug}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            data.error ||
            "Submission failed"
        );
      }

      setSuccess(
        data.message ||
          "Your enquiry has been submitted successfully."
      );

      setValues({});
    } catch (error) {
      console.error(
        "Form submission error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to submit form"
      );
    } finally {
      setSubmitting(false);
    }
  }

  function renderField(field: FormField) {
    const value = values[field.fieldKey] || "";

    const commonProps = {
      id: field.fieldKey,
      name: field.fieldKey,
      value,
      required: field.required,
      placeholder: field.placeholder || "",
      onChange: (
        event: ChangeEvent<
          HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
      ) =>
        updateValue(
          field.fieldKey,
          event.target.value
        ),
      className:
        "mt-2 w-full rounded-lg border border-gray-300 " +
        "px-4 py-3 text-gray-900 outline-none " +
        "focus:border-blue-600 focus:ring-2 " +
        "focus:ring-blue-100",
    };

    if (
      field.fieldType === "textarea"
    ) {
      return (
        <textarea
          {...commonProps}
          rows={4}
        />
      );
    }

    if (
      field.fieldType === "select" ||
      field.fieldType === "dropdown"
    ) {
      const options = Array.isArray(field.options)
        ? field.options
        : [];

      return (
        <select {...commonProps}>
          <option value="">
            Select an option
          </option>

          {options.map((option) => (
            <option
              key={String(option)}
              value={String(option)}
            >
              {String(option)}
            </option>
          ))}
        </select>
      );
    }

    const inputType =
      field.fieldType === "phone"
        ? "tel"
        : field.fieldType === "number"
          ? "number"
          : field.fieldType === "date"
            ? "date"
            : field.fieldType === "email"
              ? "email"
              : "text";

    return (
      <input
        {...commonProps}
        type={inputType}
      />
    );
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-600">
          Loading form...
        </p>
      </main>
    );
  }

  if (!form) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
        <div className="rounded-xl border border-red-200 bg-white p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Form Not Found
          </h1>

          <p className="mt-2 text-red-600">
            {error ||
              "This form is unavailable."}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-xl">
        <div className="rounded-2xl bg-white p-6 shadow-lg sm:p-8">
          <div className="mb-7 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              {form.name}
            </h1>

            {form.description && (
              <p className="mt-3 leading-6 text-gray-600">
                {form.description}
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

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {form.fields.map((field) => (
              <div key={field.id}>
                <label
                  htmlFor={field.fieldKey}
                  className="block text-sm font-semibold text-gray-900"
                >
                  {field.label}

                  {field.required && (
                    <span className="ml-1 text-red-600">
                      *
                    </span>
                  )}
                </label>

                {renderField(field)}
              </div>
            ))}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting
                ? "Submitting..."
                : "Submit Enquiry"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-500">
            Your information will be used to contact
            you regarding your enquiry.
          </p>
        </div>
      </div>
    </main>
  );
}