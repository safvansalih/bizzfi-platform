import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

type RouteContext = {
  params: Promise<{
    formId: string;
  }>;
};

// GET: Load all fields for a form
export async function GET(
  _request: NextRequest,
  context: RouteContext,
) {
  try {
    const { formId } = await context.params;

    const form = await prisma.metaAdForm.findUnique({
      where: {
        id: formId,
      },
      select: {
        id: true,
        name: true,
        slug: true,
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

    const fields = await prisma.metaAdFormField.findMany({
      where: {
        formId,
      },
      orderBy: {
        sortOrder: "asc",
      },
    });

    return NextResponse.json({
      form,
      fields,
    });
  } catch (error) {
    console.error("GET META FORM FIELDS ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to load fields",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

// POST: Create a new field
export async function POST(
  request: NextRequest,
  context: RouteContext,
) {
  try {
    const { formId } = await context.params;
    const body = await request.json();

    const label = String(body.label || "").trim();
    const fieldKey = String(body.fieldKey || "")
      .trim()
      .toLowerCase();

    const fieldType = String(body.fieldType || "text").trim();
    const required = Boolean(body.required);

    const options =
      Array.isArray(body.options) && body.options.length > 0
        ? body.options
        : null;

    if (!label || !fieldKey) {
      return NextResponse.json(
        {
          error: "Field label and field key are required",
        },
        { status: 400 },
      );
    }

    const validFieldTypes = [
      "text",
      "email",
      "phone",
      "number",
      "textarea",
      "select",
      "date",
    ];

    if (!validFieldTypes.includes(fieldType)) {
      return NextResponse.json(
        {
          error: "Invalid field type",
        },
        { status: 400 },
      );
    }

    if (fieldType === "select" && (!options || options.length === 0)) {
      return NextResponse.json(
        {
          error: "Select fields require at least one option",
        },
        { status: 400 },
      );
    }

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

    const existingField = await prisma.metaAdFormField.findUnique({
      where: {
        formId_fieldKey: {
          formId,
          fieldKey,
        },
      },
    });

    if (existingField) {
      return NextResponse.json(
        {
          error: "This field key already exists",
        },
        { status: 409 },
      );
    }

    const lastField = await prisma.metaAdFormField.findFirst({
      where: {
        formId,
      },
      orderBy: {
        sortOrder: "desc",
      },
    });

    const sortOrder = lastField ? lastField.sortOrder + 1 : 0;

    const field = await prisma.metaAdFormField.create({
      data: {
        formId,
        label,
        fieldKey,
        fieldType,
        required,
        sortOrder,
        options,
      },
    });

    return NextResponse.json(field, { status: 201 });
  } catch (error) {
    console.error("CREATE META FORM FIELD ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to create field",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

// DELETE: Delete a field
export async function DELETE(
  request: NextRequest,
  context: RouteContext,
) {
  try {
    const { formId } = await context.params;
    const fieldId = request.nextUrl.searchParams.get("fieldId");

    if (!fieldId) {
      return NextResponse.json(
        {
          error: "Field ID is required",
        },
        { status: 400 },
      );
    }

    const field = await prisma.metaAdFormField.findFirst({
      where: {
        id: fieldId,
        formId,
      },
    });

    if (!field) {
      return NextResponse.json(
        {
          error: "Field not found",
        },
        { status: 404 },
      );
    }

    await prisma.metaAdFormField.delete({
      where: {
        id: fieldId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Field deleted successfully",
    });
  } catch (error) {
    console.error("DELETE META FORM FIELD ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to delete field",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
  
}