"use client";

import { useState } from "react";

import { BlogCard } from "@/components/blog/blog-card";
import {
  blogCategories,
  blogPosts,
  type BlogCategory,
} from "@/data/blog";

export function BlogList() {
  const [activeCategory, setActiveCategory] =
    useState<BlogCategory>("All");

  // When "All" is selected, exclude the featured article
  // because it is already displayed in the Featured Article section.
  // When a specific category is selected, include all posts
  // from that category, including the featured article.
  const filteredPosts = blogPosts.filter((post) => {
    if (activeCategory === "All") {
      return !post.featured;
    }

    return post.category === activeCategory;
  });

  return (
    <section className="px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
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

        {/* Category Filters */}
        <div
          className="mt-10 flex flex-wrap gap-2"
          aria-label="Filter blog posts by category"
        >
          {blogCategories.map((category) => {
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

        {/* Blog Grid */}
        {filteredPosts.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <BlogCard
                key={post.slug}
                post={post}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="mt-10 rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-16 text-center">
            <h3 className="text-lg font-semibold text-foreground">
              No articles available
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              There are currently no articles available in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}