import { NextRequest } from "next/server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";

function isAdmin(
  session: { user?: { role?: string } } | null
) {
  return session?.user?.role === "ADMIN";
}

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: NextRequest,
  context: RouteContext
) {
  const session = await auth();

  if (!isAdmin(session)) {
    return Response.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await context.params;

    const post = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!post) {
      return Response.json(
        { success: false, message: "Blog post not found" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      post,
    });
  } catch (error) {
    console.error("Blog fetch error:", error);

    return Response.json(
      {
        success: false,
        message: "Unable to load blog post",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  const session = await auth();

  if (!isAdmin(session)) {
    return Response.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await context.params;
    const body = await request.json();

    const existingPost = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return Response.json(
        { success: false, message: "Blog post not found" },
        { status: 404 }
      );
    }

    const title =
      typeof body.title === "string"
        ? body.title.trim()
        : existingPost.title;

    const content =
      typeof body.content === "string"
        ? body.content.trim()
        : existingPost.content;

    if (!title || !content) {
      return Response.json(
        {
          success: false,
          message: "Title and content are required",
        },
        { status: 400 }
      );
    }

    const status =
      body.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT";

    const updatedPost = await prisma.blogPost.update({
      where: { id },
      data: {
        title,
        content,
        excerpt:
          typeof body.excerpt === "string"
            ? body.excerpt.trim()
            : existingPost.excerpt,
        coverImage:
          typeof body.coverImage === "string"
            ? body.coverImage.trim()
            : existingPost.coverImage,
        category:
          typeof body.category === "string"
            ? body.category.trim()
            : existingPost.category,
        seoTitle:
          typeof body.seoTitle === "string"
            ? body.seoTitle.trim()
            : existingPost.seoTitle,
        seoDescription:
          typeof body.seoDescription === "string"
            ? body.seoDescription.trim()
            : existingPost.seoDescription,
        status,
        publishedAt:
          status === "PUBLISHED"
            ? existingPost.publishedAt ?? new Date()
            : null,
      },
    });

    return Response.json({
      success: true,
      message: "Blog post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.error("Blog update error:", error);

    return Response.json(
      {
        success: false,
        message: "Unable to update blog post",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  context: RouteContext
) {
  const session = await auth();

  if (!isAdmin(session)) {
    return Response.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await context.params;

    const existingPost = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return Response.json(
        { success: false, message: "Blog post not found" },
        { status: 404 }
      );
    }

    await prisma.blogPost.delete({
      where: { id },
    });

    return Response.json({
      success: true,
      message: "Blog post deleted successfully",
    });
  } catch (error) {
    console.error("Blog delete error:", error);

    return Response.json(
      {
        success: false,
        message: "Unable to delete blog post",
      },
      { status: 500 }
    );
  }
}