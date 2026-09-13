import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY?.trim();

if (!apiKey) {
  throw new Error(
    "RESEND_API_KEY environment variable is not configured."
  );
}

const resend = new Resend(apiKey);

type SendEmailParams = {
  subject: string;
  html: string;
  to?: string | string[];
  replyTo?: string;
};

export async function sendEmail({
  subject,
  html,
  to,
  replyTo,
}: SendEmailParams) {
  const from = process.env.EMAIL_FROM?.trim();

  if (!from) {
    throw new Error(
      "EMAIL_FROM environment variable is not configured."
    );
  }

  const recipients = to
    ? Array.isArray(to)
      ? to
      : [to]
    : [process.env.EMAIL_TO?.trim() || ""];

  if (!recipients[0]) {
    throw new Error(
      "Email recipient is not configured."
    );
  }

  const { data, error } = await resend.emails.send({
    from,
    to: recipients,
    subject,
    html,
    ...(replyTo ? { replyTo: replyTo.trim() } : {}),
  });

  if (error) {
    console.error("Email sending failed:", {
      name: error.name,
      message: error.message,
    });

    throw new Error(
      "Failed to send email notification."
    );
  }

  return data;
}