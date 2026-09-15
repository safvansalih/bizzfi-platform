import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

const ODOO_API_URL =
  process.env.ODOO_API_URL ||
  "https://erp.bizzfi.com/api/bizzfi/lead";

const ODOO_API_TOKEN = process.env.ODOO_API_TOKEN?.trim() || "";

/**
 * GET
 * Fetch active Meta Ads form by slug
 */
export async function GET(
  _request: NextRequest,
  context: {
    params: Promise<{ slug: string }>;
  }
) {
  try {
    const { slug } = await context.params;

    const form = await prisma.metaAdForm.findFirst({
      where: {
        slug,
        isActive: true,
      },
      include: {
        fields: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
    });

    if (!form) {
      return NextResponse.json(
        {
          success: false,
          message: "Form not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      form,
    });
  } catch (error) {
    console.error("Meta form GET error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load form",
      },
      { status: 500 }
    );
  }
}

/**
 * POST
 * Submit Meta Ads form
 */
export async function POST(
  request: NextRequest,
  context: {
    params: Promise<{ slug: string }>;
  }
) {
  try {
    const { slug } = await context.params;

    const form = await prisma.metaAdForm.findFirst({
      where: {
        slug,
        isActive: true,
      },
      include: {
        fields: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
    });

    if (!form) {
      return NextResponse.json(
        {
          success: false,
          message: "Form not found",
        },
        { status: 404 }
      );
    }

    const body = await request.json();

    const submittedData =
      body && typeof body === "object" ? body : {};

    /**
     * Basic field extraction
     */
    const fullName =
      typeof submittedData.full_name === "string"
        ? submittedData.full_name.trim()
        : typeof submittedData.name === "string"
          ? submittedData.name.trim()
          : "";

    const email =
      typeof submittedData.email === "string"
        ? submittedData.email.trim()
        : "";

    /**
     * Find phone/mobile/WhatsApp field dynamically.
     *
     * This supports field keys such as:
     * - phone
     * - mobile
     * - mobile_number
     * - whatsapp_number
     *
     * It also checks the field label.
     */
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
      ? String(submittedData[phoneField.fieldKey] ?? "").trim()
      : typeof submittedData.phone === "string"
        ? submittedData.phone.trim()
        : typeof submittedData.mobile === "string"
          ? submittedData.mobile.trim()
          : typeof submittedData.mobile_number === "string"
            ? submittedData.mobile_number.trim()
            : "";

    /**
     * Validate required fields
     */
    const missingFields = form.fields
      .filter((field) => field.required)
      .filter((field) => {
        const value = submittedData[field.fieldKey];

        return (
          value === undefined ||
          value === null ||
          String(value).trim() === ""
        );
      })
      .map((field) => field.label);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all required fields",
          missingFields,
        },
        { status: 400 }
      );
    }

    /**
     * Create submission in database
     */
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
                submittedData[field.fieldKey] !== undefined
            )
            .map((field) => ({
              fieldId: field.id,
              value: String(
                submittedData[field.fieldKey] ?? ""
              ),
            })),
        },
      },
    });

    /**
     * Build Odoo internal note/message
     */
    const submittedDetails = form.fields
      .filter(
        (field) =>
          submittedData[field.fieldKey] !== undefined
      )
      .map((field) => {
        const value = String(
          submittedData[field.fieldKey] ?? ""
        );

        return `${field.label}: ${value}`;
      })
      .join("\n");

    const odooMessage = [
      `Lead Source: Meta Ads`,
      `Form Name: ${form.name}`,
      `Campaign: ${form.campaignName || ""}`,
      `Form Slug: ${form.slug}`,
      "",
      "Submitted Details:",
      submittedDetails,
    ].join("\n");

    /**
     * Odoo CRM lead name
     */
    const leadName = fullName
      ? `Website Enquiry - ${fullName}`
      : `Meta Ads Enquiry - ${form.name}`;

    /**
     * Send lead to Odoo CRM
     */
    let odooSuccess = false;
    let odooResponseData: unknown = null;

    try {
      const odooHeaders: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (ODOO_API_TOKEN) {
        odooHeaders.Authorization = `Bearer ${ODOO_API_TOKEN}`;
      }

      const odooResponse = await fetch(ODOO_API_URL, {
        method: "POST",
        headers: odooHeaders,
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "call",
          params: {
            name: leadName,
            contact_name: fullName || "",
            company: "",
            email: email || "",

            // Send phone number to both fields
            phone: phoneValue || "",
            mobile: phoneValue || "",

            service: `Meta Ads - ${form.name}`,
            message: odooMessage,
          },
          id: 1,
        }),
        signal: AbortSignal.timeout(15000),
      });

      odooResponseData = await odooResponse.json();

      if (odooResponse.ok) {
        const responseObject = odooResponseData as {
          result?: {
            success?: boolean;
            error?: string;
          };
          error?: unknown;
        };

        if (
          responseObject.result?.success === true ||
          !responseObject.error
        ) {
          odooSuccess = true;
        }
      }

      if (!odooSuccess) {
        console.error(
          "Odoo lead creation failed:",
          odooResponseData
        );
      }
    } catch (odooError) {
      console.error(
        "Odoo API request error:",
        odooError
      );
    }

    /**
     * Return success even if Odoo fails.
     *
     * The submission is already safely stored in the website database.
     */
    return NextResponse.json(
      {
        success: true,
        message: "Form submitted successfully",
        submissionId: submission.id,
        odooSuccess,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Meta form POST error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while submitting the form",
      },
      { status: 500 }
    );
  }
}