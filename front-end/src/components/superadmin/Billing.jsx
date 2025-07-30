import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Billing() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    async function loadInvoices() {
      const res = await axios.get("http://localhost:3000/superadmin/billing");
      setInvoices(res.data);
    }
    loadInvoices();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Faturamento</h2>
      <table className="min-w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Tenant</th>
            <th className="px-4 py-2 border">Valor</th>
            <th className="px-4 py-2 border">Data</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv.id}>
              <td className="border px-4 py-2">{inv.tenantName}</td>
              <td className="border px-4 py-2">R$ {inv.amount.toFixed(2)}</td>
              <td className="border px-4 py-2">
                {new Date(inv.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
