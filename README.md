# 🧠 Task Manager - Arquitetura Hexagonal

Este projeto é uma API de gerenciamento de tarefas desenvolvida com **Node.js + TypeScript**, aplicando conceitos avançados como **Arquitetura Hexagonal (Ports and Adapters)**.

O objetivo é demonstrar boas práticas de desenvolvimento backend, com foco em **desacoplamento, organização e escalabilidade**.

---

# 🚀 Tecnologias utilizadas

* Node.js
* TypeScript
* Express
* MongoDB
* JWT (Autenticação)
* Zod (Validação)

---

# 🏗️ Arquitetura

O projeto segue o padrão **Arquitetura Hexagonal**, também conhecido como **Ports and Adapters**.

### 🎯 Objetivo da arquitetura:

* Separar regras de negócio da infraestrutura
* Facilitar testes
* Permitir troca de tecnologias sem impactar o core

---

# 📂 Estrutura de pastas

```
src/
├── domain/              # Regras de negócio (entidades e interfaces)
├── application/         # Casos de uso (UseCases)
├── infrastructure/      # Banco de dados e implementações externas
├── interfaces/          # Controllers e rotas (entrada HTTP)
```

---

# 🧩 Explicação das camadas

### 🟣 Domain

Contém a regra de negócio pura:

* Entidades
* Interfaces de repositórios

👉 Não depende de nenhuma tecnologia externa

---

### 🔵 Application

Contém os **UseCases**, que representam as ações do sistema:

Exemplos:

* Criar usuário
* Fazer login
* Criar tarefa
* Listar tarefas

---

### 🟢 Infrastructure

Responsável por integrações externas:

* Banco de dados (MongoDB)
* Implementação dos repositórios

---

### 🟡 Interfaces

Camada responsável pela entrada da aplicação:

* Controllers
* Rotas HTTP (Express)

---

# 🧠 Design Patterns utilizados

* **Repository Pattern** → abstração do acesso ao banco
* **Use Case Pattern** → organização das regras de negócio
* **Dependency Injection** → desacoplamento entre camadas
* **DTO (Data Transfer Object)** → padronização de dados

---

# 🔐 Autenticação

A autenticação é feita via **JWT (JSON Web Token)**.

Fluxo:

1. Usuário faz login
2. Backend gera um token
3. Frontend envia o token nas requisições protegidas

---

# ⚙️ Como rodar o projeto

## 🔹 1. Clonar o repositório

```
git clone https://github.com/MarceloBarrosMesquita/TASK-MANAGER-HEXAGONAL.git
cd TASK-MANAGER-HEXAGONAL
```

---

## 🔹 2. Instalar dependências

```
npm install
```

---

## 🔹 3. Criar arquivo `.env`

Crie um arquivo `.env` na raiz do projeto:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=seu_secret_super_seguro
```

---

## 🔹 4. Gerar JWT_SECRET

Você pode gerar um secret seguro com:

```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🔹 5. Rodar o projeto

```
npm run dev
```

---

# 📡 Endpoints principais

## 🔐 Autenticação

* `POST /api/register` → Criar usuário
* Exemplo
* {
   "name": "Pessoa",
   "email": "pessoa1@email.com",
   "password": "password"
  }
* `POST /api/login` → Login

---

## 📋 Tarefas

* `GET /api/tasks` → Listar tarefas do usuário
* `POST /api/tasks` → Criar tarefa
* `POST /api/tasks/bulk` → Criar várias tarefas

---

# 🎯 Objetivo do projeto

Este projeto foi criado com foco em:

* Praticar arquitetura limpa
* Simular um ambiente real de backend
* Servir como portfólio profissional

---

# 👨‍💻 Autor

Marcelo Barros
