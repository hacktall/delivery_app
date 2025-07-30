// src/middleware/isSuperAdmin.js
import jwt from "jsonwebtoken";

/**
 * Middleware para verificar se o usuário autenticado é SuperAdmin
 * Deve ser usado após authTenant que popula req.user
 */
export function isSuperAdmin(req, res, next) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Não autenticado" });
    }
    if (req.user.role !== 'superadmin') {
      return res.status(403).json({ error: 'Acesso negado: SuperAdmin apenas' });
    }
    // Opcional: verificar token fresh ou claims adicionais
    next();
  } catch (err) {
    console.error("Erro no isSuperAdmin:", err);
    res.status(500).json({ error: 'Erro interno ao verificar SuperAdmin' });
  }
}