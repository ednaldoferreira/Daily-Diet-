# Daily Diet — Projeto Fullstack

Atividade avaliativa de **Programação para WEB II** (UNITINS, 4º período).
Aplicação de controle de dieta diária: cada usuário registra suas refeições, acompanha métricas e só acessa o que ele mesmo criou.

- **Backend:** Node.js, Express 5, Prisma (SQLite), Zod
- **Frontend:** React 18 (Vite), React Router, Axios, styled-components

## Como executar

Pré-requisito: Node.js 20 ou superior.

### 1. Backend (porta 3333)

```bash
cd backend
npm install
cp .env.example .env
npx prisma migrate dev --name init
npm run dev
```

### 2. Frontend (porta 5173)

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Abra http://localhost:5173, crie uma conta e comece a registrar refeições.

## Rotas da API

O usuário é identificado pelo header `x-user-id` em todas as rotas protegidas (o frontend envia automaticamente).

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/users` | Cria um usuário (`name`, `email`) |
| POST | `/sessions` | Entra com e-mail e devolve o usuário |
| GET | `/users/me` | Usuário identificado |
| POST | `/meals` | Registra refeição (`name`, `description`, `dateTime`, `isOnDiet`) |
| GET | `/meals` | Lista as refeições do usuário |
| GET | `/meals/:id` | Visualiza uma refeição |
| PUT | `/meals/:id` | Edita todas as informações da refeição |
| DELETE | `/meals/:id` | Apaga a refeição |
| GET | `/metrics` | Total, dentro da dieta, fora da dieta e melhor sequência |

**Permissões:** o usuário só visualiza, edita e apaga as próprias refeições (`403` caso contrário).

## Estrutura

```
backend/
  prisma/schema.prisma
  src/
    controllers/   # users, meals, metrics
    middlewares/   # authUser (x-user-id)
    routes/
    utils/         # cálculo das métricas (+ teste com Vitest)
frontend/
  src/
    components/    # Header, MealCard, MealForm, MetricCard...
    contexts/      # AuthContext
    pages/         # Login, MealsList, MealNew, MealEdit, MealDetail, Metrics
    services/      # instância do Axios
```

## Testes

```bash
cd backend
npm test
```
