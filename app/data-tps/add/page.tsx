/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const TambahTps = () => {
  const [nama_tps, setNamaTps] = useState("");
  const [suara_tps, setSuaraTps] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [daftarDesa, setDaftarDesa] = useState([]);
  const [selectedDesa, setSelectedDesa] = useState<number | null>(null);
  const [daftarPaslon, setDaftarPaslon] = useState([]);
  const [selectedPaslon, setSelectedPaslon] = useState<number | null>(null);
  const token = Cookies.get("token");
  const router = useRouter();

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get("http://localhost:8000/api/desa")
      .then((daftarDesa) => setDaftarDesa(daftarDesa.data.data))
      .catch((error) => console.error("error fetching data desa", error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/paslon")
      .then((daftarPaslon) => setDaftarPaslon(daftarPaslon.data.data))
      .catch((error) => console.error("error fetching data paslon", error));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image");
      return;
    }
    try {
      // Buat FormData untuk mengirim file dan data lainnya
      const formData = new FormData();
      formData.append("nama_tps", nama_tps); // append nama
      formData.append("suara_tps", suara_tps); // append nomor_urut
      formData.append("image", image);
      formData.append("paslon_id", selectedPaslon);
      formData.append("desa_id", selectedDesa);
      // Kirim request dengan axios
      await axios.post("http://localhost:8000/api/tps", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Pastikan header ini diset
        },
      });
      router.push("/data-tps");
    } catch (error) {
      console.error("gagal nambah data Tps:", error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Tambah Data TPS
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="nama_tps"
              className="block text-gray-700 font-medium mb-1"
            >
              Nama TPS
            </label>
            <input
              id="nama_tps"
              type="text"
              value={nama_tps}
              onChange={(e) => setNamaTps(e.target.value)}
              placeholder="Nama TPS"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="suara_tps"
              className="block text-gray-700 font-medium mb-1"
            >
              Suara TPS
            </label>
            <input
              id="suara_tps"
              type="number"
              value={suara_tps}
              onChange={(e) => setSuaraTps(e.target.value)}
              placeholder="Suara TPS"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div>
            <input
              id="image"
              type="file"
              onChange={(e) =>
                setImage(e.target.files ? e.target.files[0] : null)
              }
              required
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              accept=".jpeg,.jpg,.png,.gif"
              placeholder="Masukkan Foto"
            />
          </div>
          <div>
            <label
              htmlFor="desa_id"
              className="block text-gray-700 font-medium mb-1"
            >
              Desa
            </label>
            <select
              value={selectedDesa || ""}
              onChange={(e) => setSelectedDesa(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="">Pilih Nama Desa</option>
              {daftarDesa.length > 0 ? (
                daftarDesa.map((desa: any) => {
                  return (
                    <option key={desa.id} value={desa.id}>
                      {desa.nama_desa}
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
export default TambahTps;
