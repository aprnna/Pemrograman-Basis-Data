"use client";
import { useEffect, useState } from "react";
import fetchApi from "@/utils/fetchApi";
import Table from "@/components/table";
import { Loading } from "@/components/loading";
import { toast } from "react-toastify";
import Modal from "@/components/modal2";
import FormBahan from "./formBahan";
import { useDisclosure } from "@heroui/modal";
import { httpErrorHandler } from "@/utils/httpErrorHandler";

interface EditData {
  id: number;
  nama: string;
  jumlah: number;
  satuan: string;
}

export default function TableBahan({ querySearch, setDataExport }: any) {
  const [bahan, setBahan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [idBahan, setIdBahan] = useState(0);
  const [editData, setEditData] = useState<EditData>({
    id: 0,
    nama: "",
    jumlah: 0,
    satuan: "",
  });
  const [searchData, setSearchData] = useState([]);
  const modal = useDisclosure();
  const modal2 = useDisclosure();

  async function getBahan() {
    setLoading(true);
    const { data } = await fetchApi("/bahan", "GET");

    setDataExport(data);
    setBahan(data);
    setLoading(false);
  }

  const handleEdit = async (id: number) => {
    console.log("Edit item with id:", id);
    const data = bahan.find((item: any) => item.id === id);

    if (data) setEditData(data);
    modal.onOpen();
  };

  const handleEditSubmit = async (e: any) => {
    e.preventDefault();
    setLoadingUpdate(true);
    const formData = new FormData(e.target);
    const dataUpdate = {
      nama: formData.get("nama"),
      jumlah: formData.get("jumlah"),
      satuan: formData.get("satuan"),
    };

    await fetchApi(`/bahan/${editData.id}`, "PUT", dataUpdate)
      .then((response) => {
        toast.success(response.message);
      })
      .catch(httpErrorHandler);

    modal.onClose();
    setLoadingUpdate(false);
    getBahan();
  };

  const handleDelete = async (id: number) => {
    console.log("Delete item with id:", id);
    setIdBahan(id);
    modal2.onOpen();
  };
  const handleDeleteSubmit = async () => {
    setLoadingDelete(true);
    const response = await fetchApi(`/bahan/${idBahan}`, "DELETE");

    if (response.status !== 200) toast.error("Gagal menghapus Bahan");
    else toast.success("Berhasil menghapus Bahan");
    modal2.onClose();
    setLoadingDelete(false);
    getBahan();
  };

  useEffect(() => {
    getBahan();
  }, []);

  useEffect(() => {
    const filteredData = bahan.filter((item: any) =>
      item.nama.toLowerCase().includes(querySearch.toLowerCase())
    );

    setSearchData(filteredData);
  }, [querySearch]);

  const columns = [
    { key: "nama", label: "Nama Bahan" },
    { key: "jumlah", label: "Jumlah" },
    { key: "satuan", label: "Satuan" },
    { key: "action", label: "Action" },
  ];

  return (
    <div className="w-full h-auto">
      {/* <h1 className="text-2xl font-bold">Menu</h1> */}
      {loading ? (
        <Loading />
      ) : (
        <>
          <Table
            columns={columns}
            data={querySearch == "" ? bahan : searchData}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
          <Modal
            btnActionTitle="Simpan"
            isOpen={modal.isOpen}
            loading={loadingUpdate}
            submit={handleEditSubmit}
            title="Edit Bahan Baku"
            onOpenChange={modal.onOpenChange}
            sizeModal="xl"
          >
            <FormBahan initialData={editData} />
          </Modal>
          <Modal
            isOpen={modal2.isOpen}
            onOpenChange={modal2.onOpenChange}
            btnActionTitle="Delete"
            title="Delete Bahan Baku"
            loading={loadingDelete}
            submit={handleDeleteSubmit}
          >
            <h1>Apakah kamu yakin untuk menghapus ini?</h1>
          </Modal>
        </>
      )}
    </div>
  );
}
