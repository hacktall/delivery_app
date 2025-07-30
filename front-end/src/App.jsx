// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginRegister from "./pages/LoginRegister";
import UserAccount from "./pages/UserAccount";
import { useAuth } from "./context/AuthContext";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword   from "./pages/ResetPassword";
import AdminPanel from "./pages/AdminPainel";
import AdminDashboard from "./pages/AdminDashboard";
import TenantList from "./components/superadmin/TenantList";
import Billing from "./components/superadmin/Billing";
import Logs from "./components/superadmin/Logs";
import Tickets from "./components/superadmin/Tickets";
import SuperAdminLayout from "./components/superadmin/SuperAdminLayout";



function AdminRoute({ children }) {
  const { user } = useAuth();
  // só permite acesso se user.role === 'admin'
  return user?.role === 'admin' ? children : <Navigate to="/" />;
}

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
}


export default function App() {
  return (
    <BrowserRouter>
   <Routes>
 {/* Layout com barra lateral para SuperAdmin */}
        <Route path="/superadmin" element={<SuperAdminLayout />}>
          <Route index element={<TenantList />} />
          <Route path="tenants" element={<TenantList />} />
          <Route path="billing" element={<Billing />} />
          <Route path="logs" element={<Logs />} />
          <Route path="tickets" element={<Tickets />} />
        </Route>
  
  <Route path="/" element={<LoginRegister />} />
  <Route path="/forgot" element={<ForgotPassword />} />
  <Route path="/reset/:token" element={<ResetPassword />} />
  <Route path="/conta" element={<PrivateRoute><UserAccount /></PrivateRoute>} />
  <Route path="/admin" element={
    <AdminRoute>
    <AdminDashboard/>
    
    </AdminRoute>
  } />
</Routes>
    </BrowserRouter>
  );
}
