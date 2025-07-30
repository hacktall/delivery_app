// src/components/superadmin/SuperAdminLayout.jsx
import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaSignOutAlt, FaBuilding, FaWallet, FaRegFileAlt, FaTicketAlt } from "react-icons/fa";

export default function SuperAdminLayout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const links = [
    { to: "tenants", label: "Inquilinos", icon: <FaBuilding /> },
    { to: "billing", label: "Faturamento", icon: <FaWallet /> },
    { to: "logs", label: "Registros", icon: <FaRegFileAlt /> },
    { to: "tickets", label: "Tickets", icon: <FaTicketAlt /> }
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-5 flex items-center justify-between border-b">
          <span className="text-xl font-bold text-blue-700">SuperAdmin</span>
          <button
            onClick={handleLogout}
            title="Sair da conta"
            className="text-gray-500 hover:text-red-600 transition"
          >
            <FaSignOutAlt size={20} />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {links.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={`/superadmin/${to}`}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-lg transition-colors hover:bg-blue-100 hover:text-blue-700 ${
                  isActive ? 'bg-blue-200 text-blue-700 font-semibold' : 'text-gray-700'
                }`
              }
            >
              <span className="text-xl">{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}