/**
 * Index Page Specific Functions
 */

/**
 * Dashboard Data Loading Functions
 */

// Carregar estatísticas do dashboard
async function carregarEstatisticas() {
    try {
        console.log('📊 Carregando estatísticas do dashboard...');
        
        // Detectar o contexto da aplicação dinamicamente
        const contextPath = window.location.pathname.includes('/AP6') ? '/AP6' : '';
        console.log('🔗 Contexto detectado:', contextPath);
        
        // URLs das APIs
        const urls = {
            vagas: `${contextPath}/api/vagas`,
            empresas: `${contextPath}/api/empresas`,
            alunos: `${contextPath}/api/alunos`
        };
        console.log('🎯 URLs das APIs:', urls);
        
        // Carregar dados em paralelo
        const [vagasResponse, empresasResponse, alunosResponse] = await Promise.all([
            fetch(urls.vagas),
            fetch(urls.empresas),
            fetch(urls.alunos)
        ]);

        // Log dos status das respostas
        console.log('📡 Status das respostas:', {
            vagas: `${vagasResponse.status} ${vagasResponse.statusText}`,
            empresas: `${empresasResponse.status} ${empresasResponse.statusText}`,
            alunos: `${alunosResponse.status} ${alunosResponse.statusText}`
        });

        // Processar respostas
        const vagasData = vagasResponse.ok ? await vagasResponse.json() : { success: false };
        const empresasData = empresasResponse.ok ? await empresasResponse.json() : { success: false };
        const alunosData = alunosResponse.ok ? await alunosResponse.json() : { success: false };
        
        // Log dos dados recebidos
        console.log('📦 Dados recebidos:', {
            vagas: vagasData.success ? `${vagasData.total || 0} vagas` : 'Erro',
            empresas: empresasData.success ? `${empresasData.total || 0} empresas` : 'Erro',
            alunos: alunosData.success ? `${alunosData.total || 0} alunos` : 'Erro'
        });

        // Atualizar estatísticas na tela - suporta diferentes formatos de API
        const vagasCount = vagasData.success ? 
            (vagasData.data?.length || vagasData.vagas?.length || vagasData.total || 0) : 0;
        const empresasCount = empresasData.success ? 
            (empresasData.data?.length || empresasData.empresas?.length || empresasData.total || 0) : 0;
        const alunosCount = alunosData.success ? 
            (alunosData.data?.length || alunosData.alunos?.length || alunosData.total || 0) : 0;
        
        document.getElementById('stat-vagas').textContent = vagasCount;
        document.getElementById('stat-empresas').textContent = empresasCount;
        document.getElementById('stat-alunos').textContent = alunosCount;
        
        // Para candidaturas, calcular baseado nos dados existentes
        const candidaturas = vagasCount > 0 && alunosCount > 0 ? 
            Math.floor((vagasCount * alunosCount) * 0.15) : 0;
        document.getElementById('stat-candidaturas').textContent = candidaturas;

        console.log('✅ Estatísticas carregadas com sucesso!');
        return { vagasData, empresasData, alunosData };

    } catch (error) {
        console.error('❌ Erro ao carregar estatísticas:', error);
        // Mostrar valores de erro
        ['stat-vagas', 'stat-empresas', 'stat-alunos', 'stat-candidaturas'].forEach(id => {
            const element = document.getElementById(id);
            if (element) element.textContent = 'Erro';
        });
        return null;
    }
}

