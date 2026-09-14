-- AlterTable
ALTER TABLE "consultation_requests" ADD COLUMN     "odooLeadId" INTEGER,
ADD COLUMN     "odooSyncError" TEXT,
ADD COLUMN     "odooSyncStatus" TEXT,
ADD COLUMN     "odooSyncedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "contact_enquiries" ADD COLUMN     "odooLeadId" INTEGER,
ADD COLUMN     "odooSyncError" TEXT,
ADD COLUMN     "odooSyncStatus" TEXT,
ADD COLUMN     "odooSyncedAt" TIMESTAMP(3);
