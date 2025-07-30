
// src/context/AuthContext.jsx
import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();


/**
 * Contexto de autenticação para armazenar usuário e JWT
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Carrega user de localStorage se existir
    const stored = localStorage.getItem("userData");
    return stored ? JSON.parse(stored) : null;
  });

  // Ao montar o app, recarrega token se existir e configura axios
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    
    axios.get("http://localhost:3000/superadmin/logs")
      .then(response => {
        console.log("Logs:", response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar logs:", error);
      });
    
    
    }
  }, []);

  /**
   * Realiza login, salva token e dados de usuário
   * @param {{ token: string, id: number, name: string, email: string, role: string, tenantId: number }} userData
   * @param {boolean} remember - se deve manter userData no localStorage
   */
  async function login(userData, remember) {
    const { token, ...rest } = userData;
    // 1. salva token
    localStorage.setItem("authToken", token);
    // 2. configura axios
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    // 3. atualiza estado
    setUser(rest);
    if (remember) {
      localStorage.setItem("userData", JSON.stringify(rest));
    }
  }

  /**
   * Desloga usuário, limpa token e contexto
   */
  function logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

