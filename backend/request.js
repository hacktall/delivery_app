// backend/request.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config.js';

export function validatepass(password) {
  return bcrypt.hash(password, 11);
}

export function compare(password, hash) {
  return bcrypt.compare(password, hash);
}

export function generatetoken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

export function authentic(token) {
  return jwt.verify(token, JWT_SECRET);
}
