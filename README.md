# Task Flow API

Task Flow é um backend desenvolvido em **Node.js** que permite o gerenciamento de usuários e tarefas (tasks). A API oferece funcionalidades para cadastrar usuários, autenticar, listar perfis, criar, listar, atualizar e deletar tarefas.

---

## Tecnologias e Dependências

O projeto utiliza as seguintes dependências:

- `cors`: ^2.8.5
- `dotenv`: ^17.2.3
- `express`: ^5.1.0
- `firebase`: ^12.3.0
- `firebase-admin`: ^13.5.0
- `nodemon`: ^3.1.10

---

## Configuração do Ambiente

Para executar a API, é necessário criar um arquivo `.env` na raiz do projeto com as informações do Firebase. Exemplo:

```
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_MEASUREMENT_ID=your_measurement_id
```

Depois, instale as dependências e inicie o servidor:

```bash
npm install
npm run dev
```

O servidor será iniciado em `http://localhost:1000`.

---

## Endpoints

### Autenticação

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST   | /auth/register | Cadastra um novo usuário |
| POST   | /auth/login    | Realiza login do usuário |
| GET    | /auth/token-test | Gera um token para teste |
| GET    | /auth/profile  | Busca perfil do usuário logado |
| PUT    | /auth/profile  | Atualiza perfil do usuário |

### Tarefas (Tasks)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST   | /tasks                  | Cria uma nova task |
| GET    | /tasks?status=false     | Lista tasks do usuário com status opcional |
| GET    | /tasks/:id              | Busca task pelo ID |
| PUT    | /tasks/:id              | Atualiza task pelo ID |
| DELETE | /tasks/:id              | Deleta task pelo ID |

> Exemplo de URI base: `http://localhost:1000`

---

## Licença

Este projeto está licenciado sob a **MIT License**.

---

## Observações

- É obrigatório ter o arquivo `.env` configurado corretamente para que a API funcione.
- Todos os endpoints que requerem autenticação devem receber o token JWT no header `Authorization: Bearer <token>`.
- As tasks estão vinculadas ao usuário logado, garantindo segurança e privacidade.

