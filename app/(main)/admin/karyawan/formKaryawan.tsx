"use client";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import fetchApi from "@/utils/fetchApi";
import { toast } from "react-toastify";
import { useState } from "react";

export default function FormKaryawan({
  initialData,
  isEdit = false,
}: {
  initialData?: any;
  isEdit?: boolean;
}) {
  let { email, username, password, nama, umur, no_telp, role } =
    initialData || {};
  const [data, setData] = useState({
    email: email || "",
    username: username || "",
    password: password || "",
    nama: nama || "",
    umur: umur || 0,
    no_telp: no_telp || "",
    role: role || "",
  });
  const roles = [
    {
      label: "Karyawan",
      value: "laryawan",
    },
    {
      label: "Koki",
      value: "Koki",
    },
    {
      label: "Kasir",
      value: "Kasir",
    },
  ];

  return (
    <>
      {!isEdit && (
        <>
          <Input
            required
            label="Email"
            name="email"
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <Input
            required
            label="Username"
            name="username"
            type="text"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
          />
          <Input
            required
            label="Password"
            name="password"
            type="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </>
      )}
      <Input
        required
        label="Nama Lengkap"
        name="nama"
        type="text"
        value={data.nama}
        onChange={(e) => setData({ ...data, nama: e.target.value })}
      />
      <Input
        required
        label="Umur"
        name="umur"
        type="number"
        value={data.umur}
        onChange={(e) => setData({ ...data, umur: e.target.value })}
      />
      <Input
        required
        label="Nomor Handphone"
        name="no_telp"
        type="text"
        value={data.no_telp}
        onChange={(e) => setData({ ...data, no_telp: e.target.value })}
      />
      <Select
        items={roles}
        label="Roles"
        name="role"
        defaultSelectedKeys={[`${data.role}`]}
        onChange={(e) => setData({ ...data, role: e.target.value })}
      >
        {(role) => <SelectItem key={role.value}>{role.label}</SelectItem>}
      </Select>
    </>
  );
}
