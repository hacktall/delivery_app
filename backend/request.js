import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({path:'./settings/.env'});
const secret=process.env.JWT_SECRET||'myfault'
export function validatepass(password){
  return  bcrypt.hash(password,11); 
}
export function compare(password,hash){
return bcrypt.compare(password,hash);

}


export function generatetoken(payloading){
    return jwt.sign(payloading,secret,{expiresIn:'1h'})
}
export function authentic(token){
return jwt.verify(token,secret);
}