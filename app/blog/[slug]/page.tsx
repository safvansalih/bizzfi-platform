import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  UserRound,
} from "lucide-react";

import { prisma } from "@/lib/db/prisma";

import { Breadcrumb } from "@/components/common/breadcrumb";
import { ArticleInfo } from "@/components/blog/article-info";
import { AuthorCard } from "@/components/blog/author-card";
import { BlogCTA } from "@/components/blog/blog-cta";
import { RelatedArticles } from "@/components/blog/related-articles";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function getPublishedPost(slug: string) {
  return prisma.blogPost.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
    },
  });
}

function calculateReadingTime(content: string) {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));

  return `${minutes} min read`;
}

function formatArticleContent(content: string) {
  return content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);

  if (!post) {
    return {
      title: "Article Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonicalPath = `/blog/${post.slug}`;
  const description =
    post.seoDescription ||
    post.excerpt ||
    "Explore insights from Bizzfi.";

  return {
    title: post.seoTitle || post.title,
    description,

    alternates: {
      canonical: canonicalPath,
    },

    openGraph: {
      title: post.seoTitle || post.title,
      description,
      url: canonicalPath,
      type: "article",
      publishedTime: post.publishedAt?.toISOString(),
      section: post.category || "Business",
      siteName: "Bizzfi",
    },

    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(post.publishedAt || post.createdAt);

  const readingTime = calculateReadingTime(post.content);
  const paragraphs = formatArticleContent(post.content);
  const category = post.category || "Business";
  const excerpt =
    post.excerpt || "Explore this insight from Bizzfi.";

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          {
            label: "Blog",
            href: "/blog",
          },
          {
            label: post.title,
          },
        ]}
      />

      {/* Article Header */}
      <header className="border-b border-border px-6 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl">
          {/* Category */}
          <span className="inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold text-blue-500">
            {category}
          </span>

          {/* Title */}
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            {excerpt}
          </p>

          {/* Article Meta */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <UserRound className="h-4 w-4" aria-hidden="true" />
              Bizzfi Team
            </span>

            <span className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              {formattedDate}
            </span>

            <span className="flex items-center gap-2">
              <Clock3 className="h-4 w-4" aria-hidden="true" />
              {readingTime}
            </span>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <section className="px-6 pt-12 sm:pt-16">
        <div className="mx-auto max-w-5xl">
          <div className="relative aspect-[16/8] overflow-hidden rounded-3xl border border-border bg-muted/50">
            {post.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.coverImage}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <>
                <div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-violet-500/20"
                  aria-hidden="true"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-medium text-muted-foreground">
                    Article Featured Image
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <ArticleInfo
            category={category}
            date={formattedDate}
            readingTime={readingTime}
          />

          <div className="mt-10 space-y-6">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-base leading-8 text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Author */}
          <div className="mt-12">
            <AuthorCard author="Bizzfi Team" />
          </div>

          {/* Back to Blog */}
          <div className="mt-12 border-t border-border pt-8">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-blue-500 transition-colors hover:text-blue-400"
            >
              <ArrowLeft
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
                aria-hidden="true"
              />

              Back to Blog
            </Link>
          </div>
        </div>
      </article>

      {/* Blog CTA */}
      <BlogCTA />

      {/* Related Articles */}
      <RelatedArticles
        currentSlug={post.slug}
        category={category}
      />
    </>
  );
}