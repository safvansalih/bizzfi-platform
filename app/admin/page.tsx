import { auth, signOut } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const [
    totalEnquiries,
    newEnquiries,
    totalConsultations,
    newConsultations,
  ] = await Promise.all([
    prisma.contactEnquiry.count(),
    prisma.contactEnquiry.count({
      where: {
        status: "NEW",
      },
    }),
    prisma.consultationRequest.count(),
    prisma.consultationRequest.count({
      where: {
        status: "NEW",
      },
    }),
  ]);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-slate-400">
              Bizzfi Administration
            </p>

            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              Admin Dashboard
            </h1>

            <p className="mt-3 text-slate-400">
              Welcome back, {session.user.name || "Admin"}.
            </p>
          </div>

          {/* Logout */}
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button
              type="submit"
              className="rounded-lg border border-white/10 bg-white/[0.05] px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              Logout
            </button>
          </form>
        </div>

        {/* Statistics */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Contact Enquiries */}
          <a
            href="/admin/enquiries"
            className="group rounded-2xl border border-white/10 bg-white/[0.05] p-6 transition hover:border-white/20 hover:bg-white/[0.08]"
          >
            <div className="flex items-start justify-between">
              <p className="text-sm text-slate-400">
                Contact Enquiries
              </p>

              <span className="text-slate-500 transition group-hover:text-white">
                →
              </span>
            </div>

            <p className="mt-3 text-3xl font-bold">
              {totalEnquiries}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              {newEnquiries} new
            </p>

            <p className="mt-5 text-sm font-medium text-slate-300">
              View enquiries
            </p>
          </a>

          {/* Consultations */}
          <a
            href="/admin/consultations"
            className="group rounded-2xl border border-white/10 bg-white/[0.05] p-6 transition hover:border-white/20 hover:bg-white/[0.08]"
          >
            <div className="flex items-start justify-between">
              <p className="text-sm text-slate-400">
                Consultation Requests
              </p>

              <span className="text-slate-500 transition group-hover:text-white">
                →
              </span>
            </div>

            <p className="mt-3 text-3xl font-bold">
              {totalConsultations}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              {newConsultations} new
            </p>

            <p className="mt-5 text-sm font-medium text-slate-300">
              View consultations
            </p>
          </a>

          {/* Odoo CRM */}
          <a
            href="https://erp.bizzfi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-white/10 bg-white/[0.05] p-6 transition hover:border-white/20 hover:bg-white/[0.08]"
          >
            <div className="flex items-start justify-between">
              <p className="text-sm text-slate-400">
                Odoo CRM
              </p>

              <span className="text-slate-500 transition group-hover:text-white">
                ↗
              </span>
            </div>

            <p className="mt-3 text-3xl font-bold">
              CRM
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Lead & customer management
            </p>

            <p className="mt-5 text-sm font-medium text-slate-300">
              Open Odoo CRM
            </p>
          </a>
        </div>

        {/* Quick Actions */}
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-semibold">
            Quick Access
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href="/admin/enquiries"
              className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
            >
              📩 Manage Contact Enquiries
            </a>

            <a
              href="/admin/consultations"
              className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
            >
              📅 Manage Consultation Requests
            </a>

            <a
              href="https://erp.bizzfi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
            >
              🧩 Open Odoo CRM ↗
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}