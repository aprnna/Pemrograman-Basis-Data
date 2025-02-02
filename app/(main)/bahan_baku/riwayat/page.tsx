"use client";
import { useState } from "react";
import TopContent from "@/components/top-content";
import TableRiwayatBahan from "./TableRiwayatBahan";
import Head from "@/components/head";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { MyDocument } from "@/components/pdf/myDocument";
import { Button } from "@/components/Button";
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
        <PDFDownloadLink
          document={
            <MyDocument
              title="Log Bahan Baku"
              tableHeaders={tableHeaders}
              data={dataExport}
            />
          }
          fileName="Report-Log-Bahan-Baku.pdf"
        >
          <Button>Export Log</Button>
        </PDFDownloadLink>
      </Head>
      <div className="flex overflow-hidden">
        <div className="flex-1  flex flex-row overflow-auto">
          <TableRiwayatBahan setDataExport={setDataExport} />
        </div>
      </div>
    </div>
  );
}
