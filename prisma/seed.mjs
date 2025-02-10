import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcrypt-ts";

const prisma = new PrismaClient();

async function main() {
  // Hapus data existing
  await prisma.item_pesanan.deleteMany();
  await prisma.pesanan.deleteMany();
  await prisma.menu.deleteMany();
  await prisma.users.deleteMany();
  await prisma.mengelola_bahan.deleteMany();
  await prisma.bahan_baku.deleteMany();

  const users = await prisma.users.createMany({
    data: [
      {
        nama: "Lutfi Tampubolon",
        password: await hashSync("manager", 10),
        umur: 18,
        role: "Manager",
        no_telp: "089761123131",
        email: "manager@gmail.com",
        username: "manager",
      },
      {
        nama: "Marsudi Hutasoit",
        password: await hashSync("koki", 10),
        umur: 20,
        role: "Koki",
        no_telp: "089766313131",
        email: "koki@gmail.com",
        username: "koki",
      },
      {
        nama: "Tio Bakkara",
        password: await hashSync("karyawan", 10),
        umur: 22,
        role: "Karyawan",
        no_telp: "089766313131",
        email: "karyawan@gmail.com",
        username: "karyawan",
      },
      {
        nama: "Kurniawan Siregar",
        password: await hashSync("kasir", 10),
        umur: 25,
        role: "Kasir",
        no_telp: "089766313131",
        email: "kasir@gmail.com",
        username: "kasir",
      },
    ],
  });

  // Seed Menu
  const menuItems = await prisma.menu.createMany({
    data: [
      {
        nama: "Capcay",
        harga: 17000,
        foto: "https://i.pinimg.com/236x/a2/dd/15/a2dd15ee8670e41b8a577095d4d2c7bc.jpg",
        kategori: "Makanan",
      },
      {
        nama: "Gado-gado",
        harga: 16000,
        foto: "https://i.pinimg.com/236x/39/e0/a4/39e0a4facc0459d6df221258edc0ef34.jpg",
        kategori: "Makanan",
      },
      {
        nama: "Teh Manis",
        harga: 15000,
        foto: "https://i.pinimg.com/236x/45/82/3d/45823dca0fa5d38121b4b39dcc5c0f54.jpg",
        kategori: "Minuman",
      },
      {
        nama: "Ayam Goreng",
        harga: 25000,
        foto: "https://i.pinimg.com/236x/c0/4f/6f/c04f6f12f10d838a9cce46d1a73739a3.jpg",
        kategori: "Makanan",
      },
      {
        nama: "Sate Ayam",
        harga: 22000,
        foto: "https://i.pinimg.com/236x/3d/54/31/3d54311e5a1689b0d1393d98848b5e78.jpg",
        kategori: "Makanan",
      },
      {
        nama: "Ikan Bakar",
        harga: 35000,
        foto: "https://i.pinimg.com/236x/a3/24/d5/a324d5330d4bdfc6ae8d3a180c35a74a.jpg",
        kategori: "Makanan",
      },
      {
        nama: "Nasi Goreng",
        harga: 20000,
        foto: "https://i.pinimg.com/736x/d5/d5/0b/d5d50bae235f005cab71d0462178b5cd.jpg",
        kategori: "Makanan",
      },
      {
        nama: "Sayur Asem",
        harga: 14000,
        foto: "https://i.pinimg.com/236x/48/6a/b5/486ab5b5e6d2234142d4942cd7f221b2.jpg",
        kategori: "Makanan",
      },
      {
        nama: "Mie Ayam",
        harga: 15000,
        foto: "https://i.pinimg.com/564x/02/73/7c/02737ced46ba22ab6e21f86aefdbcc28.jpg",
        kategori: "Makanan",
      },
      {
        nama: "Bakso",
        harga: 18000,
        foto: "https://i.pinimg.com/236x/28/f6/da/28f6dac742767af11536256fabf230f2.jpg",
        kategori: "Makanan",
      },
      {
        nama: "Sop Buntut",
        harga: 40000,
        foto: "https://i.pinimg.com/236x/4a/63/21/4a6321b0288bd5b467f5eeb7ccfd23f3.jpg",
        kategori: "Makanan",
      },
      {
        nama: "Es Teh",
        harga: 5000,
        foto: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Iced_Tea_from_flickr.jpg",
        kategori: "Minuman",
      },
      {
        nama: "Jus Jeruk",
        harga: 15000,
        foto: "https://upload.wikimedia.org/wikipedia/commons/0/05/Orangejuice.jpg",
        kategori: "Minuman",
      },
      {
        nama: "Pisang Goreng",
        harga: 10000,
        foto: "https://bellyfull.net/wp-content/uploads/2023/08/Pan-Fried-Bananas-blog-3.jpg",
        kategori: "Cemilan",
      },
      {
        nama: "Tahu Isi",
        harga: 8000,
        foto: "https://www.unileverfoodsolutions.co.id/dam/ufs-id/recipes/Tahu%20Isi%20Kriuk.jpg",
        kategori: "Cemilan",
      },
      {
        nama: "Pudding Coklat",
        harga: 15000,
        foto: "https://everydaypie.com/wp-content/uploads/2024/01/dark-chocolate-pudding-8.jpg",
        kategori: "Lain_lain",
      },
    ],
  });

  const bahan_Baku = await prisma.bahan_baku.createMany({
    data: [
      { nama: "Beras", satuan: "kg", jumlah: 30 },
      { nama: "Bawang", satuan: "kg", jumlah: 5 },
      { nama: "Minyak Goreng", satuan: "ml", jumlah: 500 },
      { nama: "Telur", satuan: "butir", jumlah: 2 },
      { nama: "Daging Ayam", satuan: "gr", jumlah: 650 },
      { nama: "Daging Sapi", satuan: "gr", jumlah: 500 },
      { nama: "Tepung Terigu", satuan: "gr", jumlah: 250 },
      { nama: "Tepung Kanji", satuan: "gr", jumlah: 50 },
      { nama: "Tahu Tempe", satuan: "g", jumlah: 100 },
      { nama: "Tahu", satuan: "gr", jumlah: 200 },
      { nama: "Wortel", satuan: "gr", jumlah: 100 },
      { nama: "Kacang Polong", satuan: "gr", jumlah: 100 },
      { nama: "Seledri", satuan: "gr", jumlah: 20 },
      { nama: "Brokoli", satuan: "gr", jumlah: 100 },
      { nama: "Kembang Kol", satuan: "gr", jumlah: 100 },
    ],
  });

  // Seed Pesanan
  // const pesanan = await prisma.pesanan.create({
  //   data: {
  //     id_user: 4, // ID kasir
  //     no_meja: 1,
  //     total_harga: 15750,
  //     status: 'proses',
  //     banyak_orang: 1,
  //     atas_nama: 'tds',
  //     item_pesanan: {
  //       create: {
  //         id_menu: 106, // ID Teh Manis
  //         jumlah: 1,
  //       },
  //     },
  //   },
  //   include: {
  //     item_pesanan: true,
  //   },
  // });

  console.log({ users, menuItems, bahan_Baku });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
