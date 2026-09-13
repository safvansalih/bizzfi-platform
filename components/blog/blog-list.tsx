"use client";

import { useEffect, useMemo, useState } from "react";

import { BlogCard } from "@/components/blog/blog-card";

type DatabaseBlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  category: string | null;
  status: string;
  publishedAt: string | null;
};

type BlogCardPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readingTime: string;
  author: string;
  featured: boolean;
};

export function BlogList() {
  const [posts, setPosts] = useState<DatabaseBlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPublishedPosts() {
      try {
        const response = await fetch("/api/blog");

        if (!response.ok) {
          throw new Error("Unable to load blog posts");
        }

        const data = await response.json();

        setPosts(data.posts || []);
      } catch (error) {
        console.error("Public blog loading error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPublishedPosts();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(
        posts
          .map((post) => post.category)
          .filter((category): category is string => Boolean(category))
      )
    );

    return ["All", ...uniqueCategories];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => {
        if (activeCategory === "All") return true;

        return post.category === activeCategory;
      })
      .map<BlogCardPost>((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || "Explore this insight from Bizzfi.",
        category: post.category || "Business",
        publishedAt: post.publishedAt || new Date().toISOString(),
        readingTime: `${Math.max(
          1,
          Math.ceil(post.content.trim().split(/\s+/).length / 200)
        )} min read`,
        author: "Bizzfi Team",
        featured: false,
      }));
  }, [posts, activeCategory]);

  return (
    <section className="px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-500">
            Latest Insights
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ideas, Insights & Technology Perspectives
          </h2>

          <p className="mt-5 text-base leading-8 text-muted-foreground">
            Explore practical insights on technology, digital transformation,
            cloud infrastructure, enterprise systems, cyber security and AI
            automation.
          </p>
        </div>

        {categories.length > 1 && (
          <div
            className="mt-10 flex flex-wrap gap-2"
            aria-label="Filter blog posts by category"
          >
            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "border-blue-500 bg-blue-600 text-white"
                      : "border-border bg-background text-muted-foreground hover:border-blue-500/40 hover:text-foreground"
                  }`}
                  aria-pressed={isActive}
                >
                  {category}
                </button>
              );
            })}
          </div>
        )}

        {loading ? (
          <div className="mt-10 rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-16 text-center">
            <p className="text-sm text-muted-foreground">
              Loading articles...
            </p>
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-16 text-center">
            <h3 className="text-lg font-semibold text-foreground">
              No articles available
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Published articles will appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}