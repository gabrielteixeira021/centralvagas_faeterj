/**
 * BottomNavigationBar Component
 * Componente reutilizável para navegação inferior em dispositivos móveis
 * Similar ao conceito de componentes do React
 */
class BottomNavigationBar {
    constructor() {
        // Carrega configurações se disponíveis
        this.config = window.BottomNavConfig || {};
        
        this.navigationItems = [
            {
                href: 'index.jsp',
                icon: '🏠',
                label: 'Início',
                page: 'index'
            },
            {
                href: 'vagas.jsp',
                icon: '💼',
                label: 'Vagas',
                page: 'vagas'
            },
            {
                href: 'aluno.jsp',
                icon: '👤',
                label: 'Cadastro',
                page: 'aluno'
            },
            {
                href: 'empresa.jsp',
                icon: '🏢',
                label: 'Empresa',
                page: 'empresa'
            }
        ];
        
        this.currentPage = this.getCurrentPage();
        
        // Inicializa apenas se auto-init estiver habilitado (default: true)
        if (this.config.behavior?.autoInit !== false) {
            this.init();
        }
    }

    /**
     * Determina a página atual baseada na URL
     */
    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        
        if (filename.includes('index') || filename === '' || filename === '/') {
            return 'index';
        } else if (filename.includes('vagas')) {
            return 'vagas';
        } else if (filename.includes('aluno')) {
            return 'aluno';
        } else if (filename.includes('empresa')) {
            return 'empresa';
        }
        
        return 'index'; // default
    }

    /**
     * Gera o HTML do componente
     */
    render() {
        const theme = this.config.theme || {};
        const responsive = this.config.responsive || {};
        
        const navItems = this.navigationItems.map(item => {
            const isActive = item.page === this.currentPage;
            const activeClasses = isActive 
                ? `active ${theme.activeTextColor || 'text-blue-400'} border-t-2 ${theme.activeBorderColor || 'border-blue-400'}` 
                : (theme.inactiveTextColor || 'text-gray-400');
            
            const ariaLabel = this.config.accessibility?.addAriaLabels ? 
                `aria-label="Navegar para ${item.label}"` : '';
            
            return `
                <a href="${item.href}"
                   ${ariaLabel}
                   class="bottom-nav-item ${activeClasses} flex-1 flex flex-col items-center py-2 px-1 ${theme.hoverTextColor || 'hover:text-white'} ${this.config.animations?.transitionClass || 'transition-colors'} no-underline">
                    <span class="text-xl mb-1">${item.icon}</span>
                    <span class="text-xs font-medium">${item.label}</span>
                </a>
            `;
        }).join('');

        return `
            <!-- Bottom Navigation - Mobile only -->
            <nav class="${responsive.showOnMobile || 'md:hidden'} fixed bottom-0 left-0 right-0 ${theme.backgroundColor || 'bg-slate-800'} border-t ${theme.borderColor || 'border-slate-700'} z-40">
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
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.mount());
        } else {
            this.mount();
        }
    }

    /**
     * Monta o componente no DOM
     */
    mount() {
        // Remove navegação inferior existente se configurado para fazê-lo
        if (this.config.behavior?.removeExisting !== false) {
            const existingNavs = document.querySelectorAll('nav.md\\:hidden.fixed.bottom-0, nav.fixed.bottom-0');
            existingNavs.forEach(nav => nav.remove());
        }

        // Define container e posição baseado na configuração
        const containerSelector = this.config.advanced?.containerSelector || 'body';
        const insertPosition = this.config.advanced?.insertPosition || 'beforeend';
        const container = document.querySelector(containerSelector);
        
        if (container) {
            container.insertAdjacentHTML(insertPosition, this.render());
            this.attachEventListeners();
            
            // Callback pós-renderização
            if (this.config.advanced?.onRender) {
                this.config.advanced.onRender(this);
            }
        }
    }

    /**
     * Adiciona event listeners se necessário
     */
    attachEventListeners() {
        const navItems = document.querySelectorAll('.bottom-nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const href = item.getAttribute('href');
                const page = href.replace('.jsp', '');
                
                // Analytics se habilitado
                if (this.config.behavior?.enableAnalytics && this.config.analytics?.trackFunction) {
                    this.config.analytics.trackFunction(page, 'click');
                }
                
                console.log('Navegando para:', href);
            });
        });
        
        // Suporte a navegação por teclado se habilitado
        if (this.config.accessibility?.keyboardNavigation) {
            this.addKeyboardSupport();
        }
    }
    
    /**
     * Adiciona suporte a navegação por teclado
     */
    addKeyboardSupport() {
        const navItems = document.querySelectorAll('.bottom-nav-item');
        navItems.forEach((item, index) => {
            item.setAttribute('tabindex', '0');
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    item.click();
                } else if (e.key === 'ArrowLeft' && index > 0) {
                    navItems[index - 1].focus();
                } else if (e.key === 'ArrowRight' && index < navItems.length - 1) {
                    navItems[index + 1].focus();
                }
            });
        });
    }

    /**
     * Atualiza a página ativa (útil para SPAs)
     */
    updateActivePage(newPage) {
        const oldPage = this.currentPage;
        this.currentPage = newPage;
        
        // Callback de mudança de página
        if (this.config.advanced?.onActivePageChange) {
            this.config.advanced.onActivePageChange(oldPage, newPage);
        }
        
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
if (typeof window !== 'undefined') {
    // Inicializa automaticamente o componente
    BottomNavigationBar.init();
}

// Exporta para uso em outros módulos se necessário
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BottomNavigationBar;
}