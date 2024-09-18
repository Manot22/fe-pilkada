"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Cookies from "js-cookie";

const EditKecamatan = () => {
  const [nama_tps, setNamaTps] = useState("");
  const [suara_tps, setSuaraTps] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [daftarPaslon, setDaftarPaslon] = useState([]);
  const [selectedPaslon, setSelectedPaslon] = useState<number | null>(null);
  const [daftarDesa, setDaftarDesa] = useState([]);
  const [selectedDesa, setSelectedDesa] = useState<number | null>(null);
  const params = useParams();
  const router = useRouter();
  const token = Cookies.get("token");

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const id = params.id;
    if (id) {
      axios
        .get(`http://localhost:8000/api/tps/${id}`)
        .then((response) => {
          const tps = response.data.data;
          setNamaTps(tps.nama_tps);
          setSuaraTps(tps.suara_tps);
        })
        .catch((error) => console.error("Error fetching TPS:", error));
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
      .get(`http://localhost:8000/api/desa`)
      .then((daftarDesa) => setDaftarDesa(daftarDesa.data.data))
      .catch((error) => console.error("Error fetching desa items:", error));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = params.id;
    if (id) {
      try {
        await axios.put(`http://localhost:8000/api/tps/${id}`, {
          nama_tps,
          suara_tps,
          image,
          paslon_id: selectedPaslon,
          desa_id: selectedDesa,
        });
        router.push("/data-tps");
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
                htmlFor="nama_tps"
              >
                Nama Kecamatan
              </label>
              <input
                id="nama_tps"
                type="text"
                value={nama_tps}
                onChange={(e) => setNamaTps(e.target.value)}
                placeholder="Nama Kecamatan"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="suara_tps"
              >
                Suara TPS
              </label>
              <input
                id="suara_tps"
                type="number"
                value={suara_tps}
                onChange={(e) => setSuaraTps(e.target.value)}
                placeholder="Suara TPS"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="suara_tps"
              >
                Masukkan C1
              </label>
              <div>
                <input
                  id="image"
                  type="file"
                  onChange={(e) =>
                    setImage(e.target.files ? e.target.files[0] : null)
                  }
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  accept=".jpeg,.jpg,.png,.gif"
                  placeholder="Masukkan C1"
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
                  htmlFor="Nama Desa"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Pilih Nama Desa
                </label>
                <select
                  value={selectedDesa || ""}
                  onChange={(e) => setSelectedDesa(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                >
                  <option value="">Pilih Nama Desa</option>
                  {daftarDesa.length > 0 ? (
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    daftarDesa.map((desa: any) => {
                      //   console.log("paslon", paslon);

                      return (
                        <option key={desa.id} value={desa.id}>
                          {desa.nama_desa}
                        </option>
                      );
                    })
                  ) : (
                    <option value="">Tidak Ada Data Desa</option>
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
