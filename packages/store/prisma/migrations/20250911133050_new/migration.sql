/*
  Warnings:

  - A unique constraint covering the columns `[username,email]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_username_email_key" ON "public"."user"("username", "email");
