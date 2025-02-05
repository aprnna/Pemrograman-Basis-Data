"use client";
import TopContent from "@/components/top-content";
import TableMenu from "./TableMenu";
import Head from "@/components/head";
import { Button } from "@/components/Button";
import Modal from "@/components/modal2";
import { useDisclosure } from "@heroui/modal";
import { useState } from "react";
import { toast } from "react-toastify";
import FormMenu from "./formMenu";

import dynamic from "next/dynamic";
const PDFDocument = dynamic(() => import("@/components/pdf/myDocument"), {
  ssr: false,
});

const tableHeaders = [
  {
    key: "nama",
    label: "Nama Makanan",
    render: (value: any) => value,
  },
  {
    key: "harga",
    label: "Harga",
    render: (value: any) => value,
  },
  {
    key: "kategori",
    label: "Kategori",
    render: (value: any) => value,
  },
  {
    key: "tersedia",
    label: "Tersedia",
    render: (value: any) => (value ? "Ya" : "Tidak"),
  },
];

export default function Page() {
  const modal = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [dataExport, setDataExport] = useState([]);

  async function handleSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);

    setLoading(true);
    const response = await fetch("/api/menu", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) toast.error("Gagal menambahkan Menu");
    else toast.success("Berhasil menambahkan Menu");
    setLoading(false);
    modal.onClose();
    window.location.reload();
  }

  return (
    <div className="w-full h-screen bg-slate-50 flex flex-col">
      <TopContent />
      {/* <TableMenu /> */}
      <Head>
        <PDFDocument
          button="Export Menu"
          data={dataExport}
          nameFile="Report-Menu"
          tableHeaders={tableHeaders}
          titleDocument="Menu"
        />
        <Button onPress={modal.onOpen}>Tambah Menu</Button>
      </Head>
      <Modal
        btnActionTitle="Simpan"
        isOpen={modal.isOpen}
        loading={loading}
        submit={handleSubmit}
        title="Tambah Menu"
        onOpenChange={modal.onOpenChange}
        sizeModal="xl"
      >
        <FormMenu />
      </Modal>
      <div className="flex overflow-hidden">
        <div className="flex-1  flex flex-row overflow-auto">
          <TableMenu setDataExport={setDataExport} />
        </div>
      </div>
    </div>
  );
}
