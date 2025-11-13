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
  font_size: 16,
};

async function onConfigChange(config) {
  const systemTitle = config.system_title || defaultConfig.system_title;
  const institutionName =
    config.institution_name || defaultConfig.institution_name;
  const welcomeMessage =
    config.welcome_message || defaultConfig.welcome_message;
  const backgroundColor =
    config.background_color || defaultConfig.background_color;
  const sidebarColor = config.sidebar_color || defaultConfig.sidebar_color;
  const primaryColor = config.primary_color || defaultConfig.primary_color;
  const textColor = config.text_color || defaultConfig.text_color;
  const cardColor = config.card_color || defaultConfig.card_color;
  const fontFamily = config.font_family || defaultConfig.font_family;
  const fontSize = parseInt(config.font_size) || defaultConfig.font_size;

  // Update system title
  const systemTitleElement = document.getElementById("system-title");
  if (systemTitleElement) {
    systemTitleElement.textContent = systemTitle;
  }

  // Update institution name
  const institutionElement = document.getElementById("institution-name");
  if (institutionElement) {
    institutionElement.textContent = institutionName;
  }

  // Update mobile title
  const mobileSystemTitleElement = document.getElementById(
    "mobile-system-title"
  );
  if (mobileSystemTitleElement) {
    mobileSystemTitleElement.textContent = systemTitle;
  }

  // Update welcome message
  const welcomeElement = document.querySelector("#welcome-message");
  if (welcomeElement) {
    welcomeElement.textContent = welcomeMessage;
  }

  // Update colors
  document.body.style.backgroundColor = backgroundColor;
  const sidebar = document.getElementById("sidebar");
  if (sidebar) {
    sidebar.style.backgroundColor = sidebarColor;
  }

  // Update cards
  const cards = document.querySelectorAll(".bg-white");
  cards.forEach((card) => {
    if (!card.classList.contains("dark:bg-slate-800")) return;
    card.style.backgroundColor = cardColor;
  });

  // Update primary buttons
  const buttons = document.querySelectorAll(".bg-blue-600");
  buttons.forEach((btn) => {
    btn.style.backgroundColor = primaryColor;
  });

  // Update text colors
  const headings = document.querySelectorAll("h2, h3, h4");
  headings.forEach((heading) => {
    if (heading.classList.contains("dark:text-white")) {
      heading.style.color = textColor;
    }
  });

  // Update font
  const baseFontStack = "system-ui, -apple-system, sans-serif";
  document.body.style.fontFamily = `${fontFamily}, ${baseFontStack}`;

  // Update font sizes
  const mainHeadings = document.querySelectorAll("h2");
  mainHeadings.forEach((h) => {
    h.style.fontSize = `${fontSize * 2}px`;
  });

  const subHeadings = document.querySelectorAll("h3");
  subHeadings.forEach((h) => {
    h.style.fontSize = `${fontSize * 1.25}px`;
  });

  const bodyText = document.querySelectorAll(
    "p, td, li, input, textarea, select, button"
  );
  bodyText.forEach((el) => {
    el.style.fontSize = `${fontSize}px`;
  });
}

