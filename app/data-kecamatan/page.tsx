"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Cookies from "js-cookie";

// components
import Layout from "@/components/Layout";

interface kecamatan {
  id: number;
  nama_kecamatan: string;
  suara_kecamatan: string;
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
  dapil_id: string;
  dapil: {
    nama_dapil: string;
    suara_dapil: string;
  };
}

const DataKec = () => {
  const token = Cookies.get("token");
  const [dataKec, setDataKec] = useState<kecamatan[]>([]);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get(`http://localhost:8000/api/kecamatan`)
      .then((response) => {
        console.log(response.data.data); // Log data yang diterima dari API
        setDataKec(response.data.data);
      })
      .catch((error) => console.error("Error fetching data kecamatan:", error));
  }, []);

  const deleteKec = (id: number) => {
    axios
      .delete(`http://localhost:8000/api/kecamatan/${id}`)
      .then(() => setDataKec(dataKec.filter((dataKec) => dataKec.id !== id)))
      .catch((error) => console.error("Error mangahpus Data Kecamatan", error));
  };

  return (
    <Layout>
      {" "}
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
              Data Kecamatan
            </h1>
            <div className="mb-6">
              <Link href="/data-kecamatan/add">
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                  Tambah Kecamatan
                </button>
              </Link>
            </div>
            {dataKec.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Nama Kecamatan</th>
                    <th>Suara Kecamatan</th>
                    <th>Dapil</th>
                    <th>Paslon</th>
                    <th>Fungsi</th>
                  </tr>
                </thead>
                <tbody>
                  {dataKec.map((item) => (
                    <tr key={item.id}>
                      <td>{item.nama_kecamatan}</td>
                      <td>{item.suara_kecamatan}</td>
                      <td>{item.dapil.nama_dapil}</td>
                      <td>{item.paslon.nama}</td>
                      <td className="flex gap-4 justify-center">
                        {" "}
                        <Link href={`/data-kecamatan/${item.id}/edit`}>
                          <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                            Edit
                          </button>
                        </Link>
                        <button
                          onClick={() => deleteKec(item.id)}
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
              <p>Daftar Kecamatan Kosong</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default DataKec;
