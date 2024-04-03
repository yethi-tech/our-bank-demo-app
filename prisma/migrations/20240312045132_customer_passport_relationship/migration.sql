/*
  Warnings:

  - You are about to drop the column `passportId` on the `Customer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[customerId]` on the table `Passport` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_passportId_fkey";

-- DropIndex
DROP INDEX "Customer_passportId_key";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "passportId";

-- AlterTable
ALTER TABLE "Passport" ADD COLUMN     "customerId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Passport_customerId_key" ON "Passport"("customerId");

-- AddForeignKey
ALTER TABLE "Passport" ADD CONSTRAINT "Passport_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
