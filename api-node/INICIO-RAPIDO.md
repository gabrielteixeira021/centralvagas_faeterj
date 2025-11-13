# 🚀 Guia Rápido - API Node.js

## ⚡ Início Rápido (5 minutos)

### 1️⃣ Configure o MongoDB
```bash
# Edite o arquivo .env
# Substitua MONGODB_URI pela sua string do MongoDB Atlas
```

### 2️⃣ Inicie a API
```bash
# Desenvolvimento (com auto-reload)
npm run dev

# OU Produção
npm start
```

### 3️⃣ Teste a API
```bash
# Health check
curl http://localhost:3000/api/health

# Info da API
curl http://localhost:3000/api
```

## 📋 Comandos Essenciais

```bash
# Instalar dependências
npm install

# Desenvolvimento (nodemon)
npm run dev

# Produção
npm start

# Verificar dependências
npm audit
```

## 🔗 URLs Importantes

- **API Base**: `http://localhost:3000/api`
- **Health Check**: `http://localhost:3000/api/health`
- **Alunos**: `http://localhost:3000/api/alunos`
- **Empresas**: `http://localhost:3000/api/empresas`
- **Vagas**: `http://localhost:3000/api/vagas`
- **Candidaturas**: `http://localhost:3000/api/candidaturas`

## 🧪 Testes Rápidos com curl

### Criar Aluno
```bash
curl -X POST http://localhost:3000/api/alunos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Node Test",
    "email": "joao.test@faeterj.edu.br",
    "telefone": "(21)99999-0001",
    "curso": "ADS",
    "periodo": "4º",
    "turno": "Noite",
    "competencias": "JavaScript, Node.js",
    "experiencia": "Estudante"
  }'
```

### Listar Alunos
```bash
curl http://localhost:3000/api/alunos
```

### Criar Empresa
```bash
curl -X POST http://localhost:3000/api/empresas \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Test Node Corp",
    "cnpj": "12.345.678/0001-90",
    "email": "test@nodetest.com",
    "telefone": "(21)3333-4444",
    "endereco": "Rua Test, 123",
    "setor": "Tecnologia",
    "descricao": "Empresa de teste",
    "senha": "senha123"
  }'
```

## 🔧 Configuração do .env

```env
# Porta da API
PORT=3000

# MongoDB Atlas (SUBSTITUA PELA SUA!)
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/centralvagas?retryWrites=true&w=majority

# JWT Secret (MUDE PARA PRODUÇÃO!)
JWT_SECRET=sua_chave_secreta_super_forte

# CORS Origins
ALLOWED_ORIGINS=http://localhost:8080,http://localhost:3000
```

## 📱 Insomnia Collection

1. Importe o arquivo `insomnia-collection.json`
2. Configure as variáveis de ambiente no Insomnia
3. Teste todos os endpoints facilmente

## 🎯 Próximos Passos

1. **Configure MongoDB** no `.env`
2. **Inicie a API** com `npm run dev`
3. **Teste endpoints** básicos
4. **Importe collection** no Insomnia
5. **Crie dados** de teste
6. **Integre** com seu frontend

---

**🚀 API Node.js pronta para usar!**