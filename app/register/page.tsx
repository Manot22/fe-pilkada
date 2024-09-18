"use client";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/register", {
        username,
        password,
        email,
      });
      alert("Registrasi Berhasil");
      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(
          "Registrasi Gagal: " +
            (error.response?.data.message || "Mungkin Ada Kesalahan")
        );
      } else {
        setMessage("Terjadi kesalahan saat registrasi");
      }
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold sm:text-3xl">
          Daftar Akun Baru
        </h1>
        <form
          action="#"
          onSubmit={handleRegister}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p className="text-center text-lg font-medium">Buat Akun Anda</p>
          <div>
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Masukan username"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Masukan email"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Masukan password"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          >
            Daftar
          </button>
          <p className="text-center text-sm text-gray-500">
            Sudah punya akun?
            <a className="underline" href="login">
              Login
            </a>
          </p>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Register;