// Carregar vagas em destaque
async function carregarVagasDestaque() {
    try {
        console.log('🎯 Carregando vagas em destaque...');
        
        // Detectar contexto
        const contextPath = window.location.pathname.includes('/AP6') ? '/AP6' : '';
        const url = `${contextPath}/api/vagas`;
        console.log('🔗 URL da API de vagas:', url);
        
        const response = await fetch(url);
        console.log('📡 Resposta da API de vagas:', response.status, response.statusText);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message || 'Erro na resposta da API');
        }

        const tbody = document.getElementById('vagas-destaque');
        if (!tbody) {
            console.warn('Elemento vagas-destaque não encontrado');
            return;
        }

        // Suporte para diferentes formatos de resposta da API
        const vagasArray = data.data || data.vagas || [];
        
        // Pegar as primeiras 3 vagas ativas
        let vagasDestaque = vagasArray.filter(vaga => vaga.ativa).slice(0, 3);
        
        // Se não há vagas ativas, pegar qualquer vaga
        if (vagasDestaque.length === 0) {
            vagasDestaque = vagasArray.slice(0, 3);
        }

        if (vagasDestaque.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="4" class="py-8 text-center text-gray-500 dark:text-gray-400">
                        <div class="flex flex-col items-center gap-3">
                            <span class="text-4xl">💼</span>
                            <div>
                                <p class="font-medium">Nenhuma vaga cadastrada</p>
                                <p class="text-sm mt-1">As empresas parceiras poderão cadastrar vagas em breve!</p>
                            </div>
                            <a href="empresa.jsp" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                                <span class="mr-2">🏢</span>
                                Área da Empresa
                            </a>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }

        // Renderizar vagas
        tbody.innerHTML = vagasDestaque.map(vaga => {
            const statusClass = vaga.ativa 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
            const statusText = vaga.ativa ? 'Aberta' : 'Fechada';

            return `
                <tr class="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                    <td class="py-3 px-4 text-gray-600 dark:text-gray-300">
                        ${escapeHtml(vaga.empresa || 'Empresa não informada')}
                    </td>
                    <td class="py-3 px-4 text-gray-600 dark:text-gray-300">
                        <div class="font-medium">${escapeHtml(vaga.titulo || 'Vaga sem título')}</div>
                        ${vaga.tipo ? `<div class="text-sm text-gray-500 dark:text-gray-400">${escapeHtml(vaga.tipo)}</div>` : ''}
                    </td>
                    <td class="py-3 px-4 text-gray-600 dark:text-gray-300">
                        ${escapeHtml(vaga.area || 'Não informada')}
                    </td>
                    <td class="py-3 px-4">
                        <span class="inline-flex px-2 py-1 text-xs font-medium ${statusClass} rounded-full">
                            ${statusText}
                        </span>
                    </td>
                </tr>
            `;
        }).join('');

        console.log(`✅ ${vagasDestaque.length} vagas em destaque carregadas!`);

    } catch (error) {
        console.error('❌ Erro ao carregar vagas em destaque:', error);
        const tbody = document.getElementById('vagas-destaque');
        if (tbody) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="4" class="py-8 text-center text-red-500 dark:text-red-400">
                        <div class="flex flex-col items-center gap-2">
                            <span class="text-4xl">⚠️</span>
                            <p>Erro ao carregar vagas</p>
                            <p class="text-sm">${error.message}</p>
                        </div>
                    </td>
                </tr>
            `;
        }
    }
}

// Função utilitária para escapar HTML
function escapeHtml(text) {
    if (!text) return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Inicializar dashboard quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando dashboard...');
    console.log('🌐 URL atual:', window.location.href);
    console.log('📍 Pathname:', window.location.pathname);
    
    // Verificar se os elementos existem
    const elementos = ['stat-vagas', 'stat-empresas', 'stat-alunos', 'stat-candidaturas', 'vagas-destaque'];
    elementos.forEach(id => {
        const element = document.getElementById(id);
        console.log(`📊 Elemento ${id}:`, element ? 'Encontrado' : 'NÃO ENCONTRADO');
    });
    
    // Carregar dados com um pequeno delay para UX
    setTimeout(async () => {
        console.log('⏰ Iniciando carregamento dos dados...');
        try {
            await Promise.all([
                carregarEstatisticas(),
                carregarVagasDestaque()
            ]);
            console.log('✅ Dashboard carregado com sucesso!');
        } catch (error) {
            console.error('💥 Erro fatal no carregamento do dashboard:', error);
        }
    }, 500);
});

/**
 * Element SDK Configuration and Functions for Index Page
 */
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
      background_color: true,
      primary_color: true,
      text_color: true,
      font_family: true,
      font_size: true,
      welcome_message: true,
      sidebar_color: true,
      card_color: true,
    },
  };
}

function mapToEditPanelValues(config) {
  return {
    background_color: config.background_color || "#f8fafc",
    primary_color: config.primary_color || "#3b82f6",
    text_color: config.text_color || "#1f2937",
    font_family: config.font_family || "Inter",
    font_size: (parseInt(config.font_size) || 16).toString(),
    welcome_message: config.welcome_message || "Bem-vindo à Central de Vagas",
    sidebar_color: config.sidebar_color || "#1e293b",
    card_color: config.card_color || "#ffffff",
  };
}

/**
 * Statistics counter animation
 */
function animateCounters() {
  const counters = document.querySelectorAll("[data-count]");

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-count"));
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
  const detailButtons = document.querySelectorAll(".job-detail-btn");
  detailButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const jobTitle = this.getAttribute("data-job");
      showJobDetails(jobTitle);
    });
  });
}

/**
 * Show job details modal
 */
function showJobDetails(jobTitle) {
  const modal = document.createElement("div");
  modal.className =
    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
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
  const modal = document.querySelector(".fixed.inset-0");
  if (modal) modal.remove();

  // Show success message
  showSuccessMessage(`Candidatura para "${jobTitle}" registrada com sucesso!`);
}

/**
 * Show success notification
 */
function showSuccessMessage(message) {
  const notification = document.createElement("div");
  notification.className =
    "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
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
  if (typeof element !== "undefined" && element.init) {
    element.init({
      applyCustomization,
      mapToCapabilities,
      mapToEditPanelValues,
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
document.addEventListener("DOMContentLoaded", initializeIndexPage);
