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

const allowedTopics = [
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
  "General IT Consultation",
  "Other",
];

const allowedTimes = [
  "Morning",
  "Afternoon",
  "Evening",
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
     * Allow a maximum of 5 consultation requests
     * from the same IP address within 10 minutes.
     */
    const clientIp = getClientIp(request);

    const rateLimitResult = rateLimit(
      `consultation:${clientIp}`,
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
            "Too many consultation requests. Please wait a few minutes before trying again.",
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
          message: "Unsupported content type.",
        },
        {
          status: 415,
        }
      );
    }

    /**
     * Request body size protection.
     *
     * Consultation form requests should be small.
     * Reject requests larger than 20 KB before parsing.
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
     *
     * Invalid or malformed JSON receives
     * a 400 response instead of a generic 500 error.
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

    const topic = String(
      body.topic ?? ""
    ).trim();

    const preferredDate = String(
      body.preferredDate ?? ""
    ).trim();

    const preferredTime = String(
      body.preferredTime ?? ""
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
     *
     * Real users should never fill this field.
     * If a bot fills it, return a fake success response
     * without validation, database save, or email.
     */
    if (website) {
      if (
        process.env.NODE_ENV === "development"
      ) {
        console.log(
          "Consultation form honeypot triggered."
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
      !topic ||
      !preferredDate ||
      !preferredTime ||
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

    // Topic validation
    if (!allowedTopics.includes(topic)) {
      return apiJsonResponse(
        {
          success: false,
          message:
            "Please select a valid consultation topic.",
        },
        {
          status: 400,
        }
      );
    }

    // Preferred time validation
    if (!allowedTimes.includes(preferredTime)) {
      return apiJsonResponse(
        {
          success: false,
          message:
            "Please select a valid preferred time.",
        },
        {
          status: 400,
        }
      );
    }

    // Date format validation
    const dateRegex =
      /^\d{4}-\d{2}-\d{2}$/;

    if (!dateRegex.test(preferredDate)) {
      return apiJsonResponse(
        {
          success: false,
          message:
            "Please select a valid preferred date.",
        },
        {
          status: 400,
        }
      );
    }

    /**
     * Parse date components.
     *
     * The form sends a calendar-only value:
     * YYYY-MM-DD
     */
    const [year, month, day] =
      preferredDate
        .split("-")
        .map(Number);

    /**
     * Create local date for validation.
     *
     * This is used only to compare the selected
     * calendar date against today's local date.
     */
    const requestedDate = new Date(
      year,
      month - 1,
      day
    );

    /**
     * Verify that the parsed date is a real
     * calendar date.
     *
     * For example, reject values such as
     * 2026-02-31.
     */
    const isValidCalendarDate =
      !Number.isNaN(requestedDate.getTime()) &&
      requestedDate.getFullYear() === year &&
      requestedDate.getMonth() === month - 1 &&
      requestedDate.getDate() === day;

    if (!isValidCalendarDate) {
      return apiJsonResponse(
        {
          success: false,
          message:
            "Please select a valid preferred date.",
        },
        {
          status: 400,
        }
      );
    }

    /**
     * Prevent past dates.
     */
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (requestedDate < today) {
      return apiJsonResponse(
        {
          success: false,
          message:
            "Preferred date cannot be in the past.",
        },
        {
          status: 400,
        }
      );
    }

    /**
     * Create a UTC-safe date for PostgreSQL.
     *
     * The Prisma field is mapped to PostgreSQL DATE.
     * Using UTC prevents timezone conversion from
     * shifting the selected date to the previous day.
     */
    const databasePreferredDate =
      new Date(
        Date.UTC(
          year,
          month - 1,
          day
        )
      );

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

    // Create consultation request object
    const consultationRequest = {
      name,
      company,
      email,
      phone,
      topic,
      preferredDate,
      preferredTime,
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
        "New consultation request received:",
        {
          topic:
            consultationRequest.topic,
          preferredDate:
            consultationRequest.preferredDate,
          preferredTime:
            consultationRequest.preferredTime,
          createdAt:
            consultationRequest.createdAt,
        }
      );
    }

    /**
     * Save consultation request to PostgreSQL.
     *
     * company is stored as null when the
     * optional field is left empty.
     */
    const savedConsultation =
      await prisma.consultationRequest.create({
        data: {
          name,
          company: company || null,
          email,
          phone,
          topic,
          preferredDate:
            databasePreferredDate,
          preferredTime,
          message,
        },
      });

    if (
      process.env.NODE_ENV === "development"
    ) {
      console.log(
        "Consultation request saved to database:",
        {
          id:
            savedConsultation.id,
          topic:
            savedConsultation.topic,
          preferredDate:
            savedConsultation.preferredDate,
          preferredTime:
            savedConsultation.preferredTime,
          createdAt:
            savedConsultation.createdAt,
        }
      );
    }
/**
 * Send consultation notification email.
 *
 * Email is a secondary operation.
 * If email delivery fails, the consultation request
 * remains safely stored in PostgreSQL and the user
 * still receives a successful response.
 */
try {
  await sendEmail({
    subject:
      `New Consultation Request: ${topic}`,

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
          <!-- Header -->
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
              New Consultation Request
            </h1>

            <p
              style="
                margin: 8px 0 0;
                color: #71717a;
              "
            >
              A new consultation request has been submitted
              through the Bizzfi website.
            </p>
          </div>

          <!-- Customer Details -->
          <div style="padding: 24px 0;">
            <p>
              <strong>Name:</strong>
              ${escapeHtml(name)}
            </p>

            <p>
              <strong>Company:</strong>
              ${escapeHtml(
                company || "Not provided"
              )}
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
              <strong>
                Consultation Topic:
              </strong>
              ${escapeHtml(topic)}
            </p>

            <!-- Preferred Schedule -->
            <div
              style="
                margin-top: 24px;
                padding: 16px;
                border-radius: 8px;
                background-color: #eff6ff;
              "
            >
              <p style="margin: 0 0 8px;">
                <strong>
                  Preferred Consultation Schedule
                </strong>
              </p>

              <p style="margin: 4px 0;">
                <strong>Date:</strong>
                ${escapeHtml(preferredDate)}
              </p>

              <p style="margin: 4px 0;">
                <strong>Time:</strong>
                ${escapeHtml(preferredTime)}
              </p>
            </div>

            <!-- Requirement -->
            <div style="margin-top: 24px;">
              <p style="margin-bottom: 8px;">
                <strong>Requirement:</strong>
              </p>

              <div
                style="
                  padding: 16px;
                  border-radius: 8px;
                  background-color: #f4f4f5;
                  color: #27272a;
                "
              >
                ${escapeHtml(message).replace(
                  /\n/g,
                  "<br />"
                )}
              </div>
            </div>
          </div>

          <!-- Footer -->
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
              ${escapeHtml(
                consultationRequest.createdAt
              )}
            </p>

            <p
              style="
                margin: 8px 0 0;
                font-size: 12px;
                color: #71717a;
              "
            >
              This notification was generated automatically
              by the Bizzfi website.
            </p>
          </div>
        </div>
      `,
    });
} catch (emailError) {
  /**
   * Do not fail the entire submission if the
   * notification email cannot be delivered.
   *
   * The consultation request has already
   * been safely stored in PostgreSQL.
   */
  console.error(
    "Consultation request saved, but email notification failed:",
    emailError
  );
}
    // Successful API response
    return apiJsonResponse(
  {
    success: true,
    message:
      "Your consultation request has been received successfully.",
  },
  {
    status: 201,
  }
);
  } catch (error) {
    console.error(
      "Consultation API error:",
      error
    );

    return apiJsonResponse(
      {
        success: false,
        message:
          "We could not process your consultation request. Please try again later.",
      },
      {
        status: 500,
      }
    );
  }
}