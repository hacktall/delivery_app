# BotCommerce - Plataforma de Venda de Bots de WhatsApp para Empresas

Este repositório contém o código-fonte do **BotCommerce**, uma aplicação full-stack destinada à venda e gerenciamento de bots do WhatsApp voltados para soluções empresariais. A plataforma oferece interfaces para diferentes perfis de usuário: **Super Admin**, **Admin** e **Usuário**.

---

## 🎯 Objetivos do Projeto

- **Comercializar** bots de automação no WhatsApp para empresas de diversos portes.
- **Gerenciar** múltiplos tenants (empresas) e planos de serviço.
- **Controlar** usuários internos (Admins) e externos (Clientes) com diferentes níveis de permissão.
- **Registrar** e **acompanhar** pedidos, faturamento e tickets de suporte.

---

## 🛠 Tecnologias Utilizadas

- **Back-end**: Node.js, Express.js, MySQL, Venom-bot/Twilio (WhatsApp), Nodemailer
- **Front-end**: React.js, Axios, Tailwind CSS (ou biblioteca de sua preferência)
- **Autenticação**: JWT, bcrypt
- **Outros**: CORS, body-parser, logger personalizado

---

## 📁 Estrutura de Diretórios

```
├── backend/                 # Lógica do servidor
│   ├── middleware/          # Middlewares de autenticação e autorização
│   ├── settings/            # Configurações, variáveis de ambiente e env.example
│   ├── db.js                # Inicialização e conexão com MySQL
│   ├── request.js           # Helpers: compare, generateToken, validatePass, authenticate
│   ├── twiliosetup.js       # Configuração do envio de SMS/WhatsApp com Twilio
│   ├── logger.js            # Logger de requisições
│   ├── isSuperAdmin.js      # Middleware para rota de superadmin
│   └── index.js             # Entry point da API (rotas, servidores, listeners)

├── front-end/               # Aplicação React para consumo da API
│   ├── public/              # Arquivos estáticos (logo, favicon, etc.)
│   ├── src/                 # Código-fonte React
│   │   ├── pages/           # Páginas: Login, Register, Dashboard, Admin, SuperAdmin
│   │   ├── components/      # Componentes reutilizáveis e ProtectedRoute
│   │   ├── context/         # Contexto de autenticação
│   │   ├── services/        # Serviços Axios para chamadas à API
│   │   └── App.jsx          # Componente raiz
│   └── package.json         # Dependências e scripts do React

├── node_modules/            # Dependências instaladas
├── .gitignore               # Arquivos e pastas ignoradas pelo Git
├── package.json             # Dependências e scripts do projeto (back-end)
├── package-lock.json        # Lockfile para dependências
└── README.md                # Documentação do projeto
```

---

## 🚀 Instalação e Execução

### Pré-requisitos

- Node.js v18+ e npm/yarn
- MySQL Server
- Conta Twilio (opcional para SMS/WhatsApp)
- Conta SMTP (Gmail ou outro) para envio de emails

### Variáveis de Ambiente

Copie o arquivo de exemplo `.env.example` para `.env` e configure:

```
# MySQL
DB_HOST=localhost
DB_USER=root
DB_PASS=senha
DB_NAME=botcommerce

# JWT
JWT_SECRET=sua_chave_secreta

# Twilio
TWILIO_SID=XXXXXXXXXXXXXXXXX
TWILIO_TOKEN=XXXXXXXXXXXXXXXXX

# SMTP
SMTP_USER=seu_email@gmail.com
SMTP_PASS=sua_senha

# Front-end URL
FRONTEND_URL=http://localhost:5173
```

### Back-end

```bash
cd backend
npm install
npm start
```

### Front-end

```bash
cd front-end
npm install
npm run dev
```

---

## ⚙️ Rotas Principais da API

- **Auth**

  - `POST /auth/register` - Cadastra novo usuário
  - `POST /auth/login` - Autentica usuário e retorna JWT
  - `POST /auth/forgot` - Solicita link de redefinição de senha
  - `POST /auth/reset/:token` - Redefine senha

- **Usuários, Produtos e Pedidos** (protected, JWT)

  - `GET /usuarios` - Lista usuários do tenant
  - `GET /produtos` - Lista produtos do tenant
  - `GET /pedidos` - Lista pedidos do tenant

- **SuperAdmin** (tenant + superadmin)

  - `GET /superadmin/tenants` - Lista tenants (empresas)
  - `GET /superadmin/billing` - Faturamento de todos os tenants
  - `GET /superadmin/logs` - Últimos 50 logs do sistema
  - `GET /superadmin/tickets` - Tickets de suporte de todos os tenants

---

## 🤝 Contribuição

1. Faça um fork deste repositório
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit suas mudanças: `git commit -m 'Adiciona nova funcionalidade'`
4. Envie para o branch: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

#### Desenvolvido com ❤️ por sua equipe de desenvolvimento

