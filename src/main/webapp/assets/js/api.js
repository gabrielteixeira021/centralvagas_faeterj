/**
 * Central de Vagas - API Utilities
 * Centralized module for all API interactions
 */

// Base URL for API endpoints
const API_BASE_URL = '/AP6/api';

/**
 * API endpoints configuration
 */
const API_ENDPOINTS = {
    alunos: `${API_BASE_URL}/alunos`,
    empresas: `${API_BASE_URL}/empresas`,
    vagas: `${API_BASE_URL}/vagas`
};

/**
 * Generic API call function with error handling
 * @param {string} url - The API endpoint URL
 * @param {object} options - Fetch options (method, headers, body, etc.)
 * @returns {Promise<object>} - Response data or error
 */
async function apiCall(url, options = {}) {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers
            }
        });

        const contentType = response.headers.get('content-type');
        let data;
        
        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            const text = await response.text();
            try {
                data = JSON.parse(text);
            } catch (e) {
                data = { success: false, message: text };
            }
        }

        if (!response.ok) {
            throw new Error(data.message || `HTTP error! status: ${response.status}`);
        }

        return data;
    } catch (error) {
        console.error('API call error:', error);
        throw error;
    }
}

/**
 * Aluno API functions
 */
const AlunoAPI = {
    /**
     * Get all alunos
     * @returns {Promise<Array>} List of alunos
     */
    async getAll() {
        return await apiCall(API_ENDPOINTS.alunos);
    },

    /**
     * Get aluno by ID
     * @param {string} id - Aluno ID
     * @returns {Promise<object>} Aluno data
     */
    async getById(id) {
        return await apiCall(`${API_ENDPOINTS.alunos}?id=${id}`);
    },

    /**
     * Create new aluno
     * @param {object} alunoData - Aluno data
     * @returns {Promise<object>} Created aluno data
     */
    async create(alunoData) {
        const formData = new URLSearchParams();
        Object.keys(alunoData).forEach(key => {
            formData.append(key, alunoData[key]);
        });

        return await apiCall(API_ENDPOINTS.alunos, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
        });
    },

    /**
     * Update aluno
     * @param {string} id - Aluno ID
     * @param {object} alunoData - Updated aluno data
     * @returns {Promise<object>} Updated aluno data
     */
    async update(id, alunoData) {
        const formData = new URLSearchParams();
        formData.append('id', id);
        Object.keys(alunoData).forEach(key => {
            formData.append(key, alunoData[key]);
        });

        return await apiCall(API_ENDPOINTS.alunos, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
        });
    },

    /**
     * Delete aluno
     * @param {string} id - Aluno ID
     * @returns {Promise<object>} Deletion result
     */
    async delete(id) {
        return await apiCall(`${API_ENDPOINTS.alunos}?id=${id}`, {
            method: 'DELETE'
        });
    }
};

/**
 * Empresa API functions
 */
const EmpresaAPI = {
    /**
     * Get all empresas
     * @param {string} setor - Optional: Filter by sector
     * @returns {Promise<Array>} List of empresas
     */
    async getAll(setor = null) {
        const url = setor ? `${API_ENDPOINTS.empresas}?setor=${setor}` : API_ENDPOINTS.empresas;
        const response = await apiCall(url);
        // Backend returns { success, total, empresas }
        return {
            success: response.success,
            data: response.empresas || [],
            total: response.total || 0
        };
    },

    /**
     * Get empresa by ID
     * @param {string} id - Empresa ID
     * @returns {Promise<object>} Empresa data
     */
    async getById(id) {
        const response = await apiCall(`${API_ENDPOINTS.empresas}?id=${id}`);
        // Backend returns { success, empresa }
        return {
            success: response.success,
            data: response.empresa
        };
    },

    /**
     * Create new empresa
     * @param {object} empresaData - Empresa data
     * @returns {Promise<object>} Created empresa data
     */
    async create(empresaData) {
        const formData = new URLSearchParams();
        Object.keys(empresaData).forEach(key => {
            if (empresaData[key] !== null && empresaData[key] !== undefined) {
                formData.append(key, empresaData[key]);
            }
        });

        const response = await apiCall(API_ENDPOINTS.empresas, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
        });
        
        // Backend returns { success, message, id, empresa }
        return {
            success: response.success,
            message: response.message,
            data: response.empresa,
            id: response.id
        };
    },

    /**
     * Update empresa
     * @param {string} id - Empresa ID
     * @param {object} empresaData - Updated empresa data
     * @returns {Promise<object>} Updated empresa data
     */
    async update(id, empresaData) {
        const formData = new URLSearchParams();
        formData.append('id', id);
        Object.keys(empresaData).forEach(key => {
            if (empresaData[key] !== null && empresaData[key] !== undefined) {
                formData.append(key, empresaData[key]);
            }
        });

        const response = await apiCall(API_ENDPOINTS.empresas, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
        });
        
        return {
            success: response.success,
            message: response.message,
            data: response.empresa
        };
    },

    /**
     * Delete empresa
     * @param {string} id - Empresa ID
     * @returns {Promise<object>} Deletion result
     */
    async delete(id) {
        const response = await apiCall(`${API_ENDPOINTS.empresas}?id=${id}`, {
            method: 'DELETE'
        });
        
        return {
            success: response.success,
            message: response.message
        };
    }
};

