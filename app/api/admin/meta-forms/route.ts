import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  try {
    const forms = await prisma.metaAdForm.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: {
            fields: true,
            submissions: true,
          },
        },
      },
    });

    return NextResponse.json(forms);
  } catch (error) {
    console.error("GET META FORMS ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to load forms",
        details:
          error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();

    const slug = String(body.slug || "")
      .trim()
      .toLowerCase();

    const description = body.description
      ? String(body.description).trim()
      : null;

    const campaignName = body.campaignName
      ? String(body.campaignName).trim()
      : null;

    if (!name || !slug) {
      return NextResponse.json(
        {
          error: "Form name and slug are required",
        },
        { status: 400 }
      );
    }

    const existingForm = await prisma.metaAdForm.findUnique({
      where: {
        slug,
      },
    });

    if (existingForm) {
      return NextResponse.json(
        {
          error: "This slug already exists",
        },
        { status: 409 }
      );
    }

    const form = await prisma.metaAdForm.create({
      data: {
        name,
        slug,
        description,
        campaignName,
      },
    });

    return NextResponse.json(form, { status: 201 });
  } catch (error) {
    console.error("CREATE META FORM ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to create form",
        details:
          error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}