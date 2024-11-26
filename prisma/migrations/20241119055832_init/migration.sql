-- CreateTable
CREATE TABLE `Menu` (
    `id_menu` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `harga` DOUBLE NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `foto` VARCHAR(191) NULL,
    `kategori` ENUM('Makanan', 'Minuman', 'Cemilan', 'Lain_lain') NOT NULL DEFAULT 'Makanan',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_menu`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bahan_Baku` (
    `id_stock` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `jumlah` INTEGER NOT NULL,
    `satuan` VARCHAR(191) NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_stock`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `umur` INTEGER NULL,
    `role` VARCHAR(191) NOT NULL,
    `no_telp` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MengelolaBahan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_stock` INTEGER NOT NULL,
    `id_user` INTEGER NOT NULL,
    `proses` ENUM('Tambah', 'Edit', 'Hapus') NOT NULL DEFAULT 'Tambah',
    `jumlah` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pesanan` (
    `id_pesanan` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `no_meja` INTEGER NOT NULL,
    `total_harga` DOUBLE NULL,
    `status` ENUM('selesai', 'proses', 'dibatalkan') NOT NULL,
    `banyak_orang` INTEGER NOT NULL,
    `atas_nama` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_pesanan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItemPesanan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_menu` INTEGER NOT NULL,
    `id_pesanan` INTEGER NOT NULL,
    `jumlah` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MengelolaBahan` ADD CONSTRAINT `MengelolaBahan_id_stock_fkey` FOREIGN KEY (`id_stock`) REFERENCES `Bahan_Baku`(`id_stock`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MengelolaBahan` ADD CONSTRAINT `MengelolaBahan_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `Users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pesanan` ADD CONSTRAINT `Pesanan_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `Users`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemPesanan` ADD CONSTRAINT `ItemPesanan_id_menu_fkey` FOREIGN KEY (`id_menu`) REFERENCES `Menu`(`id_menu`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemPesanan` ADD CONSTRAINT `ItemPesanan_id_pesanan_fkey` FOREIGN KEY (`id_pesanan`) REFERENCES `Pesanan`(`id_pesanan`) ON DELETE RESTRICT ON UPDATE CASCADE;
