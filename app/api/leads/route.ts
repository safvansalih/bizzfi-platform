import { apiJsonResponse } from "@/lib/security/api-response";
import {
  getClientIp,
  rateLimit,
} from "@/lib/security/rate-limit";

const MAX_BODY_SIZE = 20_000;

const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

const ODOO_API_URL =
  process.env.ODOO_API_URL ||
  "https://erp.bizzfi.com/api/bizzfi/lead";

const ODOO_API_TOKEN =
  process.env.ODOO_API_TOKEN || "";

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
  "General IT Consultation",
  "Other",
];

type LeadRequestBody = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
  service?: unknown;
  message?: unknown;

  utm_source?: unknown;
  utm_medium?: unknown;
  utm_campaign?: unknown;
  utm_content?: unknown;
  fbclid?: unknown;

  website?: unknown;
};

type OdooLeadResponse = {
  jsonrpc?: string;
  id?: number | string | null;
  result?: {
    success?: boolean;
    lead_id?: number;
    message?: string;
  };
  error?: {
    code?: number;
    message?: string;
    data?: unknown;
  };
};

function getString(value: unknown) {
  return String(value ?? "").trim();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email
  );
}

function isValidPhone(phone: string) {
  return /^\+?[0-9\s\-()]{7,20}$/.test(
    phone
  );
}

