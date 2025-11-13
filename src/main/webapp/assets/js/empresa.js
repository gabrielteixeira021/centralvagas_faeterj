/**
 * Empresa Page Specific Functions
 */

/**
 * Job management functionality
 */
class JobManager {
  constructor() {
    this.jobs = [];
    this.initializeJobForm();
    this.loadJobs();
  }

  initializeJobForm() {
    const form = document.getElementById("new-job-form");
    if (form) {
      form.addEventListener("submit", (e) => this.handleJobSubmission(e));
    }
  }

  async loadJobs() {
    try {
      const response = await VagaAPI.getAll();
      if (response.success && response.data) {
        this.jobs = response.data;
        this.renderJobsTable();
      }
    } catch (error) {
      console.error('Error loading jobs:', error);
      showNotification('Erro ao carregar vagas', 'error');
    }
  }

  initializeJobsTable() {
    const actionButtons = document.querySelectorAll(".job-action-btn");
    actionButtons.forEach((button) => {
      button.addEventListener("click", (e) => this.handleJobAction(e));
    });
  }

  async handleJobSubmission(event) {
    event.preventDefault();

    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    try {
      submitButton.disabled = true;
      submitButton.textContent = 'Publicando...';

      const formData = new FormData(event.target);
      const jobData = {
        titulo: formData.get("titulo"),
        descricao: formData.get("descricao"),
        empresa: formData.get("empresa"),
        empresaId: "temp-empresa-id", // TODO: Get from logged in empresa
        area: formData.get("area"),
        requisitos: formData.get("requisitos") || "A definir",
        beneficios: formData.get("beneficios") || "A definir",
        tipo: formData.get("tipo"),
        localizacao: formData.get("localizacao"),
        salario: formData.get("salario")
      };

      const response = await VagaAPI.create(jobData);

      if (response.success) {
        showNotification('Vaga publicada com sucesso!', 'success');
        event.target.reset();
        await this.loadJobs(); // Reload jobs list
      } else {
        showNotification(response.message || 'Erro ao publicar vaga', 'error');
      }
    } catch (error) {
      console.error('Error submitting job:', error);
      showNotification('Erro ao publicar vaga. Por favor, tente novamente.', 'error');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  }

  addJob(jobData) {
    this.jobs.push(jobData);
    this.renderJobsTable();
  }

  handleJobAction(event) {
    const action = event.target.getAttribute("data-action");
    const jobId = event.target.getAttribute("data-job-id");

    switch (action) {
      case "view":
        this.viewJob(jobId);
        break;
      case "edit":
        this.editJob(jobId);
        break;
      case "delete":
        this.deleteJob(jobId);
        break;
      case "candidates":
        this.viewCandidates(jobId);
        break;
    }
  }

  viewJob(jobId) {
    console.log("Visualizing job:", jobId);
    this.showModal(
      "Detalhes da Vaga",
      `
            <p>Visualizando detalhes da vaga ID: ${jobId}</p>
            <p>Esta funcionalidade seria implementada para mostrar todos os detalhes da vaga.</p>
        `
    );
  }

  editJob(jobId) {
    console.log("Editing job:", jobId);
    this.showModal(
      "Editar Vaga",
      `
            <p>Editando vaga ID: ${jobId}</p>
            <p>Esta funcionalidade seria implementada para permitir edição da vaga.</p>
        `
    );
  }

  async deleteJob(jobId) {
    if (confirm("Tem certeza que deseja excluir esta vaga?")) {
      try {
        const response = await VagaAPI.delete(jobId);
        if (response.success) {
          showNotification('Vaga excluída com sucesso!', 'success');
          await this.loadJobs(); // Reload jobs list
        } else {
          showNotification(response.message || 'Erro ao excluir vaga', 'error');
        }
      } catch (error) {
        console.error('Error deleting job:', error);
        showNotification('Erro ao excluir vaga. Por favor, tente novamente.', 'error');
      }
    }
  }

  viewCandidates(jobId) {
    console.log("Viewing candidates for job:", jobId);
    this.showModal(
      "Candidatos",
      `
            <p>Candidatos para a vaga ID: ${jobId}</p>
            <div class="mt-4">
                <h4 class="font-semibold mb-2">Lista de Candidatos:</h4>
                <ul class="space-y-2">
                    <li class="flex justify-between items-center p-2 bg-gray-100 rounded">
                        <span>João Silva - Desenvolvedor Jr</span>
                        <button class="text-blue-600 hover:text-blue-800">Ver Perfil</button>
                    </li>
                    <li class="flex justify-between items-center p-2 bg-gray-100 rounded">
                        <span>Maria Santos - Desenvolvedora Pleno</span>
                        <button class="text-blue-600 hover:text-blue-800">Ver Perfil</button>
                    </li>
                </ul>
            </div>
        `
    );
  }

  renderJobsTable() {
    const tbody = document.querySelector("table tbody");
    if (!tbody) return;

    // Clear existing rows except the header
    tbody.innerHTML = "";

    if (this.jobs.length === 0) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td colspan="5" class="py-4 px-4 text-center text-gray-500 dark:text-gray-400">
          Nenhuma vaga publicada ainda
        </td>
      `;
      tbody.appendChild(row);
      return;
    }

    this.jobs.forEach((job) => {
      const row = document.createElement("tr");
      row.className = "border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700";
      const status = job.ativa ? 'Ativa' : 'Inativa';
      const statusClass = job.ativa ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
      
      row.innerHTML = `
        <td class="py-3 px-4 text-gray-600 dark:text-gray-300">${job.titulo || 'N/A'}</td>
        <td class="py-3 px-4 text-gray-600 dark:text-gray-300">${job.area || 'N/A'}</td>
        <td class="py-3 px-4 text-gray-600 dark:text-gray-300">0</td>
        <td class="py-3 px-4">
          <span class="inline-flex px-2 py-1 text-xs font-medium ${statusClass} rounded-full">${status}</span>
        </td>
        <td class="py-3 px-4">
          <div class="flex gap-2">
            <button data-action="view" data-job-id="${job.id}" class="job-action-btn px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">Ver</button>
            <button data-action="delete" data-job-id="${job.id}" class="job-action-btn px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors">Excluir</button>
          </div>
        </td>
      `;
      tbody.appendChild(row);
    });

    // Re-attach event listeners to new buttons
    this.initializeJobsTable();
  }

  showModal(title, content) {
    const modal = document.createElement("div");
    modal.className =
      "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
    modal.innerHTML = `
            <div class="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">${title}</h3>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <span class="text-xl">×</span>
                    </button>
                </div>
                <div class="text-gray-700 dark:text-gray-300">
                    ${content}
                </div>
                <div class="mt-4 flex justify-end">
                    <button onclick="this.closest('.fixed').remove()" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
                        Fechar
                    </button>
                </div>
            </div>
        `;

    document.body.appendChild(modal);
  }

  showSuccessMessage(message) {
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
}

/**
 * Form validation for new job form
 */
function initializeJobFormValidation() {
  const form = document.getElementById("new-job-form");
  if (!form) return;

  const requiredFields = form.querySelectorAll("[required]");
  requiredFields.forEach((field) => {
    field.addEventListener("blur", validateJobField);
    field.addEventListener("input", clearJobValidationError);
  });
}

/**
 * Validate job form field
 */
function validateJobField(event) {
  const field = event.target;
  const value = field.value.trim();

  clearJobValidationError({ target: field });

  if (field.hasAttribute("required") && !value) {
    showJobFieldError(field, "Este campo é obrigatório");
    return false;
  }

  // Salary validation
  if (field.name === "job-salary" && value) {
    const salaryValue = parseFloat(
      value.replace(/[^\d,]/g, "").replace(",", ".")
    );
    if (isNaN(salaryValue) || salaryValue <= 0) {
      showJobFieldError(field, "Digite um salário válido");
      return false;
    }
  }

  // Date validation
  if (field.type === "date" && value) {
    const selectedDate = new Date(value);
    const today = new Date();

    if (selectedDate <= today) {
      showJobFieldError(field, "A data deve ser futura");
      return false;
    }
  }

  return true;
}

/**
 * Show job field validation error
 */
function showJobFieldError(field, message) {
  field.classList.add("border-red-500");

  const errorElement = document.createElement("div");
  errorElement.className = "text-red-500 text-sm mt-1 job-validation-error";
  errorElement.textContent = message;

  field.parentNode.appendChild(errorElement);
}

/**
 * Clear job field validation error
 */
function clearJobValidationError(event) {
  const field = event.target;
  field.classList.remove("border-red-500");

  const errorElement = field.parentNode.querySelector(".job-validation-error");
  if (errorElement) {
    errorElement.remove();
  }
}

/**
 * Initialize empresa page specific functionality
 */
function initializeEmpresaPage() {
  new JobManager();
  initializeJobFormValidation();
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeEmpresaPage);
