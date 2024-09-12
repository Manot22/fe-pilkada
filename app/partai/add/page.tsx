/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Create = () => {
  const [nama_partai, setNamaPartai] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/partai", {
        nama_partai,
      });
      router.push("/partai");
    } catch (error) {
      console.error("Error creating Partai:", error);
    }
  };

  //   console.log('daftarJenisPengeluaran', daftarJenisPengeluaran);
  //   console.log('daftarJenisPengeluaran lenght', daftarJenisPengeluaran.length);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Tambah Partai
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="nama_partai"
              className="block text-gray-700 font-medium mb-1"
            >
              Nama Partai
            </label>
            <input
              id="nama_partai"
              type="text"
              value={nama_partai}
              onChange={(e) => setNamaPartai(e.target.value)}
              placeholder="Nama Partai"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-lg px-4 py-2 shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Tambah
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
