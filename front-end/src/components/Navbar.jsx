// src/components/Navbar.jsx
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <a href="/" className="text-2xl font-bold">🦉</a>

        <ul className="flex space-x-6 items-center text-sm">
          <li><a href="#">Início</a></li>
          <li><a href="#">Cardápio</a></li>
          <li><a href="#">Meus pedidos</a></li>
          <li><a href="#">Contato</a></li>
          <li><a href="#">Carrinho</a></li>
          <li>
            <button onClick={handleLogout} className="text-red-500 hover:underline">
              Sair
            </button>
          </li>
        </ul>

        <div className="hidden md:flex items-center space-x-2">
          <img src="/assets/searchbar.webp" alt="Buscar" className="w-5 h-5" />
          <input type="text" placeholder="Buscar..." className="border rounded-md px-2 py-1 text-sm" />
          <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700">
            Buscar
          </button>
        </div>
      </nav>
    </header>
  );
}
