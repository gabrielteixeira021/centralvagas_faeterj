# 📚 Guia de Uso - Central de Vagas Faeterj-Rio

## 🎯 Visão Geral

A Central de Vagas Faeterj-Rio é um sistema web completo para gerenciamento de vagas de emprego e estágios, conectando empresas parceiras com alunos da instituição.

## 🏗️ Arquitetura do Sistema

### Backend
- **Tecnologia**: Java Jakarta EE 11 com Servlets
- **Banco de Dados**: MongoDB
- **Padrão de Projeto**: DAO (Data Access Object)
- **API REST**: Endpoints em `/api/*` para comunicação com frontend

### Frontend
- **Tecnologia**: HTML5, CSS3 (Tailwind CSS), JavaScript Vanilla
- **Design**: Responsivo com suporte a tema claro/escuro
- **Componentização**: Componentes JavaScript reutilizáveis

---

## 📖 Páginas e Funcionalidades

### 1. 🏠 Página Inicial (`index.jsp`)

**Descrição**: Página de boas-vindas com visão geral do sistema.

**Funcionalidades**:
- Visualização de estatísticas gerais
- Links rápidos para as principais funcionalidades
- Informações sobre o banco de dados e arquitetura

**Como usar**:
1. Acesse a URL base da aplicação
2. Navegue pelos cards informativos
3. Use o menu lateral para acessar outras páginas

---

### 2. 👤 Cadastro de Aluno (`aluno.jsp`)

**Descrição**: Área para cadastro e gerenciamento de perfil de alunos.

**Campos do Formulário**:
- **Nome Completo*** (obrigatório)
- **Email*** (obrigatório)
- **Telefone***
- **Curso***
- **Período***
- **Turno***
- **Competências**: Lista de habilidades técnicas
- **Experiência**: Descrição da experiência profissional

**Como usar**:
1. Acesse "Cadastro do Aluno" no menu lateral
2. Preencha todos os campos obrigatórios (marcados com *)
3. Adicione suas competências usando o campo "Nova Competência"
4. Clique em "Salvar Cadastro"
5. Aguarde a confirmação de sucesso

**Sistema de Gamificação**:
- Ganhe 50 pontos ao completar seu cadastro
- Ganhe 10 pontos por cada competência adicionada
- Acompanhe seu nível e progresso no painel

**API Utilizada**:
- POST `/api/alunos` - Criar novo aluno
- GET `/api/alunos` - Listar todos os alunos
- PUT `/api/alunos?id={id}` - Atualizar dados do aluno
- DELETE `/api/alunos?id={id}` - Remover aluno

---

### 3. 🏢 Área da Empresa (`empresa.jsp`)

**Descrição**: Área para cadastro de empresas e gerenciamento de vagas.

#### 📝 Cadastro da Empresa

**Campos do Formulário**:
- **Nome da Empresa*** (obrigatório)
- **CNPJ*** (obrigatório) - Formato: 00.000.000/0000-00
- **Email*** (obrigatório)
- **Telefone**: Contato da empresa
- **Endereço**: Localização completa
- **Setor**: Área de atuação (Tecnologia, Financeiro, Saúde, etc.)
- **Senha*** (obrigatório): Para acesso futuro
- **Descrição**: Informações sobre a empresa

**Como cadastrar**:
1. Acesse "Área da Empresa" no menu lateral
2. Role até a seção "Cadastro da Empresa"
3. Preencha todos os campos obrigatórios
4. Clique em "Cadastrar Empresa"
5. Aguarde a confirmação

**Validações**:
- CNPJ deve ser único no sistema
- Email deve ser único no sistema
- Todos os campos obrigatórios devem ser preenchidos

#### 💼 Cadastro de Vagas

**Campos do Formulário**:
- **Nome da Empresa*** (obrigatório)
- **Título da Vaga*** (obrigatório)
- **Área*** (obrigatório): Tecnologia da Informação, Back-end, Front-end, etc.
- **Tipo*** (obrigatório): Estágio, Trainee, CLT, PJ
- **Descrição da Vaga*** (obrigatório): Descreva as responsabilidades e perfil
- **Requisitos*** (obrigatório): Ex: Java, HTML, CSS, React (separados por vírgula)
- **Benefícios*** (obrigatório): Ex: VT, VR, Plano de Saúde (separados por vírgula)
- **Localização*** (obrigatório): Ex: Rio de Janeiro/RJ - Híbrido
- **Salário** (opcional): Valor em R$ (deixe em branco para "A combinar")

**Como publicar uma vaga**:

1. Role até a seção "Cadastrar Nova Vaga"
2. Preencha o nome da empresa
3. Defina o título e área da vaga
4. Selecione o tipo de contratação
5. Escreva uma descrição completa e detalhada
6. Liste os requisitos técnicos separados por vírgula
7. Informe os benefícios oferecidos
8. Especifique a localização (cidade/estado e modalidade)
9. Informe o salário ou deixe em branco para "A combinar"
10. Clique em "Publicar Vaga"
11. A vaga aparecerá na tabela "Minhas Vagas Publicadas"

**💡 Dica**: Quanto mais completo o cadastro, maior a chance de atrair candidatos qualificados!

