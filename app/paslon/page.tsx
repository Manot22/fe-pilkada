"use client";

import { useState, useEffect } from "react";
import axios from "axios";
interface paslon {
  id: number;
  image: string;
  nama: string;
  nomor_urut: string;
  partai_id: string;
  slogan: string;
}

export default function Tabel() {
  const [paslon, setPaslon] = useState<paslon[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/paslon"); // Sesuaikan endpoint API Anda
        setPaslon(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Daftar Pasangan Calon</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "8px solid #ddd", padding: "8px" }}>ID</th>
            <th style={{ border: "8px solid #ddd", padding: "8px" }}>Nama</th>
            <th style={{ border: "8px solid #ddd", padding: "8px" }}>
              Nomor Urut
            </th>
            <th style={{ border: "8px solid #ddd", padding: "8px" }}>Gambar</th>
            <th style={{ border: "8px solid #ddd", padding: "8px" }}>Slogan</th>
          </tr>
        </thead>
        <tbody>
          {paslon.map((paslon) => (
            <tr key={paslon.id}>
              <td style={{ border: "8px solid #ddd", padding: "8px" }}>
                {paslon.id}
              </td>
              <td style={{ border: "8px solid #ddd", padding: "8px" }}>
                {paslon.nama}
              </td>
              <td style={{ border: "8px solid #ddd", padding: "8px" }}>
                {paslon.nomor_urut}
              </td>
              <td style={{ border: "8px solid #ddd", padding: "8px" }}>
                {paslon.slogan}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
