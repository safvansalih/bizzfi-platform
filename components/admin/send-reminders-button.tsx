"use client";

import { useState } from "react";

export default function SendRemindersButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function sendReminders() {
    const confirmed = window.confirm(
      "Do you want to send due follow-up reminders now?"
    );

    if (!confirmed) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "/api/admin/follow-ups/send-reminders",
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to send reminders"
        );
      }

      setMessage(
        `Sent: ${data.sent}, Failed: ${data.failed}, Skipped: ${data.skipped}`
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={sendReminders}
        disabled={loading}
        className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send Reminders Now"}
      </button>

      {message && (
        <p className="text-sm text-slate-600">
          {message}
        </p>
      )}
    </div>
  );
}