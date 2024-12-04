/*
  Warnings:

  - You are about to drop the column `phone` on the `customers` table. All the data in the column will be lost.
  - Added the required column `address` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthday` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ssn` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customers" DROP COLUMN "phone",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "birthday" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "ssn" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "accountTypr" TEXT NOT NULL,
    "accountNumber" INTEGER NOT NULL,
    "customerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cards" (
    "id" TEXT NOT NULL,
    "cardNumber" INTEGER NOT NULL,
    "expDate" TIMESTAMP(3) NOT NULL,
    "accountId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
