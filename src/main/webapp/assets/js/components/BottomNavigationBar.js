/**
 * BottomNavigationBar Component
 * Componente reutilizável para navegação inferior em dispositivos móveis
 */
class BottomNavigationBar {
  constructor() {
    this.navigationItems = [
      {
        href: "index.jsp",
        icon: "🏠",
        label: "Início",
        page: "index",
      },
      {
        href: "vagas.jsp",
        icon: "💼",
        label: "Vagas",
        page: "vagas",
      },
      {
        href: "aluno.jsp",
        icon: "👤",
        label: "Cadastro",
        page: "aluno",
      },
      {
        href: "empresa.jsp",
        icon: "🏢",
        label: "Empresa",
        page: "empresa",
      },
    ];

    this.currentPage = this.getCurrentPage();
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
   * Gera o HTML do componente
   */
  render() {
    const navItems = this.navigationItems
      .map((item) => {
        const isActive = item.page === this.currentPage;
        const activeClasses = isActive
          ? "active text-blue-400 border-t-2 border-blue-400"
          : "text-gray-400";

        return `
                <a href="${item.href}"
                   class="bottom-nav-item ${activeClasses} flex-1 flex flex-col items-center py-2 px-1 hover:text-white transition-colors no-underline">
                    <span class="text-xl mb-1">${item.icon}</span>
                    <span class="text-xs font-medium">${item.label}</span>
                </a>
            `;
      })
      .join("");

    return `
            <!-- Bottom Navigation - Mobile only -->
            <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 z-40">
                <div class="flex">
                    ${navItems}
                </div>
            </nav>
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
    // Remove navegação inferior existente se houver
    const existingNavs = document.querySelectorAll(
      "nav.md\\:hidden.fixed.bottom-0, nav.fixed.bottom-0"
    );
    existingNavs.forEach((nav) => nav.remove());

    // Adiciona o componente ao final do body
    const body = document.body;
    if (body) {
      body.insertAdjacentHTML("beforeend", this.render());
    }
  }

  /**
   * Atualiza a página ativa (útil para SPAs)
   */
  updateActivePage(newPage) {
    this.currentPage = newPage;
    this.mount(); // Re-renderiza o componente
  }

  /**
   * Método estático para facilitar a inicialização
   */
  static init() {
    return new BottomNavigationBar();
  }
}

// Auto-inicialização quando o script é carregado
// Verifica se está em um ambiente de navegador
if (typeof window !== "undefined") {
  // Inicializa automaticamente o componente
  BottomNavigationBar.init();
}

// Exporta para uso em outros módulos se necessário
if (typeof module !== "undefined" && module.exports) {
  module.exports = BottomNavigationBar;
}
