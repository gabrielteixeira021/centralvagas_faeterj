/**
 * Aluno Page Specific Functions
 */

/**
 * Gamification system
 */
class GamificationSystem {
    constructor() {
        this.points = 0;
        this.level = 1;
        this.pointsToNextLevel = 100;
    }

    addPoints(points) {
        this.points += points;
        this.checkLevelUp();
        this.updateDisplay();
    }

    checkLevelUp() {
        if (this.points >= this.pointsToNextLevel) {
            this.level++;
            this.points -= this.pointsToNextLevel;
            this.pointsToNextLevel = Math.floor(this.pointsToNextLevel * 1.5);
            this.showLevelUpMessage();
        }
    }

    updateDisplay() {
        const pointsElement = document.getElementById('gamification-points');
        const levelElement = document.getElementById('gamification-level');
        const progressElement = document.getElementById('gamification-progress');

        if (pointsElement) pointsElement.textContent = this.points;
        if (levelElement) levelElement.textContent = this.level;
        if (progressElement) {
            const progressPercentage = (this.points / this.pointsToNextLevel) * 100;
            progressElement.style.width = `${progressPercentage}%`;
        }
    }

    showLevelUpMessage() {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        notification.innerHTML = `
            <div class="flex items-center gap-2">
                <span>🎉</span>
                <span>Parabéns! Você subiu para o nível ${this.level}!</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

/**
 * Form validation and handling
 */
function initializeStudentForm() {
    const form = document.getElementById('student-form');
    if (!form) return;

    const gamification = new GamificationSystem();

    // Add validation to form fields
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', validateField);
        field.addEventListener('input', clearValidationError);
    });

    // Skills management
    initializeSkillsSection(gamification);

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            gamification.addPoints(50);
            showSuccessMessage('Cadastro realizado com sucesso!');
        }
    });
}

/**
 * Skills section functionality
 */
function initializeSkillsSection(gamification) {
    const addSkillBtn = document.getElementById('add-skill-btn');
    const skillInput = document.getElementById('new-skill');
    const skillsList = document.getElementById('skills-list');

    if (addSkillBtn && skillInput && skillsList) {
        addSkillBtn.addEventListener('click', () => addSkill(skillInput, skillsList, gamification));
        skillInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                addSkill(skillInput, skillsList, gamification);
            }
        });
    }
}

/**
 * Add new skill
 */
function addSkill(skillInput, skillsList, gamification) {
    const skillValue = skillInput.value.trim();
    if (skillValue) {
        const skillElement = document.createElement('span');
        skillElement.className = 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm flex items-center gap-2';
        skillElement.innerHTML = `
            ${skillValue}
            <button type="button" onclick="removeSkill(this)" class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200">×</button>
        `;
        
        skillsList.appendChild(skillElement);
        skillInput.value = '';
        
        // Add gamification points
        gamification.addPoints(10);
    }
}

/**
 * Remove skill
 */
function removeSkill(button) {
    button.parentElement.remove();
}

/**
 * Form field validation
 */
function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    
    // Clear previous errors
    clearValidationError({ target: field });
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'Este campo é obrigatório');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Digite um email válido');
            return false;
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
        if (!phoneRegex.test(value)) {
            showFieldError(field, 'Digite um telefone válido: (XX) XXXXX-XXXX');
            return false;
        }
    }
    
    return true;
}

/**
 * Show field validation error
 */
function showFieldError(field, message) {
    field.classList.add('border-red-500');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'text-red-500 text-sm mt-1 validation-error';
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
}

/**
 * Clear field validation error
 */
function clearValidationError(event) {
    const field = event.target;
    field.classList.remove('border-red-500');
    
    const errorElement = field.parentNode.querySelector('.validation-error');
    if (errorElement) {
        errorElement.remove();
    }
}

/**
 * Validate entire form
 */
function validateForm() {
    const form = document.getElementById('student-form');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Show success message
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
 * Initialize aluno page specific functionality
 */
function initializeAlunoPage() {
    initializeStudentForm();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeAlunoPage);