import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

const allowedStatuses = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "CONVERTED",
  "LOST",
];

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
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
    const status = String(body.status || "").trim();

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    const consultation = await prisma.consultationRequest.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    return NextResponse.json({
      message: "Consultation status updated successfully",
      consultation,
    });
  } catch (error) {
    console.error("Consultation status update error:", error);

    return NextResponse.json(
      { error: "Unable to update consultation status" },
      { status: 500 }
    );
  }
}