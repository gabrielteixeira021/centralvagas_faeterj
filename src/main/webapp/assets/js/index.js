/**
 * Index Page Specific Functions
 */

/**
 * Element SDK Configuration and Functions for Index Page
 */
function applyCustomization(config) {
    console.log('Applying customization:', config);
    
    // Extract theme values
    const backgroundColor = config.background_color || '#f8fafc';
    const primaryColor = config.primary_color || '#3b82f6';
    const textColor = config.text_color || '#1f2937';
    const fontFamily = config.font_family || 'Inter';
    const fontSize = parseInt(config.font_size) || 16;
    const sidebarColor = config.sidebar_color || '#1e293b';
    const cardColor = config.card_color || '#ffffff';

    // Update welcome message if provided
    const welcomeMessage = config.welcome_message;
    if (welcomeMessage) {
        const welcomeElement = document.querySelector('#welcome-message');
        if (welcomeElement) {
            welcomeElement.textContent = welcomeMessage;
        }
    }

    // Update colors
    document.body.style.backgroundColor = backgroundColor;
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.style.backgroundColor = sidebarColor;
    }

    // Update cards
    const cards = document.querySelectorAll('.bg-white');
    cards.forEach(card => {
        if (!card.classList.contains('dark:bg-slate-800')) return;
        card.style.backgroundColor = cardColor;
    });

    // Update primary buttons
    const buttons = document.querySelectorAll('.bg-blue-600');
    buttons.forEach(btn => {
        btn.style.backgroundColor = primaryColor;
    });

    // Update text colors
    const headings = document.querySelectorAll('h2, h3, h4');
    headings.forEach(heading => {
        if (heading.classList.contains('dark:text-white')) {
            heading.style.color = textColor;
        }
    });

    // Update font
    const baseFontStack = 'system-ui, -apple-system, sans-serif';
    document.body.style.fontFamily = `${fontFamily}, ${baseFontStack}`;

    // Update font sizes
    const mainHeadings = document.querySelectorAll('h2');
    mainHeadings.forEach(h => {
        h.style.fontSize = `${fontSize * 2}px`;
    });

    const subHeadings = document.querySelectorAll('h3');
    subHeadings.forEach(h => {
        h.style.fontSize = `${fontSize * 1.25}px`;
    });

    const bodyText = document.querySelectorAll('p, td, li, input, textarea, select, button');
    bodyText.forEach(el => {
        el.style.fontSize = `${fontSize}px`;
    });
}

function mapToCapabilities(config) {
    return {
        supported_customizations: {
            background_color: true,
            primary_color: true,
            text_color: true,
            font_family: true,
            font_size: true,
            welcome_message: true,
            sidebar_color: true,
            card_color: true
        }
    };
}

function mapToEditPanelValues(config) {
    return {
        background_color: config.background_color || '#f8fafc',
        primary_color: config.primary_color || '#3b82f6',
        text_color: config.text_color || '#1f2937',
        font_family: config.font_family || 'Inter',
        font_size: (parseInt(config.font_size) || 16).toString(),
        welcome_message: config.welcome_message || 'Bem-vindo à Central de Vagas',
        sidebar_color: config.sidebar_color || '#1e293b',
        card_color: config.card_color || '#ffffff'
    };
}

/**
 * Statistics counter animation
 */
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    });
}

/**
 * Featured jobs carousel/slider functionality
 */
function initializeFeaturedJobs() {
    // Add click handlers to "Ver Detalhes" buttons
    const detailButtons = document.querySelectorAll('.job-detail-btn');
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const jobTitle = this.getAttribute('data-job');
            showJobDetails(jobTitle);
        });
    });
}

/**
 * Show job details modal
 */
function showJobDetails(jobTitle) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Detalhes da Vaga</h3>
                <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    <span class="text-xl">×</span>
                </button>
            </div>
            <div class="text-gray-700 dark:text-gray-300">
                <h4 class="font-semibold text-lg mb-2">${jobTitle}</h4>
                <p class="mb-4">Esta é uma vaga em destaque na nossa plataforma.</p>
                <div class="space-y-2">
                    <p><strong>Local:</strong> São Paulo, SP</p>
                    <p><strong>Modalidade:</strong> Presencial</p>
                    <p><strong>Salário:</strong> A combinar</p>
                    <p><strong>Requisitos:</strong> Experiência na área desejável</p>
                </div>
            </div>
            <div class="mt-6 flex justify-end space-x-2">
                <button onclick="this.closest('.fixed').remove()" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
                    Fechar
                </button>
                <button onclick="candidateToJob('${jobTitle}')" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                    Candidatar-se
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

/**
 * Handle job application
 */
function candidateToJob(jobTitle) {
    // Close modal
    const modal = document.querySelector('.fixed.inset-0');
    if (modal) modal.remove();
    
    // Show success message
    showSuccessMessage(`Candidatura para "${jobTitle}" registrada com sucesso!`);
}

/**
 * Show success notification
 */
function showSuccessMessage(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    notification.innerHTML = `
        <div class="flex items-center gap-2">
            <span>✓</span>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

/**
 * Initialize Element SDK for index page
 */
function initializeElementSDK() {
    if (typeof element !== 'undefined' && element.init) {
        element.init({
            applyCustomization,
            mapToCapabilities,
            mapToEditPanelValues
        });
    }
}

/**
 * Initialize index page specific functionality
 */
function initializeIndexPage() {
    initializeElementSDK();
    
    // Animate counters when page loads
    setTimeout(animateCounters, 500);
    
    // Initialize featured jobs functionality
    initializeFeaturedJobs();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeIndexPage);