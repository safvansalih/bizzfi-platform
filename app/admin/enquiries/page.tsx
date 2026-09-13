import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

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
          <a
            href="/admin"
            className="mb-4 inline-block text-sm text-slate-400 hover:text-white"
          >
            ← Back to Dashboard
          </a>

          <div>
            <p className="text-sm text-slate-400">
              Bizzfi Administration
            </p>

            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              Contact Enquiries
            </h1>

            <p className="mt-2 text-slate-400">
              Manage enquiries submitted through the Bizzfi website.
            </p>
          </div>
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
              placeholder="Search name, email, company, phone or service..."
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

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-slate-400">
            Showing {enquiries.length} enquiries
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] md:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left">
              <thead className="border-b border-white/10 bg-white/[0.03]">
                <tr>
                  <th className="px-5 py-4 text-sm font-semibold text-slate-300">
                    Customer
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-slate-300">
                    Contact
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-slate-300">
                    Service
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-slate-300">
                    Message
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-slate-300">
                    Status
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-slate-300">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/10">
                {enquiries.map((enquiry) => (
                  <tr
                    key={enquiry.id}
                    className="transition hover:bg-white/[0.03]"
                  >
                    <td className="px-5 py-5 align-top">
                      <p className="font-semibold text-white">
                        {enquiry.name}
                      </p>

                      {enquiry.company && (
                        <p className="mt-1 text-sm text-slate-400">
                          {enquiry.company}
                        </p>
                      )}
                    </td>

                    <td className="px-5 py-5 align-top">
                      <p className="text-sm text-slate-300">
                        {enquiry.email}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {enquiry.phone}
                      </p>
                    </td>

                    <td className="px-5 py-5 align-top">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200">
                        {enquiry.service}
                      </span>
                    </td>

                    <td className="max-w-sm px-5 py-5 align-top">
                      <p className="line-clamp-3 text-sm text-slate-400">
                        {enquiry.message}
                      </p>
                    </td>

                    <td className="px-5 py-5 align-top">
                      <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
                        {enquiry.status}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-5 py-5 align-top text-sm text-slate-400">
                      {new Date(enquiry.createdAt).toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}

                {enquiries.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-12 text-center text-slate-500"
                    >
                      No enquiries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-4 md:hidden">
          {enquiries.map((enquiry) => (
            <div
              key={enquiry.id}
              className="rounded-2xl border border-white/10 bg-white/[0.05] p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-semibold text-white">
                    {enquiry.name}
                  </h2>

                  {enquiry.company && (
                    <p className="mt-1 text-sm text-slate-400">
                      {enquiry.company}
                    </p>
                  )}
                </div>

                <span className="shrink-0 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
                  {enquiry.status}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <p className="text-slate-300">
                  📧 {enquiry.email}
                </p>

                <p className="text-slate-400">
                  📱 {enquiry.phone}
                </p>

                <p className="text-slate-300">
                  🛠️ {enquiry.service}
                </p>
              </div>

              <div className="mt-4 border-t border-white/10 pt-4">
                <p className="text-sm leading-6 text-slate-400">
                  {enquiry.message}
                </p>
              </div>

              <p className="mt-4 text-xs text-slate-500">
                {new Date(enquiry.createdAt).toLocaleString("en-IN")}
              </p>
            </div>
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