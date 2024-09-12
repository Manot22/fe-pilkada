"use client";

// import axios from "axios";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

const KecamatanCreate = () => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Tambah Data Kecamatan
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="nama_dapil"
              className="block text-gray-700 font-medium mb-1"
            >
              Nama Kecamatan
            </label>
            <input
              id="nama_dapil"
              type="text"
              // value=
              // onChange={(e) => setNama(e.target.value)}
              placeholder="Nama Dapil"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="suara_dapil"
              className="block text-gray-700 font-medium mb-1"
            >
              Suara Kecamatan
            </label>
            <input
              id="suara_dapil"
              type="number"
              // value={suara_dapil}
              // onChange={(e) => setNomorUrut(e.target.value)}
              placeholder="Suara Dapil"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="paslon_id"
              className="block text-gray-700 font-medium mb-1"
            >
              dapil_id
            </label>
            <input
              id="dapil_id"
              type="text"
              // onChange={(e) =>
              //   setImage(e.target.files ? e.target.files[0] : null)
              // }
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Paslon"
            />
          </div>
          <div>
            <label
              htmlFor="paslon_id"
              className="block text-gray-700 font-medium mb-1"
            >
              paslon_id
            </label>
            <input
              id="text"
              type="text"
              // onChange={(e) =>
              //   setImage(e.target.files ? e.target.files[0] : null)
              // }
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Paslon"
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
export default KecamatanCreate;
