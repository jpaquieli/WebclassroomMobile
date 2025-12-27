# 📚 WebClassroom Mobile

Aplicação mobile desenvolvida em **React Native com Expo** para gerenciamento de postagens educacionais e usuários (professores e alunos), como parte do projeto da **Pós-Graduação Full Stack**.

O app consome uma **API REST** própria e implementa regras de negócio claras de autenticação e autorização, separando funcionalidades por perfil de usuário.

## ▶️ Como Rodar o Projeto

Crie o arquivo `.env` com base no `.env.example` e configure as variáveis necessárias.

Certifique-se de que a API backend esteja rodando e acessível no endpoint configurado em services/api.ts e constants/config.ts.

```bash
# instalar dependências
npm install
```

```bash
# iniciar o backend
cd backend
npm run start:dev
```

```bash
# iniciar a aplicação mobile
npx expo start
```

---

## 🚀 Tecnologias Utilizadas

- **React Native**
- **Expo**
- **Expo Router**
- **TypeScript**
- **Axios**
- **AsyncStorage**
- **Context API**
- **Node.js (API backend)**

---

## 👥 Perfis de Usuário

### 👨‍🏫 Professor
- Login autenticado
- Visualizar todos os posts
- Criar, editar e remover posts
- Gerenciar professores
- Gerenciar alunos

### 👨‍🎓 Aluno
- Login autenticado
- Visualizar posts
- **Não possui acesso** às telas administrativas

> ⚠️ Todas as regras de acesso são aplicadas tanto no **frontend** quanto no **backend**.

---

## 🔐 Autenticação

- Autenticação via **JWT**
- Token armazenado com **AsyncStorage**
- Headers `Authorization: Bearer <token>` enviados automaticamente
- Contexto `AuthContext` controla:
  - usuário logado
  - loading inicial
  - papel (`isProfessor`)

---

## 🧠 Arquitetura de Contextos

### `AuthContext`
Responsável por:
- Login / logout
- Estado global do usuário
- Controle de permissões

### `UsersContext`
Responsável por:
- Listagem de professores e alunos
- Criação, edição e remoção de usuários
- Carregamento condicionado à role (somente professores)
- Sincronização do estado local após criação/edição

---

---

## 📝 Funcionalidades Principais

- ✅ Login com autenticação JWT
- ✅ Controle de acesso por perfil
- ✅ CRUD de posts
- ✅ CRUD de professores e alunos
- ✅ Atualização de dados em tempo real no estado
- ✅ Layout responsivo e organizado
- ✅ Navegação tipada com Expo Router

---

## ⚠️ Regras de Negócio Importantes

- Professores **veem e gerenciam** usuários
- Alunos **não acessam** abas administrativas
- Listagens administrativas **não são carregadas** para alunos
- Senha é:
  - **Obrigatória** na criação
  - **Opcional** na edição

---
