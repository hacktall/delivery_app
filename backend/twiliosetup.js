import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config({ path: './settings/.env' });
/// twiliosetup.js


const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

export async function sendSMS(to, message) {
  const msg = await client.messages.create({
    from: 'whatsapp:+14155238886',
    to: `whatsapp:${to}`,
    body: message,
  });
  return msg.sid;
}
