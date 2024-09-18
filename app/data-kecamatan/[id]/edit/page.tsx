"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Cookies from "js-cookie";

const EditKecamatan = () => {
  const [nama_kecamatan, setNamaKecamatan] = useState("");
  const [suara_kecamatan, setSuaraKecamatan] = useState("");
  const [daftarPaslon, setDaftarPaslon] = useState([]);
  const [selectedPaslon, setSelectedPaslon] = useState<number | null>(null);
  const [daftarDapil, setDaftarDapil] = useState([]);
  const [selectedDapil, setSelectedDapil] = useState<number | null>(null);
  const params = useParams();
  const router = useRouter();
  const token = Cookies.get("token");

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const id = params.id;
    if (id) {
      axios
        .get(`http://localhost:8000/api/kecamatan/${id}`)
        .then((response) => {
          const kecamatan = response.data.data;
          setNamaKecamatan(kecamatan.nama_kecamatan);
          setSuaraKecamatan(kecamatan.suara_kecamatan);
        })
        .catch((error) => console.error("Error fetching Partai:", error));
    }
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/paslon`)
      .then((daftarPaslon) => setDaftarPaslon(daftarPaslon.data.data))
      .catch((error) => console.error("Error fetching Paslon items:", error));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/dapil`)
      .then((daftarDapil) => setDaftarDapil(daftarDapil.data.data))
      .catch((error) => console.error("Error fetching dapil items:", error));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = params.id;
    if (id) {
      try {
        await axios.put(`http://localhost:8000/api/kecamatan/${id}`, {
          nama_kecamatan,
          suara_kecamatan,
          paslon_id: selectedPaslon,
          dapil_id: selectedDapil,
        });
        router.push("/data-kecamatan");
      } catch (error) {
        console.error("Error updating Kecamatan:", error);
      }
    }
  };

  // console.log('daftarJenisPengeluaran', daftarJenisPengeluaran);
  // console.log('daftarJenisPengeluaran lenght', daftarJenisPengeluaran.length);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Edit Data Kecamatan
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="nama_kecamatan"
              >
                Nama Kecamatan
              </label>
              <input
                id="nama_kecamatan"
                type="text"
                value={nama_kecamatan}
                onChange={(e) => setNamaKecamatan(e.target.value)}
                placeholder="Nama Kecamatan"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="suara_kecamatan"
              >
                Suara Kecamatan
              </label>
              <input
                id="suara_kecamatan"
                type="number"
                value={suara_kecamatan}
                onChange={(e) => setSuaraKecamatan(e.target.value)}
                placeholder="Suara Kecamatan"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
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
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
              <div>
                <label
                  htmlFor="Nama Dapil"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Pilih Nama Dapil
                </label>
                <select
                  value={selectedDapil || ""}
                  onChange={(e) => setSelectedDapil(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                >
                  <option value="">Pilih Nama Dapil</option>
                  {daftarDapil.length > 0 ? (
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    daftarDapil.map((dapil: any) => {
                      //   console.log("paslon", paslon);

                      return (
                        <option key={dapil.id} value={dapil.id}>
                          {dapil.nama_dapil}
                        </option>
                      );
                    })
                  ) : (
                    <option value="">Tidak Ada Data Dapil</option>
                  )}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditKecamatan;
