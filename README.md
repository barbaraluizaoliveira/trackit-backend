# TrackIt Back-end — API de Gerenciamento de Empréstimos

### 🏫 Informações Acadêmicas
* **Universidade:** UNICAP — Universidade Católica de Pernambuco
* **Curso:** Sistemas para Internet
* **Cadeira:** Aplicações Orientadas a Serviços
* **Período:** 2026.1

---

## 👥 Equipe de Desenvolvimento e RAs

| Integrante | RA (Registro Acadêmico) | Responsabilidade Principal no Escopo |
| :--- | :---: | :--- |
| **Bárbara Luiza Oliveira** | 855654 | Infraestrutura do Servidor, Conexão com Banco e Rotas de Autenticação |
| **Layza Nicolle** | 855207 | Lógica de Criptografia, Token JWT e Middlewares de Segurança |
| **Matheus Pablo** | 855289 | Lógica de Negócio dos CRUDs (Itens e Empréstimos) |
| **Vinícius Simas** | 852538 | Histórico de Eventos, URLs Compostas e Coleção do Postman |

---

## 📝 Descrição do Projeto
O **TrackIt Back-end** é uma API RESTful estruturada em Node.js e Express voltada para o controle e rastreamento de itens e objetos compartilhados/emprestados entre usuários. O ecossistema conta com persistência em banco de dados relacional PostgreSQL (hospedado remotamente via NeonDB) e proteção de endpoints utilizando autenticação por criptografia via JSON Web Tokens (JWT).

## 🛠️ Tecnologias Utilizadas
* **Runtime:** Node.js (v20+)
* **Framework:** Express.js
* **Banco de Dados:** PostgreSQL (NeonDB Serverless)
* **Driver DB:** `pg` 
* **Segurança:** `jsonwebtoken` (JWT) e `bcrypt` para hashing de senhas
* **Hospedagem & Deploy:** Vercel 

## 📁 Estrutura de Pastas
```text
src/
├── config/          # Configuração do Pool do PostgreSQL (db.js)
├── controllers/     # Lógicas de controle e respostas (auth, event, item, loan)
├── middlewares/     # Interceptadores e travas de segurança (auth.js)
├── models/          # Camada de banco de dados — Queries SQL puras (userModel, appModel)
├── routes/          # Definição e mapeamento dos endpoints expostos
└── index.js         # Inicialização central do servidor Express
