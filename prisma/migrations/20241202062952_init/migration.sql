-- DropForeignKey
ALTER TABLE `budgets` DROP FOREIGN KEY `Budgets_userId_fkey`;

-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `Transaction_userId_fkey`;

-- AlterTable
ALTER TABLE `transaction` MODIFY `userId` VARCHAR(191) NOT NULL;
