import { sendEmail } from "../email/send-email";

type FollowUpReminderParams = {
  name: string;
  company?: string | null;
  email: string;
  topic: string;
  followUpAt: Date;
  note?: string | null;
};

function formatDateTime(date: Date) {
  return new Date(date).toLocaleString("en-IN", {
    dateStyle: "full",
    timeStyle: "short",
  });
}

export async function sendFollowUpReminder({
  name,
  company,
  email,
  topic,
  followUpAt,
  note,
}: FollowUpReminderParams) {
  const formattedDate = formatDateTime(followUpAt);

  return sendEmail({
    to: email,
    subject: `Bizzfi Follow-up Reminder – ${topic}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h2 style="color: #0f172a;">
          Follow-up Reminder
        </h2>

        <p>Dear ${name},</p>

        <p>
          This is a friendly reminder regarding your consultation request
          with <strong>Bizzfi</strong>.
        </p>

        <div style="
          margin: 20px 0;
          padding: 16px;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          background: #f8fafc;
        ">
          <p><strong>Topic:</strong> ${topic}</p>
          ${
            company
              ? `<p><strong>Company:</strong> ${company}</p>`
              : ""
          }
          <p><strong>Follow-up Date:</strong> ${formattedDate}</p>
          ${
            note
              ? `<p><strong>Note:</strong> ${note}</p>`
              : ""
          }
        </div>

        <p>
          Please let us know if you need to reschedule or have any additional
          requirements.
        </p>

        <p>
          Regards,<br />
          <strong>Bizzfi Team</strong><br />
          www.bizzfi.com
        </p>
      </div>
    `,
    replyTo: process.env.EMAIL_FROM,
  });
}