function applyCustomization(config) {
  console.log("Applying customization:", config);

  // Extract theme values
  const backgroundColor = config.background_color || "#f8fafc";
  const primaryColor = config.primary_color || "#3b82f6";
  const textColor = config.text_color || "#1f2937";
  const fontFamily = config.font_family || "Inter";
  const fontSize = parseInt(config.font_size) || 16;
  const sidebarColor = config.sidebar_color || "#1e293b";
  const cardColor = config.card_color || "#ffffff";

  // Update welcome message if provided
  const welcomeMessage = config.welcome_message;
  if (welcomeMessage) {
    const welcomeElement = document.querySelector("#welcome-message");
    if (welcomeElement) {
      welcomeElement.textContent = welcomeMessage;
    }
  }

  // Update colors
  document.body.style.backgroundColor = backgroundColor;
  const sidebar = document.getElementById("sidebar");
  if (sidebar) {
    sidebar.style.backgroundColor = sidebarColor;
  }

  // Update cards
  const cards = document.querySelectorAll(".bg-white");
  cards.forEach((card) => {
    if (!card.classList.contains("dark:bg-slate-800")) return;
    card.style.backgroundColor = cardColor;
  });

  // Update primary buttons
  const buttons = document.querySelectorAll(".bg-blue-600");
  buttons.forEach((btn) => {
    btn.style.backgroundColor = primaryColor;
  });

  // Update text colors
  const headings = document.querySelectorAll("h2, h3, h4");
  headings.forEach((heading) => {
    if (heading.classList.contains("dark:text-white")) {
      heading.style.color = textColor;
    }
  });

  // Update font
  const baseFontStack = "system-ui, -apple-system, sans-serif";
  document.body.style.fontFamily = `${fontFamily}, ${baseFontStack}`;

  // Update font sizes
  const mainHeadings = document.querySelectorAll("h2");
  mainHeadings.forEach((h) => {
    h.style.fontSize = `${fontSize * 2}px`;
  });

  const subHeadings = document.querySelectorAll("h3");
  subHeadings.forEach((h) => {
    h.style.fontSize = `${fontSize * 1.25}px`;
  });

  const bodyText = document.querySelectorAll(
    "p, td, li, input, textarea, select, button"
  );
  bodyText.forEach((el) => {
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
      font_size: true,
    },
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
    font_size: (
      parseInt(config.font_size) || defaultConfig.font_size
    ).toString(),
  };
}

/**
 * Initialize Element SDK for vagas page
 */
function initializeElementSDK() {
  if (typeof element !== "undefined" && element.init) {
    element.init({
      onConfigChange,
      mapToCapabilities,
      mapToEditPanelValues,
    });
  }
}

/**
 * Job search functionality
 */
let allJobs = [];
let filteredJobs = [];

function initializeJobSearch() {
  const searchForm = document.getElementById("job-search-form");
  if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      applyFilters();
    });
  }

  const clearButton = document.getElementById("clear-filters");
  if (clearButton) {
    clearButton.addEventListener("click", function () {
      document.getElementById("job-search-form").reset();
      applyFilters();
    });
  }

  // Add real-time filtering
  const areaFilter = document.getElementById("area-filter");
  const tipoFilter = document.getElementById("tipo-filter");
  const keywordSearch = document.getElementById("keyword-search");

  if (areaFilter) areaFilter.addEventListener("change", applyFilters);
  if (tipoFilter) tipoFilter.addEventListener("change", applyFilters);
  if (keywordSearch) {
    keywordSearch.addEventListener("input", debounce(applyFilters, 500));
  }

  // Listen to radio button changes
  const radioButtons = document.querySelectorAll('input[name="filtro"]');
  radioButtons.forEach(radio => {
    radio.addEventListener("change", applyFilters);
  });
}

/**
 * Debounce function for search input
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Apply filters to jobs list
 */
function applyFilters() {
  const filtroTipo = document.querySelector('input[name="filtro"]:checked')?.value || 'todas';
  const area = document.getElementById("area-filter")?.value || "";
  const tipo = document.getElementById("tipo-filter")?.value || "";
  const keyword = document.getElementById("keyword-search")?.value.toLowerCase() || "";

  filteredJobs = allJobs.filter(job => {
    // Filter by active status
    if (filtroTipo === 'ativas' && !job.ativa) {
      return false;
    }

    // Filter by area
    if (area && job.area !== area) {
      return false;
    }

    // Filter by tipo
    if (tipo && job.tipo !== tipo) {
      return false;
    }

    // Filter by keyword
    if (keyword) {
      const searchableText = `${job.titulo} ${job.descricao} ${job.empresa} ${job.area}`.toLowerCase();
      if (!searchableText.includes(keyword)) {
        return false;
      }
    }

    return true;
  });

  renderJobsTable(filteredJobs);
  updateResultsCount(filteredJobs.length, allJobs.length);
}

/**
 * Update results count display
 */
function updateResultsCount(filtered, total) {
  const header = document.querySelector('.bg-white.dark\\:bg-slate-800.rounded-xl.p-6.shadow-sm h3');
  if (header) {
    header.textContent = `Vagas Disponíveis (${filtered} de ${total})`;
  }
}

