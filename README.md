# 🧠 Task Manager - Arquitetura Hexagonal

Este projeto é uma API de gerenciamento de tarefas desenvolvida com **Node.js + TypeScript**, aplicando conceitos avançados como **Arquitetura Hexagonal (Ports and Adapters)**.

O objetivo é demonstrar boas práticas de desenvolvimento backend, com foco em **desacoplamento, organização e escalabilidade**.

---

## 🚀 Tecnologias utilizadas

* Node.js
* TypeScript
* Express
* MongoDB
* JWT (Autenticação)
* Zod (Validação)

---

## 🏗️ Arquitetura

O projeto segue o padrão **Arquitetura Hexagonal**, também conhecido como **Ports and Adapters**.

### 🎯 Objetivos da arquitetura

* Separar regras de negócio da infraestrutura
* Facilitar testes
* Permitir troca de tecnologias sem impactar o core

---

## 📂 Estrutura de pastas

```
src/
├── domain/              # Regras de negócio (entidades e interfaces)
├── application/         # Casos de uso (UseCases)
├── infrastructure/      # Banco de dados e implementações externas
├── interfaces/          # Controllers e rotas (entrada HTTP)
```

---

## 🧩 Explicação das camadas

### 🟣 Domain

Contém a regra de negócio pura:

* Entidades
* Interfaces de repositórios

👉 Não depende de nenhuma tecnologia externa

### 🔵 Application

Contém os **UseCases**, que representam as ações do sistema:

* Criar usuário
* Fazer login
* Criar tarefa
* Listar tarefas

### 🟢 Infrastructure

Responsável por integrações externas:

* Banco de dados (MongoDB)
* Implementação dos repositórios

### 🟡 Interfaces

Camada responsável pela entrada da aplicação:

* Controllers
* Rotas HTTP (Express)

---

## 🧠 Design Patterns utilizados

* Repository Pattern → abstração do acesso ao banco
* Use Case Pattern → organização das regras de negócio
* Dependency Injection → desacoplamento entre camadas
* DTO (Data Transfer Object) → padronização de dados

---

## 🔐 Autenticação

A autenticação é feita via **JWT (JSON Web Token)**.

### Fluxo:

1. Usuário faz login
2. Backend gera um token
3. Frontend envia o token nas requisições protegidas

---

## ⚙️ Como rodar o projeto

### 🔹 1. Clonar o repositório

```bash
git clone https://github.com/MarceloBarrosMesquita/TASK-MANAGER-HEXAGONAL.git
cd TASK-MANAGER-HEXAGONAL
```

### 🔹 2. Instalar dependências

```bash
npm install
```

### 🔹 3. Criar arquivo .env

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=seu_secret_super_seguro
```

### 🔹 4. Gerar JWT_SECRET

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 🔹 5. Rodar o projeto

```bash
npm run dev
```

---

## 📡 Endpoints principais

### 🔐 Autenticação

#### 📌 Criar usuário

**POST** `/api/register`

**Body (JSON):**

```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "id": "65f1a2b3c4d5e6f7890abc12",
  "name": "João Silva",
  "email": "joao@email.com"
}
```

---

#### 📌 Login

**POST** `/api/login`

**Body (JSON):**

```json
{
  "email": "joao@email.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "token": "seu_jwt_token_aqui"
}
```

---

### 📋 Tarefas

🔒 Todas as rotas abaixo precisam de autenticação via JWT

**Header:**

```http
Authorization: Bearer seu_jwt_token_aqui
```

---

#### 📌 Listar tarefas

**GET** `/api/tasks`

**Response:**

```json
[
  {
    "id": "65f1a2b3c4d5e6f7890abc34",
    "title": "Estudar Node.js",
    "completed": false,
    "createdAt": "2026-03-20T10:00:00.000Z"
  }
]
```

---

#### 📌 Criar tarefa

**POST** `/api/tasks`

**Body (JSON):**

```json
{
  "title": "Estudar arquitetura hexagonal"
}
```

**Response:**

```json
{
  "id": "65f1a2b3c4d5e6f7890abc36",
  "title": "Estudar arquitetura hexagonal",
  "completed": false,
  "createdAt": "2026-03-23T14:00:00.000Z"
}
```

---

#### 📌 Criar múltiplas tarefas

**POST** `/api/tasks/bulk`

**Body (JSON):**

```json
[
  {
    "title": "Treinar peito"
  },
  {
    "title": "Estudar TypeScript"
  }
]
```

**Response:**

```json
[
  {
    "id": "65f1a2b3c4d5e6f7890abc37",
    "title": "Treinar peito",
    "completed": false
  }
]
```

---

## 🎯 Objetivo do projeto

Este projeto foi criado com foco em:

* Praticar arquitetura limpa
* Simular um ambiente real de backend
* Servir como portfólio profissional

---

## 🚀 Próximas melhorias (Roadmap)

* [ ] Documentação com Swagger
* [ ] Testes automatizados mais completos
* [ ] Deploy (Render / AWS / Railway)
* [ ] Refresh Token
* [ ] Paginação de tarefas

---

## 👨‍💻 Autor

**Marcelo Barros de Mesquita**
