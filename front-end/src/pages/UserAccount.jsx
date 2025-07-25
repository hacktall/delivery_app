// src/pages/UserAccount.jsx
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

export default function UserAccount() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold">Bem-vindo, {user?.name || "Usuário"}!</h1>
      </main>
    </>
  );
}
