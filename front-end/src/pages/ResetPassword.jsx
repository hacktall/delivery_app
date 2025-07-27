// src/pages/ResetPassword.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate  = useNavigate();
  const [pass, setPass]     = useState("");
  const [pass2, setPass2]   = useState("");
  const [error, setError]   = useState("");
  const [msg, setMsg]       = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pass !== pass2) {
      setError("As senhas não batem");
      return;
    }
    try {
      await axios.post(`http://localhost:3000/auth/reset/${token}`, { password: pass });
      setMsg("Senha alterada com sucesso!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Erro ao redefinir senha.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-xl font-bold mb-4">Nova Senha</h1>
        {msg && <p className="text-green-600 mb-2">{msg}</p>}
        {error && <p className="text-red-600 mb-2">{error}</p>}

        <label className="block mb-1">Senha</label>
        <input
          type="password"
          required
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <label className="block mb-1">Confirme a senha</label>
        <input
          type="password"
          required
          value={pass2}
          onChange={(e) => setPass2(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Redefinir
        </button>
      </form>
    </div>
  );
}
