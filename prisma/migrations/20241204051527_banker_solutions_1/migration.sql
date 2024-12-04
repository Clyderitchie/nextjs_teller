/*
  Warnings:

  - Added the required column `interestRate` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardType` to the `cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ccv` to the `cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `cards` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `birthday` on the `customers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "interestRate" TEXT NOT NULL,
ALTER COLUMN "accountNumber" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "cards" ADD COLUMN     "cardType" TEXT NOT NULL,
ADD COLUMN     "ccv" TEXT NOT NULL,
ADD COLUMN     "customerId" TEXT NOT NULL,
ALTER COLUMN "cardNumber" SET DATA TYPE TEXT,
ALTER COLUMN "expDate" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "customers" DROP COLUMN "birthday",
ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "identifications" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "identificationNumber" TEXT NOT NULL,
    "identificationType" TEXT NOT NULL,
    "issuingCountry" TEXT NOT NULL,
    "issuingState" TEXT NOT NULL,
    "issueDate" TEXT NOT NULL,
    "expirationDate" TEXT NOT NULL,

    CONSTRAINT "identifications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "identifications" ADD CONSTRAINT "identifications_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
