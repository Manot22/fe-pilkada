"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Layout from "@/components/Layout";

interface PaslonItem {
  id: number;
  nama: string;
  nomor_urut: string;
  image: string;
  slogan: string;
  suara_paslon: string;
  nama_partai: string;
}

const Paslon = () => {
  const [paslon, setPaslon] = useState<PaslonItem[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/paslon`)
      .then((response) => {
        setPaslon(response.data.data);
      })
      .catch((error) => console.error("Error fetching paslon items:", error));
  }, []);

  const deletePasol = (id: number) => {
    axios
      .delete(`http://localhost:8000/api/paslon/${id}`)
      .then(() => setPaslon(paslon.filter((paslon) => paslon.id !== id)))
      .catch((error) => console.error("Error deleting paslon:", error));
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
              Paslon
            </h1>
            <div className="mb-6">
              <Link href="/paslon/add">
                <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                  Tambah Paslon
                </button>
              </Link>
            </div>
            {paslon.length > 0 ? (
              <ul>
                {paslon.map((item) => (
                  <li
                    key={item.id}
                    className="bg-gray-50 p-4 mb-4 rounded-lg shadow-sm flex items-center justify-between"
                  >
                    <div className="flex flex-col">
                      <h2 className="text-lg font-medium text-gray-900">
                       Nama: {item.nama}
                      </h2>
                      <p className="text-gray-600">
                        Nomor Urut: {item.nomor_urut}
                      </p>
                      <p className="text-gray-600">Slogan: {item.slogan}</p>
                      {/* <Image/> */}
                      <p className="text-gray-600">
                        Suara Paslon: {item.suara_paslon}
                      </p>
                      <p className="text-gray-600">
                        Nama Partai: {item.nama_partai}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Link href={`/paslon/${item.id}/edit`}>
                        <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => deletePasol(item.id)}
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
                Daftar Paslon kosong.
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Paslon;
