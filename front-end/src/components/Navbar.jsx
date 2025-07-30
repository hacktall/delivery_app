// src/components/Navbar.jsx
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTenant } from "../context/TenantContext";

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { logo, primary } = useTenant();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="shadow-md" style={{ backgroundColor: "white" }}>
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <a href="/" className="flex items-center space-x-2">
          {logo ? (
            <img src={logo} alt="Logo" className="h-8 w-auto" />
          ) : (
            <div className="text-2xl font-bold">🦉</div>
          )}
        </a>

        <ul className="hidden md:flex space-x-6 items-center text-sm">
          {[
            { label: "Início", path: "/" },
            { label: "Cardápio", path: "/cardapio" },
            { label: "Meus pedidos", path: "/pedidos" },
            { label: "Contato", path: "/contato" },
            { label: "Carrinho", path: "/carrinho" },
          ].map((item) => (
            <li key={item.label}>
              <a
                href={item.path}
                className="hover:underline"
                style={{ color: primary }}
              >
                {item.label}
              </a>
            </li>
          ))}

          <li>
            <button
              onClick={handleLogout}
              className="hover:underline"
              style={{ color: primary }}
            >
              Sair
            </button>
          </li>
        </ul>

        <div className="md:hidden">
          {/* Botão mobile para abrir side menu, se houver */}
          <button className="text-2xl" style={{ color: primary }}>
            ☰
          </button>
        </div>

        <div className="hidden lg:flex items-center space-x-2">
          <input
            type="text"
            placeholder="Buscar..."
            className="border rounded-md px-2 py-1 text-sm"
            style={{ borderColor: primary }}
          />
          <button
            className="px-3 py-1 rounded-md text-sm"
            style={{ backgroundColor: primary, color: 'white' }}
          >
            Buscar
          </button>
        </div>
      </nav>
    </header>
  );
}