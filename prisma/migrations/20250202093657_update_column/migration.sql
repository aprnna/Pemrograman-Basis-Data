/*
  Warnings:

  - You are about to drop the column `tersedia` on the `bahan_baku` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `menu` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `bahan_baku` DROP COLUMN `tersedia`,
    ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `menu` DROP COLUMN `status`,
    ADD COLUMN `tersedia` BOOLEAN NOT NULL DEFAULT false;
