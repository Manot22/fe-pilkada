"use client";

import { useState } from "react";
import axios from "@/app/lib/axios";
import { useRouter } from "next/navigation";

const TambahPaslon = () => {
  const [nama, setNama] = useState("");
  const [nomor_urut, setNomorUrut] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [slogan, setSlogan] = useState("");
  const [partai_Id, setPartaiId] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Pastikan file gambar sudah dipilih
    if (!image) {
      alert("Please select an image");
      return;
    }

    try {
      // Buat FormData untuk mengirim file dan data lainnya
      const formData = new FormData();
      formData.append("nama", nama);
      formData.append("nomor_urut", nomor_urut);
      formData.append("image", image);
      formData.append("slogan", slogan);
      formData.append("partai_id", partai_Id);

      // Kirim request dengan axios
      await axios.post("http://127.0.0.1:8000/api/paslon", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Pastikan header ini diset
        },
      });

      // Redirect setelah berhasil
      router.push("/paslon");
    } catch (error) {
      console.error("gagal nambah data paslon:", error);
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl mt-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>

        <p className="text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>

      <form
        action="#"
        onSubmit={handleSubmit}
        className="mx-auto mb-0 mt-8 max-w-md space-y-4"
      >
        <div className="relative">
          <input
            id="nama"
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Nama"
          />
        </div>

        <div className="relative">
          <input
            id="nomor_urut"
            type="number"
            value={nomor_urut}
            onChange={(e) => setNomorUrut(e.target.value)}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Nomor Urut"
          />
        </div>

        <div className="relative">
          <input
            id="image"
            type="file"
            onChange={(e) =>
              setImage(e.target.files ? e.target.files[0] : null)
            }
            required
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="gambar"
          />
        </div>

        <div className="relative">
          <input
            id="partai_id"
            type="number"
            value={partai_Id}
            onChange={(e) => setPartaiId(e.target.value)}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="partai id"
          />
        </div>

        <div className="relative">
          <input
            id="slogan"
            type="text"
            value={slogan}
            onChange={(e) => setSlogan(e.target.value)}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="slogan"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          >
            Tambah Paslon
          </button>
        </div>
      </form>
    </div>
  );
};
export default TambahPaslon;
