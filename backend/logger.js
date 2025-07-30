//logger.js
import { init } from "./db.js";  // adicione esta linha

export async function logEvent(message, tenantId = null, userId = null) {
  try {
    const pool = await init();  // agora init() existe
    const msg = String(message);
    await pool.execute(
      `INSERT INTO logs (message, tenantId, userId, timestamp) VALUES (?, ?, ?, NOW())`,
      [msg, tenantId, userId]
    );
  } catch (err) {
    console.error("Erro ao registrar log:", err);
  }
}

export function requestLogger(req, res, next) {
  const user     = req.user || {};
  const tenantId = user.tenantId || null;
  const userId   = user.id       || null;
  const message  = `[${req.method}] ${req.originalUrl}`;
  logEvent(message, tenantId, userId);
  next();
}
