const express = require('express');
const { body, validationResult } = require('express-validator');
const Aluno = require('../models/Aluno');
const router = express.Router();

// Middleware para validar ObjectId
const validarObjectId = (req, res, next) => {
    const { id } = req.params;
    if (id && !id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
            success: false,
            message: 'ID inválido fornecido'
        });
    }
    next();
};

// Validações para criar/atualizar aluno
const validarAluno = [
    body('nome')
        .notEmpty()
        .withMessage('Nome é obrigatório')
        .isLength({ min: 2, max: 100 })
        .withMessage('Nome deve ter entre 2 e 100 caracteres'),
    body('email')
        .isEmail()
        .withMessage('Email deve ter formato válido')
        .normalizeEmail(),
    body('telefone')
        .notEmpty()
        .withMessage('Telefone é obrigatório'),
    body('curso')
        .notEmpty()
        .withMessage('Curso é obrigatório'),
    body('periodo')
        .notEmpty()
        .withMessage('Período é obrigatório'),
    body('turno')
        .isIn(['Manhã', 'Tarde', 'Noite', 'Integral'])
        .withMessage('Turno deve ser: Manhã, Tarde, Noite ou Integral'),
    body('competencias')
        .notEmpty()
        .withMessage('Competências são obrigatórias'),
    body('experiencia')
        .notEmpty()
        .withMessage('Experiência é obrigatória')
];

// GET /api/alunos - Listar todos os alunos
router.get('/', async (req, res) => {
    try {
        const { curso, turno, page = 1, limit = 50 } = req.query;
        
        // Construir filtro
        const filtro = {};
        if (curso) filtro.curso = new RegExp(curso, 'i');
        if (turno) filtro.turno = turno;
        
        // Paginação
        const skip = (page - 1) * limit;
        
        const alunos = await Aluno.find(filtro)
            .sort({ nome: 1 })
            .skip(skip)
            .limit(parseInt(limit));
            
        const total = await Aluno.countDocuments(filtro);
        
        res.json({
            success: true,
            data: alunos,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalItems: total,
                itemsPerPage: parseInt(limit)
            }
        });
    } catch (error) {
        console.error('Erro ao listar alunos:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor ao listar alunos'
        });
    }
});

// GET /api/alunos/:id - Buscar aluno por ID
router.get('/:id', validarObjectId, async (req, res) => {
    try {
        const aluno = await Aluno.findById(req.params.id);
        
        if (!aluno) {
            return res.status(404).json({
                success: false,
                message: 'Aluno não encontrado'
            });
        }
        
        res.json({
            success: true,
            data: aluno
        });
    } catch (error) {
        console.error('Erro ao buscar aluno:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor ao buscar aluno'
        });
    }
});

// POST /api/alunos - Criar novo aluno
router.post('/', validarAluno, async (req, res) => {
    try {
        // Verificar erros de validação
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Dados inválidos fornecidos',
                errors: errors.array()
            });
        }
        
        // Verificar se email já existe
        const alunoExistente = await Aluno.findOne({ email: req.body.email });
        if (alunoExistente) {
            return res.status(409).json({
                success: false,
                message: 'Já existe um aluno com este email'
            });
        }
        
        // Criar novo aluno
        const aluno = new Aluno(req.body);
        await aluno.save();
        
        res.status(201).json({
            success: true,
            message: 'Aluno criado com sucesso',
            data: aluno
        });
    } catch (error) {
        console.error('Erro ao criar aluno:', error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Dados inválidos',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor ao criar aluno'
        });
    }
});

// PUT /api/alunos/:id - Atualizar aluno
router.put('/:id', validarObjectId, validarAluno, async (req, res) => {
    try {
        // Verificar erros de validação
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Dados inválidos fornecidos',
                errors: errors.array()
            });
        }
        
        // Verificar se email já existe em outro aluno
        const alunoExistente = await Aluno.findOne({ 
            email: req.body.email,
            _id: { $ne: req.params.id }
        });
        if (alunoExistente) {
            return res.status(409).json({
                success: false,
                message: 'Já existe outro aluno com este email'
            });
        }
        
        const aluno = await Aluno.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!aluno) {
            return res.status(404).json({
                success: false,
                message: 'Aluno não encontrado para atualização'
            });
        }
        
        res.json({
            success: true,
            message: 'Aluno atualizado com sucesso',
            data: aluno
        });
    } catch (error) {
        console.error('Erro ao atualizar aluno:', error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Dados inválidos',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor ao atualizar aluno'
        });
    }
});

// DELETE /api/alunos/:id - Remover aluno
router.delete('/:id', validarObjectId, async (req, res) => {
    try {
        const aluno = await Aluno.findByIdAndDelete(req.params.id);
        
        if (!aluno) {
            return res.status(404).json({
                success: false,
                message: 'Aluno não encontrado para remoção'
            });
        }
        
        res.json({
            success: true,
            message: 'Aluno removido com sucesso',
            data: aluno
        });
    } catch (error) {
        console.error('Erro ao remover aluno:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor ao remover aluno'
        });
    }
});

// GET /api/alunos/search/:termo - Buscar alunos por termo
router.get('/search/:termo', async (req, res) => {
    try {
        const { termo } = req.params;
        const { limit = 20 } = req.query;
        
        const alunos = await Aluno.find({
            $or: [
                { nome: new RegExp(termo, 'i') },
                { curso: new RegExp(termo, 'i') },
                { competencias: new RegExp(termo, 'i') }
            ]
        })
        .sort({ nome: 1 })
        .limit(parseInt(limit));
        
        res.json({
            success: true,
            data: alunos,
            message: `${alunos.length} aluno(s) encontrado(s) para: ${termo}`
        });
    } catch (error) {
        console.error('Erro ao buscar alunos:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor ao buscar alunos'
        });
    }
});

module.exports = router;