CREATE TABLE IF NOT EXISTS "blog_posts" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "slug" VARCHAR(220) NOT NULL,
    "excerpt" VARCHAR(500),
    "content" TEXT NOT NULL,
    "coverImage" VARCHAR(500),
    "category" VARCHAR(100),
    "authorId" TEXT,
    "status" VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "seoTitle" VARCHAR(200),
    "seoDescription" VARCHAR(320),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_posts_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "blog_posts_slug_key"
ON "blog_posts"("slug");

CREATE INDEX IF NOT EXISTS "blog_posts_status_idx"
ON "blog_posts"("status");

CREATE INDEX IF NOT EXISTS "blog_posts_category_idx"
ON "blog_posts"("category");

CREATE INDEX IF NOT EXISTS "blog_posts_publishedAt_idx"
ON "blog_posts"("publishedAt");

CREATE INDEX IF NOT EXISTS "blog_posts_createdAt_idx"
ON "blog_posts"("createdAt");
