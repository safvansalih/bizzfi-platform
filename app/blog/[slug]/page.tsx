import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  UserRound,
} from "lucide-react";

import { Breadcrumb } from "@/components/common/breadcrumb";
import { blogPosts } from "@/data/blog";
import { ArticleInfo } from "@/components/blog/article-info";
import { AuthorCard } from "@/components/blog/author-card";
import { BlogCTA } from "@/components/blog/blog-cta";
import { RelatedArticles } from "@/components/blog/related-articles";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

/**
 * Generate static routes for all blog posts.
 */
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

/**
 * Generate SEO metadata dynamically for each blog post.
 */
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = blogPosts.find(
    (item) => item.slug === slug
  );

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

  return {
    title: post.title,
    description: post.excerpt,

    alternates: {
      canonical: canonicalPath,
    },

    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonicalPath,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      section: post.category,
      siteName: "Bizzfi",
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}
export default async function BlogPostPage({
  params,
}: BlogPostPageProps) {
  const { slug } = await params;

  const post = blogPosts.find(
    (item) => item.slug === slug
  );

  if (!post) {
    notFound();
  }

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(post.publishedAt));

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
            {post.category}
          </span>

          {/* Title */}
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
            {post.excerpt}
          </p>

          {/* Article Meta */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <UserRound
                className="h-4 w-4"
                aria-hidden="true"
              />

              {post.author}
            </span>

            <span className="flex items-center gap-2">
              <CalendarDays
                className="h-4 w-4"
                aria-hidden="true"
              />

              {formattedDate}
            </span>

            <span className="flex items-center gap-2">
              <Clock3
                className="h-4 w-4"
                aria-hidden="true"
              />

              {post.readingTime}
            </span>
          </div>
        </div>
      </header>

      {/* Featured Image Placeholder */}
      <section className="px-6 pt-12 sm:pt-16">
        <div className="mx-auto max-w-5xl">
          <div className="relative aspect-[16/8] overflow-hidden rounded-3xl border border-border bg-muted/50">
            <div
              className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-violet-500/20"
              aria-hidden="true"
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-medium text-muted-foreground">
                Article Featured Image
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
            {/* Article info */}
            <ArticleInfo
  category={post.category}
  date={formattedDate}
  readingTime={post.readingTime}
/>
          {/* Introduction */}
          <p className="mt-10 text-lg leading-9 text-muted-foreground">
  {post.content.introduction}
</p>

          {/* Content Sections */}
          <div className="mt-12 space-y-12">
            {post.content.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {section.heading}
                </h2>

                <div className="mt-5 space-y-5">
                  {section.paragraphs.map(
                    (paragraph, index) => (
                      <p
                        key={`${section.heading}-${index}`}
                        className="text-base leading-8 text-muted-foreground"
                      >
                        {paragraph}
                      </p>
                    )
                  )}
                </div>
              </section>
            ))}
          </div>

          {/* Conclusion */}
          {post.content.conclusion && (
            <div className="mt-12 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-foreground">
                Final Thoughts
              </h2>

              <p className="mt-4 text-base leading-8 text-muted-foreground">
                {post.content.conclusion}
              </p>
            </div>
          )}

<div className="mt-12">
  <AuthorCard author={post.author} />
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
      {/* Blog Conversion CTA */}
<BlogCTA />
      {/* Related Articles */}
      <RelatedArticles
  currentSlug={post.slug}
  category={post.category}
/>
    </>
  );
}