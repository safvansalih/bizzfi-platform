import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(
  request: Request,
  context: RouteContext
) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const body = await request.json();

    const { nextFollowUpAt, followUpNote, action } = body;

    if (action === "complete") {
      const consultation =
        await prisma.consultationRequest.findUnique({
          where: { id },
          select: {
            nextFollowUpAt: true,
            followUpNote: true,
          },
        });

      if (!consultation) {
        return NextResponse.json(
          { error: "Consultation not found" },
          { status: 404 }
        );
      }

      const completedFollowUp =
        await prisma.$transaction(async (tx) => {
          const history = await tx.followUpHistory.create({
            data: {
              consultationId: id,
              followUpAt: consultation.nextFollowUpAt,
              note:
                consultation.followUpNote ||
                "Follow-up completed",
            },
          });

          await tx.consultationRequest.update({
            where: { id },
            data: {
              nextFollowUpAt: null,
              followUpNote: "Follow-up completed",
            },
          });

          return history;
        });

      return NextResponse.json({
        success: true,
        history: completedFollowUp,
      });
    }

    const updatedConsultation =
      await prisma.consultationRequest.update({
        where: { id },
        data: {
  nextFollowUpAt: nextFollowUpAt
    ? new Date(nextFollowUpAt)
    : null,
  followUpNote: followUpNote?.trim() || null,
  reminderSentAt: null,
},
      });

    return NextResponse.json({
      success: true,
      consultation: updatedConsultation,
    });
  } catch (error) {
    console.error("Follow-up update error:", error);

    return NextResponse.json(
      { error: "Failed to update follow-up details" },
      { status: 500 }
    );
  }
}