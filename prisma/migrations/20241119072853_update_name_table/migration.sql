/*
  Warnings:

  - You are about to drop the `itempesanan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mengelolabahan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `itempesanan` DROP FOREIGN KEY `ItemPesanan_id_menu_fkey`;

-- DropForeignKey
ALTER TABLE `itempesanan` DROP FOREIGN KEY `ItemPesanan_id_pesanan_fkey`;

-- DropForeignKey
ALTER TABLE `mengelolabahan` DROP FOREIGN KEY `MengelolaBahan_id_stock_fkey`;

-- DropForeignKey
ALTER TABLE `mengelolabahan` DROP FOREIGN KEY `MengelolaBahan_id_user_fkey`;

-- DropTable
DROP TABLE `itempesanan`;

-- DropTable
DROP TABLE `mengelolabahan`;

-- CreateTable
CREATE TABLE `Mengelola_Bahan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_stock` INTEGER NOT NULL,
    `id_user` INTEGER NOT NULL,
    `proses` ENUM('Tambah', 'Edit', 'Hapus') NOT NULL DEFAULT 'Tambah',
    `jumlah` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item_Pesanan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_menu` INTEGER NOT NULL,
    `id_pesanan` INTEGER NOT NULL,
    `jumlah` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Mengelola_Bahan` ADD CONSTRAINT `Mengelola_Bahan_id_stock_fkey` FOREIGN KEY (`id_stock`) REFERENCES `Bahan_Baku`(`id_stock`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mengelola_Bahan` ADD CONSTRAINT `Mengelola_Bahan_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `Users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item_Pesanan` ADD CONSTRAINT `Item_Pesanan_id_menu_fkey` FOREIGN KEY (`id_menu`) REFERENCES `Menu`(`id_menu`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item_Pesanan` ADD CONSTRAINT `Item_Pesanan_id_pesanan_fkey` FOREIGN KEY (`id_pesanan`) REFERENCES `Pesanan`(`id_pesanan`) ON DELETE RESTRICT ON UPDATE CASCADE;
