# 🚀 API REST do Sistema Central de Vagas

## 📋 O que foram criados
✅ **AlunoAPIServlet** - API REST completa para Alunos
✅ **EmpresaAPIServlet** - API REST completa para Empresas  
✅ **VagaAPIServlet** - API REST completa para Vagas
✅ **Collection Insomnia** - Testes prontos para usar

## 🌐 URLs Base
- **Servidor**: `http://localhost:8080/AP6`
- **API Alunos**: `/api/alunos`
- **API Empresas**: `/api/empresas`
- **API Vagas**: `/api/vagas`

---

## 👥 API Alunos (/api/alunos)

### 📋 GET - Listar Alunos
```http
GET http://localhost:8080/AP6/api/alunos
```
**Retorna:** Array JSON com todos os alunos

### 🔍 GET - Buscar por ID
```http
GET http://localhost:8080/AP6/api/alunos?id=673462b8e5f123456789abcd
```
**Retorna:** JSON do aluno específico

### ➕ POST - Criar Aluno
```http
POST http://localhost:8080/AP6/api/alunos
Content-Type: application/x-www-form-urlencoded

nome=Carlos API REST&email=carlos@faeterj.edu.br&telefone=(21)99888-7777&curso=ADS&periodo=3º período&turno=Noite&competencias=Java,REST&experiencia=Estudante
```

### 🔄 PUT - Atualizar Aluno  
```http
PUT http://localhost:8080/AP6/api/alunos
Content-Type: application/x-www-form-urlencoded

id=673462b8e5f123456789abcd&nome=Carlos ATUALIZADO&telefone=(21)99999-0001
```

### ❌ DELETE - Excluir Aluno
```http
DELETE http://localhost:8080/AP6/api/alunos?id=673462b8e5f123456789abcd
```

---

## 🏢 API Empresas (/api/empresas)

### 📋 GET - Listar Empresas
```http
GET http://localhost:8080/AP6/api/empresas
```

### 🔍 GET - Filtrar por Setor
```http
GET http://localhost:8080/AP6/api/empresas?setor=Tecnologia
```

### ➕ POST - Criar Empresa
```http
POST http://localhost:8080/AP6/api/empresas
Content-Type: application/x-www-form-urlencoded

nome=TechCorp API&cnpj=12.345.678/0001-90&email=contato@techcorp.com&telefone=(21)4444-5555&endereco=Av. API, 123&setor=Tecnologia&descricao=Empresa de tecnologia&senha=senha123
```

### 🔄 PUT - Atualizar Empresa
```http
PUT http://localhost:8080/AP6/api/empresas
Content-Type: application/x-www-form-urlencoded

id=673462b8e5f123456789abcd&nome=TechCorp NOVA&telefone=(21)5555-6666
```

### ❌ DELETE - Excluir Empresa
```http
DELETE http://localhost:8080/AP6/api/empresas?id=673462b8e5f123456789abcd
```

---

## 💼 API Vagas (/api/vagas)

### 📋 GET - Listar Vagas
```http
GET http://localhost:8080/AP6/api/vagas
```

### ✅ GET - Apenas Vagas Ativas
```http
GET http://localhost:8080/AP6/api/vagas?filtro=ativas
```

### 🔍 GET - Filtrar por Área
```http
GET http://localhost:8080/AP6/api/vagas?filtro=area&valor=Tecnologia
```

### ➕ POST - Criar Vaga
```http
POST http://localhost:8080/AP6/api/vagas
Content-Type: application/x-www-form-urlencoded

titulo=Dev Java Jr&descricao=Vaga para Java&empresa=TechCorp&empresaId=673462b8e5f123456789abcd&area=Tecnologia&requisitos=Java,Spring&beneficios=VT,VR&tipo=Estágio&localizacao=RJ&salario=1800.00
```

### ⏸️ PUT - Desativar Vaga
```http
PUT http://localhost:8080/AP6/api/vagas
Content-Type: application/x-www-form-urlencoded

id=673462b8e5f123456789abcd&operacao=desativar
```

### ❌ DELETE - Excluir Vaga
```http
DELETE http://localhost:8080/AP6/api/vagas?id=673462b8e5f123456789abcd
```

---

## 🧪 Como Testar

### 1️⃣ Importar no Insomnia
1. Abra o Insomnia
2. File → Import Data
3. Selecione o arquivo `insomnia-api-rest.json`
4. Workspace "Central Vagas API REST" será criado

### 2️⃣ Testar Conexão MongoDB
```http
GET http://localhost:8080/AP6/test-mongo2
```
Isso cria dados iniciais se não existirem.

### 3️⃣ Fluxo de Teste Completo

**1. Criar Empresa:**
```http
POST /api/empresas
nome=TechAPI Corp&cnpj=11.222.333/0001-44&email=tech@api.com&telefone=(21)3333-4444&endereco=Rua API, 100&setor=Tecnologia&descricao=Empresa API&senha=tech123
```

**2. Listar Empresas (pegar ID):**
```http
GET /api/empresas
```

**3. Criar Vaga (usar empresaId):**
```http
POST /api/vagas
titulo=Desenvolvedor API&descricao=Vaga para API REST&empresa=TechAPI Corp&empresaId=<ID_DA_EMPRESA>&area=Tecnologia&requisitos=Java&beneficios=VT&tipo=Estágio&localizacao=RJ&salario=2000.00
```

**4. Criar Aluno:**
```http
POST /api/alunos
nome=João API&email=joao@faeterj.edu.br&telefone=(21)99999-8888&curso=ADS&periodo=4º&turno=Manhã&competencias=Java,API&experiencia=Estudante
```

### 📊 Formato das Respostas

**Sucesso (200):**
```json
{
  "success": true,
  "message": "Operação realizada com sucesso",
  "data": { ... }
}
```

**Lista (200):**
```json
{
  "success": true,
  "data": [ {...}, {...} ]
}
```

**Erro (400/500):**
```json
{
  "success": false,
  "message": "Descrição do erro"
}
```

---

## 🔧 Códigos HTTP

| Código | Significado | Quando acontece |
|--------|-------------|-----------------|
| **200** | ✅ OK | Operação bem sucedida |
| **400** | ❌ Bad Request | Dados inválidos ou faltando |
| **404** | 🔍 Not Found | ID não encontrado |
| **500** | 💥 Server Error | Erro interno (MongoDB, etc) |

---

## 💡 Dicas Importantes

1. **IDs MongoDB**: Use ObjectIds válidos (24 caracteres hex)
2. **Content-Type**: Sempre `application/x-www-form-urlencoded`
3. **Campos obrigatórios**: Verifique nos POSTs
4. **Empresas**: CNPJ deve ter formato válido
5. **Emails**: Devem ter @ e domínio
6. **Vagas**: empresaId deve existir na base

## 🎯 Próximos Passos

1. **Testar todas as APIs** com o Insomnia
2. **Verificar dados** no MongoDB Atlas
3. **Implementar autenticação** se necessário
4. **Criar documentação Swagger** (opcional)
5. **Adicionar validações extras** conforme necessidade

---

## 🔗 Vantagens desta Abordagem

✅ **Reutiliza 100% do código MongoDB** existente
✅ **Familiar** - usa servlets que você já conhece  
✅ **Simples** - apenas adiciona JSON aos servlets
✅ **Compatível** - funciona com qualquer cliente HTTP
✅ **Testável** - fácil de testar com Insomnia/Postman
✅ **Extensível** - fácil adicionar mais endpoints

---

**🚀 API pronta para usar! Boa sorte nos testes!**