# Frontend-Backend API Integration Documentation

## Overview
This document describes the frontend-backend API integration implemented for the Central de Vagas - Faeterj-Rio application.

## Architecture

### API Module (`assets/js/api.js`)
Centralized module that provides:
- Generic API call function with error handling
- Specialized API functions for each entity (Aluno, Empresa, Vaga)
- Unified notification system

### API Base URL
```javascript
const API_BASE_URL = '/AP6/api';
```

## API Functions

### AlunoAPI (Student API)

#### Create Student
```javascript
const studentData = {
    nome: "João Silva",
    email: "joao@faeterj.edu.br",
    telefone: "(21) 99999-9999",
    curso: "ADS",
    periodo: "3º",
    turno: "Noite",
    competencias: "Java, Python, SQL",
    experiencia: "Estágio em desenvolvimento"
};

const response = await AlunoAPI.create(studentData);
```

### VagaAPI (Job API)

#### Get All Jobs
```javascript
const response = await VagaAPI.getAll();
// Returns: { success: true, data: [...] }
```

#### Get Active Jobs Only
```javascript
const response = await VagaAPI.getActive();
// Returns: { success: true, data: [...] }
```

#### Create Job
```javascript
const jobData = {
    titulo: "Desenvolvedor Java Jr",
    descricao: "Vaga para desenvolvimento backend",
    empresa: "Tech Solutions",
    empresaId: "temp-empresa-id",
    area: "Tecnologia",
    tipo: "Estágio",
    localizacao: "Rio de Janeiro",
    salario: "A combinar",
    requisitos: "Java, Spring Boot",
    beneficios: "VT, VR"
};

const response = await VagaAPI.create(jobData);
```

#### Delete Job
```javascript
const response = await VagaAPI.delete(jobId);
```

## Page Integrations

### Aluno Page (Student Registration)
**File:** `aluno.jsp`, `aluno.js`

**Features:**
- Form submission to `/api/alunos`
- Client-side validation
- Loading state on submit button
- Success/error notifications
- Form reset after successful submission
- Gamification points integration

**Form Fields:**
- nome (required)
- email (required)
- telefone (required)
- curso (required)
- periodo (required)
- turno (required)
- competencias (required)
- experiencia (required)

### Empresa Page (Job Management)
**File:** `empresa.jsp`, `empresa.js`

**Features:**
- Create new job postings
- List all company's jobs
- Delete job postings
- Real-time table updates
- Loading states
- Success/error notifications

**Form Fields:**
- titulo (required)
- descricao (required)
- empresa (required)
- area (required)
- tipo (required)
- localizacao (hidden, default: "Rio de Janeiro")
- salario (hidden, default: "A combinar")
- requisitos (hidden)
- beneficios (hidden)

### Vagas Page (Job Listings)
**File:** `vagas.jsp`, `vagas.js`

**Features:**
- Display all active jobs
- Dynamic table rendering
- "Candidatar" button for each job
- Empty state message
- Error handling

## Error Handling

All API calls include comprehensive error handling:

```javascript
try {
    const response = await AlunoAPI.create(data);
    if (response.success) {
        showNotification('Success message', 'success');
    } else {
        showNotification(response.message, 'error');
    }
} catch (error) {
    console.error('Error:', error);
    showNotification('Error message', 'error');
}
```

## Notification System

The unified notification system provides visual feedback:

```javascript
showNotification(message, type);
// type: 'success', 'error', or 'info'
```

**Notifications automatically:**
- Appear in top-right corner
- Display for 3 seconds
- Fade out smoothly
- Remove themselves from DOM

## Response Format

All API endpoints return JSON in this format:

**Success:**
```json
{
    "success": true,
    "message": "Operation successful",
    "data": { ... }
}
```

**Error:**
```json
{
    "success": false,
    "message": "Error description"
}
```

## Best Practices

1. **Always use async/await** for API calls
2. **Wrap API calls in try-catch** blocks
3. **Disable submit buttons** during API operations
4. **Show loading states** to users
5. **Provide clear feedback** via notifications
6. **Validate data** before sending to API
7. **Handle empty states** in table rendering

## Future Enhancements

Potential improvements:
- Add search/filter functionality
- Implement pagination for large datasets
- Add real-time updates with WebSockets
- Implement authentication/authorization
- Add file upload capabilities
- Enhance error messages with specific field validation

## Testing

To test the integration:
1. Start the application server
2. Navigate to each page (aluno.jsp, empresa.jsp, vagas.jsp)
3. Fill out and submit forms
4. Verify data appears in tables
5. Check browser console for any errors
6. Verify notifications appear correctly

## Troubleshooting

**Problem:** API calls fail with CORS errors
- **Solution:** Ensure API endpoints include proper CORS headers

**Problem:** Form submission doesn't work
- **Solution:** Check that api.js is loaded before page-specific JS files

**Problem:** Notifications don't appear
- **Solution:** Verify showNotification function is available from api.js

**Problem:** Tables show "N/A" for all fields
- **Solution:** Check that API response includes expected field names

## Dependencies

- Tailwind CSS (for styling)
- Native Fetch API (no external HTTP library needed)
- ES6+ JavaScript features (async/await, arrow functions)

## Browser Compatibility

- Chrome/Edge: ✅ Fully supported
- Firefox: ✅ Fully supported
- Safari: ✅ Fully supported
- IE11: ❌ Not supported (requires polyfills)

## Contact

For questions or issues, please refer to the main project documentation or contact the development team.
