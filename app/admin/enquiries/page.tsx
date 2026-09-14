import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import EnquiryStatusSelect from "@/components/admin/enquiry-status-select";

function getWhatsAppNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");

  // Indian 10-digit number ആണെങ്കിൽ country code ചേർക്കുന്നു
  if (digits.length === 10) {
    return `91${digits}`;
  }

  return digits;
}

type EnquiriesPageProps = {
  searchParams: Promise<{
    search?: string;
    status?: string;
  }>;
};

const statuses = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "CONVERTED",
  "LOST",
];

export default async function AdminEnquiriesPage({
  searchParams,
}: EnquiriesPageProps) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const params = await searchParams;
  const search = params.search?.trim() || "";
  const status = params.status?.trim() || "";

  const enquiries = await prisma.contactEnquiry.findMany({
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
                service: {
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
          <Link
            href="/admin"
            className="mb-4 inline-block text-sm text-slate-400 hover:text-white"
          >
            ← Back to Dashboard
          </Link>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-slate-400">
                Bizzfi Administration
              </p>

              <h1 className="mt-2 text-3xl font-bold">
                Contact Enquiries
              </h1>

              <p className="mt-2 text-sm text-slate-400">
                Manage customer enquiries received from the website.
              </p>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-slate-300">
              {enquiries.length} enquiries
            </div>
          </div>
        </div>

        {/* Filters */}
        <form
          method="GET"
          className="mb-8 grid gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 md:grid-cols-[1fr_220px_auto]"
        >
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search name, email, company, phone..."
            className="rounded-lg border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-white/30"
          />

          <select
            name="status"
            defaultValue={status}
            className="rounded-lg border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-white/30"
          >
            <option value="">All statuses</option>

            {statuses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Filter
          </button>
        </form>

        {/* Enquiries */}
        <div className="space-y-4">
          {enquiries.map((enquiry) => (
            <article
              key={enquiry.id}
              className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 transition hover:bg-white/[0.07]"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-lg font-semibold text-white">
                      {enquiry.name}
                    </h2>

                    <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-medium text-slate-300">
                      {enquiry.status}
                    </span>
                  </div>

                  <div className="mt-3 space-y-1 text-sm text-slate-400">
                    <p>
                      <span className="text-slate-500">Email:</span>{" "}
                      {enquiry.email}
                    </p>

                    <p>
                      <span className="text-slate-500">Phone:</span>{" "}
                      {enquiry.phone}
                    </p>

                    <p>
                      <span className="text-slate-500">Company:</span>{" "}
                      {enquiry.company || "—"}
                    </p>

                    <p>
                      <span className="text-slate-500">Service:</span>{" "}
                      {enquiry.service}
                    </p>
                  </div>
                </div>

                <div className="text-sm text-slate-500 lg:text-right">
                  {new Date(enquiry.createdAt).toLocaleString("en-IN")}
                </div>
              </div>

              <div className="mt-4 border-t border-white/10 pt-4">
                <p className="whitespace-pre-wrap text-sm leading-6 text-slate-400">
                  {enquiry.message}
                </p>
              </div>
<EnquiryStatusSelect
  enquiryId={enquiry.id}
  initialStatus={enquiry.status}
/>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
  href={`https://wa.me/${getWhatsAppNumber(
    enquiry.phone
  )}?text=${encodeURIComponent(
    `Hello ${enquiry.name}, this is Bizzfi. Thank you for contacting us regarding ${enquiry.service}. We will get back to you shortly.`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300 transition hover:bg-emerald-500/20"
>
  WhatsApp Customer ↗
</a>
                <a
                  href={`mailto:${enquiry.email}`}
                  className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300 transition hover:bg-white/[0.1] hover:text-white"
                >
                  Email Customer
                </a>

                <a
                  href={`tel:${enquiry.phone}`}
                  className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300 transition hover:bg-white/[0.1] hover:text-white"
                >
                  Call Customer
                </a>
              </div>
            </article>
          ))}

          {enquiries.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-10 text-center text-slate-500">
              No enquiries found.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}