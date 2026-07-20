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