/**
 * Vaga API functions
 */
const VagaAPI = {
    /**
     * Get all vagas
     * @param {string} filtro - Optional: Filter type (ativas, area)
     * @param {string} valor - Optional: Filter value
     * @returns {Promise<Array>} List of vagas
     */
    async getAll(filtro = null, valor = null) {
        let url = API_ENDPOINTS.vagas;
        if (filtro) {
            url += `?filtro=${filtro}`;
            if (valor) {
                url += `&valor=${valor}`;
            }
        }
        const response = await apiCall(url);
        // Backend returns { success, total, vagas }
        return {
            success: response.success,
            data: response.vagas || [],
            total: response.total || 0
        };
    },

    /**
     * Get only active vagas
     * @returns {Promise<Array>} List of active vagas
     */
    async getActive() {
        return await this.getAll('ativas');
    },

    /**
     * Get vagas by area
     * @param {string} area - Area to filter
     * @returns {Promise<Array>} List of vagas in area
     */
    async getByArea(area) {
        return await this.getAll('area', area);
    },

    /**
     * Get vaga by ID
     * @param {string} id - Vaga ID
     * @returns {Promise<object>} Vaga data
     */
    async getById(id) {
        const response = await apiCall(`${API_ENDPOINTS.vagas}?id=${id}`);
        // Backend returns { success, vaga }
        return {
            success: response.success,
            data: response.vaga
        };
    },

    /**
     * Create new vaga
     * @param {object} vagaData - Vaga data
     * @returns {Promise<object>} Created vaga data
     */
    async create(vagaData) {
        const formData = new URLSearchParams();
        Object.keys(vagaData).forEach(key => {
            if (vagaData[key] !== null && vagaData[key] !== undefined) {
                formData.append(key, vagaData[key]);
            }
        });

        const response = await apiCall(API_ENDPOINTS.vagas, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
        });
        
        // Backend returns { success, message, id, vaga }
        return {
            success: response.success,
            message: response.message,
            data: response.vaga,
            id: response.id
        };
    },

    /**
     * Update vaga
     * @param {string} id - Vaga ID
     * @param {object} vagaData - Updated vaga data
     * @returns {Promise<object>} Updated vaga data
     */
    async update(id, vagaData) {
        const formData = new URLSearchParams();
        formData.append('id', id);
        Object.keys(vagaData).forEach(key => {
            if (vagaData[key] !== null && vagaData[key] !== undefined) {
                formData.append(key, vagaData[key]);
            }
        });

        const response = await apiCall(API_ENDPOINTS.vagas, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
        });
        
        return {
            success: response.success,
            message: response.message,
            data: response.vaga
        };
    },

    /**
     * Deactivate vaga
     * @param {string} id - Vaga ID
     * @returns {Promise<object>} Update result
     */
    async deactivate(id) {
        const formData = new URLSearchParams();
        formData.append('id', id);
        formData.append('operacao', 'desativar');

        const response = await apiCall(API_ENDPOINTS.vagas, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
        });
        
        return {
            success: response.success,
            message: response.message
        };
    },

    /**
     * Delete vaga
     * @param {string} id - Vaga ID
     * @returns {Promise<object>} Deletion result
     */
    async delete(id) {
        const response = await apiCall(`${API_ENDPOINTS.vagas}?id=${id}`, {
            method: 'DELETE'
        });
        
        return {
            success: response.success,
            message: response.message
        };
    }
};

/**
 * Show notification message to user
 * @param {string} message - Message to display
 * @param {string} type - Type of notification (success, error, info)
 */
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-500' : 
                    type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    const icon = type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ';
    
    notification.className = `fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity`;
    notification.innerHTML = `
        <div class="flex items-center gap-2">
            <span>${icon}</span>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
