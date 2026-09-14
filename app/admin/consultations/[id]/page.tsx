import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import ConsultationStatusSelect from "@/components/admin/consultation-status-select";
import ConsultationFollowUpForm from "@/components/admin/consultation-follow-up-form";

type ConsultationDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function getWhatsAppNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");

  if (digits.length === 10) {
    return `91${digits}`;
  }

  return digits;
}

function getWhatsAppMessage(consultation: {
  name: string;
  topic: string;
  preferredDate: Date | string;
  preferredTime: string;
}) {
  const preferredDate = consultation.preferredDate
    ? new Date(consultation.preferredDate).toLocaleDateString("en-IN")
    : "Not specified";

  return `Hello ${consultation.name}, this is Bizzfi.

Thank you for booking a consultation with us.

Topic: ${consultation.topic}
Preferred Date: ${preferredDate}
Preferred Time: ${consultation.preferredTime || "Not specified"}

We will contact you shortly to confirm your consultation.

Thank you,
Bizzfi`;
}

export default async function ConsultationDetailsPage({
  params,
}: ConsultationDetailsPageProps) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const { id } = await params;

  const consultation = await prisma.consultationRequest.findUnique({
    where: {
      id,
    },
  });

  if (!consultation) {
    redirect("/admin/consultations");
  }

  const preferredDate = consultation.preferredDate
    ? new Date(consultation.preferredDate).toLocaleDateString("en-IN")
    : "Not specified";

  const whatsappMessage = getWhatsAppMessage(consultation);

  const emailSubject = `Bizzfi Consultation - ${consultation.topic}`;

  const emailBody = `Hello ${consultation.name},

Thank you for booking a consultation with Bizzfi.

Topic: ${consultation.topic}
Preferred Date: ${preferredDate}
Preferred Time: ${consultation.preferredTime || "Not specified"}

We will contact you shortly to confirm your consultation.

Thank you,
Bizzfi`;

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <a
            href="/admin/consultations"
            className="mb-4 inline-block text-sm text-slate-400 hover:text-white"
          >
            ← Back to Consultations
          </a>

          <p className="text-sm text-slate-400">Bizzfi Administration</p>

          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Consultation Details
          </h1>

          <p className="mt-2 text-slate-400">
            View and manage this consultation request.
          </p>
        </div>

        {/* Main Card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 sm:p-8">
          {/* Customer Header */}
          <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-start">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {consultation.name}
              </h2>

              {consultation.company && (
                <p className="mt-2 text-slate-400">
                  {consultation.company}
                </p>
              )}
            </div>

            <span className="w-fit rounded-full bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
              {consultation.status}
            </span>
          </div>

          {/* Customer Information */}
          <div className="grid gap-6 border-b border-white/10 py-6 sm:grid-cols-2">
            <div>
              <p className="text-sm text-slate-500">Email</p>
              <a
                href={`mailto:${consultation.email}`}
                className="mt-1 block break-all text-slate-200 hover:text-white"
              >
                {consultation.email}
              </a>
            </div>

            <div>
              <p className="text-sm text-slate-500">Phone</p>
              <a
                href={`tel:${consultation.phone}`}
                className="mt-1 block text-slate-200 hover:text-white"
              >
                {consultation.phone}
              </a>
            </div>

            <div>
              <p className="text-sm text-slate-500">Consultation Topic</p>
              <p className="mt-1 text-slate-200">
                {consultation.topic}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Preferred Date</p>
              <p className="mt-1 text-slate-200">{preferredDate}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Preferred Time</p>
              <p className="mt-1 text-slate-200">
                {consultation.preferredTime || "Not specified"}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Submitted On</p>
              <p className="mt-1 text-slate-200">
                {new Date(consultation.createdAt).toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          {/* Customer Message */}
          <div className="border-b border-white/10 py-6">
            <h3 className="mb-3 text-lg font-semibold text-white">
              Customer Message
            </h3>

            <div className="rounded-xl border border-white/10 bg-black/10 p-4">
              <p className="whitespace-pre-wrap text-sm leading-7 text-slate-300">
                {consultation.message || "No message provided."}
              </p>
            </div>
          </div>

          {/* Status Update */}
          <div className="border-b border-white/10 py-6">
            <h3 className="mb-3 text-lg font-semibold text-white">
              Update Status
            </h3>


            <ConsultationStatusSelect
              consultationId={consultation.id}
              initialStatus={consultation.status}
            />

            <ConsultationFollowUpForm
  consultationId={consultation.id}
  initialFollowUpAt={
    consultation.nextFollowUpAt
      ? consultation.nextFollowUpAt.toISOString()
      : null
  }
  initialFollowUpNote={consultation.followUpNote}
/>
          </div>

          {/* Customer Actions */}
          <div className="py-6">
            <h3 className="mb-4 text-lg font-semibold text-white">
              Customer Actions
            </h3>

            <div className="flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${getWhatsAppNumber(
                  consultation.phone
                )}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
              >
                WhatsApp Customer ↗
              </a>

              <a
                href={`tel:${consultation.phone}`}
                className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Call Customer ☎
              </a>

              <a
                href={`mailto:${consultation.email}?subject=${encodeURIComponent(
                  emailSubject
                )}&body=${encodeURIComponent(emailBody)}`}
                className="inline-flex items-center rounded-lg bg-purple-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
              >
                Email Customer ✉
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}