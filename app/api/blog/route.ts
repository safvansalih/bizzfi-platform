import { NextResponse } from "next/server";

import { prisma } from "@/lib/db/prisma";

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        status: "PUBLISHED",
      },
      orderBy: [
        {
          publishedAt: "desc",
        },
        {
          createdAt: "desc",
        },
      ],
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        content: true,
        coverImage: true,
        category: true,
        status: true,
        publishedAt: true,
      },
    });

    return NextResponse.json({
      posts,
    });
  } catch (error) {
    console.error("Public blog API error:", error);

    return NextResponse.json(
      {
        error: "Unable to load blog posts",
      },
      {
        status: 500,
      }
    );
  }
}