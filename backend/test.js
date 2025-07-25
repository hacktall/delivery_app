import { compare,generatetoken,validatepass,authentic} from './request.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import {init} from './db.js';
import express from 'express';
import { sendSMS } from './twiliosetup.js';
//import { AuthClient } from '@google/auth-client'; // Assuming this is the correct import for your auth client

//const cliente=new AuthClient('90841758110-8bifdi4fjjus8alvito3if706ppnii79.apps.googleusercontent.com');
const app=express();
const port= 3000;


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(bodyParser.json());
//app.use(express.json());
app.use(express.static('../public'))

app.get('/index',async(req,res)=>{
try{
const pool=await init();
  const[rows]= await pool.execute(`select * from usuarios`);
res.json({result:rows});
const logins=rows[0];

}
catch(error){
console.error("erro  ao buscar dados:",error);
  res.status(500).send({error:'erro ao buscar dados'});
}

  });

app.post('/index', async(req,res)=>{
try{

const pool=await init();
const {name,email,password}=req.body;
if(!name || !email || !password){

res.status(400).send('email e nome necessarios');  
}

const hash= await validatepass(password);
const [result]=await pool.execute('insert into usuarios (name,email,password) values(?,?,?)',[name,email,hash]);
const auth=await compare(password,hash);
if(result.affectedRows > 0){
res.status(201).send({user:'usuario criado com sucesso ',resposy:req.body});
}
else{

 res.status(500).send('erro ao criar usuario'); 
}
console.log(result);
}
catch(error){
console.error(error);
res.status(500).json({retorno:'interno server'});
};
});
app.get('/index/logica',async(req,res)=>{
  try{
const pool =await init(); 
const[rows]=await pool.execute(`select * from usuarios`);
res.json({list:rows});
  }
catch(error){
console.error('erro nao foi possivel carregar usuarios:', error); 
res.status(500).send({erro:'na busca de usuarios'});
}
})
app.delete('/index/usuarios',async(req,res)=>{
try{
const pool=await init();
  const name="lights";
const [result] = await pool.execute('DELETE FROM usuarios WHERE name = ?', [name]);
console.log(result);
}
catch(error){
console.error(error);
res.status(500).send({error:'impossivel excluir usuario seja pro'});
}

})
app.post('/send-sms', async (req, res) => {

 console.log('Body recebido:', req.body);
  const { phone, message } = req.body;

  if (!phone || !message) {
    return res.status(400).json({ error: 'Número e mensagem são obrigatórios' });
  }

  try {
    const sid = await sendSMS(phone, message);
    res.status(200).json({ success: true, sid });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao enviar SMS' });
  }
});
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('→ Requisição de login:', { email, password });

  const pool = await init();
  const [users] = await pool.execute(
    'SELECT * FROM usuarios WHERE email = ?', [email]
  );
  console.log('→ Usuários encontrados no DB:', users);

  if (users.length === 0) {
    console.log('→ Usuário não encontrado');
    return res.status(401).json({ error: 'Usuário não encontrado' });
  }

  const user = users[0];
  const match = await compare(password, user.password);
  console.log('→ Compare retornou:', match);

  if (!match) {
    console.log('→ Senha incorreta');
    return res.status(401).json({ error: 'Senha incorreta' });
  }

  const token = generatetoken({ userId: user.id });
  console.log('→ Login OK, gerando token:', token);

  res.status(200).json({ user, token });
});



app.post('/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Campos obrigatórios' });

  try {
    const pool = await init();
    const hashed = await validatepass(password);
    const [result] = await pool.execute(
      'INSERT INTO usuarios (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashed, 'user']
    );
    res.status(201).json({ message: 'Usuário criado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro no cadastro' });
  }
});

app.post('/order/send', async (req, res) => {
  const { phone, message } = req.body;
  try {
    const sid = await sendSMS(phone, message);
    res.json({ success: true, sid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao enviar WhatsApp' });
  }
});





app.listen(port,async()=>{
  await init();
  console.log(`rodando na porta ${port}`);
})
