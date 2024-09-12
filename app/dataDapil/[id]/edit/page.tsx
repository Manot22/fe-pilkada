"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const Edit = () => {
  const [nama_partai, setNamaPartai] = useState("");
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8000/api/partai/${id}`)
        .then((response) => {
          const partai = response.data.data;
          setNamaPartai(partai.nama_partai);
        })
        .catch((error) => console.error("Error fetching Partai:", error));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = params.id;
    if (id) {
      try {
        await axios.put(`http://localhost:8000/api/partai/${id}`, {
          nama_partai,
        });
        router.push("/partai");
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
            Edit Dapil
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="nama_partai"
              >
                Nama Dapil
              </label>
              <input
                id="nama_partai"
                type="text"
                value={nama_partai}
                onChange={(e) => setNamaPartai(e.target.value)}
                placeholder="Nama Partai"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="nama_partai"
              >
                Suara Dapil
              </label>
              <input
                id="nama_partai"
                type="text"
                value={nama_partai}
                onChange={(e) => setNamaPartai(e.target.value)}
                placeholder="Nama Partai"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="nama_partai"
              >
                paslon_id
              </label>
              <input
                id="nama_partai"
                type="text"
                value={nama_partai}
                onChange={(e) => setNamaPartai(e.target.value)}
                placeholder="Nama Partai"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
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

export default Edit;
