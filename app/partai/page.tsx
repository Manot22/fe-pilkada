"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface PartaiId {
  id: number;
  nama_partai: string;
}

const Partai = () => {
  const [partai, setPartai] = useState<PartaiId[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/partai`)
      .then((response) => {
        setPartai(response.data.data);
      })
      .catch((error) => console.error("Error fetching partai items:", error));
  }, []);

  const deletePartai = (id: number) => {
    axios
      .delete(`http://localhost:8000/api/partai/${id}`)
      .then(() => setPartai(partai.filter((partai) => partai.id !== id)))
      .catch((error) => console.error("Error deleting partai:", error));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Daftar Partai
          </h1>
          <div className="mb-6">
            <Link href="/partai/create">
              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Tambah Partai
              </button>
            </Link>
          </div>
          {partai.length > 0 ? (
            <ul>
              {partai.map((item) => (
                <li
                  key={item.id}
                  className="bg-gray-50 p-4 mb-4 rounded-lg shadow-sm flex items-center justify-between"
                >
                  <div className="flex flex-col">
                    <h2 className="text-lg font-medium text-gray-900">
                      {item.nama_partai}
                    </h2>
                  </div>
                  <div className="flex space-x-2">
                    <Link href={`/partai/${item.id}/edit`}>
                      <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => deletePartai(item.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Hapus dari Daftar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Daftar kosong.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Partai;
