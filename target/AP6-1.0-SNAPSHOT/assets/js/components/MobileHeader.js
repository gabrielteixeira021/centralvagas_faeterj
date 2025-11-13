/**
 * MobileHeader Component
 * Componente reutilizável para cabeçalho móvel
 */
class MobileHeader {
  constructor() {
    // Páginas disponíveis e seus títulos
    this.pageTitles = {
      index: "Central de Vagas",
      vagas: "Consulta de Vagas",
      aluno: "Cadastro do Aluno",
      empresa: "Área da Empresa",
    };

    this.currentPage = this.getCurrentPage();
    this.currentTheme = this.getCurrentTheme();
    this.init();
  }

  /**
   * Determina a página atual baseada na URL
   */
  getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split("/").pop();

    if (filename.includes("index") || filename === "" || filename === "/") {
      return "index";
    } else if (filename.includes("vagas")) {
      return "vagas";
    } else if (filename.includes("aluno")) {
      return "aluno";
    } else if (filename.includes("empresa")) {
      return "empresa";
    }

    return "index"; // default
  }

  /**
   * Detecta o tema atual (claro/escuro)
   */
  getCurrentTheme() {
    // Verifica se existe uma função global para detectar tema
    if (typeof window.getCurrentTheme === "function") {
      return window.getCurrentTheme();
    }

    // Fallback: verifica classe no html
    return document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  }

  /**
   * Obtém o título baseado na página atual
   */
  getPageTitle() {
    return this.pageTitles[this.currentPage] || "Central de Vagas";
  }

  /**
   * Gera o HTML do componente
   */
  render() {
    const title = this.getPageTitle();
    const themeIcon = this.currentTheme === "dark" ? "☀️" : "🌙";

    return `
            <!-- Mobile Header -->
            <header class="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-slate-800 text-white shadow-lg">
                <div class="w-8"></div>
                <h1 id="mobile-system-title" class="text-lg font-semibold flex-1">${title}</h1>
                <button onclick="toggleTheme()" class="p-2 rounded-lg hover:bg-slate-700 transition-colors">
                    <span id="mobile-theme-icon" class="text-xl">${themeIcon}</span>
                </button>
            </header>
        `;
  }

  /**
   * Inicializa o componente
   */
  init() {
    // Aguarda o DOM estar completamente carregado
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.mount());
    } else {
      this.mount();
    }
  }

  /**
   * Monta o componente no DOM
   */
  mount() {
    // Remove cabeçalho móvel existente se houver
    const existingHeaders = document.querySelectorAll(
      "header.md\\:hidden.fixed, header.fixed.top-0"
    );
    existingHeaders.forEach((header) => header.remove());

    // Adiciona o componente ao início do container
    const container = document.querySelector(".flex.h-full");
    if (container) {
      container.insertAdjacentHTML("afterbegin", this.render());
      this.attachEventListeners();
    }
  }

  /**
   * Adiciona event listeners
   */
  attachEventListeners() {
    const themeButton = document.querySelector(
      'header button[onclick*="toggleTheme"]'
    );

    if (themeButton) {
      themeButton.addEventListener("click", () => {
        // Atualiza tema atual após um pequeno delay
        setTimeout(() => {
          this.currentTheme = this.getCurrentTheme();
          this.updateThemeIcon();
        }, 100);
      });
    }
  }

  /**
   * Atualiza apenas o ícone do tema sem re-renderizar todo o componente
   */
  updateThemeIcon() {
    const themeIconElement = document.getElementById("mobile-theme-icon");
    if (themeIconElement) {
      const theme = this.config.theme || {};
      const newIcon =
        this.currentTheme === "dark"
          ? theme.themeIconDark || "☀️"
          : theme.themeIconLight || "🌙";
      themeIconElement.textContent = newIcon;
    }
  }

  /**
   * Atualiza o título do cabeçalho
   */
  updateTitle(newTitle) {
    const titleElement = document.getElementById("mobile-system-title");
    if (titleElement) {
      titleElement.textContent = newTitle;
    }
  }

  /**
   * Atualiza a página ativa (útil para SPAs)
   */
  updateActivePage(newPage) {
    this.currentPage = newPage;
    const newTitle = this.getPageTitle();
    this.updateTitle(newTitle);
  }

  /**
   * Re-renderiza o componente completamente
   */
  refresh() {
    this.currentTheme = this.getCurrentTheme();
    this.mount();
  }

  /**
   * Método estático para facilitar a inicialização
   */
  static init() {
    return new MobileHeader();
  }
}

// Auto-inicialização quando o script é carregado
// Verifica se está em um ambiente de navegador
if (typeof window !== "undefined") {
  // Inicializa automaticamente o componente
  MobileHeader.init();
}

// Exporta para uso em outros módulos se necessário
if (typeof module !== "undefined" && module.exports) {
  module.exports = MobileHeader;
}
