// backend/config.js
import dotenv from 'dotenv';
dotenv.config({ path: './settings/.env' });

export const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error('⚠️  JWT_SECRET não definido em settings/.env');
  process.exit(1);
}
