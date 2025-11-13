const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Importar rotas
const alunosRoutes = require('./routes/alunos');
const empresasRoutes = require('./routes/empresas');
const vagasRoutes = require('./routes/vagas');
const candidaturasRoutes = require('./routes/candidaturas');

// Criar app Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de segurança
app.use(helmet());

// CORS configurado
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true
}));

// Logger
app.use(morgan('combined'));

// Parser JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Conectar MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('✅ MongoDB conectado com sucesso!');
    })
    .catch((error) => {
        console.error('❌ Erro ao conectar MongoDB:', error.message);
        process.exit(1);
    });

// Rotas da API
app.use('/api/alunos', alunosRoutes);
app.use('/api/empresas', empresasRoutes);
app.use('/api/vagas', vagasRoutes);
app.use('/api/candidaturas', candidaturasRoutes);

// Rota de teste
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'API Central Vagas está funcionando!',
        timestamp: new Date(),
        version: '1.0.0'
    });
});

// Rota de informações da API
app.get('/api', (req, res) => {
    res.json({
        name: 'Central Vagas API',
        version: '1.0.0',
        description: 'API REST para Sistema de Vagas FAETERJ',
        endpoints: {
            alunos: '/api/alunos',
            empresas: '/api/empresas',
            vagas: '/api/vagas',
            candidaturas: '/api/candidaturas'
        },
        documentation: 'Consulte o arquivo README.md para documentação completa'
    });
});

// Middleware de erro 404
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint não encontrado',
        availableEndpoints: [
            'GET /api',
            'GET /api/health',
            'GET /api/alunos',
            'GET /api/empresas',
            'GET /api/vagas',
            'GET /api/candidaturas'
        ]
    });
});

// Middleware global de tratamento de erros
app.use((error, req, res, next) => {
    console.error('❌ Erro na aplicação:', error);
    res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Internal Server Error'
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📍 API disponível em: http://localhost:${PORT}/api`);
    console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;