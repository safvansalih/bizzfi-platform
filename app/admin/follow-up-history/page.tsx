import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

function formatDateTime(date: Date | null) {
  if (!date) return "Not specified";

  return new Date(date).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function FollowUpHistoryPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const history = await prisma.followUpHistory.findMany({
    include: {
      consultation: {
        select: {
          id: true,
          name: true,
          company: true,
          email: true,
          phone: true,
          topic: true,
        },
      },
    },
    orderBy: {
      completedAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Link
            href="/admin/follow-ups"
            className="text-sm text-slate-400 hover:text-white"
          >
            ← Back to Follow-ups
          </Link>

          <p className="mt-6 text-sm text-slate-400">
            Bizzfi Administration
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Completed Follow-ups
          </h1>

          <p className="mt-2 text-slate-400">
            View all completed customer follow-ups.
          </p>
        </div>

        <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.05] p-5">
          <p className="text-sm text-slate-400">
            Total Completed Follow-ups
          </p>

          <p className="mt-2 text-3xl font-bold">
            {history.length}
          </p>
        </div>

        {history.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-8 text-center">
            <p className="text-slate-400">
              No completed follow-ups yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 bg-white/[0.05] p-5"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {item.consultation.name}
                    </h2>

                    {item.consultation.company && (
                      <p className="mt-1 text-sm text-slate-400">
                        {item.consultation.company}
                      </p>
                    )}

                    <p className="mt-2 text-sm text-slate-300">
                      {item.consultation.topic}
                    </p>
                  </div>

                  <span className="w-fit rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-300">
                    Completed
                  </span>
                </div>

                <div className="mt-5 grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <p className="text-xs text-slate-500">
                      Follow-up Date
                    </p>

                    <p className="mt-1 text-sm text-slate-200">
                      {formatDateTime(item.followUpAt)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Completed On
                    </p>

                    <p className="mt-1 text-sm text-slate-200">
                      {formatDateTime(item.completedAt)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Customer Email
                    </p>

                    <a
                      href={`mailto:${item.consultation.email}`}
                      className="mt-1 block break-all text-sm text-blue-300 hover:text-blue-200"
                    >
                      {item.consultation.email}
                    </a>
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-white/10 bg-black/10 p-4">
                  <p className="text-xs text-slate-500">
                    Follow-up Note
                  </p>

                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-300">
                    {item.note || "No note added."}
                  </p>
                </div>

                <div className="mt-4">
                  <Link
                    href={`/admin/consultations/${item.consultation.id}`}
                    className="inline-flex rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-slate-200"
                  >
                    Open Consultation
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}