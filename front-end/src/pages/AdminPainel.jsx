// src/components/AdminPanel.jsx
import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Função para carregar usuários
  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/index/logica");
      setUsers(res.data.list || []);
    } catch (err) {
      console.error("Erro ao carregar usuários:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Opcional: carregar ao montar
    // loadUsers();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md print:hidden">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <a href="/" className="text-2xl font-bold">🦉</a>

          {/* Hamburger para mobile */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setSidebarOpen((prev) => !prev)}
          >
            ☰
          </button>

          {/* Menu */}
          <ul className={`flex-col md:flex-row md:flex items-center space-y-2 md:space-y-0 md:space-x-6 ${sidebarOpen ? 'flex' : 'hidden'}`}>
            {[
              'Dashboard',
              'Pedidos',
              'Produtos',
              'Preços',
              'Relatórios',
              'Mensagens',
              'Configurações',
              'Sair',
            ].map((item) => (
              <li key={item}>
                <a href="#" className="block px-2 py-1 rounded hover:bg-gray-100">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">Painel Admin</h1>
            <button
              onClick={loadUsers}
              disabled={loading}
              className="h-14 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center justify-center"
            >
              {loading ? 'Carregando...' : 'Carregar Usuários'}
            </button>
          </div>

          <section className="bg-white shadow rounded-lg overflow-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    </tr>
                  ))
                ) : (
                  !loading && (
                    <tr>
                      <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                        Nenhum usuário encontrado.
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </section>
        </div>
      </main>
    </div>
  );
}