"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";

const EditPaslon = () => {
  const token = Cookies.get("token");
  const [nama, setNama] = useState("");
  const [nomor_urut, setNomorUrut] = useState("");
  const [slogan, setSlogan] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState("");
  const [suara_paslon, setSuaraPaslon] = useState("");
  const [nama_partai, setNamaPartai] = useState("");
  const [error, setError] = useState("");
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const id = params.id;
    if (id) {
      axios
        .get(`http://localhost:8000/api/paslon/${id}`)
        .then((response) => {
          const paslon = response.data.data;
          setNama(paslon.nama);
          setNomorUrut(paslon.nomor_urut);
          setCurrentImage(paslon.image);
          setSlogan(paslon.slogan);
          setNamaPartai(paslon.nama_partai);
          setSuaraPaslon(paslon.suara_paslon);
        })
        .catch((error) => {
          console.error("Error fetching Paslon:", error);
          setError("Gagal mengambil data Paslon");
        });
    }
  }, [params.id, router, token]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        setError("Ukuran file terlalu besar. Maksimum 2MB.");
        return;
      }
      if (
        !["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(
          file.type
        )
      ) {
        setError("Tipe file tidak didukung. Gunakan JPEG, PNG, JPG, atau GIF.");
        return;
      }
      setImage(file);
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = params.id;
    if (id) {
      try {
        const formData = new FormData();
        formData.append("nama", nama);
        formData.append("nomor_urut", nomor_urut);
        formData.append("slogan", slogan);
        formData.append("nama_partai", nama_partai);
        formData.append("suara_paslon", suara_paslon);
        if (image) {
          formData.append("image", image);
        }

        await axios.post(`http://localhost:8000/api/paslon/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        router.push("/paslon");
      } catch (error) {
        console.error("Error updating Paslon:", error);
        if (axios.isAxiosError(error) && error.response) {
          setError(
            error.response.data.message ||
              "Terjadi kesalahan saat memperbarui data"
          );
        } else {
          setError("Terjadi kesalahan saat memperbarui data");
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Edit Paslon
          </h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
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
                htmlFor="nomor_urut"
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
                htmlFor="image"
              >
                Gambar
              </label>
              <input
                id="image"
                type="file"
                onChange={handleImageChange}
                accept="image/jpeg,image/png,image/jpg,image/gif"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
              {currentImage && (
                <div className="mt-2">
                  <Image
                    src={`/images/paslon/${currentImage}`}
                    alt="Current Paslon"
                    width={128}
                    height={128}
                    className="object-cover rounded"
                  />
                </div>
              )}
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="slogan"
              >
                Slogan
              </label>
              <input
                type="text"
                id="slogan"
                value={slogan}
                onChange={(e) => setSlogan(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                placeholder="Slogan"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="nama_partai"
              >
                Gabungan Partai
              </label>
              <input
                type="text"
                id="nama_partai"
                value={nama_partai}
                onChange={(e) => setNamaPartai(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                placeholder="Nama Partai"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-1"
                htmlFor="suara_paslon"
              >
                Total Suara Paslon
              </label>
              <input
                type="number"
                id="suara_paslon"
                value={suara_paslon}
                onChange={(e) => setSuaraPaslon(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                placeholder="Total Suara"
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
