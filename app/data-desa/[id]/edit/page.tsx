"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Cookies from "js-cookie";

const EditDesa = () => {
  const [nama_desa, setNamaDesa] = useState("");
  const [suara_desa, setSuaraDesa] = useState("");
  const [dafatarKecamatan, setDaftarKecamatan] = useState([]);
  const [selectedKecamatan, setSelectedKecamatan] = useState<number | null>(
    null
  );
  const [daftarPaslon, setDaftarPaslon] = useState([]);
  const [selectedPaslon, setSelectedPaslon] = useState<number | null>(null);
  const params = useParams();
  const router = useRouter();
  const token = Cookies.get("token");

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get(`http://localhost:8000/api/paslon`)
      .then((daftarPaslon) => setDaftarPaslon(daftarPaslon.data.data))
      .catch((error) => console.error("Error fetching dapil items:", error));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/kecamatan`)
      .then((dafatarKecamatan) =>
        setDaftarKecamatan(dafatarKecamatan.data.data)
      )
      .catch((error) =>
        console.error("Error fetching kecamatan items:", error)
      );
  }, []);

  useEffect(() => {
    const id = params.id;
    if (id) {
      axios
        .get(`http://localhost:8000/api/desa/${id}`)
        .then((response) => {
          const desa = response.data.data;
          setNamaDesa(desa.nama_desa);
          setSuaraDesa(desa.suara_desa);
        })
        .catch((error) => console.error("Error fetching Desa:", error));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = params.id;
    if (id) {
      try {
        await axios.put(`http://localhost:8000/api/desa/${id}`, {
          nama_desa,
          suara_desa,
          kecamatan_id: selectedKecamatan,
          paslon_id: selectedPaslon,
        });
        router.push("/data-desa");
      } catch (error) {
        console.error("Error updating Partai:", error);
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
            Edit Data Desa
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="nama_desa"
              >
                Nama Desa
              </label>
              <input
                id="nama_desa"
                type="text"
                value={nama_desa}
                onChange={(e) => setNamaDesa(e.target.value)}
                placeholder="Nama Desa"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <label
              className="block text-gray-700 text-sm font-medium mb-1"
              htmlFor="suara_desa"
            >
              Suara Desa
            </label>
            <input
              id="suara_desa"
              type="text"
              value={suara_desa}
              onChange={(e) => setSuaraDesa(e.target.value)}
              placeholder="Suara Desa"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            <div>
              <label
                htmlFor="Nama Paslon"
                className="block text-gray-700 font-medium mb-1"
              >
                Pilih Nama Kecamatan
              </label>
              <select
                value={selectedKecamatan || ""}
                onChange={(e) => setSelectedKecamatan(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              >
                <option value="">Pilih Nama Kecamatan</option>
                {dafatarKecamatan.length > 0 ? (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  dafatarKecamatan.map((kecamatan: any) => {
                    //   console.log("paslon", paslon);

                    return (
                      <option key={kecamatan.id} value={kecamatan.id}>
                        {kecamatan.nama_kecamatan}
                      </option>
                    );
                  })
                ) : (
                  <option value="">Tidak Ada Data Kecamatan</option>
                )}
              </select>
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

export default EditDesa;
