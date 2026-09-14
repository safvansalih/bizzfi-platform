import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { sendFollowUpReminder } from "@/lib/emails/follow-up-reminder";
import { NextResponse } from "next/server";

function isValidCronRequest(request: Request) {
  const cronSecret = process.env.CRON_SECRET?.trim();
  const authorization = request.headers.get("authorization");

  if (!cronSecret || !authorization) {
    return false;
  }

  return authorization === `Bearer ${cronSecret}`;
}

async function isAuthorized(request: Request) {
  if (isValidCronRequest(request)) {
    return true;
  }

  const session = await auth();

  return Boolean(
    session?.user && session.user.role === "ADMIN"
  );
}

export async function POST(request: Request) {
  try {
    const authorized = await isAuthorized(request);

    if (!authorized) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const now = new Date();

    const dueFollowUps =
      await prisma.consultationRequest.findMany({
        where: {
          nextFollowUpAt: {
            lte: now,
          },
          reminderSentAt: null,
        },
        orderBy: {
          nextFollowUpAt: "asc",
        },
      });

    let sent = 0;
    let failed = 0;
    let skipped = 0;

    for (const consultation of dueFollowUps) {
      if (
        !consultation.email ||
        !consultation.nextFollowUpAt
      ) {
        skipped++;
        continue;
      }

      try {
        await sendFollowUpReminder({
          name: consultation.name,
          company: consultation.company,
          email: consultation.email,
          topic: consultation.topic,
          followUpAt: consultation.nextFollowUpAt,
          note: consultation.followUpNote,
        });

        await prisma.consultationRequest.update({
          where: {
            id: consultation.id,
          },
          data: {
            reminderSentAt: new Date(),
          },
        });

        sent++;
      } catch (error) {
        console.error(
          `Failed to send reminder for consultation ${consultation.id}:`,
          error
        );

        failed++;
      }
    }

    return NextResponse.json({
      success: true,
      totalDue: dueFollowUps.length,
      sent,
      failed,
      skipped,
    });
  } catch (error) {
    console.error(
      "Follow-up reminder error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to send follow-up reminders",
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  return POST(request);
}