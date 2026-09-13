import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { apiJsonResponse } from "@/lib/security/api-response";

export async function GET(request: Request) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return apiJsonResponse(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search")?.trim() || "";
    const status = searchParams.get("status")?.trim() || "";

    const enquiries = await prisma.contactEnquiry.findMany({
      where: {
        ...(status
          ? {
              status,
            }
          : {}),

        ...(search
          ? {
              OR: [
                {
                  name: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
                {
                  email: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
                {
                  company: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
                {
                  phone: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
                {
                  service: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
              ],
            }
          : {}),
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 100,
    });

    return apiJsonResponse({
      success: true,
      enquiries,
    });
  } catch (error) {
    console.error("Admin enquiries API error:", error);

    return apiJsonResponse(
      {
        success: false,
        message: "Could not load enquiries.",
      },
      {
        status: 500,
      }
    );
  }
}