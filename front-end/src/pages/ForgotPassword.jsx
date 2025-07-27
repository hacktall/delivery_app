// src/pages/ForgotPassword.jsx
import { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg]     = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/auth/forgot", { email });
      setMsg(res.data.message);
    } catch (err) {
      setError(err.response?.data?.error || "Erro ao solicitar reset.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-xl font-bold mb-4">Recuperar Senha</h1>
        {msg && <p className="text-green-600 mb-2">{msg}</p>}
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <label className="block mb-1">E‑mail cadastrado</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Enviar link
        </button>
      </form>
    </div>
  );
}
