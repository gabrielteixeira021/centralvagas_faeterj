/**
 * Vagas Page Specific Functions
 */

/**
 * Element SDK Configuration and Functions
 */
const defaultConfig = {
    system_title: "Central de Vagas",
    institution_name: "Faeterj-Rio",
    welcome_message: "Bem-vindo à Central de Vagas",
    background_color: "#f8fafc",
    sidebar_color: "#1e293b",
    primary_color: "#2563eb",
    text_color: "#111827",
    card_color: "#ffffff",
    font_family: "Inter",
    font_size: 16
};

async function onConfigChange(config) {
    const systemTitle = config.system_title || defaultConfig.system_title;
    const institutionName = config.institution_name || defaultConfig.institution_name;
    const welcomeMessage = config.welcome_message || defaultConfig.welcome_message;
    const backgroundColor = config.background_color || defaultConfig.background_color;
    const sidebarColor = config.sidebar_color || defaultConfig.sidebar_color;
    const primaryColor = config.primary_color || defaultConfig.primary_color;
    const textColor = config.text_color || defaultConfig.text_color;
    const cardColor = config.card_color || defaultConfig.card_color;
    const fontFamily = config.font_family || defaultConfig.font_family;
    const fontSize = parseInt(config.font_size) || defaultConfig.font_size;

    // Update system title
    const systemTitleElement = document.getElementById('system-title');
    if (systemTitleElement) {
        systemTitleElement.textContent = systemTitle;
    }

    // Update institution name
    const institutionElement = document.getElementById('institution-name');
    if (institutionElement) {
        institutionElement.textContent = institutionName;
    }

    // Update mobile title
    const mobileSystemTitleElement = document.getElementById('mobile-system-title');
    if (mobileSystemTitleElement) {
        mobileSystemTitleElement.textContent = systemTitle;
    }

    // Update welcome message
    const welcomeElement = document.querySelector('#welcome-message');
    if (welcomeElement) {
        welcomeElement.textContent = welcomeMessage;
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
            system_title: true,
            institution_name: true,
            welcome_message: true,
            background_color: true,
            sidebar_color: true,
            primary_color: true,
            text_color: true,
            card_color: true,
            font_family: true,
            font_size: true
        }
    };
}

function mapToEditPanelValues(config) {
    return {
        system_title: config.system_title || defaultConfig.system_title,
        institution_name: config.institution_name || defaultConfig.institution_name,
        welcome_message: config.welcome_message || defaultConfig.welcome_message,
        background_color: config.background_color || defaultConfig.background_color,
        sidebar_color: config.sidebar_color || defaultConfig.sidebar_color,
        primary_color: config.primary_color || defaultConfig.primary_color,
        text_color: config.text_color || defaultConfig.text_color,
        card_color: config.card_color || defaultConfig.card_color,
        font_family: config.font_family || defaultConfig.font_family,
        font_size: (parseInt(config.font_size) || defaultConfig.font_size).toString()
    };
}

/**
 * Initialize Element SDK for vagas page
 */
function initializeElementSDK() {
    if (typeof element !== 'undefined' && element.init) {
        element.init({
            onConfigChange,
            mapToCapabilities,
            mapToEditPanelValues
        });
    }
}

/**
 * Job search functionality
 */
function initializeJobSearch() {
    const searchForm = document.getElementById('job-search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add search functionality here
            console.log('Searching for jobs...');
        });
    }

    // Add candidate buttons functionality
    const candidateButtons = document.querySelectorAll('.candidate-btn');
    candidateButtons.forEach(button => {
        button.addEventListener('click', function() {
            const jobTitle = this.getAttribute('data-job');
            alert(`Candidatura para: ${jobTitle}`);
        });
    });
}

/**
 * Initialize vagas page specific functionality
 */
function initializeVagasPage() {
    initializeElementSDK();
    initializeJobSearch();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeVagasPage);