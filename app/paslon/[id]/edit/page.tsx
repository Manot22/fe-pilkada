"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Cookies from "js-cookie";

const EditPaslon = () => {
  const token = Cookies.get("token");
  const [nama, setNama] = useState("");
  const [nomor_urut, setNomorUrut] = useState("");
  const [slogan, setSlogan] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [suara_paslon, setSuaraPaslon] = useState("");
  const [nama_partai, setNamaPartai] = useState("");
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get(`http://localhost:8000/api/paslon`)
      .then((suara_paslon) => setSuaraPaslon(suara_paslon.data.data))
      .catch((error) => console.error("Error fetching paslon items:", error));
  }, []);

  useEffect(() => {
    const id = params.id;
    if (id) {
      axios
        .get(`http://localhost:8000/api/paslon/${id}`)
        .then((response) => {
          const paslon = response.data.data;
          setNama(paslon.nama);
          setNomorUrut(paslon.nomor_urut);
          setImage(paslon.image);
          setSlogan(paslon.slogan);
          setNamaPartai(paslon.nama_partai);
          setSuaraPaslon(paslon.suara_paslon);
        })
        .catch((error) => console.error("Error fetching Paslon:", error));
    }
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = params.id;
    if (id) {
      try {
        await axios.put(`http://localhost:8000/api/paslon/${id}`, {
          nama,
          nomor_urut,
          image,
          slogan,
          nama_partai,
          suara_paslon,
        });
        router.push("/paslon");
      } catch (error) {
        console.error("Error updating Paslo:", error);
      }
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            EditPaslon
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="nama"
              >
                Nama
              </label>
              <input
                id="nama"
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="quantity"
              >
                Nomor Urut
              </label>
              <input
                type="number"
                id="nomor_urut"
                value={nomor_urut}
                onChange={(e) => setNomorUrut(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="quantity"
              >
                Gambar
              </label>
              <input
                id="image"
                type="file"
                onChange={(e) =>
                  setImage(e.target.files ? e.target.files[0] : null)
                }
                placeholder="Gambar"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="quantity"
              >
                Gabungan Partai
              </label>
              <input
                type="text"
                value={nama_partai}
                onChange={(e) => setNamaPartai(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                placeholder="Nama Partai"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="quantity"
              >
                Total Suara Paslon
              </label>
              <input
                type="number"
                value={suara_paslon}
                onChange={(e) => setSuaraPaslon(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                placeholder="Nama Partai"
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
export default EditPaslon;
