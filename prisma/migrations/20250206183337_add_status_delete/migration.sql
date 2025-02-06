-- AlterTable
ALTER TABLE `menu` ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT true;
