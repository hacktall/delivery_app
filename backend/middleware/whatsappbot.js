import axios from 'axios';

// Configurações
const token = 'SEU_TOKEN_DE_ACESSO';
const phoneNumberId = 'SEU_PHONE_NUMBER_ID';
const recipientPhone = '5511999999999'; // número no formato E.164
const message = 'Olá! Esta é uma mensagem de teste via WhatsApp Cloud API.';

// Envio da mensagem
axios.post(`https://graph.facebook.com/v19.0/${phoneNumberId}/messages`, {
  messaging_product: 'whatsapp',
  to: recipientPhone,
  type: 'text',
  text: { body: message }
}, {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
.then(response => {
  console.log('Mensagem enviada com sucesso:', response.data);
})
.catch(error => {
  console.error('Erro ao enviar mensagem:', error.response ? error.response.data : error.message);
});
