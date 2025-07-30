// src/components/superadmin/SuperAdminSidebar.jsx
import React from "react";
import { FaUsers, FaDollarSign, FaFileAlt, FaLifeRing } from "react-icons/fa";

export default function SuperAdminSidebar({ currentTab, setCurrentTab }) {
  const items = [
    { key: "tenants",   label: "Tenants",   icon: <FaUsers /> },
    { key: "billing",   label: "Faturamento", icon: <FaDollarSign /> },
    { key: "logs",      label: "Logs",      icon: <FaFileAlt /> },
    { key: "tickets",   label: "Suporte",   icon: <FaLifeRing /> },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Super Admin</h1>
      <nav className="flex flex-col space-y-2">
        {items.map((item) => (
          <button
            key={item.key}
            onClick={() => setCurrentTab(item.key)}
            className={`flex items-center gap-3 p-2 rounded-lg transition-colors hover:bg-gray-200 ${
              currentTab === item.key ? "bg-gray-200 font-semibold" : ""
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}