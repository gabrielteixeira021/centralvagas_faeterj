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
        this.initializeJobsTable();
    }

    initializeJobForm() {
        const form = document.getElementById('new-job-form');
        if (form) {
            form.addEventListener('submit', (e) => this.handleJobSubmission(e));
        }
    }

    initializeJobsTable() {
        const actionButtons = document.querySelectorAll('.job-action-btn');
        actionButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleJobAction(e));
        });
    }

    handleJobSubmission(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const jobData = {
            id: Date.now(),
            title: formData.get('job-title'),
            description: formData.get('job-description'),
            requirements: formData.get('job-requirements'),
            salary: formData.get('job-salary'),
            location: formData.get('job-location'),
            type: formData.get('job-type'),
            deadline: formData.get('application-deadline'),
            createdAt: new Date().toLocaleDateString('pt-BR')
        };

        this.addJob(jobData);
        this.showSuccessMessage('Vaga publicada com sucesso!');
        event.target.reset();
    }

    addJob(jobData) {
        this.jobs.push(jobData);
        this.renderJobsTable();
    }

    handleJobAction(event) {
        const action = event.target.getAttribute('data-action');
        const jobId = event.target.getAttribute('data-job-id');
        
        switch (action) {
            case 'view':
                this.viewJob(jobId);
                break;
            case 'edit':
                this.editJob(jobId);
                break;
            case 'delete':
                this.deleteJob(jobId);
                break;
            case 'candidates':
                this.viewCandidates(jobId);
                break;
        }
    }

    viewJob(jobId) {
        console.log('Visualizing job:', jobId);
        this.showModal('Detalhes da Vaga', `
            <p>Visualizando detalhes da vaga ID: ${jobId}</p>
            <p>Esta funcionalidade seria implementada para mostrar todos os detalhes da vaga.</p>
        `);
    }

    editJob(jobId) {
        console.log('Editing job:', jobId);
        this.showModal('Editar Vaga', `
            <p>Editando vaga ID: ${jobId}</p>
            <p>Esta funcionalidade seria implementada para permitir edição da vaga.</p>
        `);
    }

    deleteJob(jobId) {
        if (confirm('Tem certeza que deseja excluir esta vaga?')) {
            this.jobs = this.jobs.filter(job => job.id !== parseInt(jobId));
            this.renderJobsTable();
            this.showSuccessMessage('Vaga excluída com sucesso!');
        }
    }

    viewCandidates(jobId) {
        console.log('Viewing candidates for job:', jobId);
        this.showModal('Candidatos', `
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
        `);
    }

    renderJobsTable() {
        const tbody = document.querySelector('#published-jobs tbody');
        if (!tbody) return;

        tbody.innerHTML = '';
        
        this.jobs.forEach(job => {
            const row = document.createElement('tr');
            row.className = 'border-b border-gray-200 dark:border-gray-700';
            row.innerHTML = `
                <td class="py-3 px-4 text-gray-900 dark:text-white">${job.title}</td>
                <td class="py-3 px-4 text-gray-600 dark:text-gray-300">${job.location}</td>
                <td class="py-3 px-4 text-gray-600 dark:text-gray-300">${job.type}</td>
                <td class="py-3 px-4 text-gray-600 dark:text-gray-300">${job.createdAt}</td>
                <td class="py-3 px-4">
                    <div class="flex space-x-2">
                        <button data-action="view" data-job-id="${job.id}" class="job-action-btn text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200">Ver</button>
                        <button data-action="edit" data-job-id="${job.id}" class="job-action-btn text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200">Editar</button>
                        <button data-action="delete" data-job-id="${job.id}" class="job-action-btn text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200">Excluir</button>
                        <button data-action="candidates" data-job-id="${job.id}" class="job-action-btn text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200">Candidatos</button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });

        // Re-attach event listeners to new buttons
        this.initializeJobsTable();
    }

    showModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
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
}

/**
 * Form validation for new job form
 */
function initializeJobFormValidation() {
    const form = document.getElementById('new-job-form');
    if (!form) return;

    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', validateJobField);
        field.addEventListener('input', clearJobValidationError);
    });
}

/**
 * Validate job form field
 */
function validateJobField(event) {
    const field = event.target;
    const value = field.value.trim();
    
    clearJobValidationError({ target: field });
    
    if (field.hasAttribute('required') && !value) {
        showJobFieldError(field, 'Este campo é obrigatório');
        return false;
    }
    
    // Salary validation
    if (field.name === 'job-salary' && value) {
        const salaryValue = parseFloat(value.replace(/[^\d,]/g, '').replace(',', '.'));
        if (isNaN(salaryValue) || salaryValue <= 0) {
            showJobFieldError(field, 'Digite um salário válido');
            return false;
        }
    }
    
    // Date validation
    if (field.type === 'date' && value) {
        const selectedDate = new Date(value);
        const today = new Date();
        
        if (selectedDate <= today) {
            showJobFieldError(field, 'A data deve ser futura');
            return false;
        }
    }
    
    return true;
}

/**
 * Show job field validation error
 */
function showJobFieldError(field, message) {
    field.classList.add('border-red-500');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'text-red-500 text-sm mt-1 job-validation-error';
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
}

/**
 * Clear job field validation error
 */
function clearJobValidationError(event) {
    const field = event.target;
    field.classList.remove('border-red-500');
    
    const errorElement = field.parentNode.querySelector('.job-validation-error');
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
document.addEventListener('DOMContentLoaded', initializeEmpresaPage);