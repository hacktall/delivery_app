// src/context/TenantContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const TenantContext = createContext();

export function TenantProvider({ children }) {
  const [theme, setTheme] = useState({ logo: "", primary: "#3b82f6", secondary: "#f59e0b" });

  useEffect(() => {
    // Supondo que user.tenantId esteja no context de Auth
    async function loadTheme() {
      const { tenantId } = JSON.parse(localStorage.getItem("user"));
      const res = await axios.get(`http://localhost:3000/restaurantes/${tenantId}/theme`);
      setTheme(res.data);
    }
    loadTheme();
  }, []);

  return <TenantContext.Provider value={theme}>{children}</TenantContext.Provider>;
}

export function useTenant() {
  return useContext(TenantContext);
}
