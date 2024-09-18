/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const DesaCreate = () => {
  const [nama_desa, setNamaDesa] = useState("");
  const [suara_desa, setSuaraDesa] = useState("");
  const [daftarKecamatan, setDaftarKecamatan] = useState([]);
  const [selectedKecamatan, setSelectedKecamatan] = useState<number | null>(
    null
  );
  const [daftarPaslon, setDaftarPaslon] = useState([]);
  const [selectedPaslon, setSelectedPaslon] = useState<number | null>(null);
  const token = Cookies.get("token");
  const router = useRouter();

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get("http://localhost:8000/api/kecamatan")
      .then((daftarKecamatamn) =>
        setDaftarKecamatan(daftarKecamatamn.data.data)
      )
      .catch((error) => console.error("error fetching data kecamatan", error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/paslon")
      .then((daftarPaslon) => setDaftarPaslon(daftarPaslon.data.data))
      .catch((error) => console.error("error fetching data paslon", error));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/desa", {
        nama_desa,
        suara_desa,
        kecamatan_id: selectedKecamatan,
        paslon_id: selectedPaslon,
      });
      router.push("/data-desa");
    } catch (error) {
      console.error("error manambah data Desa", error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Tambah Data Desa
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="nama_desa"
              className="block text-gray-700 font-medium mb-1"
            >
              Nama Desa
            </label>
            <input
              id="nama_desa"
              type="text"
              value={nama_desa}
              onChange={(e) => setNamaDesa(e.target.value)}
              placeholder="Nama Dapil"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="suara_desa"
              className="block text-gray-700 font-medium mb-1"
            >
              Suara Desa
            </label>
            <input
              id="suara_desa"
              type="number"
              value={suara_desa}
              onChange={(e) => setSuaraDesa(e.target.value)}
              placeholder="Suara Dapil"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div>
            <label
              htmlFor="paslon_id"
              className="block text-gray-700 font-medium mb-1"
            >
              Kecamatan
            </label>
            <select
              value={selectedKecamatan || ""}
              onChange={(e) => setSelectedKecamatan(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="">Pilih Nama Kecamatan</option>
              {daftarKecamatan.length > 0 ? (
                daftarKecamatan.map((kecamatan: any) => {
                  return (
                    <option key={kecamatan.id} value={kecamatan.id}>
                      {kecamatan.nama_kecamatan}
                    </option>
                  );
                })
              ) : (
                <option value="">Tidak ada Data Kecamatan</option>
              )}
            </select>
          </div>
          <div>
            <label
              htmlFor="paslon_id"
              className="block text-gray-700 font-medium mb-1"
            >
              Paslon
            </label>
            <select
              value={selectedPaslon || ""}
              onChange={(e) => setSelectedPaslon(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="">Pilih Nama Paslon</option>
              {daftarPaslon.length > 0 ? (
                daftarPaslon.map((paslon: any) => {
                  return (
                    <option key={paslon.id} value={paslon.id}>
                      {paslon.nama}
                    </option>
                  );
                })
              ) : (
                <option value="">Tidak ada Data Paslon</option>
              )}
            </select>
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
export default DesaCreate;
