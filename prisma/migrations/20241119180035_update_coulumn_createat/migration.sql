/*
  Warnings:

  - You are about to drop the column `createAt` on the `pesanan` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `pesanan` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `pesanan` DROP COLUMN `createAt`,
    DROP COLUMN `updateAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `users` DROP COLUMN `createAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
