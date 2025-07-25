import { validatepass } from "./request.js"; 
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config({path:'./settings/.env'});

const{ MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
}=process.env;


let pool;
 export async function init () {
    if(pool)return pool;
pool= await mysql.createPool({
 host: MYSQL_HOST || 'localhost',
    port: MYSQL_PORT || 3306,
    user: MYSQL_USER || 'root',
    password: MYSQL_PASSWORD || 'coR4S%@)(BN',
    database: MYSQL_DATABASE || 'test',
    waitForConnections: true
});
console.log('conectado ao sql');
await pool.execute(`
  CREATE TABLE IF NOT EXISTS usuarios(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT,
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(300) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user'
  )
`);
await pool.execute(
  `INSERT IGNORE INTO usuarios (name, email, password, role)
   VALUES (?, ?, ?, ?);`,
  [
    "Administrador",
    "admin@gmail.com",
    await validatepass("Admin123!"),  // senha forte
    "admin"
  ]
);

const name='jonas'
const email='user@gmail.com';
//await pool.execute(`insert into usuarios (name,email) values(?,?)`, [name, email]);


return pool;
}
init().catch((err) => console.error('Erro ao conectar ao banco de dados:', err));
export default()=>pool;