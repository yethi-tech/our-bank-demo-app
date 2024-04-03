-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_relationshipManagerId_fkey";

-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "relationshipManagerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_relationshipManagerId_fkey" FOREIGN KEY ("relationshipManagerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
