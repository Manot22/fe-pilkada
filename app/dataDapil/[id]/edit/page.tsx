"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Cookies from "js-cookie";

const Edit = () => {
  const [nama_dapil, setNamaDapil] = useState("");
  const [suara_dapil, setSuaraDapil] = useState("");
  const [daftarPaslon, setDaftarPaslon] = useState([]);
  const [selectedPaslon, setSelectedPaslon] = useState<number | null>(null);
  const token = Cookies.get("token");
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get(`http://localhost:8000/api/paslon`)
      .then((daftarPaslon) => setDaftarPaslon(daftarPaslon.data.data))
      .catch((error) => console.error("Error fetching dapil items:", error));
  }, []);

  useEffect(() => {
    const id = params.id;
    if (id) {
      axios
        .get(`http://localhost:8000/api/dapil/${id}`)
        .then((response) => {
          const dapil = response.data.data;
          setNamaDapil(dapil.nama_dapil);
          setSuaraDapil(dapil.suara_dapil);
        })
        .catch((error) => console.error("Error fetching dapil:", error));
    }
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = params.id;
    if (id) {
      try {
        await axios.put(`http://localhost:8000/api/dapil/${id}`, {
          nama_dapil,
          suara_dapil,
          paslon_id: selectedPaslon,
        });
        alert("update data berhasil");
        router.push("/dataDapil");
      } catch (error) {
        console.error("Error updating dapil:", error);
      }
    }
  };

  // console.log("daftarPaslon", daftarPaslon);
  // console.log("daftarPaslon lenght", daftarPaslon.length);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Edit Data Dapil
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="nama_dapil"
              >
                Nama Dapil
              </label>
              <input
                id="nama_dapil"
                type="text"
                value={nama_dapil}
                onChange={(e) => setNamaDapil(e.target.value)}
                placeholder="Nama Dapil"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="quantity"
              >
                Total Suara Dapil
              </label>
              <input
                id="suara_dapil"
                type="numeric"
                value={suara_dapil}
                onChange={(e) => setSuaraDapil(e.target.value)}
                placeholder="Total Suara Dapil"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
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
