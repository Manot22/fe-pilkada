"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Cookies from "js-cookie";

//  components
import Layout from "@/components/Layout";
import Link from "next/link";

interface PaslonItem {
  id: number;
  nama: string;
  nomor_urut: string;
  image: string;
  slogan: string;
  suara_paslon: string;
  nama_partai: string;
}

const DataPaslon = () => {
  const token = Cookies.get("token");
  const [paslon, setPaslon] = useState<PaslonItem[]>([]);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios
      .get(`http://localhost:8000/api/paslon`)
      .then((response) => setPaslon(response.data.data))
      .catch((error) => console.error("Error fetching paslon items:", error));
  }, []);

  const deletePasol = (id: number) => {
    axios
      .delete(`http://localhost:8000/api/paslon/${id}`)
      .then(() => setPaslon(paslon.filter((paslon) => paslon.id !== id)))
      .catch((error) => console.error("Error deleting paslon:", error));
  };

  return (
    <Layout>
      {paslon.length > 0 ? (
        <main>
          <table>
            <thead>
              <tr>
                <th>Nama Paslon</th>
                <th>No Urut</th>
                <th>Gambar</th>
                <th>Slogan</th>
                <th>Nama Partai</th>
                <th>Suara Partai</th>
                <th>Fungsi</th>
              </tr>
            </thead>
            <tbody className="">
              {paslon.map((item) => (
                <tr key={item.id} className="">
                  <td>{item.nama}</td>
                  <td>{item.nomor_urut}</td>
                  <td>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_BACKEND}/storage/images/${item.image}`}
                      width={100}
                      height={100}
                      className="w-full p-6 max-h-64 object-cover rounded-lg"
                      alt="..."
                    />
                  </td>
                  <td>{item.slogan}</td>
                  <td>{item.nama_partai}</td>
                  <td>{item.suara_paslon}</td>
                  <td className="flex flex-col py-8 gap-4">
                    <Link href={`/paslon/${item.id}/edit`}>
                      <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => deletePasol(item.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      ) : (
        <p>DATA PASLON TIDAK ADA</p>
      )}
    </Layout>
  );
};

export default DataPaslon;
