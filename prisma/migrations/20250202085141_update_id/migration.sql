/*
  Warnings:

  - The primary key for the `bahan_baku` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_stock` on the `bahan_baku` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `bahan_baku` table. All the data in the column will be lost.
  - The primary key for the `menu` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_menu` on the `menu` table. All the data in the column will be lost.
  - The primary key for the `pesanan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_pesanan` on the `pesanan` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_user` on the `users` table. All the data in the column will be lost.
  - Added the required column `id` to the `bahan_baku` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `pesanan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `item_pesanan` DROP FOREIGN KEY `Item_Pesanan_id_menu_fkey`;

-- DropForeignKey
ALTER TABLE `item_pesanan` DROP FOREIGN KEY `Item_Pesanan_id_pesanan_fkey`;

-- DropForeignKey
ALTER TABLE `mengelola_bahan` DROP FOREIGN KEY `Mengelola_Bahan_id_stock_fkey`;

-- DropForeignKey
ALTER TABLE `mengelola_bahan` DROP FOREIGN KEY `Mengelola_Bahan_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `pesanan` DROP FOREIGN KEY `Pesanan_id_user_fkey`;

-- AlterTable
ALTER TABLE `bahan_baku` DROP PRIMARY KEY,
    DROP COLUMN `id_stock`,
    DROP COLUMN `status`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `tersedia` BOOLEAN NOT NULL DEFAULT true,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `menu` DROP PRIMARY KEY,
    DROP COLUMN `id_menu`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `pesanan` DROP PRIMARY KEY,
    DROP COLUMN `id_pesanan`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    DROP COLUMN `id_user`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `item_pesanan` ADD CONSTRAINT `Item_Pesanan_id_menu_fkey` FOREIGN KEY (`id_menu`) REFERENCES `menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item_pesanan` ADD CONSTRAINT `Item_Pesanan_id_pesanan_fkey` FOREIGN KEY (`id_pesanan`) REFERENCES `pesanan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mengelola_bahan` ADD CONSTRAINT `Mengelola_Bahan_id_stock_fkey` FOREIGN KEY (`id_stock`) REFERENCES `bahan_baku`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mengelola_bahan` ADD CONSTRAINT `Mengelola_Bahan_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pesanan` ADD CONSTRAINT `Pesanan_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