/**
 * Load and display available jobs
 */
async function loadAvailableJobs() {
  try {
    const response = await VagaAPI.getAll(); // Get all jobs
    if (response.success && response.data) {
      allJobs = response.data;
      filteredJobs = allJobs;
      applyFilters(); // Apply initial filters
    }
  } catch (error) {
    console.error('Error loading jobs:', error);
    showNotification('Erro ao carregar vagas disponíveis', 'error');
  }
}

/**
 * Render jobs table
 */
function renderJobsTable(jobs) {
  const tbody = document.querySelector("table tbody");
  if (!tbody) return;

  // Clear existing rows
  tbody.innerHTML = "";

  if (jobs.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td colspan="5" class="py-4 px-4 text-center text-gray-500 dark:text-gray-400">
        Nenhuma vaga encontrada com os filtros selecionados
      </td>
    `;
    tbody.appendChild(row);
    return;
  }

  jobs.forEach((job) => {
    const row = document.createElement("tr");
    row.className = "border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700";
    
    const statusBadge = job.ativa ? 
      '<span class="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full ml-2">Ativa</span>' : 
      '<span class="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full ml-2">Inativa</span>';
    
    row.innerHTML = `
      <td class="py-3 px-4 text-gray-600 dark:text-gray-300">${job.empresa || 'N/A'}</td>
      <td class="py-3 px-4 text-gray-600 dark:text-gray-300">
        ${job.titulo || 'N/A'}
        ${statusBadge}
      </td>
      <td class="py-3 px-4 text-gray-600 dark:text-gray-300">${job.area || 'N/A'}</td>
      <td class="py-3 px-4 text-gray-600 dark:text-gray-300">${job.tipo || 'N/A'}</td>
      <td class="py-3 px-4">
        <button class="candidate-btn px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm" 
                data-job-id="${job.id}" data-job="${job.titulo}"
                onclick="handleCandidatura('${job.id}', '${job.titulo}')">
          Candidatar
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

/**
 * Handle candidatura button click
 */
function handleCandidatura(jobId, jobTitle) {
  const modal = document.createElement("div");
  modal.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
  modal.innerHTML = `
    <div class="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Candidatar-se à Vaga</h3>
        <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <span class="text-xl">×</span>
        </button>
      </div>
      <div class="text-gray-700 dark:text-gray-300 mb-4">
        <p class="mb-2"><strong>Vaga:</strong> ${jobTitle}</p>
        <p class="mb-4">Deseja se candidatar para esta vaga?</p>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Certifique-se de que seu cadastro está completo antes de se candidatar.
        </p>
      </div>
      <div class="flex gap-2 justify-end">
        <button onclick="this.closest('.fixed').remove()" 
                class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors">
          Cancelar
        </button>
        <button onclick="submitCandidatura('${jobId}'); this.closest('.fixed').remove();" 
                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
          Confirmar Candidatura
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

/**
 * Submit candidatura
 */
function submitCandidatura(jobId) {
  // TODO: Implement candidatura submission
  showNotification('Funcionalidade de candidatura será implementada em breve!', 'info');
  console.log('Candidatura para vaga:', jobId);
}

/**
 * Show notification message
 * @param {string} message - The message to display
 * @param {string} type - The type of notification ('success', 'error', or 'info')
 */
function showNotification(message, type = 'success') {
  const notification = document.createElement("div");
  let bgColor = 'bg-green-500';
  let icon = '✓';
  
  if (type === 'error') {
    bgColor = 'bg-red-500';
    icon = '✕';
  } else if (type === 'info') {
    bgColor = 'bg-blue-500';
    icon = 'ℹ';
  }
  
  notification.className =
    `fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in`;
  notification.innerHTML = `
        <div class="flex items-center gap-2">
            <span>${icon}</span>
            <span>${message}</span>
        </div>
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 4000);
}

/**
 * Initialize vagas page specific functionality
 */
function initializeVagasPage() {
  initializeElementSDK();
  initializeJobSearch();
  loadAvailableJobs();
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeVagasPage);
