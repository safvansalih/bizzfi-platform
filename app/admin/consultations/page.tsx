import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

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

          <p className="text-sm text-slate-400">
            Bizzfi Administration
          </p>

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
            <table className="w-full min-w-[1100px] text-left">
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
                    <td className="px-5 py-5 align-top">
                      <p className="font-semibold text-white">
                        {consultation.name}
                      </p>

                      {consultation.company && (
                        <p className="mt-1 text-sm text-slate-400">
                          {consultation.company}
                        </p>
                      )}
                    </td>

                    <td className="px-5 py-5 align-top">
                      <p className="text-sm text-slate-300">
                        {consultation.email}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {consultation.phone}
                      </p>
                    </td>

                    <td className="px-5 py-5 align-top">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-200">
                        {consultation.topic}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-5 py-5 align-top text-sm text-slate-300">
                      {new Date(
                        consultation.preferredDate
                      ).toLocaleDateString("en-IN")}
                    </td>

                    <td className="whitespace-nowrap px-5 py-5 align-top text-sm text-slate-400">
                      {consultation.preferredTime}
                    </td>

                    <td className="px-5 py-5 align-top">
                      <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
                        {consultation.status}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-5 py-5 align-top text-sm text-slate-400">
                      {new Date(
                        consultation.createdAt
                      ).toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}

                {consultations.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
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
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-semibold text-white">
                    {consultation.name}
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

              <div className="mt-4 space-y-2 text-sm">
                <p className="text-slate-300">
                  📧 {consultation.email}
                </p>

                <p className="text-slate-400">
                  📱 {consultation.phone}
                </p>

                <p className="text-slate-300">
                  💬 {consultation.topic}
                </p>

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

              <div className="mt-4 border-t border-white/10 pt-4">
                <p className="text-sm leading-6 text-slate-400">
                  {consultation.message}
                </p>
              </div>

              <p className="mt-4 text-xs text-slate-500">
                Submitted{" "}
                {new Date(
                  consultation.createdAt
                ).toLocaleString("en-IN")}
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