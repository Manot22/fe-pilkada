/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Create = () => {
  const [nama, setNama] = useState("");
  const [nomor_urut, setNomorUrut] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [slogan, setSlogan] = useState("");
  const [nama_partai, setNamaPartai] = useState("");
  const [suara_paslon, setSuaraPaslon] = useState("");
  const router = useRouter();

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8000/api/partai`)
  //     .then((daftarPartai) => setDaftarPartai(daftarPartai.data.data))
  //     .catch((error) => console.error("Error fetching Partai items:", error));
  // }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image");
      return;
    }

    if (!image) {
      alert("Please select an image");
      return;
    }

    try {
      // Buat FormData untuk mengirim file dan data lainnya
      const formData = new FormData();
      formData.append("nama", nama); // append nama
      formData.append("nomor_urut", nomor_urut); // append nomor_urut
      formData.append("image", image); // append gambar
      formData.append("slogan", slogan); // append slogan
      formData.append("nama_partai", nama_partai); // append slogan
      formData.append("sura_paslon", suara_paslon); // append slogan
      // Kirim request dengan axios
      await axios.post("http://localhost:8000/api/paslon", formData, {
        headers: {
          "Content-Type": "application/json", // Pastikan header ini diset
        },
      });

      // Redirect setelah berhasil
      router.push("/paslon");
    } catch (error) {
      console.error("gagal nambah data paslon:", error);
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
            <label
              htmlFor="nama_partai"
              className="block text-gray-700 font-medium mb-1"
            >
              Nama Partai
            </label>
            <input
              id="nama_partai"
              type="text"
              value={nama_partai}
              onChange={(e) => setNamaPartai(e.target.value)}
              placeholder="Nama Partai"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="suara_paslon"
              className="block text-gray-700 font-medium mb-1"
            >
              Suara Partai
            </label>
            <input
              id="suara_paslon"
              type="text"
              value={suara_paslon}
              onChange={(e) => setSuaraPaslon(e.target.value)}
              placeholder="Suara Paslon"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
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
