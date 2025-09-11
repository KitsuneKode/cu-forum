/*
  Warnings:

  - Made the column `username` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "public"."user_username_email_key";

-- AlterTable
ALTER TABLE "public"."user" ALTER COLUMN "username" SET NOT NULL;
