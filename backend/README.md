# 📚 WebClassroom

## 📝 Descrição do Projeto

A **WebClassroom** foi desenvolvida para atender à demanda de professores da rede pública que não possuem ferramentas acessíveis para compartilhar conteúdos com seus alunos.

Com foco em **tecnologia acessível**, **escalabilidade** e **praticidade**, a aplicação oferece uma interface segura e moderna para **postagem e leitura de conteúdos educacionais**.

---

## 🚀 Funcionalidades

- ✅ Criação de usuários dos tipos **professor** e **aluno**
- ✅ Login de usuários via **JWT**
- ✅ Listagem de posts (alunos e professores)
- ✅ Leitura detalhada de um post (alunos e professores)
- ✅ Busca por título ou conteúdo (alunos e professores)
- ✅ Criação de postagens (apenas professores)
- ✅ Edição de postagens (apenas professores)
- ✅ Exclusão de postagens (apenas professores)

---

## 📡 Endpoints da API

### 👤 Autenticação e Cadastro

#### `POST /v1/user`  
Cria um novo usuário.  
> **Obs:** Apenas usuários com `role: "professor"` têm acesso às rotas protegidas de postagens.  
**Body:**
```json
{
  "username": "professor",
  "password": "minhasenha123",
  "role": "professor"
}
```

#### `POST /v1/user/signin`  
Autentica o usuário e retorna um **token JWT**.  
**Body:**
```json
{
  "username": "professor",
  "password": "minhasenha123"
}
```

---

### 📄 Postagens (Requer token Bearer JWT)

#### `GET /v1/post`  
Lista todos os posts com paginação.  
**Query params (opcional):**
- `page` (default: `1`)
- `limit` (default: `10`)

#### `GET /v1/post/:id`  
Retorna os detalhes de um post específico.

#### `GET /v1/post/search?q=termo`  
Busca posts que contenham o termo no título ou conteúdo.  
**Query params (opcional):**
- `page` (default: `1`)
- `limit` (default: `10`)

#### `POST /v1/post` *(somente professores)*  
Cria uma nova postagem.  
**Body:**
```json
{
  "title": "Título da postagem",
  "content": "Conteúdo da postagem",
  "author": "Nome do professor"
}
```

#### `PATCH /v1/post/:id` *(somente professores)*  
Edita uma postagem existente.  
**Body:**
```json
{
  "content": "Novo conteúdo"
}
```

#### `DELETE /v1/post/:id` *(somente professores)*  
Exclui uma postagem.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**
- **Express.js**
- **PostgreSQL**
- **Docker & Docker Compose**
- **GitHub Actions (CI/CD)**
- **Render (Deploy)**
- **Jest** (testes unitários)

---

## ⚙️ Como Executar o Projeto

### ▶️ Executando Localmente com Docker Compose

1. Clone o repositório:
```bash
git clone https://github.com/jpaquieli/WebClassroom.git
cd WebClassroom
```

2. Crie o arquivo `.env` com base no `.env.example` e configure as variáveis necessárias.

3. Suba os containers:
```bash
docker-compose up --build
```

4. A API estará disponível em:
```
http://localhost:3000
```

---

## ☁️ Ambiente de Produção (Render)

A aplicação é implantada automaticamente na **plataforma Render** via GitHub Actions.

- ✅ **Variáveis de ambiente** devem ser configuradas na aba *Environment* do Render.
- ✅ Deploy é acionado automaticamente a cada `push` na branch `main`.
- 🌐 A aplicação está disponível em:
```
https://webclassroom-latest.onrender.com
```

---

## 🧪 Testes

Execute os testes localmente com:
```bash
npm test
```

- Framework: **Jest**
- Os testes são executados automaticamente na pipeline de CI do **GitHub Actions**

---

## 📦 CI/CD com GitHub Actions

A pipeline realiza:

- 🔍 Instalação de dependências  
- 🧹 Execução das rotinas de **lint**  
- ✅ Execução dos testes  
- 📦 Push da imagem para o **Docker Hub**  
- 🚀 Deploy na **Render**

Arquivo da pipeline:  
```
.github/workflows/main.yml
```
