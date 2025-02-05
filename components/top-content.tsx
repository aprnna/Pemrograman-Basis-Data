"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { useSession, signOut } from "next-auth/react";
import { User } from "@/types/user";

const TopContent = (): JSX.Element => {
  const pathname = usePathname();
  const { data: session, status } = useSession()  
  const userData = session?.user as User

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
    <div className="flex bg-amber-950 text-red-100 justify-between items-center py-2 px-8 ">
      <div className="flex gap-5 items-center">
        {/* <button className="bg-orange-900 p-2 rounded-lg hover:bg-orange-600 transition-all duration-300">
          <img alt="" src="../arrow-left.svg" />
        </button> */}
        <Breadcrumbs
          itemClasses={{
            separator: "text-white",
          }}
        >
          {pathname == "/bahan_baku/riwayat" && (
            <BreadcrumbItem href="/bahan_baku">
              <h1 className="text-lg text-foreground-200">Bahan Baku</h1>
            </BreadcrumbItem>
          )}
          <BreadcrumbItem href={pathname}>
            <h1 className="text-lg text-white">{currentTitle}</h1>
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="flex gap-4 items-center">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <img
              alt="profile.png"
              className="max-h-12 hover:brightness-90 hover:cursor-pointer"
              src="../profile.png"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="logout" color="danger">
                <button type="submit" onClick={() => signOut()} className="w-full text-left">
                  Log Out
                </button>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <div className="text-md py-2">
          <p className="text-red-300 font-bold">
            { status=='loading'? "Role" : userData?.role }
          </p>
          <p>{ status=='loading'?"Name" : userData?.nama }</p>
        </div>
      </div>
    </div>
  );
};

export default TopContent;
