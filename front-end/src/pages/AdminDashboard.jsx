// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Componente de card de KPI
function KpiCard({ title, value, icon }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md flex items-center gap-4 w-full sm:w-auto">
      <div className="text-3xl">{icon}</div>
      <div>
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-lg font-bold">{value}</div>
      </div>
    </div>
  );
}

// Componente de gráfico de pedidos por hora
function OrdersChart({ data }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full">
      <h2 className="text-xl font-semibold mb-4">Pedidos por Hora</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <XAxis dataKey="hora" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="pedidos" stroke="#3b82f6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Componente de tabela de pedidos ativos
function OrdersTable({ orders }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full overflow-auto">
      <h2 className="text-xl font-semibold mb-4">Pedidos Ativos</h2>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Cliente</th>
            <th className="px-4 py-2 border">Itens</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="text-sm">
              <td className="px-4 py-2 border">{o.id}</td>
              <td className="px-4 py-2 border">{o.customer}</td>
              <td className="px-4 py-2 border">{o.items.join(", ")}</td>
              <td className="px-4 py-2 border">{o.status}</td>
              <td className="px-4 py-2 border">
                <button className="text-blue-500 hover:underline">Atualizar</button>
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                Nenhum pedido ativo.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// Componente Sidebar
function Sidebar({ current, setCurrent }) {
  const items = [
    { key: "dashboard", label: "Dashboard" },
    { key: "pedidos", label: "Pedidos" },
    { key: "produtos", label: "Produtos" },
    { key: "precos", label: "Preços" },
    { key: "relatorios", label: "Relatórios" },
    { key: "mensagens", label: "Mensagens" },
    { key: "configuracoes", label: "Configurações" },
    { key: "sair", label: "Sair" },
  ];

  return (
    <aside className="w-64 bg-white shadow-md h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">🦉 Admin</h1>
      <nav className="flex flex-col gap-2">
        {items.map((item) => (
          <button
            key={item.key}
            onClick={() => setCurrent(item.key)}
            className={`block text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition ${
              current === item.key ? "bg-blue-100 font-semibold" : ""
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

// Página principal do Dashboard Admin
export default function AdminDashboard() {
  const [current, setCurrent] = useState("dashboard");
  const [kpis, setKpis] = useState({});
  const [chartData, setChartData] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [kpiRes, chartRes, ordersRes] = await Promise.all([
          axios.get("http://localhost:3000/admin/kpis"),
          axios.get("http://localhost:3000/admin/chart"),
          axios.get("http://localhost:3000/admin/orders/active"),
        ]);
        setKpis(kpiRes.data);
        setChartData(chartRes.data);
        setOrders(ordersRes.data);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    }
    fetchData();
  }, [current]);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar current={current} setCurrent={setCurrent} />
      <main className="flex-1 p-6 space-y-6">
        {current === "dashboard" && (
          <>
            <div className="flex flex-wrap gap-4">
              <KpiCard title="Receita Hoje" value={`R$ ${kpis.todayRevenue || 0}`} icon="💵" />
              <KpiCard title="Ticket Médio" value={`R$ ${kpis.avgTicket || 0}`} icon="🎟️" />
              <KpiCard title="Total de Pedidos" value={kpis.totalOrders || 0} icon="🧾" />
            </div>
            <OrdersChart data={chartData} />
          </>
        )}

        {current === "pedidos" && <OrdersTable orders={orders} />}
        {current === "produtos" && <div>Gerenciamento de produtos (em construção)</div>}
        {current === "precos" && <div>Tabela de preços (em construção)</div>}
        {current === "relatorios" && <div>Relatórios analíticos (em construção)</div>}
        {current === "mensagens" && <div>Mensagens recebidas (em construção)</div>}
        {current === "configuracoes" && <div>Configurações do sistema (em construção)</div>}
        {current === "sair" && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Encerrar sessão</h2>
            <p>Você saiu do painel.</p>
          </div>
        )}
      </main>
    </div>
  );
}
