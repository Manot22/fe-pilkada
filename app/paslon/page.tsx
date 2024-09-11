"use client";

import { useState, useEffect } from "react";
import axios from "@/app/lib/axios";
interface paslon {
  id: number;
  nama: string;
  nomor_urut: string;
  image: string;
  partai_id: string;
  slogan: string;
}

export default function Tabel() {
  const [paslon, setPaslon] = useState<paslon[]>([]);
  useEffect(() => {
    axios.get("/paslon").then((response) => setPaslon(response.data.data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Daftar Pasangan Calon</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "2px solid #ddd", padding: "2px" }}>
              Nama Paslon
            </th>
            <th style={{ border: "2px solid #ddd", padding: "2px" }}>
              Nomor Urut
            </th>
            <th style={{ border: "2px solid #ddd", padding: "2px" }}>Gambar</th>
            <th style={{ border: "2px solid #ddd", padding: "2px" }}>Partai</th>
            <th style={{ border: "2px solid #ddd", padding: "2px" }}>Slogan</th>
          </tr>
        </thead>
        <tbody>
          {paslon.map((paslon) => (
            <tr key={paslon.id}>
              <td style={{ border: "2px solid #ddd", padding: "2px" }}>
                {paslon.nama}
              </td>
              <td style={{ border: "2px solid #ddd", padding: "2px" }}>
                {paslon.nomor_urut}
              </td>
              <td style={{ border: "2px solid #ddd", padding: "2px" }}>
                <img
                  src={`${process.env.NEXT_PUBLIC_API_BACKEND}/storage/images/${paslon.image}`}
                  width={350}
                  height={350}
                  className="w-full h-auto object-cover rounded-lg"
                  alt="..."
                />
              </td>
              <td style={{ border: "2px solid #ddd", padding: "2px" }}>
                {paslon.partai_id}
              </td>
              <td style={{ border: "2px solid #ddd", padding: "2px" }}>
                {paslon.slogan}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
