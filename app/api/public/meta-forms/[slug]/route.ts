import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";


const ODOO_API_URL =
  process.env.ODOO_API_URL ||
  "https://erp.bizzfi.com/api/bizzfi/lead";

const ODOO_API_TOKEN = process.env.ODOO_API_TOKEN?.trim() || "";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(
  _request: NextRequest,
  context: RouteContext,
) {
  try {
    const { slug } = await context.params;

    const form = await prisma.metaAdForm.findUnique({
      where: {
        slug,
      },
      include: {
        fields: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
    });

    if (!form || !form.isActive) {
      return NextResponse.json(
        {
          error: "Form not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      id: form.id,
      name: form.name,
      slug: form.slug,
      description: form.description,
      campaignName: form.campaignName,
      fields: form.fields,
    });
  } catch (error) {
    console.error("PUBLIC META FORM GET ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to load form",
      },
      { status: 500 },
    );
  }
}

export async function POST(
  request: NextRequest,
  context: RouteContext,
) {
  try {
    const { slug } = await context.params;

    const body = await request.json();

    const form = await prisma.metaAdForm.findUnique({
      where: {
        slug,
      },
      include: {
        fields: true,
      },
    });

    if (!form || !form.isActive) {
      return NextResponse.json(
        {
          error: "Form not found",
        },
        { status: 404 },
      );
    }

    const submittedData =
      body && typeof body === "object"
        ? (body as Record<string, unknown>)
        : {};

    const fullName =
      typeof submittedData.full_name === "string"
        ? submittedData.full_name.trim()
        : null;

    const email =
      typeof submittedData.email === "string"
        ? submittedData.email.trim()
        : null;

    const phone =
      typeof submittedData.phone === "string"
        ? submittedData.phone.trim()
        : null;

        const phoneField = form.fields.find((field) => {
  const key = field.fieldKey.toLowerCase();
  const label = field.label.toLowerCase();

  return (
    key.includes("phone") ||
    key.includes("mobile") ||
    key.includes("whatsapp") ||
    label.includes("phone") ||
    label.includes("mobile") ||
    label.includes("whatsapp")
  );
});

const phoneValue = phoneField
  ? String(submittedData[phoneField.fieldKey] || "")
  : "";

    // Required fields validation
    for (const field of form.fields) {
      if (!field.required) {
        continue;
      }

      const value = submittedData[field.fieldKey];

      if (
        value === undefined ||
        value === null ||
        String(value).trim() === ""
      ) {
        return NextResponse.json(
          {
            error: `${field.label} is required`,
          },
          { status: 400 },
        );
      }
    }

    // Save submission in PostgreSQL
    const submission = await prisma.metaAdFormSubmission.create({
      data: {
        formId: form.id,
    fullName: fullName || null,
    email: email || null,
    phone: phoneValue || null,
    rawPayload: submittedData as any,
        answers: {
          create: form.fields
            .filter(
              (field) =>
                submittedData[field.fieldKey] !== undefined,
            )
            .map((field) => ({
              fieldId: field.id,
              value: String(
                submittedData[field.fieldKey] ?? "",
              ),
            })),
        },
      },

      include: {
        answers: true,
      },
    });

    /*
     * Send lead to Odoo CRM
     *
     * Odoo integration is secondary.
     * Even if Odoo fails, the PostgreSQL submission
     * will remain successfully saved.
     */
    try {
      const leadName =
        fullName || `${form.name} Enquiry`;

      const submittedFieldsText = Object.entries(
        submittedData,
      )
        .map(([key, value]) => `${key}: ${String(value ?? "")}`)
        .join("\n");

      const odooMessage = [
        "Lead Source: Meta Ads",
        `Form Name: ${form.name}`,
        `Campaign: ${form.campaignName || "N/A"}`,
        `Form Slug: ${form.slug}`,
        "",
        "Submitted Details:",
        submittedFieldsText,
      ].join("\n");

      const odooResponse = await fetch(ODOO_API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          ...(ODOO_API_TOKEN
            ? {
                Authorization: `Bearer ${ODOO_API_TOKEN}`,
              }
            : {}),
        },

        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "call",
          params: {
            name: leadName,
            company: "",
            email: email || "",
            phone: phone || "",
            service: `Meta Ads - ${form.name}`,
            message: odooMessage,
          },
          id: 1,
        }),

        signal: AbortSignal.timeout(15000),
      });

      const responseText = await odooResponse.text();

      let odooData: any = null;

      try {
        odooData = responseText
          ? JSON.parse(responseText)
          : null;
      } catch {
        console.error(
          "ODOO INVALID JSON RESPONSE:",
          responseText,
        );
      }

      if (
        !odooResponse.ok ||
        odooData?.error ||
        !odooData?.result?.success
      ) {
        console.error("ODOO LEAD CREATION FAILED:", {
          status: odooResponse.status,
          response: odooData || responseText,
        });
      } else {
        console.log("ODOO LEAD CREATED SUCCESSFULLY:", {
          leadId: odooData.result.lead_id,
          submissionId: submission.id,
        });
      }
    } catch (odooError) {
      console.error(
        "ODOO META LEAD INTEGRATION ERROR:",
        odooError,
      );
    }

    return NextResponse.json(
      {
        success: true,
        submissionId: submission.id,
        message:
          "Your enquiry has been submitted successfully.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(
      "PUBLIC META FORM SUBMISSION ERROR:",
      error,
    );

    return NextResponse.json(
      {
        error: "Failed to submit form",
      },
      { status: 500 },
    );
  }
}