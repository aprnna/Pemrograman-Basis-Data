"use client";
import TopContent from "@/components/top-content";
import SearchBar from "@/components/searchBar";
import Head from "@/components/head";
import { Button } from "@/components/Button";
import { useDisclosure } from "@heroui/modal";
import Modal from "@/components/modal2";
import { useState } from "react";
import fetchApi from "@/utils/fetchApi";
import { toast } from "react-toastify";
import SearchBar2 from "@/components/SearchBar2";
import FormKaryawan from "./formKaryawan";
import TableKaryawan from "./TableKaryawan";

import dynamic from "next/dynamic";
const PDFDocument = dynamic(() => import("@/components/pdf/myDocument"), {
  ssr: false,
});

const tableHeaders = [
  {
    key: "nama",
    label: "Nama karyawan",
    render: (value: any) => value,
  },
  {
    key: "umur",
    label: "Umur",
    render: (value: any) => value,
  },
  {
    key: "no_telp",
    label: "Nomor Telp",
    render: (value: any) => value,
  },
  {
    key: "role",
    label: "Jabatan",
    render: (value: any) => value,
  },
];

export default function Page() {
  const modal = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [dataExport, setDataExport] = useState([]);
  const [querySearch, setQuerySearch] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = {
      email: formData.get("email"),
      username: formData.get("username"),
      password: formData.get("password"),
      nama: formData.get("nama"),
      umur: parseInt(formData.get("umur") as string),
      no_telp: formData.get("no_telp"),
      role: formData.get("role"),
    };

    try {
      await fetchApi("/auth/register", "POST", data);
      modal.onClose();
      setLoading(false);

      return toast.success("BERHASIL REGISTER");
    } catch (error: any) {
      modal.onClose();
      setLoading(false);

      return toast.error(error.message || "GAGAL REGISTER");
    }
  }

  return (
    <div className="w-full h-screen bg-slate-50 flex flex-col">
      <TopContent />
      <Head>
        {dataExport.length > 0 && (
          <PDFDocument
            tableHeaders={tableHeaders}
            data={dataExport}
            titleDocument="Karyawan"
            nameFile="Report-karyawan"
            button="Export Karyawan"
          />
        )}
        <Button onPress={modal.onOpen}>Tambah Karyawan</Button>
      </Head>
      <SearchBar2 setSearchQuery={setQuerySearch} />
      <Modal
        btnActionTitle="Simpan"
        isOpen={modal.isOpen}
        loading={loading}
        submit={handleSubmit}
        title="Tambah Karyawan"
        onOpenChange={modal.onOpenChange}
        sizeModal="xl"
      >
        <FormKaryawan />
      </Modal>
      <div className="flex overflow-hidden">
        <div className="flex-1  flex flex-row overflow-auto">
          <TableKaryawan
            querySearch={querySearch}
            setDataExport={setDataExport}
          />
        </div>
      </div>
    </div>
  );
}
