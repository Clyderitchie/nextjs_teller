/*
  Warnings:

  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cards` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `loans` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `services` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_customerId_fkey";

-- DropForeignKey
ALTER TABLE "cards" DROP CONSTRAINT "cards_customerId_fkey";

-- DropForeignKey
ALTER TABLE "loans" DROP CONSTRAINT "loans_customerId_fkey";

-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_customerId_fkey";

-- DropTable
DROP TABLE "accounts";

-- DropTable
DROP TABLE "cards";

-- DropTable
DROP TABLE "loans";

-- DropTable
DROP TABLE "services";