#### 📊 Gerenciamento de Vagas

**Tabela de Vagas**:
- Visualize todas as vagas publicadas pela empresa
- Colunas: Vaga, Área, Candidatos, Status, Ações

**Ações Disponíveis**:
- **Ver**: Visualizar detalhes completos da vaga
- **Excluir**: Remover a vaga (com confirmação)

**API Utilizada**:
- POST `/api/empresas` - Cadastrar empresa
- GET `/api/empresas` - Listar empresas
- POST `/api/vagas` - Criar nova vaga
- GET `/api/vagas` - Listar vagas
- DELETE `/api/vagas?id={id}` - Excluir vaga

---

### 4. 💼 Consulta de Vagas (`vagas.jsp`)

**Descrição**: Página para alunos consultarem e se candidatarem a vagas disponíveis.

#### 🔍 Sistema de Filtros

**Opções de Visualização**:
- **Todas as vagas**: Exibe todas as vagas cadastradas no sistema
- **Somente vagas ativas**: Exibe apenas vagas em aberto para candidatura

**Filtros Disponíveis**:

1. **Busca por Palavra-chave**:
   - Digite termos como "Java", "Design", "Marketing"
   - Busca em: título, descrição, empresa e área
   - Atualização em tempo real (após 500ms de digitação)

2. **Filtro por Área**:
   - Tecnologia
   - Back-end
   - Front-end
   - Full Stack
   - Cybersecurity
   - Data Science
   - Mobile
   - DevOps
   - Blockchain
   - Game Dev

3. **Filtro por Tipo**:
   - Estágio
   - Trainee
   - CLT
   - PJ

**Como usar os filtros**:

1. **Filtro Rápido**:
   - Selecione "Todas as vagas" ou "Somente vagas ativas"
   - A lista será atualizada automaticamente

2. **Busca por Palavra-chave**:
   - Digite no campo de busca
   - Aguarde 500ms para atualização automática
   - Ex: "Java" mostrará todas as vagas relacionadas

3. **Filtro Combinado**:
   - Selecione uma área específica (ex: "Back-end")
   - Selecione um tipo (ex: "Estágio")
   - Clique em "Buscar Vagas"
   - A lista mostrará apenas vagas de estágio em Back-end

4. **Limpar Filtros**:
   - Clique em "Limpar Filtros"
   - Todos os filtros serão resetados
   - A lista completa será exibida novamente

#### 📋 Tabela de Vagas

**Informações Exibidas**:
- **Empresa**: Nome da empresa contratante
- **Cargo**: Título da vaga com badge de status (Ativa/Inativa)
- **Área**: Área de atuação
- **Tipo**: Tipo de contratação
- **Ação**: Botão para candidatura

**Badge de Status**:
- 🟢 Verde (Ativa): Vaga aberta para candidaturas
- ⚪ Cinza (Inativa): Vaga fechada ou preenchida

**Contador de Resultados**:
- Exibido no título: "Vagas Disponíveis (X de Y)"
- X = Vagas filtradas
- Y = Total de vagas no sistema

#### 🎯 Candidatura a Vagas

**Como se candidatar**:
1. Encontre a vaga desejada usando os filtros
2. Clique no botão "Candidatar" na linha da vaga
3. Uma modal será exibida com os detalhes
4. Revise as informações
5. Clique em "Confirmar Candidatura"

**Requisitos**:
- Ter cadastro completo de aluno
- Vaga deve estar ativa
- Certificar-se de que atende aos requisitos

**API Utilizada**:
- GET `/api/vagas` - Listar todas as vagas
- GET `/api/vagas?filtro=ativas` - Listar vagas ativas
- GET `/api/vagas?filtro=area&valor={area}` - Filtrar por área

---

## 🎨 Funcionalidades Globais

### 🌓 Alternância de Tema

**Como usar**:
1. Localize o botão de tema no menu lateral (desktop) ou header (mobile)
2. Clique no ícone 🌙 (tema escuro) ou ☀️ (tema claro)
3. O tema será alternado imediatamente
4. A preferência é salva no navegador

**Temas Disponíveis**:
- **Claro**: Fundo branco, ideal para ambientes claros
- **Escuro**: Fundo escuro, reduz cansaço visual

### 📱 Responsividade

**Desktop**:
- Menu lateral fixo e expansível
- Layout amplo com múltiplas colunas
- Tooltips informativos

**Tablet**:
- Layout adaptado para telas médias
- Menu lateral colapsável

**Mobile**:
- Header superior com menu hamburger
- Bottom navigation bar para acesso rápido
- Layout em coluna única
- Formulários otimizados para toque

---

## 🔧 Solução de Problemas

### Erro 400 - Bad Request

**Causa**: Campos obrigatórios não preenchidos ou dados inválidos.

**Solução**:
1. Verifique se todos os campos obrigatórios (*) estão preenchidos
2. Confira o formato dos dados (ex: email válido, CNPJ correto)
3. Tente novamente

### Erro 409 - Conflict

**Causa**: CNPJ ou email já cadastrado no sistema.

