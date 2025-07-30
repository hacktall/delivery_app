import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    async function loadTickets() {
      const res = await axios.get("http://localhost:3000/superadmin/tickets");
      setTickets(res.data);
    }
    loadTickets();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Central de Suporte</h2>
      <ul className="space-y-4">
        {tickets.map((t) => (
          <li key={t.id} className="bg-white border rounded p-4 shadow">
            <h3 className="font-semibold">
              #{t.id} - {t.subject}
            </h3>
            <p className="text-gray-700 mb-2">{t.message}</p>
            <p className="text-sm text-gray-500">
              Cliente: {t.tenantName} — {new Date(t.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
