
// src/components/superadmin/SuperAdminLayout.jsx
import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaSignOutAlt } from "react-icons/fa";

export default function SuperAdminLayout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-5 text-xl font-bold border-b text-blue-700 flex items-center justify-between">
          SuperAdmin
          <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-red-600"
            title="Sair da conta"
          >
            <FaSignOutAlt />
          </button>
        </div>
        <nav className="p-4 space-y-2 flex-1">
          <NavLink
            to="/superadmin/tenants"
            className={({ isActive }) =>
              `block p-2 rounded hover:bg-gray-200 ${isActive ? 'bg-gray-200 font-semibold' : ''}`
            }
          >
            🏢 Tenants
          </NavLink>
          <NavLink
            to="/superadmin/billing"
            className={({ isActive }) =>
              `block p-2 rounded hover:bg-gray-200 ${isActive ? 'bg-gray-200 font-semibold' : ''}`
            }
          >
            💳 Faturamento
          </NavLink>
          <NavLink
            to="/superadmin/logs"
            className={({ isActive }) =>
              `block p-2 rounded hover:bg-gray-200 ${isActive ? 'bg-gray-200 font-semibold' : ''}`
            }
          >
            📝 Logs
          </NavLink>
          <NavLink
            to="/superadmin/tickets"
            className={({ isActive }) =>
              `block p-2 rounded hover:bg-gray-200 ${isActive ? 'bg-gray-200 font-semibold' : ''}`
            }
          >
            🎫 Tickets
          </NavLink>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

// src/context/AuthContext.jsx
import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";  // ou onde você guarda o token
import api from "./tokensnocorrect";
export default function Logs() {
  const [logs, setLogs] = useState([]);
  const { token } = useAuth();  // pegue o token do context

  useEffect(() => {
    async function loadLogs() {
      try {
        const res = await axios.get("http://localhost:3000/superadmin/logs", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLogs(res.data);
      } catch (err) {
        console.error("Erro ao carregar logs:", err);
      }
    }
    loadLogs();
  }, [token]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Logs do Sistema</h2>
      <div className="bg-gray-100 rounded p-4 h-96 overflow-auto text-sm font-mono">
        {logs.length === 0
          ? <p className="text-gray-500">Nenhum log encontrado.</p>
          : logs.map((log, i) => (
              <div key={i}>
                <span className="text-gray-600">
                  {new Date(log.timestamp).toLocaleString()} -{" "}
                </span>
                <span>{log.message}</span>
              </div>
            ))
        }
      </div>
    </div>
  );
}
// src/context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from "react";

const AfuthContext = createContext();

export function AuthProvider({ children }) {
  // Tenta hidratar do localStorage
  const [user, setUser]     = useState(() => {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  });
  const [token, setToken]   = useState(() => localStorage.getItem("token"));

  // Sempre que mudar user/token, salva no localStorage
  useEffect(() => {
    if (user)   localStorage.setItem("user", JSON.stringify(user));
    else        localStorage.removeItem("user");

    if (token)  localStorage.setItem("token", token);
    else        localStorage.removeItem("token");
  }, [user, token]);

  function login({ user: u, token: t }) {
    setUser(u);
    setToken(t);
  }

  function logout() {
    setUser(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
