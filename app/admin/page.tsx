import { auth, signOut } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import SendRemindersButton from "@/components/admin/send-reminders-button";

export default async function AdminDashboard() {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const now = new Date();

  const [
    totalEnquiries,
    newEnquiries,
    totalConsultations,
    newConsultations,
    totalBlogPosts,
    publishedBlogPosts,
    draftBlogPosts,
    dueFollowUps,
    upcomingFollowUps,
    completedFollowUps,
    recentEnquiries,
    recentConsultations,
    recentBlogPosts,
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

    prisma.blogPost.count(),

    prisma.blogPost.count({
      where: {
        status: "PUBLISHED",
      },
    }),

    prisma.blogPost.count({
      where: {
        status: "DRAFT",
      },
    }),

    prisma.consultationRequest.count({
      where: {
        nextFollowUpAt: {
          lte: now,
        },
      },
    }),

    prisma.consultationRequest.count({
      where: {
        nextFollowUpAt: {
          gt: now,
        },
      },
    }),

    prisma.followUpHistory.count(),

    prisma.contactEnquiry.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        name: true,
        email: true,
        service: true,
        status: true,
        createdAt: true,
      },
    }),

    prisma.consultationRequest.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        createdAt: true,
      },
    }),

    prisma.blogPost.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        title: true,
        status: true,
        createdAt: true,
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
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <Link
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
          </Link>

          <Link
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
          </Link>

          <Link
            href="/admin/blog"
            className="group rounded-2xl border border-white/10 bg-white/[0.05] p-6 transition hover:border-white/20 hover:bg-white/[0.08]"
          >
            <div className="flex items-start justify-between">
              <p className="text-sm text-slate-400">
                Blog Posts
              </p>

              <span className="text-slate-500 transition group-hover:text-white">
                →
              </span>
            </div>

            <p className="mt-3 text-3xl font-bold">
              {totalBlogPosts}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              {publishedBlogPosts} published · {draftBlogPosts} drafts
            </p>

            <p className="mt-5 text-sm font-medium text-slate-300">
              Manage blog posts
            </p>
          </Link>

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

        {/* Follow-up Summary */}
        <section className="mt-10">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                Follow-up Summary
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Track pending and completed customer follow-ups.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/admin/follow-ups"
                className="rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
              >
                Manage Follow-ups
              </Link>

              <Link
                href="/admin/follow-up-history"
                className="rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
              >
                View History
              </Link>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <Link
              href="/admin/follow-ups"
              className="rounded-2xl border border-red-400/20 bg-red-500/10 p-6 transition hover:bg-red-500/15"
            >
              <p className="text-sm text-red-200">
                Due Follow-ups
              </p>

              <p className="mt-3 text-3xl font-bold text-red-100">
                {dueFollowUps}
              </p>

              <p className="mt-2 text-sm text-red-200/70">
                Need attention
              </p>
            </Link>

            <Link
              href="/admin/follow-ups"
              className="rounded-2xl border border-blue-400/20 bg-blue-500/10 p-6 transition hover:bg-blue-500/15"
            >
              <p className="text-sm text-blue-200">
                Upcoming Follow-ups
              </p>

              <p className="mt-3 text-3xl font-bold text-blue-100">
                {upcomingFollowUps}
              </p>

              <p className="mt-2 text-sm text-blue-200/70">
                Scheduled for later
              </p>
            </Link>

            <Link
              href="/admin/follow-up-history"
              className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-6 transition hover:bg-emerald-500/15"
            >
              <p className="text-sm text-emerald-200">
                Completed Follow-ups
              </p>

              <p className="mt-3 text-3xl font-bold text-emerald-100">
                {completedFollowUps}
              </p>

              <p className="mt-2 text-sm text-emerald-200/70">
                Total completed
              </p>
            </Link>
          </div>
        </section>

        {/* Quick Actions */}
<section className="mt-10">
  <h2 className="mb-4 text-lg font-semibold">
    Quick Actions
  </h2>

  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
    <Link
      href="/admin/blog/new"
      className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
    >
      + Create Blog Post
    </Link>

    <Link
      href="/admin/enquiries"
      className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
    >
      Manage Contact Enquiries
    </Link>

    <Link
      href="/admin/consultations"
      className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
    >
      Manage Consultations
    </Link>

    <Link
      href="/admin/follow-ups"
      className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
    >
      Follow-up Management
    </Link>

    <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-5 py-4">
      <p className="text-sm font-semibold text-emerald-200">
        Follow-up Reminders
      </p>

      <p className="mt-1 text-xs leading-5 text-emerald-200/70">
        Send pending customer reminder emails.
      </p>

      <div className="mt-3">
        <SendRemindersButton />
      </div>
    </div>

    <a
      href="https://erp.bizzfi.com"
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
    >
      Open Odoo CRM ↗
    </a>
  </div>
</section>

        {/* Recent Activity */}
        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          {/* Recent Enquiries */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Recent Enquiries
              </h2>

              <Link
                href="/admin/enquiries"
                className="text-sm text-slate-400 hover:text-white"
              >
                View all
              </Link>
            </div>

            <div className="space-y-4">
              {recentEnquiries.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No enquiries yet.
                </p>
              ) : (
                recentEnquiries.map((enquiry) => (
                  <div
                    key={enquiry.id}
                    className="border-b border-white/10 pb-3 last:border-0"
                  >
                    <p className="font-medium text-slate-200">
                      {enquiry.name}
                    </p>

                    <p className="truncate text-sm text-slate-400">
                      {enquiry.service || enquiry.email}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {new Date(
                        enquiry.createdAt
                      ).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Consultations */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Recent Consultations
              </h2>

              <Link
                href="/admin/consultations"
                className="text-sm text-slate-400 hover:text-white"
              >
                View all
              </Link>
            </div>

            <div className="space-y-4">
              {recentConsultations.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No consultations yet.
                </p>
              ) : (
                recentConsultations.map((consultation) => (
                  <div
                    key={consultation.id}
                    className="border-b border-white/10 pb-3 last:border-0"
                  >
                    <p className="font-medium text-slate-200">
                      {consultation.name}
                    </p>

                    <p className="truncate text-sm text-slate-400">
                      {consultation.email}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {new Date(
                        consultation.createdAt
                      ).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Blog Posts */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Recent Blog Posts
              </h2>

              <Link
                href="/admin/blog"
                className="text-sm text-slate-400 hover:text-white"
              >
                View all
              </Link>
            </div>

            <div className="space-y-4">
              {recentBlogPosts.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No blog posts yet.
                </p>
              ) : (
                recentBlogPosts.map((post) => (
                  <div
                    key={post.id}
                    className="border-b border-white/10 pb-3 last:border-0"
                  >
                    <p className="font-medium text-slate-200">
                      {post.title}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {post.status} ·{" "}
                      {new Date(
                        post.createdAt
                      ).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}