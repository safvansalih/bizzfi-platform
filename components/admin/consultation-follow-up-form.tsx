"use client";

import { useState } from "react";

type Props = {
  consultationId: string;
  initialFollowUpAt: string | null;
  initialFollowUpNote: string | null;
};

function toDateTimeLocal(value: string | null) {
  if (!value) return "";

  const date = new Date(value);
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);

  return localDate.toISOString().slice(0, 16);
}

export default function ConsultationFollowUpForm({
  consultationId,
  initialFollowUpAt,
  initialFollowUpNote,
}: Props) {
  const [followUpAt, setFollowUpAt] = useState(
    toDateTimeLocal(initialFollowUpAt)
  );
  const [followUpNote, setFollowUpNote] = useState(
    initialFollowUpNote || ""
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(
        `/api/admin/consultations/${consultationId}/follow-up`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nextFollowUpAt: followUpAt || null,
            followUpNote,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save follow-up");
      }

      setMessage("Follow-up details saved successfully.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
    >
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Follow-up Management
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="nextFollowUpAt"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Next Follow-up Date & Time
          </label>

          <input
            id="nextFollowUpAt"
            type="datetime-local"
            value={followUpAt}
            onChange={(event) => setFollowUpAt(event.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-black [color-scheme:light]"
          />
        </div>

        <div>
          <label
            htmlFor="followUpNote"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Follow-up Note
          </label>

          <textarea
            id="followUpNote"
            value={followUpNote}
            onChange={(event) => setFollowUpNote(event.target.value)}
            rows={3}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-black [color-scheme:light]"          />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Follow-up"}
        </button>

        {message && (
          <p className="text-sm text-gray-600">{message}</p>
        )}
      </div>
    </form>
  );
}