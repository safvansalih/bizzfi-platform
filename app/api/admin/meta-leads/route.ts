import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  try {
    const leads = await prisma.metaAdFormSubmission.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        form: {
          select: {
            name: true,
            campaignName: true,
          },
        },
        answers: {
          include: {
            field: {
              select: {
                label: true,
                fieldKey: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(leads);
  } catch (error) {
    console.error("GET META ADS LEADS ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to load Meta Ads leads",
      },
      { status: 500 },
    );
  }
}