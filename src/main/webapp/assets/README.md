# Central de Vagas - Estrutura JavaScript

## Organização dos Arquivos

### 📁 `/assets/js/`

#### 🔧 `common.js` - Funcionalidades Compartilhadas
Contém todas as funções comuns utilizadas em todas as páginas:

**Funcionalidades:**
- ✅ Gerenciamento de temas (claro/escuro) com persistência no localStorage
- ✅ Controle do sidebar (expandir/colapsar) 
- ✅ Responsividade automática
- ✅ Inicialização comum de todas as páginas

**Funções principais:**
- `toggleTheme()` - Alternar entre tema claro e escuro
- `loadSavedTheme()` - Carregar tema salvo do localStorage
- `toggleSidebar()` - Controlar expansão/colapso do sidebar
- `handleResize()` - Gerenciar responsividade
- `initializeCommon()` - Inicializar funcionalidades comuns

---

#### 🏠 `index.js` - Página Inicial
Funcionalidades específicas da página index.jsp:

**Funcionalidades:**
- ✅ Configuração do Element SDK
- ✅ Animação de contadores nas estatísticas
- ✅ Modal de detalhes das vagas em destaque
- ✅ Sistema de candidatura

**Funções principais:**
- `initializeElementSDK()` - Configurar Element SDK
- `animateCounters()` - Animar números das estatísticas
- `showJobDetails()` - Exibir modal com detalhes da vaga
- `candidateToJob()` - Processar candidatura

---

#### 💼 `vagas.js` - Consulta de Vagas
Funcionalidades específicas da página vagas.jsp:

**Funcionalidades:**
- ✅ Configuração avançada do Element SDK com customizações
- ✅ Sistema de busca de vagas
- ✅ Funcionalidade de candidatura
- ✅ Configurações visuais personalizáveis

**Funções principais:**
- `onConfigChange()` - Processar mudanças de configuração
- `initializeJobSearch()` - Configurar sistema de busca
- `initializeElementSDK()` - Configurar Element SDK

---

#### 👤 `aluno.js` - Cadastro de Aluno
Funcionalidades específicas da página aluno.jsp:

**Funcionalidades:**
- ✅ Sistema de gamificação com pontos e níveis
- ✅ Validação avançada de formulários
- ✅ Gerenciamento de habilidades (skills)
- ✅ Notificações de sucesso/erro

**Classes:**
- `GamificationSystem` - Sistema completo de gamificação

**Funções principais:**
- `initializeStudentForm()` - Configurar formulário de aluno
- `addSkill()` - Adicionar nova habilidade
- `validateForm()` - Validar formulário completo
- `showSuccessMessage()` - Exibir notificação de sucesso

---

#### 🏢 `empresa.js` - Área da Empresa
Funcionalidades específicas da página empresa.jsp:

**Funcionalidades:**
- ✅ Gerenciamento completo de vagas
- ✅ CRUD de vagas (criar, visualizar, editar, excluir)
- ✅ Visualização de candidatos
- ✅ Validação de formulários de vaga
- ✅ Sistema de modais

**Classes:**
- `JobManager` - Gerenciamento completo de vagas

**Funções principais:**
- `handleJobSubmission()` - Processar criação de nova vaga
- `viewCandidates()` - Visualizar candidatos de uma vaga
- `showModal()` - Exibir modais informativos
- `validateJobField()` - Validar campos do formulário

---

### 📁 `/assets/css/`

#### 🎨 `styles.css` - Estilos Adicionais
Contém estilos CSS que complementam o Tailwind CSS:

**Estilos inclusos:**
- ✅ Sidebar colapsado
- ✅ Tooltips de navegação
- ✅ Validação de formulários
- ✅ Notificações
- ✅ Modais
- ✅ Animações e transições
- ✅ Estados de carregamento

---

## 🔄 Fluxo de Inicialização

### 1. **Carregamento das Páginas JSP**
```html
<!-- Arquivos CSS -->
<link rel="stylesheet" href="assets/css/styles.css">

<!-- Arquivos JavaScript -->
<script src="assets/js/common.js"></script>
<script src="assets/js/[página-específica].js"></script>
```

### 2. **Execução no DOMContentLoaded**
```javascript
// common.js - Executado em todas as páginas
document.addEventListener('DOMContentLoaded', initializeCommon);

// [página].js - Executado apenas na página específica
document.addEventListener('DOMContentLoaded', initialize[Página]Page);
```

---

## 🎯 Benefícios da Separação

### ✅ **Manutenibilidade**
- Código organizado e fácil de encontrar
- Alterações isoladas por funcionalidade
- Debugging simplificado

### ✅ **Reutilização**
- Funções comuns centralizadas
- Evita duplicação de código
- Fácil aplicação de mudanças globais

### ✅ **Performance**
- Carregamento otimizado
- Cache do navegador para arquivos estáticos
- Redução do tamanho dos arquivos JSP

### ✅ **Colaboração**
- Diferentes desenvolvedores podem trabalhar em arquivos separados
- Menor chance de conflitos no versionamento
- Código mais legível e documentado

---

## 🚀 Como Adicionar Nova Funcionalidade

### Para funcionalidade comum (todas as páginas):
1. Adicionar função em `common.js`
2. Chamar em `initializeCommon()`

### Para funcionalidade específica:
1. Adicionar função no arquivo `[página].js` correspondente
2. Chamar em `initialize[Página]Page()`

### Para novos estilos:
1. Adicionar CSS em `styles.css`
2. Usar classes no HTML das páginas JSP

---

## 📝 Exemplos de Uso

### Adicionar nova função comum:
```javascript
// Em common.js
function newCommonFunction() {
    // Implementação
}

// Em initializeCommon()
function initializeCommon() {
    loadSavedTheme();
    handleResize();
    newCommonFunction(); // Nova função
}
```

### Adicionar validação específica:
```javascript
// Em aluno.js
function validateSpecialField(field) {
    // Validação específica
}

// Em initializeStudentForm()
function initializeStudentForm() {
    // Código existente...
    setupSpecialFieldValidation();
}
```

---

*Documentação atualizada em: Novembro de 2025*