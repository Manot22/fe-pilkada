/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Create = () => {
  const [nama_dapil, setNamaDapil] = useState("");
  const [suara_dapil, setSuaraDapil] = useState("");
  const [daftarPaslon, setDaftarPaslon] = useState([]);
  const [selectedPaslon, setSelectedPaslon] = useState<number | null>(null);
  const token = Cookies.get("token");
  const router = useRouter();

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get(`http://localhost:8000/api/paslon`)
      .then((daftarPaslon) => setDaftarPaslon(daftarPaslon.data.data))
      .catch((error) => console.error("Error fetching dapil items:", error));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/dapil", {
        nama_dapil,
        suara_dapil,
        paslon_id: selectedPaslon,
      });
      router.push("/dataDapil");
    } catch (error) {
      console.error("Error creating buku:", error);
    }
  };

  //   console.log('daftarPaslon', daftarPaslon);
  //   console.log('daftarPaslon lenght', daftarPaslon.length);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Tambah Dapil
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="nama_dapil"
              className="block text-gray-700 font-medium mb-1"
            >
              Nama Dapil
            </label>
            <input
              id="nama_dapil"
              type="text"
              value={nama_dapil}
              onChange={(e) => setNamaDapil(e.target.value)}
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
              Total Suara Dapil
            </label>
            <input
              id="suara_dapil"
              type="numeric"
              value={suara_dapil}
              onChange={(e) => setSuaraDapil(e.target.value)}
              placeholder="Total Suara Dapil"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="Nama Paslon"
              className="block text-gray-700 font-medium mb-1"
            >
              Pilih Nama Pasangan Calon
            </label>
            <select
              value={selectedPaslon || ""}
              onChange={(e) => setSelectedPaslon(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="">Pilih Nama Paslon</option>
              {daftarPaslon.length > 0 ? (
                daftarPaslon.map((paslon: any) => {
                  //   console.log("paslon", paslon);

                  return (
                    <option key={paslon.id} value={paslon.id}>
                      {paslon.nama}
                    </option>
                  );
                })
              ) : (
                <option value="">Tidak Ada Data Paslon</option>
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

export default Create;
