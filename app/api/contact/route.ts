import { prisma } from "@/lib/db/prisma";
import { apiJsonResponse } from "@/lib/security/api-response";
import { sendEmail } from "@/lib/email/send-email";
import {
  getClientIp,
  rateLimit,
} from "@/lib/security/rate-limit";

const MAX_BODY_SIZE = 20_000;

const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

const allowedServices = [
  "Website Development",
  "Mobile App Development",
  "E-commerce Development",
  "Digital Marketing",
  "Cloud Solutions",
  "ERP & CRM Solutions",
  "Networking & Infrastructure",
  "Server Management",
  "Cyber Security",
  "AI & Automation",
  "Business Automation",
  "CCTV & Security Solutions",
  "Other",
];

/**
 * Escape user-provided values before inserting them
 * into the HTML email template.
 */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    /**
     * Rate limiting.
     *
     * Allow a maximum of 5 contact form submissions
     * from the same IP address within 10 minutes.
     */
    const clientIp = getClientIp(request);

    const rateLimitResult = rateLimit(
      `contact:${clientIp}`,
      {
        limit: RATE_LIMIT,
        windowMs: RATE_LIMIT_WINDOW_MS,
      }
    );

    if (!rateLimitResult.success) {
      const retryAfter = Math.max(
        1,
        Math.ceil(
          (rateLimitResult.resetTime - Date.now()) /
            1000
        )
      );

      return apiJsonResponse(
        {
          success: false,
          message:
            "Too many requests. Please wait a few minutes before trying again.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(retryAfter),
          },
        }
      );
    }

    /**
     * Content-Type validation.
     *
     * This API only accepts JSON requests.
     */
    const contentType =
      request.headers.get("content-type");

    if (
      !contentType
        ?.toLowerCase()
        .startsWith("application/json")
    ) {
      return apiJsonResponse(
        {
          success: false,
          message:
            "Unsupported content type.",
        },
        {
          status: 415,
        }
      );
    }

    /**
     * Request body size protection.
     */
    const contentLength =
      request.headers.get("content-length");

    if (contentLength) {
      const parsedContentLength =
        Number(contentLength);

      if (
        Number.isFinite(parsedContentLength) &&
        parsedContentLength > MAX_BODY_SIZE
      ) {
        return apiJsonResponse(
          {
            success: false,
            message:
              "Request payload is too large.",
          },
          {
            status: 413,
          }
        );
      }
    }

    /**
     * Safe JSON parsing.
     */
    let body: Record<string, unknown>;

    try {
      body = await request.json();
    } catch {
      return apiJsonResponse(
        {
          success: false,
          message:
            "Invalid JSON request body.",
        },
        {
          status: 400,
        }
      );
    }

    // Extract and normalize form values
    const name = String(
      body.name ?? ""
    ).trim();

    const company = String(
      body.company ?? ""
    ).trim();

    const email = String(
      body.email ?? ""
    )
      .trim()
      .toLowerCase();

    const phone = String(
      body.phone ?? ""
    ).trim();

    const service = String(
      body.service ?? ""
    ).trim();

    const message = String(
      body.message ?? ""
    ).trim();

    // Honeypot field
    const website = String(
      body.website ?? ""
    ).trim();

    /**
     * Honeypot spam protection.
     */
    if (website) {
      if (
        process.env.NODE_ENV === "development"
      ) {
        console.log(
          "Contact form honeypot triggered."
        );
      }

      return apiJsonResponse(
        {
          success: true,
          message: "Request received.",
        },
        {
          status: 200,
        }
      );
    }

    // Required fields
    if (
      !name ||
      !email ||
      !phone ||
      !service ||
      !message
    ) {
      return apiJsonResponse(
        {
          success: false,
          message:
            "Please complete all required fields.",
        },
        {
          status: 400,
        }
      );
    }

    // Email validation
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return apiJsonResponse(
        {
          success: false,
          message:
            "Please enter a valid email address.",
        },
        {
          status: 400,
        }
      );
    }

    // Phone validation
    const phoneRegex =
      /^\+?[0-9\s\-()]{7,20}$/;

    if (!phoneRegex.test(phone)) {
      return apiJsonResponse(
        {
          success: false,
          message:
            "Please enter a valid phone number.",
        },
        {
          status: 400,
        }
      );
    }

    // Service validation
    if (!allowedServices.includes(service)) {
      return apiJsonResponse(
        {
          success: false,
          message:
            "Please select a valid service.",
        },
        {
          status: 400,
        }
      );
    }

    // Field length protection
    if (
      name.length > 100 ||
      company.length > 150 ||
      email.length > 254 ||
      phone.length > 20 ||
      message.length > 5000
    ) {
      return apiJsonResponse(
        {
          success: false,
          message:
            "One or more fields exceed the allowed length.",
        },
        {
          status: 400,
        }
      );
    }

    // Create enquiry object
    const enquiry = {
      name,
      company,
      email,
      phone,
      service,
      message,
      createdAt:
        new Date().toISOString(),
    };

    /**
     * Development-only server log.
     *
     * Avoid logging customer personal information.
     */
    if (
      process.env.NODE_ENV === "development"
    ) {
      console.log(
        "New contact enquiry received:",
        {
          service: enquiry.service,
          createdAt: enquiry.createdAt,
        }
      );
    }

    /**
     * Save enquiry to PostgreSQL.
     *
     * Database persistence is the primary operation.
     * If this fails, the outer catch returns a 500 response.
     */
    const savedEnquiry =
      await prisma.contactEnquiry.create({
        data: {
          name,
          company: company || null,
          email,
          phone,
          service,
          message,
        },
      });

    if (
      process.env.NODE_ENV === "development"
    ) {
      console.log(
        "Contact enquiry saved to database:",
        {
          id: savedEnquiry.id,
          service: savedEnquiry.service,
          createdAt:
            savedEnquiry.createdAt,
        }
      );
    }

    /**
     * Send notification email.
     *
     * Email is a secondary operation.
     * If email delivery fails, the enquiry remains
     * safely stored in PostgreSQL and the user still
     * receives a successful response.
     */
    try {
  // 1. Bizzfi internal notification email
  await sendEmail({
    subject: `New Contact Enquiry: ${service}`,
    replyTo: email,
    html: `
      <div
        style="
          max-width: 640px;
          margin: 0 auto;
          padding: 24px;
          font-family: Arial, Helvetica, sans-serif;
          line-height: 1.6;
          color: #18181b;
        "
      >
        <div
          style="
            padding-bottom: 20px;
            border-bottom: 1px solid #e4e4e7;
          "
        >
          <h1
            style="
              margin: 0;
              font-size: 24px;
              color: #18181b;
            "
          >
            New Contact Enquiry
          </h1>

          <p
            style="
              margin: 8px 0 0;
              color: #71717a;
            "
          >
            A new enquiry has been submitted
            through the Bizzfi website.
          </p>
        </div>

        <div style="padding: 24px 0;">
          <p>
            <strong>Name:</strong>
            ${escapeHtml(name)}
          </p>

          <p>
            <strong>Company:</strong>
            ${escapeHtml(company || "Not provided")}
          </p>

          <p>
            <strong>Email:</strong>
            ${escapeHtml(email)}
          </p>

          <p>
            <strong>Phone:</strong>
            ${escapeHtml(phone)}
          </p>

          <p>
            <strong>Service:</strong>
            ${escapeHtml(service)}
          </p>

          <div style="margin-top: 24px;">
            <p style="margin-bottom: 8px;">
              <strong>Message:</strong>
            </p>

            <div
              style="
                padding: 16px;
                border-radius: 8px;
                background-color: #f4f4f5;
                color: #27272a;
              "
            >
              ${escapeHtml(message).replace(/\n/g, "<br />")}
            </div>
          </div>
        </div>

        <div
          style="
            padding-top: 16px;
            border-top: 1px solid #e4e4e7;
          "
        >
          <p
            style="
              margin: 0;
              font-size: 12px;
              color: #71717a;
            "
          >
            Submitted:
            ${escapeHtml(enquiry.createdAt)}
          </p>

          <p
            style="
              margin: 8px 0 0;
              font-size: 12px;
              color: #71717a;
            "
          >
            This notification was generated
            automatically by the Bizzfi website.
          </p>
        </div>
      </div>
    `,
  });

  // 2. Customer confirmation email
  await sendEmail({
    to: email,
    subject: "Thank you for contacting Bizzfi",
    html: `
      <div
        style="
          max-width: 640px;
          margin: 0 auto;
          padding: 24px;
          font-family: Arial, Helvetica, sans-serif;
          line-height: 1.6;
          color: #18181b;
        "
      >
        <div
          style="
            padding-bottom: 20px;
            border-bottom: 1px solid #e4e4e7;
          "
        >
          <h1
            style="
              margin: 0;
              font-size: 24px;
              color: #18181b;
            "
          >
            Thank You for Contacting Bizzfi
          </h1>

          <p
            style="
              margin: 8px 0 0;
              color: #71717a;
            "
          >
            Hi ${escapeHtml(name)},
          </p>
        </div>

        <div style="padding: 24px 0;">
          <p>
            Thank you for reaching out to Bizzfi.
            We have successfully received your enquiry.
          </p>

          <p>
            Our team will review your requirement and
            get back to you as soon as possible.
          </p>

          <div
            style="
              margin-top: 24px;
              padding: 16px;
              border-radius: 8px;
              background-color: #f4f4f5;
              color: #27272a;
            "
          >
            <p style="margin: 0;">
              <strong>Selected Service:</strong>
              ${escapeHtml(service)}
            </p>
          </div>

          <p style="margin-top: 24px;">
            If you need to provide any additional details,
            you can reply to this email.
          </p>

          <p>
            Regards,<br />
            <strong>Bizzfi Team</strong>
          </p>
        </div>

        <div
          style="
            padding-top: 16px;
            border-top: 1px solid #e4e4e7;
          "
        >
          <p
            style="
              margin: 0;
              font-size: 12px;
              color: #71717a;
            "
          >
            This is an automated confirmation email from Bizzfi.
          </p>
        </div>
      </div>
    `,
  });
} catch (emailError) {
  /**
   * The enquiry is already saved in PostgreSQL.
   * Email failure must not fail the form submission.
   */
  console.error(
    "Contact enquiry saved, but one or more emails failed:",
    emailError
  );
}
 try {
      const odooApiUrl = process.env.ODOO_API_URL?.trim();
      const odooApiToken = process.env.ODOO_API_TOKEN?.trim();

      if (!odooApiUrl) {
        console.error("ODOO_API_URL is not configured.");
      } else {
        const odooResponse = await fetch(odooApiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(odooApiToken
              ? {
                  Authorization: `Bearer ${odooApiToken}`,
                }
              : {}),
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "call",
            params: {
              name,
              company,
              email,
              phone,
              service,
              message,
            },
            id: 1,
          }),
          cache: "no-store",
        });

        const odooData = await odooResponse.json();

        if (!odooResponse.ok || !odooData?.result?.success) {
          console.error("Odoo lead creation failed:", {
            status: odooResponse.status,
            response: odooData,
          });
        } else if (process.env.NODE_ENV === "development") {
          console.log("Bizzfi lead successfully created in Odoo:", {
            leadId: odooData.result.lead_id,
            service,
          });
        }
      }
    } catch (odooError) {
      console.error(
        "Contact enquiry saved, but Odoo lead creation failed:",
        odooError
      );
    }
    /**
     * Successful API response.
     *
     * Database save determines submission success.
     */
    return apiJsonResponse(
      {
        success: true,
        message:
          "Your enquiry has been received successfully.",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    /**
     * Database or other critical API failure.
     */
    console.error(
      "Contact API error:",
      error
    );

    return apiJsonResponse(
      {
        success: false,
        message:
          "We could not process your enquiry. Please try again later.",
      },
      {
        status: 500,
      }
    );
  }
}