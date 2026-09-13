import { NextRequest } from "next/server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";

function isAdmin(
  session: { user?: { role?: string } } | null
) {
  return session?.user?.role === "ADMIN";
}

function createSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function GET() {
  const session = await auth();

  if (!isAdmin(session)) {
    return Response.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error("Blog list error:", error);

    return Response.json(
      {
        success: false,
        message: "Unable to load blog posts",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!isAdmin(session)) {
    return Response.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    const title =
      typeof body.title === "string" ? body.title.trim() : "";

    const content =
      typeof body.content === "string" ? body.content.trim() : "";

    const excerpt =
      typeof body.excerpt === "string" ? body.excerpt.trim() : null;

    const coverImage =
      typeof body.coverImage === "string"
        ? body.coverImage.trim()
        : null;

    const category =
      typeof body.category === "string" ? body.category.trim() : null;

    const seoTitle =
      typeof body.seoTitle === "string" ? body.seoTitle.trim() : null;

    const seoDescription =
      typeof body.seoDescription === "string"
        ? body.seoDescription.trim()
        : null;

    const status =
      body.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT";

    if (!title || !content) {
      return Response.json(
        {
          success: false,
          message: "Title and content are required",
        },
        { status: 400 }
      );
    }

    const baseSlug = createSlug(title);

    if (!baseSlug) {
      return Response.json(
        {
          success: false,
          message: "A valid title is required",
        },
        { status: 400 }
      );
    }

    let slug = baseSlug;
    let counter = 2;

    while (await prisma.blogPost.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        coverImage,
        category,
        seoTitle,
        seoDescription,
        status,
        publishedAt: status === "PUBLISHED" ? new Date() : null,
      },
    });

    return Response.json(
      {
        success: true,
        message: "Blog post created successfully",
        post,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Blog create error:", error);

    return Response.json(
      {
        success: false,
        message: "Unable to create blog post",
      },
      { status: 500 }
    );
  }
}