export async function POST(request: Request) {
  try {
    /*
     * Rate limiting
     *
     * Maximum 5 lead requests from the same IP
     * within 10 minutes.
     */
    const clientIp = getClientIp(request);

    const rateLimitResult = rateLimit(
      `lead:${clientIp}`,
      {
        limit: RATE_LIMIT,
        windowMs: RATE_LIMIT_WINDOW_MS,
      }
    );

    if (!rateLimitResult.success) {
      const retryAfter = Math.max(
        1,
        Math.ceil(
          (rateLimitResult.resetTime -
            Date.now()) /
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
            "Retry-After": String(
              retryAfter
            ),
          },
        }
      );
    }

    /*
     * Content-Type validation
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

    /*
     * Request body size protection
     */
    const contentLength =
      request.headers.get("content-length");

    if (contentLength) {
      const parsedContentLength =
        Number(contentLength);

      if (
        Number.isFinite(
          parsedContentLength
        ) &&
        parsedContentLength >
          MAX_BODY_SIZE
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

    /*
     * Parse JSON safely
     */
    let body: LeadRequestBody;

    try {
      body =
        (await request.json()) as LeadRequestBody;
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

    /*
     * Normalize fields
     */
    const name = getString(body.name);

    const company = getString(
      body.company
    );

    const email = getString(
      body.email
    ).toLowerCase();

    const phone = getString(
      body.phone
    );

    const service = getString(
      body.service
    );

    const message = getString(
      body.message
    );

    /*
     * Marketing attribution
     */
    const utmSource = getString(
      body.utm_source
    );

    const utmMedium = getString(
      body.utm_medium
    );

    const utmCampaign = getString(
      body.utm_campaign
    );

    const utmContent = getString(
      body.utm_content
    );

    const fbclid = getString(
      body.fbclid
    );

    /*
     * Honeypot spam protection
     */
    const website = getString(
      body.website
    );

    if (website) {
      if (
        process.env.NODE_ENV ===
        "development"
      ) {
        console.log(
          "Lead form honeypot triggered."
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

    /*
     * Required fields
     *
     * Name is required.
     * At least phone OR email is required.
     */
    if (!name) {
      return apiJsonResponse(
        {
          success: false,
          message:
            "Please enter your name.",
        },
        {
          status: 400,
        }
      );
    }

    if (!email && !phone) {
      return apiJsonResponse(
        {
          success: false,
          message:
            "Please provide your email address or phone number.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Email validation
     */
    if (
      email &&
      !isValidEmail(email)
    ) {
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

    /*
     * Phone validation
     */
    if (
      phone &&
      !isValidPhone(phone)
    ) {
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

    /*
     * Service validation
     */
    if (
      service &&
      !allowedServices.includes(service)
    ) {
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

    /*
     * Field length protection
     */
    if (
      name.length > 100 ||
      company.length > 150 ||
      email.length > 254 ||
      phone.length > 20 ||
      service.length > 100 ||
      message.length > 5000 ||
      utmSource.length > 100 ||
      utmMedium.length > 100 ||
      utmCampaign.length > 200 ||
      utmContent.length > 200 ||
      fbclid.length > 300
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

    /*
     * Build attribution context.
     *
     * The current Odoo endpoint accepts only:
     * name, company, email, phone, service, message.
     *
     * Therefore attribution is preserved inside
     * the message until dedicated Odoo fields
     * are added.
     */
    const attributionLines: string[] =
      [];

    if (utmSource) {
      attributionLines.push(
        `UTM Source: ${utmSource}`
      );
    }

    if (utmMedium) {
      attributionLines.push(
        `UTM Medium: ${utmMedium}`
      );
    }

    if (utmCampaign) {
      attributionLines.push(
        `UTM Campaign: ${utmCampaign}`
      );
    }

    if (utmContent) {
      attributionLines.push(
        `UTM Content: ${utmContent}`
      );
    }

    if (fbclid) {
      attributionLines.push(
        `FBCLID: ${fbclid}`
      );
    }

    const odooMessage =
      attributionLines.length > 0
        ? [
            message,
            "",
            "--- Marketing Attribution ---",
            ...attributionLines,
          ]
            .filter(
              (line) =>
                line !== undefined
            )
            .join("\n")
        : message;

    /*
     * Production configuration check
     */
    if (!ODOO_API_URL) {
      console.error(
        "ODOO_API_URL is not configured."
      );

      return apiJsonResponse(
        {
          success: false,
          message:
            "Lead service is temporarily unavailable.",
        },
        {
          status: 503,
        }
      );
    }

    /*
     * Server-to-server request to Odoo
     */
    const controller =
      new AbortController();

    const timeoutId =
      setTimeout(() => {
        controller.abort();
      }, 10_000);

    let odooResponse: Response;

    try {
      const headers: HeadersInit = {
        "Content-Type":
          "application/json",
        Accept:
          "application/json",
      };

      /*
       * Token is ONLY added server-side.
       *
       * Odoo must later verify this token.
       */
      if (ODOO_API_TOKEN) {
        headers[
          "Authorization"
        ] = `Bearer ${ODOO_API_TOKEN}`;
      }

      odooResponse = await fetch(
        ODOO_API_URL,
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "call",
            params: {
              name,
              company,
              email,
              phone,
              service,
              message: odooMessage,
            },
            id: Date.now(),
          }),
          signal: controller.signal,
          cache: "no-store",
        }
      );
    } finally {
      clearTimeout(timeoutId);
    }

    /*
     * Parse Odoo response safely
     */
    let odooData: OdooLeadResponse;

    try {
      odooData =
        (await odooResponse.json()) as OdooLeadResponse;
    } catch {
      console.error(
        "Odoo returned an invalid JSON response."
      );

      return apiJsonResponse(
        {
          success: false,
          message:
            "Lead service is temporarily unavailable.",
        },
        {
          status: 502,
        }
      );
    }

    /*
     * Handle HTTP errors
     */
    if (!odooResponse.ok) {
      console.error(
        "Odoo lead API returned HTTP error:",
        odooResponse.status
      );

      return apiJsonResponse(
        {
          success: false,
          message:
            "We could not submit your request right now. Please try again later.",
        },
        {
          status: 502,
        }
      );
    }

    /*
     * Handle Odoo JSON-RPC errors
     *
     * Never expose Odoo internals to the customer.
     */
    if (odooData.error) {
      console.error(
        "Odoo lead API returned a JSON-RPC error:",
        {
          code:
            odooData.error.code,
          message:
            odooData.error.message,
        }
      );

      return apiJsonResponse(
        {
          success: false,
          message:
            "We could not submit your request right now. Please try again later.",
        },
        {
          status: 502,
        }
      );
    }

    /*
     * Validate successful Odoo result
     */
    if (
      !odooData.result?.success
    ) {
      console.error(
        "Odoo lead API did not confirm lead creation."
      );

      return apiJsonResponse(
        {
          success: false,
          message:
            "We could not complete your request. Please try again later.",
        },
        {
          status: 502,
        }
      );
    }

    /*
     * Server-side success log.
     *
     * Do NOT log customer PII or secrets.
     */
    if (
      process.env.NODE_ENV ===
      "development"
    ) {
      console.log(
        "Bizzfi lead successfully created in Odoo:",
        {
          leadId:
            odooData.result.lead_id,
          service,
        }
      );
    }

    /*
     * Return simple frontend-safe response.
     */
    return apiJsonResponse(
      {
        success: true,
        message:
          "Thank you. Your request has been received. Our team will contact you shortly.",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    /*
     * Timeout / network / unexpected errors
     */
    if (
      error instanceof DOMException &&
      error.name === "AbortError"
    ) {
      console.error(
        "Odoo lead API request timed out."
      );

      return apiJsonResponse(
        {
          success: false,
          message:
            "The request is taking longer than expected. Please try again later.",
        },
        {
          status: 504,
        }
      );
    }

    console.error(
      "Lead API error:",
      error
    );

    return apiJsonResponse(
      {
        success: false,
        message:
          "We could not process your request. Please try again later.",
      },
      {
        status: 500,
      }
    );
  }
}
