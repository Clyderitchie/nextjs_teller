/*
  Warnings:

  - You are about to drop the column `accountTypr` on the `accounts` table. All the data in the column will be lost.
  - Added the required column `accountType` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "accountTypr",
ADD COLUMN     "accountType" TEXT NOT NULL;
