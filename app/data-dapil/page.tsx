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
              <Link href="data-dapil/add">
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                  Tambah Dapil
                </button>
              </Link>
            </div>
            {dataDapil.length > 0 ? (
              <table>
                <thead className="bg-indigo-600/95 text-white">
                  <tr>
                    <th>Nama Dapil</th>
                    <th>Suara Dapil</th>
                    <th>Paslon</th>
                    <th>Fungsi</th>
                  </tr>
                </thead>
                <tbody>
                  {dataDapil.map((item) => (
                    <tr key={item.id}>
                      <td>{item.nama_dapil}</td>
                      <td>{item.suara_dapil}</td>
                      <td>{item.paslon.nama}</td>
                      <td className="flex gap-4 justify-center">
                        {" "}
                        <Link href={`/data-dapil/${item.id}/edit`}>
                          <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                            Edit
                          </button>
                        </Link>
                        <button
                          onClick={() => deleteDapil(item.id)}
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
              <p>Daftar dapil tidak tersedia</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default DataDapil;
