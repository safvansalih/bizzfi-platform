"use client";

import { useState } from "react";

type ConsultationStatusSelectProps = {
  consultationId: string;
  initialStatus: string;
};

const statuses = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "CONVERTED",
  "LOST",
];

export default function ConsultationStatusSelect({
  consultationId,
  initialStatus,
}: ConsultationStatusSelectProps) {
  const [status, setStatus] = useState(initialStatus);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function updateStatus() {
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(
        `/api/admin/consultations/${consultationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Update failed");
      }

      setMessage("Saved");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Update failed"
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-white/10 pt-4">
      <label
        htmlFor={`consultation-status-${consultationId}`}
        className="text-sm text-slate-400"
      >
        Status
      </label>

      <select
        id={`consultation-status-${consultationId}`}
        value={status}
        onChange={(event) => setStatus(event.target.value)}
        className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-white/30"
      >
        {statuses.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={updateStatus}
        disabled={saving}
        className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving ? "Saving..." : "Update"}
      </button>

      {message && (
        <span className="text-sm text-slate-400">
          {message}
        </span>
      )}
    </div>
  );
}