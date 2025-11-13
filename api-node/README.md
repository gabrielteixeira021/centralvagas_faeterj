# 🚀 Central de Vagas API - Node.js + Express + MongoDB

API REST moderna e completa para o Sistema Central de Vagas da FAETERJ.

## 📊 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web rápido e minimalista
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **bcryptjs** - Hash de senhas
- **express-validator** - Validação de dados
- **CORS** - Cross-Origin Resource Sharing
- **Helmet** - Segurança HTTP
- **Morgan** - Logger de requisições

## 📊 Recursos

✅ **API RESTful** completa  
✅ **Autenticação** com hash de senhas  
✅ **Validação** robusta de dados  
✅ **Paginação** e filtros avançados  
✅ **Relacionamentos** entre entidades  
✅ **Tratamento** de erros completo  
✅ **CORS** habilitado  
✅ **Segurança** com Helmet  
✅ **Logs** detalhados  
✅ **Documentação** completa  

## 📝 Entidades

### 👥 Alunos
- Nome, email, telefone
- Curso, período, turno
- Competências, experiência
- Pontuação

### 🏢 Empresas
- Nome, CNPJ, email
- Telefone, endereço
- Setor, descrição
- Senha criptografada

### 💼 Vagas
- Título, descrição
- Área, requisitos, benefícios
- Tipo, localização, salário
- Status ativo/inativo
- Contadores de visualizações

### 📄 Candidaturas
- Relaciona aluno + vaga + empresa
- Status (Pendente, Aprovado, etc.)
- Feedback da empresa
- Pontuação

## 🚀 Como usar

### 1️♣ Instalar dependências
```bash
cd api-node
npm install
```

### 2️♣ Configurar MongoDB
1. Edite o arquivo `.env`
2. Substitua `MONGODB_URI` pela sua string do MongoDB Atlas
3. Configure as outras variáveis conforme necessário

### 3️♣ Executar
```bash
# Desenvolvimento (com nodemon)
npm run dev

# Produção
npm start
```

### 4️♣ Testar
A API estará disponível em: `http://localhost:3000`

- **Health Check**: `GET /api/health`
- **Info da API**: `GET /api`

## 🗺️ Endpoints da API

### 👥 Alunos (`/api/alunos`)
```http
GET    /api/alunos              # Listar (com filtros e paginação)
GET    /api/alunos/:id          # Buscar por ID
POST   /api/alunos              # Criar novo
PUT    /api/alunos/:id          # Atualizar
DELETE /api/alunos/:id          # Remover
GET    /api/alunos/search/:termo # Buscar por termo
```

### 🏢 Empresas (`/api/empresas`)
```http
GET    /api/empresas            # Listar (com filtros)
GET    /api/empresas/:id        # Buscar por ID
POST   /api/empresas            # Criar nova
PUT    /api/empresas/:id        # Atualizar
DELETE /api/empresas/:id        # Remover
GET    /api/empresas/setores    # Listar setores
PUT    /api/empresas/:id/senha  # Atualizar senha
```

### 💼 Vagas (`/api/vagas`)
```http
GET    /api/vagas               # Listar (com filtros avançados)
GET    /api/vagas/:id           # Buscar por ID (incrementa visualizações)
POST   /api/vagas               # Criar nova
PUT    /api/vagas/:id           # Atualizar
DELETE /api/vagas/:id           # Remover
GET    /api/vagas/ativas        # Apenas vagas ativas
GET    /api/vagas/areas         # Listar áreas
GET    /api/vagas/tipos         # Listar tipos
PUT    /api/vagas/:id/desativar # Desativar vaga
PUT    /api/vagas/:id/ativar    # Ativar vaga
```

### 📄 Candidaturas (`/api/candidaturas`)
```http
GET    /api/candidaturas                    # Listar (com filtros)
GET    /api/candidaturas/:id                # Buscar por ID
POST   /api/candidaturas                    # Criar nova
DELETE /api/candidaturas/:id                # Remover
GET    /api/candidaturas/aluno/:alunoId     # Por aluno
GET    /api/candidaturas/vaga/:vagaId       # Por vaga  
GET    /api/candidaturas/empresa/:empresaId # Por empresa
PUT    /api/candidaturas/:id/status         # Atualizar status
GET    /api/candidaturas/status             # Listar status
GET    /api/candidaturas/estatisticas/geral # Estatísticas
```

## 🔍 Filtros e Consultas

### Filtros Comuns
- **Paginação**: `?page=1&limit=20`
- **Ordenação**: `?sort=-createdAt` (- = decrescente)

### Filtros Específicos

**Alunos:**
- `?curso=ADS&turno=Noite`

**Empresas:**
- `?setor=Tecnologia&ativa=true`

**Vagas:**
- `?area=Tecnologia&tipo=Estágio&salarioMin=1000&salarioMax=3000`
- `?q=javascript` (busca textual)
- `?ativa=true`

**Candidaturas:**
- `?status=Pendente&alunoId=ID&vagaId=ID`

## 📋 Formato das Respostas

### Sucesso (200/201)
```json
{
  "success": true,
  "message": "Operação realizada com sucesso",
  "data": { ... },
  "pagination": { ... } // quando aplicável
}
```

### Erro (400/404/500)
```json
{
  "success": false,
  "message": "Descrição do erro",
  "errors": [ ... ] // quando aplicável
}
```

## 🔒 Segurança

- **Senhas**: Hash com bcrypt (salt 10)
- **Validação**: express-validator em todos endpoints
- **CORS**: Configurado para origens permitidas
- **Helmet**: Headers de segurança
- **Sanitização**: Dados limpos automaticamente

## 📊 Performance

- **Índices MongoDB**: Otimizados para consultas comuns
- **Paginação**: Evita sobrecarga de dados
- **Populate seletivo**: Apenas campos necessários
- **Agregação**: Para estatísticas eficientes

## 🔧 Estrutura do Projeto

```
api-node/
├── models/          # Modelos Mongoose
│   ├── Aluno.js
│   ├── Empresa.js
│   ├── Vaga.js
│   └── Candidatura.js
├── routes/          # Rotas da API
│   ├── alunos.js
│   ├── empresas.js
│   ├── vagas.js
│   └── candidaturas.js
├── server.js        # Servidor Express
├── package.json     # Dependências
├── .env             # Variáveis ambiente
└── README.md        # Documentação
```

## 🎉 Vantagens desta API

✅ **Moderna**: Node.js + Express + MongoDB  
✅ **Completa**: CRUD + relacionamentos + filtros  
✅ **Segura**: Validação + autenticação + CORS  
✅ **Performante**: Índices + paginação + otimizações  
✅ **Escalável**: Estrutura modular e organizada  
✅ **Testável**: Endpoints bem definidos  
✅ **Documentada**: Guias e exemplos completos  

---

**🚀 API Node.js pronta para produção!**