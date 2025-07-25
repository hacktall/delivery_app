// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginRegister from "./pages/LoginRegister";
import UserAccount from "./pages/UserAccount";
import { useAuth } from "./context/AuthContext";
import AdminPanel from "./pages/AdminPainel";
import AdminDashboard from "./pages/AdminDashboard";
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
  <Route path="/" element={<LoginRegister />} />
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
