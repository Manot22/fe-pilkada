/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Create = () => {
  const [nama, setNama] = useState("");
  const [nomor_urut, setNomorUrut] = useState("");
  const [image, setImage] = useState("");
  const [slogan, setSlogan] = useState("");
  const [daftarPartai, setDaftarPartai] = useState([]);
  const [selectPartai, setSelectPartai] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/partai`)
      .then((daftarPartai) => setDaftarPartai(daftarPartai.data.data))
      .catch((error) => console.error("Error fetching Partai items:", error));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/paslon", {
        nama,
        nomor_urut,
        image,
        slogan,
        partai_id: selectPartai,
      });
      router.push("/paslon");
    } catch (error) {
      console.error("Error creating Paslon:", error);
    }
  };

  //   console.log('daftarPartai', daftarPartai);
  //   console.log('daftarPartai lenght', daftarPartai.length);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Tambah Paslon
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="nama"
              className="block text-gray-700 font-medium mb-1"
            >
              Nama
            </label>
            <input
              id="nama"
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Nama"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="nomor_urut"
              className="block text-gray-700 font-medium mb-1"
            >
              Nomor Urut
            </label>
            <input
              id="nomor_urut"
              type="number"
              value={nomor_urut}
              onChange={(e) => setNomorUrut(e.target.value)}
              placeholder="Nomor Urut"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-gray-700 font-medium mb-1"
            >
              Gambar
            </label>
            <input
              id="image"
              type="file"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
              placeholder="Gambar"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div>
            <label
              htmlFor="slogan"
              className="block text-gray-700 font-medium mb-1"
            >
              Slogan
            </label>
            <input
              id="slogan"
              type="text"
              value={slogan}
              onChange={(e) => setSlogan(e.target.value)}
              placeholder="Slogan"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div>
            <select
              value={selectPartai || ""}
              onChange={(e) => setSelectPartai(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="">Pilih Partai</option>
              {daftarPartai.length > 0 ? (
                daftarPartai.map((partai: any) => {
                  //   console.log("partai", partai);

                  return (
                    <option key={partai.id} value={partai.id}>
                      {partai.nama_partai}
                    </option>
                  );
                })
              ) : (
                <option value="">Tidak Ada Daftar Partai</option>
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
