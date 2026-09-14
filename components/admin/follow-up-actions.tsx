"use client";

import { useState } from "react";
import Link from "next/link";

type Props = {
  consultationId: string;
};

export default function FollowUpActions({
  consultationId,
}: Props) {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function completeFollowUp() {
    const confirmed = window.confirm(
      "Are you sure you want to mark this follow-up as completed?"
    );

    if (!confirmed) return;

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
            action: "complete",
            followUpNote: "Follow-up completed",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to complete follow-up");
      }

      setMessage("Completed successfully.");

      window.location.reload();
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
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={completeFollowUp}
        disabled={saving}
        className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
      >
        {saving ? "Saving..." : "Complete"}
      </button>

      <Link
        href={`/admin/consultations/${consultationId}`}
        className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
      >
        Open
      </Link>

      {message && (
        <span className="text-sm text-slate-600">{message}</span>
      )}
    </div>
  );
}