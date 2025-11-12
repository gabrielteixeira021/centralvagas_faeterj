/**
 * Central de Vagas - Faeterj-Rio
 * JavaScript Common Functions
 */

// Global variables
let isDarkTheme = false;
let sidebarExpanded = true;

/**
 * Theme Management
 */
function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    const html = document.documentElement;
    const mobileIcon = document.getElementById('mobile-theme-icon');
    const desktopIcon = document.getElementById('desktop-theme-icon');
    const themeText = document.querySelector('.theme-text');

    if (isDarkTheme) {
        html.classList.add('dark');
        if (mobileIcon) mobileIcon.textContent = '☀️';
        if (desktopIcon) desktopIcon.textContent = '☀️';
        if (themeText) themeText.textContent = 'Tema Claro';
    } else {
        html.classList.remove('dark');
        if (mobileIcon) mobileIcon.textContent = '🌙';
        if (desktopIcon) desktopIcon.textContent = '🌙';
        if (themeText) themeText.textContent = 'Tema Escuro';
    }
    
    // Salvar tema no localStorage
    localStorage.setItem('darkMode', isDarkTheme);
}

/**
 * Load saved theme from localStorage
 */
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('darkMode') === 'true';
    if (savedTheme) {
        isDarkTheme = false; // Para que o toggle funcione corretamente
        toggleTheme();
    }
}

/**
 * Sidebar Management
 */
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const collapseBtn = sidebar.querySelector('.collapse-btn span');
    const navItems = sidebar.querySelectorAll('.nav-item');
    
    sidebarExpanded = !sidebarExpanded;
    
    if (sidebarExpanded) {
        sidebar.classList.remove('sidebar-collapsed', 'w-20');
        sidebar.classList.add('sidebar-expanded', 'w-72');
        
        // Show text elements
        sidebar.querySelectorAll('.sidebar-title, .nav-text').forEach(el => {
            el.style.display = '';
        });
        
        // Reset collapse button rotation
        if (collapseBtn) {
            collapseBtn.style.transform = '';
            collapseBtn.textContent = '◀';
        }
        
        // Hide tooltips
        navItems.forEach(item => {
            const tooltip = item.querySelector('.nav-tooltip');
            if (tooltip) {
                tooltip.classList.add('opacity-0', 'invisible');
            }
        });
    } else {
        sidebar.classList.remove('sidebar-expanded', 'w-72');
        sidebar.classList.add('sidebar-collapsed', 'w-20');
        
        // Hide text elements
        sidebar.querySelectorAll('.sidebar-title, .nav-text').forEach(el => {
            el.style.display = 'none';
        });
        
        // Rotate collapse button
        if (collapseBtn) {
            collapseBtn.style.transform = 'rotate(180deg)';
            collapseBtn.textContent = '▶';
        }
        
        // Setup tooltip hover events
        navItems.forEach(item => {
            const tooltip = item.querySelector('.nav-tooltip');
            if (tooltip) {
                item.addEventListener('mouseenter', () => {
                    if (sidebar.classList.contains('sidebar-collapsed')) {
                        tooltip.classList.remove('opacity-0', 'invisible');
                    }
                });
                item.addEventListener('mouseleave', () => {
                    tooltip.classList.add('opacity-0', 'invisible');
                });
            }
        });
    }
}

/**
 * Responsive sidebar handling
 */
function handleResize() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        if (window.innerWidth >= 768) {
            sidebar.classList.remove('hidden');
            sidebar.classList.add('flex');
        } else {
            sidebar.classList.add('hidden');
            sidebar.classList.remove('flex');
        }
    }
}

/**
 * Initialize common functionality
 */
function initializeCommon() {
    // Load saved theme
    loadSavedTheme();
    
    // Setup responsive sidebar
    handleResize();
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCommon);