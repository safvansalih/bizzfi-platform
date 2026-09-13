-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "contact_enquiries" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "company" VARCHAR(150),
    "email" VARCHAR(254) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "service" VARCHAR(100) NOT NULL,
    "message" TEXT NOT NULL,
    "status" VARCHAR(30) NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contact_enquiries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consultation_requests" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "company" VARCHAR(150),
    "email" VARCHAR(254) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "topic" VARCHAR(100) NOT NULL,
    "preferredDate" DATE NOT NULL,
    "preferredTime" VARCHAR(30) NOT NULL,
    "message" TEXT NOT NULL,
    "status" VARCHAR(30) NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "consultation_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "passwordHash" VARCHAR(255) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "role" VARCHAR(20) NOT NULL DEFAULT 'USER',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_posts" (
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

-- CreateIndex
CREATE INDEX "contact_enquiries_email_idx" ON "contact_enquiries"("email");

-- CreateIndex
CREATE INDEX "contact_enquiries_service_idx" ON "contact_enquiries"("service");

-- CreateIndex
CREATE INDEX "contact_enquiries_status_idx" ON "contact_enquiries"("status");

-- CreateIndex
CREATE INDEX "contact_enquiries_createdAt_idx" ON "contact_enquiries"("createdAt");

-- CreateIndex
CREATE INDEX "consultation_requests_email_idx" ON "consultation_requests"("email");

-- CreateIndex
CREATE INDEX "consultation_requests_topic_idx" ON "consultation_requests"("topic");

-- CreateIndex
CREATE INDEX "consultation_requests_status_idx" ON "consultation_requests"("status");

-- CreateIndex
CREATE INDEX "consultation_requests_preferredDate_idx" ON "consultation_requests"("preferredDate");

-- CreateIndex
CREATE INDEX "consultation_requests_createdAt_idx" ON "consultation_requests"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "users_isActive_idx" ON "users"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "blog_posts_slug_key" ON "blog_posts"("slug");

-- CreateIndex
CREATE INDEX "blog_posts_status_idx" ON "blog_posts"("status");

-- CreateIndex
CREATE INDEX "blog_posts_category_idx" ON "blog_posts"("category");

-- CreateIndex
CREATE INDEX "blog_posts_publishedAt_idx" ON "blog_posts"("publishedAt");

-- CreateIndex
CREATE INDEX "blog_posts_createdAt_idx" ON "blog_posts"("createdAt");