**Solução**:
1. Verifique se a empresa já está cadastrada
2. Use outro email ou CNPJ
3. Entre em contato com o suporte se necessário

### Vaga não aparece após publicação

**Causa**: Filtros ativos na página de consulta.

**Solução**:
1. Acesse a página de Consulta de Vagas
2. Clique em "Limpar Filtros"
3. Selecione "Todas as vagas"
4. Sua vaga deve aparecer na lista

### Notificação não aparece

**Causa**: JavaScript não carregado ou erro de conexão.

**Solução**:
1. Recarregue a página (F5)
2. Verifique o console do navegador (F12)
3. Certifique-se de que há conexão com o servidor

---

## 📊 Estrutura do Banco de Dados

### Coleção: alunos
```javascript
{
  _id: ObjectId,
  nome: String,
  email: String (único),
  telefone: String,
  curso: String,
  periodo: String,
  turno: String,
  competencias: String,
  experiencia: String
}
```

### Coleção: empresas
```javascript
{
  _id: ObjectId,
  nome: String,
  cnpj: String (único),
  email: String (único),
  telefone: String,
  endereco: String,
  setor: String,
  descricao: String,
  senha: String
}
```

### Coleção: vagas
```javascript
{
  _id: ObjectId,
  titulo: String,
  descricao: String,
  empresa: String,
  empresaId: String,
  area: String,
  requisitos: String,
  beneficios: String,
  tipo: String,
  localizacao: String,
  salario: Double,
  ativa: Boolean,
  dataCriacao: Date
}
```

---

## 🚀 Endpoints da API REST

### Alunos (`/api/alunos`)
- **GET** `/api/alunos` - Lista todos os alunos
- **GET** `/api/alunos?id={id}` - Busca aluno por ID
- **POST** `/api/alunos` - Cria novo aluno
- **PUT** `/api/alunos?id={id}` - Atualiza aluno
- **DELETE** `/api/alunos?id={id}` - Remove aluno

### Empresas (`/api/empresas`)
- **GET** `/api/empresas` - Lista todas as empresas
- **GET** `/api/empresas?id={id}` - Busca empresa por ID
- **GET** `/api/empresas?setor={setor}` - Busca por setor
- **POST** `/api/empresas` - Cria nova empresa
- **PUT** `/api/empresas?id={id}` - Atualiza empresa
- **DELETE** `/api/empresas?id={id}` - Remove empresa

### Vagas (`/api/vagas`)
- **GET** `/api/vagas` - Lista todas as vagas
- **GET** `/api/vagas?id={id}` - Busca vaga por ID
- **GET** `/api/vagas?filtro=ativas` - Lista vagas ativas
- **GET** `/api/vagas?filtro=area&valor={area}` - Busca por área
- **GET** `/api/vagas?filtro=tipo&valor={tipo}` - Busca por tipo
- **POST** `/api/vagas` - Cria nova vaga
- **PUT** `/api/vagas?id={id}` - Atualiza vaga
- **PUT** `/api/vagas?id={id}&operacao=desativar` - Desativa vaga
- **DELETE** `/api/vagas?id={id}` - Remove vaga

---

## 💡 Dicas de Uso

### Para Alunos:
1. ✅ Complete seu cadastro antes de se candidatar
2. 🎯 Use filtros para encontrar vagas relevantes
3. 📝 Mantenha suas competências atualizadas
4. 🔍 Busque por palavras-chave relacionadas ao seu interesse

### Para Empresas:
1. ✅ Preencha todos os dados da empresa corretamente
2. 📋 Escreva descrições claras e detalhadas das vagas
3. 🎯 Escolha a área e tipo corretos para melhor alcance
4. 🔄 Mantenha suas vagas atualizadas (ative/desative conforme necessário)

### Gerais:
1. 🌓 Use o tema escuro para reduzir cansaço visual
2. 📱 A aplicação funciona em qualquer dispositivo
3. 💾 Dados são salvos automaticamente no MongoDB
4. 🔄 Recarregue a página se encontrar erros

---

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique este guia primeiro
2. Consulte o console do navegador (F12) para erros
3. Entre em contato com o administrador do sistema

---

## 🔐 Segurança

- Senhas são armazenadas (implemente hash em produção)
- Validações no frontend e backend
- API REST com verificação de dados
- CORS habilitado para desenvolvimento

---

## 📝 Notas de Versão

**Versão Atual**: 2.0

**Funcionalidades Implementadas**:
- ✅ Cadastro completo de alunos
- ✅ Cadastro completo de empresas
- ✅ Publicação e gerenciamento de vagas
- ✅ Sistema de filtros avançado
- ✅ Consulta de vagas com múltiplos filtros
- ✅ API REST completa
- ✅ Interface responsiva
- ✅ Tema claro/escuro
- ✅ Sistema de gamificação para alunos

**Próximas Funcionalidades**:
- 🔜 Sistema de candidaturas completo
- 🔜 Notificações em tempo real
- 🔜 Painel administrativo
- 🔜 Relatórios e estatísticas
- 🔜 Sistema de autenticação JWT
- 🔜 Upload de currículos

---

**Desenvolvido para Faeterj-Rio** 🎓
