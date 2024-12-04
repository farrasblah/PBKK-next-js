/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `budgets` DROP FOREIGN KEY `Budgets_userId_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_userId_fkey`;

-- AlterTable
ALTER TABLE `transaction` MODIFY `userId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `users`;
