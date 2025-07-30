// backend/middleware/middleware.js
import { authentic } from '../request.js';

export function authTenant(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log("AUTH HEADER:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token ausente ou formato inválido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = authentic(token);  // usando função centralizada

    // Verifique se payload está estruturado corretamente
    req.user = {
      userId: payload.userId,
      tenantId: payload.tenantId,
      role: payload.role,
    };

    next();
  } catch (err) {
    console.error("Erro no authTenant:", err.message);
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
}
