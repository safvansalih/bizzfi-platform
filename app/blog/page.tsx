import type { Metadata } from "next";

import { BlogList } from "@/components/blog/blog-list";
import { FeaturedArticle } from "@/components/blog/featured-article";
import { Breadcrumb } from "@/components/common/breadcrumb";
import { PageHero } from "@/components/common/page-hero";
import { blogPosts } from "@/data/blog";


export const metadata: Metadata = {
  title: "Blog & Insights",
  description:
    "Explore Bizzfi insights on digital transformation, AI automation, cloud infrastructure, ERP, CRM, cyber security and modern business technology.",

  alternates: {
    canonical: "/blog",
  },

  openGraph: {
    title: "Blog & Insights | Bizzfi",
    description:
      "Explore insights and practical perspectives on digital transformation, AI automation, cloud infrastructure and modern business technology.",
    url: "/blog",
    type: "website",
    siteName: "Bizzfi",
  },

  twitter: {
    card: "summary_large_image",
    title: "Blog & Insights | Bizzfi",
    description:
      "Explore insights and practical perspectives on technology, digital transformation and modern business solutions.",
  },
};

export default function BlogPage() {
  const featuredPost = blogPosts.find((post) => post.featured);

  return (
    <>
      <Breadcrumb
        items={[
          {
            label: "Blog",
          },
        ]}
      />

      <PageHero
        badge="Bizzfi Insights"
        title={
          <>
            Insights for the{" "}
            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Digital Business Era
            </span>
          </>
        }
        description="Explore insights, ideas and practical perspectives on technology, digital transformation and the systems shaping modern businesses."
      />

      {featuredPost && (
        <FeaturedArticle post={featuredPost} />
      )}

      <BlogList />
    </>
  );
}