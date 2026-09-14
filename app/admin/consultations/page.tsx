import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import ConsultationStatusSelect from "@/components/admin/consultation-status-select";

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

type ConsultationsPageProps = {
  searchParams: Promise<{
    search?: string;
    status?: string;
  }>;
};

const statuses = ["NEW", "CONTACTED", "QUALIFIED", "CONVERTED", "LOST"];

export default async function AdminConsultationsPage({
  searchParams,
}: ConsultationsPageProps) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const params = await searchParams;
  const search = params.search?.trim() || "";
  const status = params.status?.trim() || "";

  const consultations = await prisma.consultationRequest.findMany({
    where: {
      ...(status ? { status } : {}),
      ...(search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                email: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                company: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                phone: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                topic: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {}),
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 100,
  });

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <a
            href="/admin"
            className="mb-4 inline-block text-sm text-slate-400 hover:text-white"
          >
            ← Back to Dashboard
          </a>

          <p className="text-sm text-slate-400">Bizzfi Administration</p>

          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Consultation Requests
          </h1>

          <p className="mt-2 text-slate-400">
            Manage consultation requests submitted through the Bizzfi website.
          </p>
        </div>

        {/* Search & Filter */}
        <form
          method="GET"
          className="mb-6 rounded-2xl border border-white/10 bg-white/[0.05] p-4"
        >
          <div className="grid gap-4 md:grid-cols-[1fr_200px_auto]">
            <input
              type="search"
              name="search"
              defaultValue={search}
              placeholder="Search name, email, company, phone or topic..."
              className="w-full rounded-lg border border-white/10 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-white/30"
            />

            <select
              name="status"
              defaultValue={status}
              className="rounded-lg border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-white/30"
            >
              <option value="">All Statuses</option>

              {statuses.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Search
            </button>
          </div>
        </form>

        {/* Result count */}
        <div className="mb-4">
          <p className="text-sm text-slate-400">
            Showing {consultations.length} consultation requests
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] md:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1250px] text-left">
              <thead className="border-b border-white/10 bg-white/[0.03]">
                <tr>
                  <th className="px-5 py-4 text-sm font-semibold text-slate-300">
                    Customer
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-slate-300">
                    Contact
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-slate-300">
                    Topic
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-slate-300">
                    Preferred Date
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-slate-300">
                    Time
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-slate-300">
                    Status
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-slate-300">
                    Actions
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-slate-300">
                    Submitted
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/10">
                {consultations.map((consultation) => (
                  <tr
                    key={consultation.id}
                    className="transition hover:bg-white/[0.03]"
                  >
                    {/* Customer */}
                    <td className="px-5 py-5 align-top">
                      <a
  href={`/admin/consultations/${consultation.id}`}
  className="font-semibold text-white hover:text-blue-300 hover:underline"
>
  {consultation.name}
</a>

                      {consultation.company && (
                        <p className="mt-1 text-sm text-slate-400">
                          {consultation.company}
                        </p>
                      )}
                    </td>

                    {/* Contact */}
                    <td className="px-5 py-5 align-top">
                      <a
                        href={`mailto:${consultation.email}`}
                        className="block text-sm text-slate-300 hover:text-white"
                      >
                        {consultation.email}
                      </a>

                      <a
                        href={`tel:${consultation.phone}`}
                        className="mt-1 block text-sm text-slate-500 hover:text-white"
                      >
                        {consultation.phone}
                      </a>
                    </td>

                    {/* Topic */}
                    <td className="px-5 py-5 align-top">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200">
                        {consultation.topic}
                      </span>
                    </td>

                    {/* Preferred Date */}
                    <td className="whitespace-nowrap px-5 py-5 align-top text-sm text-slate-300">
                      {new Date(
                        consultation.preferredDate
                      ).toLocaleDateString("en-IN")}
                    </td>

                    {/* Preferred Time */}
                    <td className="whitespace-nowrap px-5 py-5 align-top text-sm text-slate-400">
                      {consultation.preferredTime}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-5 align-top">
                      <ConsultationStatusSelect
                        consultationId={consultation.id}
                        initialStatus={consultation.status}
                      />
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-5 align-top">
                      <div className="flex flex-col gap-2">
                        <a
                          href={`https://wa.me/${getWhatsAppNumber(
                            consultation.phone
                          )}?text=${encodeURIComponent(
                            getWhatsAppMessage(consultation)
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center whitespace-nowrap rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
                        >
                          WhatsApp ↗
                        </a>

                        <a
                          href={`tel:${consultation.phone}`}
                          className="inline-flex items-center whitespace-nowrap rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                          Call Customer ☎
                        </a>

                        <a
                          href={`mailto:${consultation.email}?subject=${encodeURIComponent(
                            `Bizzfi Consultation - ${consultation.topic}`
                          )}&body=${encodeURIComponent(
                            `Hello ${consultation.name},

Thank you for booking a consultation with Bizzfi.

Topic: ${consultation.topic}
Preferred Date: ${
                              consultation.preferredDate
                                ? new Date(
                                    consultation.preferredDate
                                  ).toLocaleDateString("en-IN")
                                : "Not specified"
                            }
Preferred Time: ${
                              consultation.preferredTime || "Not specified"
                            }

We will contact you shortly to confirm your consultation.

Thank you,
Bizzfi`
                          )}`}
                          className="inline-flex items-center whitespace-nowrap rounded-lg bg-purple-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-purple-700"
                        >
                          Email Customer ✉
                        </a>
                      </div>
                    </td>

                    {/* Submitted */}
                    <td className="whitespace-nowrap px-5 py-5 align-top text-sm text-slate-400">
                      {new Date(consultation.createdAt).toLocaleString(
                        "en-IN"
                      )}
                    </td>
                  </tr>
                ))}

                {consultations.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-5 py-12 text-center text-slate-500"
                    >
                      No consultation requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-4 md:hidden">
          {consultations.map((consultation) => (
            <div
              key={consultation.id}
              className="rounded-2xl border border-white/10 bg-white/[0.05] p-5"
            >
              {/* Customer Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2>
  <a
    href={`/admin/consultations/${consultation.id}`}
    className="font-semibold text-white hover:text-blue-300 hover:underline"
  >
    {consultation.name}
  </a>
</h2>

                  {consultation.company && (
                    <p className="mt-1 text-sm text-slate-400">
                      {consultation.company}
                    </p>
                  )}
                </div>

                <span className="shrink-0 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
                  {consultation.status}
                </span>
              </div>

              {/* Consultation Details */}
              <div className="mt-4 space-y-2 text-sm">
                <p className="text-slate-300">
                  📧{" "}
                  <a
                    href={`mailto:${consultation.email}`}
                    className="hover:text-white"
                  >
                    {consultation.email}
                  </a>
                </p>

                <p className="text-slate-400">
                  📱{" "}
                  <a
                    href={`tel:${consultation.phone}`}
                    className="hover:text-white"
                  >
                    {consultation.phone}
                  </a>
                </p>

                <p className="text-slate-300">💬 {consultation.topic}</p>

                <p className="text-slate-400">
                  📅{" "}
                  {new Date(
                    consultation.preferredDate
                  ).toLocaleDateString("en-IN")}
                </p>

                <p className="text-slate-400">
                  🕐 {consultation.preferredTime}
                </p>
              </div>

              {/* Message */}
              <div className="mt-4 border-t border-white/10 pt-4">
                <p className="text-sm leading-6 text-slate-400">
                  {consultation.message}
                </p>
              </div>

              {/* Status Update */}
              <div className="mt-4">
                <ConsultationStatusSelect
                  consultationId={consultation.id}
                  initialStatus={consultation.status}
                />
              </div>

              {/* Customer Actions */}
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={`https://wa.me/${getWhatsAppNumber(
                    consultation.phone
                  )}?text=${encodeURIComponent(
                    getWhatsAppMessage(consultation)
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  WhatsApp Customer ↗
                </a>

                <a
                  href={`tel:${consultation.phone}`}
                  className="inline-flex items-center rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Call Customer ☎
                </a>

                <a
                  href={`mailto:${consultation.email}?subject=${encodeURIComponent(
                    `Bizzfi Consultation - ${consultation.topic}`
                  )}&body=${encodeURIComponent(
                    `Hello ${consultation.name},

Thank you for booking a consultation with Bizzfi.

Topic: ${consultation.topic}
Preferred Date: ${
                      consultation.preferredDate
                        ? new Date(
                            consultation.preferredDate
                          ).toLocaleDateString("en-IN")
                        : "Not specified"
                    }
Preferred Time: ${
                      consultation.preferredTime || "Not specified"
                    }

We will contact you shortly to confirm your consultation.

Thank you,
Bizzfi`
                  )}`}
                  className="inline-flex items-center rounded-lg bg-purple-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-purple-700"
                >
                  Email Customer ✉
                </a>
              </div>

              {/* Submitted */}
              <p className="mt-4 text-xs text-slate-500">
                Submitted{" "}
                {new Date(consultation.createdAt).toLocaleString("en-IN")}
              </p>
            </div>
          ))}

          {consultations.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-10 text-center text-slate-500">
              No consultation requests found.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}