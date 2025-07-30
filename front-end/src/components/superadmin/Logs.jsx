import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";  // ou onde você guarda o token

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const { token }       = useAuth();

  useEffect(() => {
    async function loadLogs() {
      try {
        const res = await axios.get("/superadmin/logs", {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

        setLogs(res.data);
      } catch (err) {
        console.error("Erro ao carregar logs:", err);
      }
    }
    if (token) loadLogs();
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