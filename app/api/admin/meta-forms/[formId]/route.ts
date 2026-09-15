import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

type RouteContext = {
  params: Promise<{
    formId: string;
  }>;
};

// DELETE: Delete an entire Meta Ads form
export async function DELETE(
  _request: NextRequest,
  context: RouteContext,
) {
  try {
    const { formId } = await context.params;

    const form = await prisma.metaAdForm.findUnique({
      where: {
        id: formId,
      },
    });

    if (!form) {
      return NextResponse.json(
        {
          error: "Form not found",
        },
        { status: 404 },
      );
    }

    await prisma.metaAdForm.delete({
      where: {
        id: formId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Form deleted successfully",
    });
  } catch (error) {
    console.error("DELETE META FORM ERROR:", error);

    return NextResponse.json(
      {
        error:
          "Failed to delete form. It may contain related fields or submissions.",
        details:
          error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}