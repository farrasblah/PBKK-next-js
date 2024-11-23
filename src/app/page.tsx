"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Contoh validasi login (ubah sesuai backend Anda)
    if (email === "user@example.com" && password === "password") {
      // Simpan status login di localStorage
      localStorage.setItem("isLoggedIn", "true");
      router.push("/dashboard"); // Arahkan ke dashboard setelah login
    } else {
      alert("Email atau password salah!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4"
      >
        <h2 className="text-2xl font-bold">Login</h2>
        <div>
          <label htmlFor="email" className="block text-gray-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-300">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-500 py-2 rounded text-white font-bold"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
