"use client";
import { useState } from "react";
import TopContent from "@/components/top-content";
import TableRiwayatBahan from "./TableRiwayatBahan";
import Head from "@/components/head";

import dynamic from "next/dynamic";
const PDFDocument = dynamic(() => import("@/components/pdf/myDocument"), {
  ssr: false,
});

const tableHeaders = [
  {
    key: "nama_user",
    label: "Nama Karyawan",
    render: (value: any) => value,
  },
  {
    key: "nama_bahan",
    label: "Nama Bahan",
    render: (value: any) => value,
  },
  {
    key: "jumlah",
    label: "Jumlah",
    render: (value: any) => value,
  },
  {
    key: "createdAt",
    label: "Tanggal",
    render: (value: any) => new Date(value).toLocaleDateString("id-ID"),
  },
  {
    key: "proses",
    label: "Proses",
    render: (value: any) => value,
  },
];

export default function Page() {
  const [dataExport, setDataExport] = useState([]);

  return (
    <div className="w-full h-screen bg-slate-50 flex flex-col">
      <TopContent />
      <Head>
        <PDFDocument
          data={dataExport}
          button="Export Log"
          nameFile="Report-Log-Bahan-Baku"
          tableHeaders={tableHeaders}
          titleDocument="Log Bahan Baku"
        />
      </Head>
      <div className="flex overflow-hidden">
        <div className="flex-1  flex flex-row overflow-auto">
          <TableRiwayatBahan setDataExport={setDataExport} />
        </div>
      </div>
    </div>
  );
}
