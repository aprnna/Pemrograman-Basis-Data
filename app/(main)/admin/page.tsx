"use client";
import TopContent from "@/components/top-content";
import Head from "@/components/head";
import { useEffect, useState } from "react";
import fetchApi from "@/utils/fetchApi";
import TablePemasukan from "./TablePemasukan";
import { formatCurrency } from "@/utils/formatCurrency";
import { RangeCalendar } from "@heroui/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import MyLineChart from "@/components/lineChart";

import dynamic from "next/dynamic";
const PDFDocument = dynamic(() => import("@/components/pdf/myDocument"), {
  ssr: false,
});

interface Data {
  profit: number;
  banyakPelanggan: number;
  rataRataPesananSelesaiDalamJam: number;
}
const tableHeaders = [
  {
    key: "atas_nama",
    label: "Atas Nama",
    render: (value: any) => value,
  },
  {
    key: "banyak_orang",
    label: "Banyak Orang",
    render: (value: any) => value,
  },
  {
    key: "total_harga",
    label: "Total Harga",
    render: (value: any) => value,
  },
  {
    key: "createdAt",
    label: "Dibuat",
    render: (value: any) => new Date(value).toLocaleDateString("id-ID"),
  },
  {
    key: "status",
    label: "Status",
    render: (value: any) => value,
  },
];

export default function Page() {
  const [mothlyProfits, setMonthlyProfits] = useState([]);
  const [dataExport, setDataExport] = useState([]);
  const [data, setData] = useState<Data>({
    profit: 0,
    banyakPelanggan: 0,
    rataRataPesananSelesaiDalamJam: 0,
  });
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({
    start: today(getLocalTimeZone()).add({ weeks: -1 }),
    end: today(getLocalTimeZone()).add({ weeks: 1 }),
  });

  const dataChart = {
    labels: [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ],
    datasets: [
      {
        data: mothlyProfits,
        backgroundColor: "purple",
      },
    ],
  };

  async function getDataChart() {
    const { data } = await fetchApi("/pesanan/profit", "GET");

    setMonthlyProfits(data);
  }

  async function getData() {
    setLoading(true);
    const { data } = await fetchApi("/pesanan/profit", "POST", {
      start: value.start.toString(),
      end: value.end.toString(),
    });

    setData(data);
    setLoading(false);
  }
  useEffect(() => {
    getData();
  }, [value.end]);

  useEffect(() => {
    getDataChart();
  }, []);

  return (
    <div className="w-full h-screen bg-slate-50 flex flex-col">
      <TopContent />
      <Head>
        {dataExport.length > 0 && (
          <PDFDocument
            tableHeaders={tableHeaders}
            data={dataExport}
            titleDocument="Pendapatan"
            nameFile="Report-Pendapatan"
            button="Export Pendapatan"
          />
        )}
      </Head>
      <div className="flex overflow-hidden">
        <div className="flex-1  flex flex-col overflow-auto">
          <section className="flex w-full gap-5 justify-center my-4 px-14">
            <div className="flex justify-center gap-5 h-fit">
              <RangeCalendar
                aria-label="Date (Controlled)"
                value={value}
                onChange={setValue}
              />
            </div>
            <div className="">
              <div className="w-fit flex justify-center h-fit mb-10 bg-white p-4">
                <MyLineChart data={dataChart} />
              </div>
              <div className="flex mx-12 gap-5 h-fit flex-wrap justify-center">
                <div className="rounded-lg p-4 px-8 flex-1 bg-amber-900 text-slate-50">
                  <h1 className="text-foreground-200">Penghasilan</h1>
                  <h1 className="text-lg font-bold">
                    {loading ? "loading..." : formatCurrency(data?.profit)}
                  </h1>
                </div>
                <div className="rounded-lg p-4 px-8 bg-amber-900 text-slate-50">
                  <h1 className="text-foreground-200">Banyak Pelanggan</h1>
                  <h1 className="text-lg font-bold">
                    {loading ? "loading..." : data?.banyakPelanggan + " Orang"}
                  </h1>
                </div>
                <div className="rounded-lg p-4 px-8 bg-amber-900 text-slate-50">
                  <h1 className="text-foreground-200">
                    Rata-Rata Pesanan Selesai
                  </h1>
                  <h1 className="text-lg font-bold">
                    {loading
                      ? "loading..."
                      : data?.rataRataPesananSelesaiDalamJam?.toFixed(2) +
                        " jam"}
                  </h1>
                </div>
              </div>
              <TablePemasukan setDataExport={setDataExport} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
