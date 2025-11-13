# 🎓 Central de Vagas Faeterj-Rio

Sistema web completo para gerenciamento de vagas de emprego e estágios, conectando empresas parceiras com alunos da Faeterj-Rio.

## 📋 Índice

- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Execução](#-execução)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Documentação](#-documentação)
- [API REST](#-api-rest)

---

## ✨ Funcionalidades

### Para Alunos
- 👤 Cadastro completo de perfil
- 🎮 Sistema de gamificação (pontos e níveis)
- 💼 Consulta de vagas com filtros avançados
- 🔍 Busca por palavra-chave, área e tipo
- 📊 Visualização de status das vagas (ativas/inativas)

### Para Empresas
- 🏢 Cadastro completo da empresa
- ➕ Publicação de vagas
- 📋 Gerenciamento de vagas publicadas
- 🗑️ Exclusão de vagas
- 👥 Visualização de candidatos (em desenvolvimento)

### Globais
- 🌓 Tema claro/escuro
- 📱 Interface responsiva (desktop, tablet, mobile)
- 🎨 Design moderno com Tailwind CSS
- ⚡ Atualização em tempo real
- 🔔 Sistema de notificações

---

## 🛠️ Tecnologias

### Backend
- Java 17+
- Jakarta EE 11
- Servlets 6.0
- MongoDB 6.0+
- MongoDB Java Driver
- Gson (JSON processing)

### Frontend
- HTML5
- CSS3 (Tailwind CSS)
- JavaScript ES6+
- Fetch API

### Servidor
- WildFly 31+ ou Payara Server 6+
- Maven 3.8+

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

1. **JDK 17 ou superior**
   ```bash
   java -version
   ```

2. **Maven 3.8+**
   ```bash
   mvn -version
   ```

3. **MongoDB 6.0+**
   ```bash
   mongod --version
   ```

4. **WildFly 31+ ou Payara Server 6+**
   - [Download WildFly](https://www.wildfly.org/downloads/)
   - [Download Payara](https://www.payara.fish/downloads/)

5. **Git** (opcional)
   ```bash
   git --version
   ```

---

## 🚀 Instalação

### 1. Clone o Repositório

```bash
git clone https://github.com/gabrielteixeira021/centralvagas_faeterj.git
cd centralvagas_faeterj
```

### 2. Configure o MongoDB

Inicie o serviço do MongoDB:

```bash
# Windows
net start MongoDB

# Linux/Mac
sudo systemctl start mongod
```

Crie o banco de dados e coleções (opcional - serão criados automaticamente):

```bash
mongosh
use centralvagas
db.createCollection("alunos")
db.createCollection("empresas")
db.createCollection("vagas")
db.createCollection("candidaturas")
exit
```

### 3. Configure as Dependências

O arquivo `pom.xml` já contém todas as dependências necessárias:

```xml
<!-- MongoDB Driver -->
<dependency>
    <groupId>org.mongodb</groupId>
    <artifactId>mongodb-driver-sync</artifactId>
    <version>4.11.1</version>
</dependency>

<!-- Gson -->
<dependency>
    <groupId>com.google.code.gson</groupId>
    <artifactId>gson</artifactId>
    <version>2.10.1</version>
</dependency>

<!-- Jakarta EE -->
<dependency>
    <groupId>jakarta.platform</groupId>
    <artifactId>jakarta.jakartaee-api</artifactId>
    <version>11.0.0-M4</version>
    <scope>provided</scope>
</dependency>
```

---

## ⚙️ Configuração

### 1. Configurar Conexão com MongoDB

Edite o arquivo `src/main/java/com/faeterj/centralvagas/util/MongoUtil.java`:

```java
private static final String CONNECTION_STRING = "mongodb://localhost:27017";
private static final String DATABASE_NAME = "centralvagas";
```

Ajuste os valores conforme sua configuração:
- `CONNECTION_STRING`: URL de conexão do MongoDB
- `DATABASE_NAME`: Nome do banco de dados

### 2. Configurar Contexto da Aplicação (opcional)

Edite `src/main/webapp/META-INF/context.xml` se necessário:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Context path="/AP6"/>
```

### 3. Verificar porta do servidor

Por padrão, WildFly usa a porta 8080. Certifique-se de que está disponível.

---

## ▶️ Execução

### Método 1: Build e Deploy Manual

1. **Compile o projeto:**
   ```bash
   mvn clean package
   ```

2. **Deploy no servidor:**
   - Copie `target/AP6-1.0-SNAPSHOT.war` para `WILDFLY_HOME/standalone/deployments/`
   - Ou use o console de administração do servidor

3. **Inicie o servidor:**
   ```bash
   # WildFly
   cd WILDFLY_HOME/bin
   ./standalone.sh  # Linux/Mac
   standalone.bat   # Windows
   ```

4. **Acesse a aplicação:**
   ```
   http://localhost:8080/AP6/
   ```

### Método 2: Maven + Plugin (Recomendado)

1. **Configure o plugin do WildFly no `pom.xml`:**
   ```xml
   <plugin>
       <groupId>org.wildfly.plugins</groupId>
       <artifactId>wildfly-maven-plugin</artifactId>
       <version>4.2.0.Final</version>
   </plugin>
   ```

2. **Execute:**
   ```bash
   mvn clean wildfly:run
   ```

3. **Acesse:**
   ```
   http://localhost:8080/AP6/
   ```

### Método 3: IDE (NetBeans/IntelliJ/Eclipse)

1. Importe o projeto Maven
2. Configure o servidor de aplicação
3. Execute o projeto (Run/Debug)

---

## 📁 Estrutura do Projeto

```
centralvagas_faeterj/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── faeterj/
│   │   │           └── centralvagas/
│   │   │               ├── api/           # API REST Servlets
│   │   │               │   ├── AlunoAPIServlet.java
│   │   │               │   ├── EmpresaAPIServlet.java
│   │   │               │   └── VagaAPIServlet.java
│   │   │               ├── dao/           # Data Access Objects
│   │   │               │   ├── AlunoMongoDAO.java
│   │   │               │   ├── EmpresaMongoDAO.java
│   │   │               │   ├── VagaMongoDAO.java
│   │   │               │   └── CandidaturaMongoDAO.java
│   │   │               ├── model/         # Modelos de Dados
│   │   │               │   ├── Aluno.java
│   │   │               │   ├── Empresa.java
│   │   │               │   ├── Vaga.java
│   │   │               │   └── Candidatura.java
│   │   │               └── util/          # Utilitários
│   │   │                   └── MongoUtil.java
│   │   ├── resources/
│   │   │   └── META-INF/
│   │   │       └── persistence.xml
│   │   └── webapp/
│   │       ├── assets/
│   │       │   ├── css/
│   │       │   │   └── styles.css
│   │       │   └── js/
│   │       │       ├── api.js           # Chamadas API
│   │       │       ├── common.js        # Funções comuns
│   │       │       ├── aluno.js         # Lógica do aluno
│   │       │       ├── empresa.js       # Lógica da empresa
│   │       │       ├── vagas.js         # Lógica de vagas
│   │       │       └── components/      # Componentes reutilizáveis
│   │       ├── WEB-INF/
│   │       │   ├── web.xml
│   │       │   └── jboss-web.xml
│   │       ├── index.jsp                # Página inicial
│   │       ├── aluno.jsp                # Cadastro de aluno
│   │       ├── empresa.jsp              # Área da empresa
│   │       └── vagas.jsp                # Consulta de vagas
│   └── test/
│       └── java/
├── pom.xml
├── README.md
└── GUIA_DE_USO.md                       # Guia completo do usuário
```

---

## 📖 Documentação

Consulte os seguintes arquivos para mais informações:

- **[GUIA_DE_USO.md](GUIA_DE_USO.md)**: Guia completo para usuários finais
- **[GUIA-API-REST.md](GUIA-API-REST.md)**: Documentação da API REST

---

## 🌐 API REST

### Base URL
```
http://localhost:8080/AP6/api
```

### Endpoints Principais

#### Alunos
```
GET    /api/alunos              # Listar todos
GET    /api/alunos?id={id}      # Buscar por ID
POST   /api/alunos              # Criar
PUT    /api/alunos?id={id}      # Atualizar
DELETE /api/alunos?id={id}      # Deletar
```

#### Empresas
```
GET    /api/empresas            # Listar todas
GET    /api/empresas?id={id}    # Buscar por ID
GET    /api/empresas?setor={s}  # Buscar por setor
POST   /api/empresas            # Criar
PUT    /api/empresas?id={id}    # Atualizar
DELETE /api/empresas?id={id}    # Deletar
```

#### Vagas
```
GET    /api/vagas                        # Listar todas
GET    /api/vagas?id={id}                # Buscar por ID
GET    /api/vagas?filtro=ativas          # Listar ativas
GET    /api/vagas?filtro=area&valor={a}  # Por área
POST   /api/vagas                        # Criar
PUT    /api/vagas?id={id}                # Atualizar
DELETE /api/vagas?id={id}                # Deletar
```

### Exemplo de Requisição

**POST /api/empresas**
```javascript
const data = new URLSearchParams();
data.append('nome', 'Tech Solutions');
data.append('cnpj', '12.345.678/0001-90');
data.append('email', 'contato@techsolutions.com');
data.append('telefone', '(21) 99999-9999');
data.append('endereco', 'Av. Brasil, 1000');
data.append('setor', 'Tecnologia');
data.append('descricao', 'Empresa de tecnologia');
data.append('senha', 'senha123');

fetch('http://localhost:8080/AP6/api/empresas', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: data
})
.then(response => response.json())
.then(data => console.log(data));
```

**Resposta:**
```json
{
  "success": true,
  "message": "Empresa cadastrada com sucesso!",
  "id": "6572a1b3c4d5e6f7g8h9i0j1",
  "empresa": {
    "id": "6572a1b3c4d5e6f7g8h9i0j1",
    "nome": "Tech Solutions",
    "cnpj": "12.345.678/0001-90",
    "email": "contato@techsolutions.com",
    "telefone": "(21) 99999-9999",
    "endereco": "Av. Brasil, 1000",
    "setor": "Tecnologia",
    "descricao": "Empresa de tecnologia"
  },
  "timestamp": 1702123456789
}
```

---

## 🧪 Testando a Aplicação

### 1. Testar Cadastro de Empresa

1. Acesse `http://localhost:8080/AP6/empresa.jsp`
2. Preencha o formulário de cadastro da empresa
3. Clique em "Cadastrar Empresa"
4. Verifique a notificação de sucesso

### 2. Testar Publicação de Vaga

1. Na mesma página, role até "Cadastrar Nova Vaga"
2. Preencha os dados da vaga
3. Clique em "Publicar Vaga"
4. A vaga deve aparecer na tabela "Minhas Vagas Publicadas"

### 3. Testar Consulta de Vagas

1. Acesse `http://localhost:8080/AP6/vagas.jsp`
2. A vaga publicada deve aparecer na lista
3. Teste os filtros:
   - Selecione "Somente vagas ativas"
   - Filtre por área
   - Busque por palavra-chave
4. Clique em "Candidatar" para testar a modal

### 4. Verificar Dados no MongoDB

```bash
mongosh
use centralvagas
db.empresas.find().pretty()
db.vagas.find().pretty()
db.alunos.find().pretty()
```

---

## 🐛 Solução de Problemas

### Erro: "Cannot connect to MongoDB"
**Solução**: Verifique se o MongoDB está rodando:
```bash
# Windows
net start MongoDB

# Linux/Mac
sudo systemctl status mongod
```

### Erro 404: "Not Found"
**Solução**: Verifique se a aplicação foi deployada corretamente:
```bash
# Verifique logs do servidor
tail -f WILDFLY_HOME/standalone/log/server.log
```

### Erro 500: "Internal Server Error"
**Solução**: Verifique os logs do servidor e do MongoDB. Geralmente relacionado a:
- Conexão com MongoDB
- Dados inválidos
- Exceções não tratadas

### Porta 8080 já em uso
**Solução**: 
1. Mude a porta do servidor no arquivo de configuração
2. Ou finalize o processo que está usando a porta:
   ```bash
   # Windows
   netstat -ano | findstr :8080
   taskkill /PID <PID> /F
   
   # Linux/Mac
   lsof -ti:8080 | xargs kill -9
   ```

---

## 📊 Monitoramento

### Console de Administração WildFly
```
http://localhost:9990/console
```

### MongoDB Compass
Interface gráfica para visualizar dados:
```
mongodb://localhost:27017
```

---

## 🔒 Segurança

### Implementações Atuais
- ✅ Validação de dados no frontend e backend
- ✅ Sanitização de inputs
- ✅ Verificação de duplicatas (CNPJ, email)
- ✅ CORS configurado

### Recomendações para Produção
- ⚠️ Implementar hash de senhas (BCrypt)
- ⚠️ Adicionar autenticação JWT
- ⚠️ Configurar HTTPS
- ⚠️ Implementar rate limiting
- ⚠️ Adicionar logs de auditoria

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto foi desenvolvido para fins acadêmicos na Faeterj-Rio.

---

## 👥 Autores

- **Gabriel Teixeira** - [@gabrielteixeira021](https://github.com/gabrielteixeira021)

---

## 📞 Suporte

Para dúvidas ou problemas:
1. Consulte o [GUIA_DE_USO.md](GUIA_DE_USO.md)
2. Verifique a seção [Solução de Problemas](#-solução-de-problemas)
3. Abra uma issue no GitHub

---

## 🎓 Faeterj-Rio

**Faculdade de Educação Tecnológica do Estado do Rio de Janeiro**

Projeto desenvolvido como parte do curso de Tecnologia.

---

**Versão**: 2.0  
**Última Atualização**: Novembro 2025
