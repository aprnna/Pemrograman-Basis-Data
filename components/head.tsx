"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";

interface HeadProps {
  children?: React.ReactNode;
}

export default function Head({ children }: HeadProps) {
  const pathname = usePathname();
  const pathTitles: { [key: string]: string } = {
    "/": "Home",
    "/menu": "Manajemen Menu",
    "/pesanan": "Pesanan",
    "/pesanan/add": "Menu",
    "/pesanan/ongoing": "Pesanan Diproses",
    "/bahan_baku": "Bahan Baku",
    "/bahan_baku/riwayat": "Riwayat Bahan Baku",
    "/admin": "Laporan",
    "/admin/karyawan": "Kelola Karyawan",
  };

  const currentTitle = pathTitles[pathname] || "Menu";

  return (
    <>
      <div className="flex text-4xl font-bold py-4 px-12 justify-between ">
        <h1>{currentTitle}</h1>
        {children && (
          <div className="flex items-center justify-center gap-4">
            {children}
          </div>
        )}
      </div>
      <div className="min-w-96 border-t-2 border-dashed border-gray-400 mb-4  " />
    </>
  );
}
