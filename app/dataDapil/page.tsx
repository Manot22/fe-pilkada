"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Cookies from "js-cookie";

// components
import Layout from "@/components/Layout";

interface dapil {
  id: number;
  nama_dapil: string;
  suara_dapil: string;
  paslon_id: string;
  paslon: {
    id: number;
    nama: string;
    nomor_urut: string;
    image: string;
    suara_paslon: string;
    nama_partai: string;
    created_at: string;
    updated_at: string;
  };
}

const DataDapil = () => {
  const token = Cookies.get("token");
  const [dataDapil, setDataDapil] = useState<dapil[]>([]);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get("http://localhost:8000/api/dapil")
      .then((response) => setDataDapil(response.data.data))
      .catch((error) => console.error("Error fetching paslon items:", error));
  }, []);

  const deleteDapil = (id: number) => {
    axios
      .delete(`http://localhost:8000/api/dapil/${id}`)
      .then(() =>
        setDataDapil(dataDapil.filter((dataDapil) => dataDapil.id !== id))
      )
      .catch((error) => console.error("Error deleting paslon:", error));
    alert("hapus data berhasil");
  };
  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
              Data Dapil
            </h1>
            <div className="mb-6">
              <Link href="dataDapil/add">
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                  Tambah Dapil
                </button>
              </Link>
            </div>
            {dataDapil.length > 0 ? (
              <ul>
                {dataDapil.map((item) => (
                  <li
                    key={item.id}
                    className="bg-gray-50 p-4 mb-4 rounded-lg shadow-sm flex items-center justify-between"
                  >
                    <div className="flex flex-col">
                      <p className="text-black">
                        Nama Dapil: {item.nama_dapil}
                      </p>
                      <p className="text-gray-600">
                        Suara Dapil: {item.suara_dapil}
                      </p>
                      <p className="text-gray-600">
                        Paslon ID: {item.paslon.nama}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Link href={`/dataDapil/${item.id}/edit`}>
                        <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => deleteDapil(item.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Hapus dari Daftar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="font-bold flex justify-center items-center">
                Daftar Dapil Kosong.
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default DataDapil;
