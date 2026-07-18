import { BlogCard } from "@/components/blog/blog-card";
import { blogPosts } from "@/data/blog";

type RelatedArticlesProps = {
  currentSlug: string;
  category: string;
};

export function RelatedArticles({
  currentSlug,
  category,
}: RelatedArticlesProps) {
  // Find posts from the same category,
  // excluding the current article.
  const sameCategoryPosts = blogPosts.filter(
    (post) =>
      post.slug !== currentSlug &&
      post.category === category
  );

  // Find other posts as fallback.
  const fallbackPosts = blogPosts.filter(
    (post) =>
      post.slug !== currentSlug &&
      post.category !== category
  );

  // Prioritize same-category posts,
  // then fill remaining slots with other posts.
  const relatedPosts = [
    ...sameCategoryPosts,
    ...fallbackPosts,
  ].slice(0, 3);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-border px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-500">
            Continue Reading
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Related Articles
          </h2>

          <p className="mt-5 text-base leading-8 text-muted-foreground">
            Explore more insights and perspectives from Bizzfi on technology,
            digital transformation and modern business solutions.
          </p>
        </div>

        {/* Related Articles Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {relatedPosts.map((post) => (
            <BlogCard
              key={post.slug}
              post={post}
            />
          ))}
        </div>
      </div>
    </section>
  );
}