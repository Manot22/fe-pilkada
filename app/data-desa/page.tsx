"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Cookies from "js-cookie";

// components
import Layout from "@/components/Layout";

interface desa {
  id: number;
  nama_desa: string;
  suara_desa: string;
  kecamatan_id: string;
  kecamatan: {
    id: number;
    nama_kecamatan: string;
    suara_kecamatan: string;
  };
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

const DataDesa = () => {
  const token = Cookies.get("token");
  const [dataDesa, setDataDesa] = useState<desa[]>([]);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get(`http://localhost:8000/api/desa`)
      .then((response) => {
        console.log(response.data.data);
        setDataDesa(response.data.data);
      })
      .catch((error) => console.error("Error fetching data kecamatan:", error));
  }, []);

  const deleteDesa = (id: number) => {
    axios
      .delete(`http://localhost:8000/api/desa/${id}`)
      .then(() =>
        setDataDesa(dataDesa.filter((dataDesa) => dataDesa.id !== id))
      )
      .catch((error) => console.error("Error menghapus Data Desa", error));
  };

  return (
    <Layout>
      {" "}
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
              Data Desa
            </h1>
            <div className="mb-6">
              <Link href="/data-desa/add">
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                  Tambah Desa
                </button>
              </Link>
            </div>
            {dataDesa.length > 0 ? (
              <table>
                <thead className="bg-indigo-600/95 text-white">
                  <tr>
                    <th>Nama Desa</th>
                    <th>Suara Desa</th>
                    <th>Kecamatan</th>
                    <th>Paslon</th>
                    <th>Fungsi</th>
                  </tr>
                </thead>
                <tbody>
                  {dataDesa.map((item) => (
                    <tr key={item.id}>
                      <td>{item.nama_desa}</td>
                      <td>{item.suara_desa}</td>
                      <td>{item.kecamatan.nama_kecamatan}</td>
                      <td>{item.paslon.nama}</td>
                      <td className="flex gap-4 justify-center">
                        {" "}
                        <Link href={`/data-desa/${item.id}/edit`}>
                          <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                            Edit
                          </button>
                        </Link>
                        <button
                          onClick={() => deleteDesa(item.id)}
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Nama Desa Tidak ada</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default DataDesa;
