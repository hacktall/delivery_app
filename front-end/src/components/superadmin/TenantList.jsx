import React, { useEffect, useState } from "react";
import axios from "axios";

export default function TenantList() {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadTenants() {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/superadmin/tenants");
        setTenants(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadTenants();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Lista de Tenants</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <table className="min-w-full table-auto border">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Nome</th>
              <th className="px-4 py-2 border">Plano</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((t) => (
              <tr key={t.id}>
                <td className="border px-4 py-2">{t.id}</td>
                <td className="border px-4 py-2">{t.name}</td>
                <td className="border px-4 py-2">{t.plan}</td>
                <td className="border px-4 py-2">{t.active ? "Ativo" : "Inativo"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
