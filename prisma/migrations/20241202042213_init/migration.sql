/*
  Warnings:

  - You are about to drop the column `purpose` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `type` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `purpose`,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;
