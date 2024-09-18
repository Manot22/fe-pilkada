"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Cookies from "js-cookie";

// components
import Layout from "@/components/Layout";
import Image from "next/image";

interface tps {
  id: number;
  nama_tps: string;
  suara_tps: string;
  image: string;
  desa_id: string;
  desa: {
    id: number;
    nama_desa: string;
    suara_desa: string;
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

const DataTps = () => {
  const token = Cookies.get("token");
  const [dataTps, setDataTps] = useState<tps[]>([]);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get(`http://localhost:8000/api/tps`)
      .then((response) => {
        console.log(response.data.data); // Log data yang diterima dari API
        setDataTps(response.data.data);
      })
      .catch((error) => console.error("Error fetching data TPS:", error));
  }, []);

  const deleteTps = (id: number) => {
    axios
      .delete(`http://localhost:8000/api/tps/${id}`)
      .then(() => setDataTps(dataTps.filter((dataTps) => dataTps.id !== id)))
      .catch((error) => console.error("Error menghapus Data Desa", error));
  };

  return (
    <Layout>
      {" "}
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
              Data TPS
            </h1>
            <div className="mb-6">
              <Link href="/data-tps/add">
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                  Tambah TPS
                </button>
              </Link>
            </div>
            {dataTps.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Nama TPS</th>
                    <th>Suara TPS</th>
                    <th>Gambar</th>
                    <th>Desa</th>
                    <th>Paslon</th>
                    <th>Fungsi</th>
                  </tr>
                </thead>
                <tbody>
                  {dataTps.map((item) => (
                    <tr key={item.id}>
                      <td>{item.nama_tps}</td>
                      <td>{item.suara_tps}</td>
                      <td>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_BACKEND}/storage/images/${item.image}`}
                          width={100}
                          height={100}
                          className="w-full p-6 max-h-64 object-cover rounded-lg"
                          alt="..."
                        />
                      </td>
                      <td>{item.desa.nama_desa}</td>
                      <td>{item.paslon.nama}</td>
                      <td className="flex flex-col gap-8 justify-center ">
                        {" "}
                        <Link href={`/data-tps/${item.id}/edit`}>
                          <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                            Edit
                          </button>
                        </Link>
                        <button
                          onClick={() => deleteTps(item.id)}
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
              <p>Data TPS Tidak ada</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DataTps;
