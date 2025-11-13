const express = require('express');
const { body, validationResult } = require('express-validator');
const Vaga = require('../models/Vaga');
const Empresa = require('../models/Empresa');
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

// Validações para criar/atualizar vaga
const validarVaga = [
    body('titulo')
        .notEmpty()
        .withMessage('Título da vaga é obrigatório')
        .isLength({ min: 5, max: 100 })
        .withMessage('Título deve ter entre 5 e 100 caracteres'),
    body('descricao')
        .notEmpty()
        .withMessage('Descrição é obrigatória')
        .isLength({ min: 20, max: 1000 })
        .withMessage('Descrição deve ter entre 20 e 1000 caracteres'),
    body('empresa')
        .notEmpty()
        .withMessage('Nome da empresa é obrigatório'),
    body('empresaId')
        .isMongoId()
        .withMessage('ID da empresa deve ser válido'),
    body('area')
        .isIn([
            'Tecnologia da Informação', 'Saúde', 'Educação', 'Comércio', 
            'Indústria', 'Serviços', 'Finanças', 'Logística', 'Marketing', 
            'Jurídico', 'Administração', 'Engenharia', 'Design', 'Outros'
        ])
        .withMessage('Área inválida'),
    body('requisitos')
        .notEmpty()
        .withMessage('Requisitos são obrigatórios'),
    body('tipo')
        .isIn(['Estágio', 'Emprego', 'Freela', 'Temporário'])
        .withMessage('Tipo deve ser: Estágio, Emprego, Freela ou Temporário'),
    body('localizacao')
        .notEmpty()
        .withMessage('Localização é obrigatória'),
    body('salario')
        .isFloat({ min: 0 })
        .withMessage('Salário deve ser um número positivo')
];

// GET /api/vagas - Listar todas as vagas com filtros
router.get('/', async (req, res) => {
    try {
        const { 
            area, tipo, empresa, ativa, empresaId,
            salarioMin, salarioMax, q,
            page = 1, limit = 50, sort = '-dataCadastro'
        } = req.query;
        
        // Construir filtro
        const filtro = {};
        if (area) filtro.area = area;
        if (tipo) filtro.tipo = tipo;
        if (empresa) filtro.empresa = new RegExp(empresa, 'i');
        if (ativa !== undefined) filtro.ativa = ativa === 'true';
        if (empresaId) filtro.empresaId = empresaId;
        
        // Filtro de salário
        if (salarioMin || salarioMax) {
            filtro.salario = {};
            if (salarioMin) filtro.salario.$gte = parseFloat(salarioMin);
            if (salarioMax) filtro.salario.$lte = parseFloat(salarioMax);
        }
        
        // Busca textual
        if (q) {
            filtro.$or = [
                { titulo: new RegExp(q, 'i') },
                { descricao: new RegExp(q, 'i') },
                { requisitos: new RegExp(q, 'i') }
            ];
        }
        
        // Paginação
        const skip = (page - 1) * limit;
        
        const vagas = await Vaga.find(filtro)
            .populate('empresaId', 'nome setor')
            .sort(sort)
            .skip(skip)
            .limit(parseInt(limit));
            
        const total = await Vaga.countDocuments(filtro);
        
        res.json({
            success: true,
            data: vagas,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalItems: total,
                itemsPerPage: parseInt(limit)
            }
        });
    } catch (error) {
        console.error('Erro ao listar vagas:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor ao listar vagas'
        });
    }
});

// GET /api/vagas/areas - Listar áreas disponíveis
router.get('/areas', (req, res) => {
    const areas = [
        'Tecnologia da Informação', 'Saúde', 'Educação', 'Comércio', 
        'Indústria', 'Serviços', 'Finanças', 'Logística', 'Marketing', 
        'Jurídico', 'Administração', 'Engenharia', 'Design', 'Outros'
    ];
    
    res.json({
        success: true,
        data: areas
    });
});

// GET /api/vagas/tipos - Listar tipos disponíveis
router.get('/tipos', (req, res) => {
    const tipos = ['Estágio', 'Emprego', 'Freela', 'Temporário'];
    
    res.json({
        success: true,
        data: tipos
    });
});

// GET /api/vagas/ativas - Listar apenas vagas ativas
router.get('/ativas', async (req, res) => {
    try {
        const { area, tipo, limit = 20 } = req.query;
        
        const filtro = { ativa: true };
        if (area) filtro.area = area;
        if (tipo) filtro.tipo = tipo;
        
        const vagas = await Vaga.find(filtro)
            .populate('empresaId', 'nome setor')
            .sort({ dataCadastro: -1 })
            .limit(parseInt(limit));
        
        res.json({
            success: true,
            data: vagas,
            message: `${vagas.length} vaga(s) ativa(s) encontrada(s)`
        });
    } catch (error) {
        console.error('Erro ao buscar vagas ativas:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor ao buscar vagas ativas'
        });
    }
});

// GET /api/vagas/:id - Buscar vaga por ID
router.get('/:id', validarObjectId, async (req, res) => {
    try {
        const vaga = await Vaga.findById(req.params.id)
            .populate('empresaId', 'nome setor email telefone');
        
        if (!vaga) {
            return res.status(404).json({
                success: false,
                message: 'Vaga não encontrada'
            });
        }
        
        // Incrementar visualizações
        await vaga.incrementarVisualizacoes();
        
        res.json({
            success: true,
            data: vaga
        });
    } catch (error) {
        console.error('Erro ao buscar vaga:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor ao buscar vaga'
        });
    }
});

// POST /api/vagas - Criar nova vaga
router.post('/', validarVaga, async (req, res) => {
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
        
        // Verificar se empresa existe
        const empresa = await Empresa.findById(req.body.empresaId);
        if (!empresa) {
            return res.status(404).json({
                success: false,
                message: 'Empresa não encontrada'
            });
        }
        
        // Criar nova vaga
        const vaga = new Vaga(req.body);
        await vaga.save();
        
        // Popular dados da empresa
        await vaga.populate('empresaId', 'nome setor');
        
        res.status(201).json({
            success: true,
            message: 'Vaga criada com sucesso',
            data: vaga
        });
    } catch (error) {
        console.error('Erro ao criar vaga:', error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Dados inválidos',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor ao criar vaga'
        });
    }
});

// PUT /api/vagas/:id - Atualizar vaga
router.put('/:id', validarObjectId, async (req, res) => {
    try {
        // Verificar se empresa existe (se empresaId foi fornecido)
        if (req.body.empresaId) {
            const empresa = await Empresa.findById(req.body.empresaId);
            if (!empresa) {
                return res.status(404).json({
                    success: false,
                    message: 'Empresa não encontrada'
                });
            }
        }
        
        const vaga = await Vaga.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('empresaId', 'nome setor');
        
        if (!vaga) {
            return res.status(404).json({
                success: false,
                message: 'Vaga não encontrada para atualização'
            });
        }
        
        res.json({
            success: true,
            message: 'Vaga atualizada com sucesso',
            data: vaga
        });
    } catch (error) {
        console.error('Erro ao atualizar vaga:', error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Dados inválidos',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor ao atualizar vaga'
        });
    }
});

// PUT /api/vagas/:id/desativar - Desativar vaga
router.put('/:id/desativar', validarObjectId, async (req, res) => {
    try {
        const vaga = await Vaga.findByIdAndUpdate(
            req.params.id,
            { ativa: false },
            { new: true }
        ).populate('empresaId', 'nome setor');
        
        if (!vaga) {
            return res.status(404).json({
                success: false,
                message: 'Vaga não encontrada'
            });
        }
        
        res.json({
            success: true,
            message: 'Vaga desativada com sucesso',
            data: vaga
        });
    } catch (error) {
        console.error('Erro ao desativar vaga:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor ao desativar vaga'
        });
    }
});

// PUT /api/vagas/:id/ativar - Ativar vaga
router.put('/:id/ativar', validarObjectId, async (req, res) => {
    try {
        const vaga = await Vaga.findByIdAndUpdate(
            req.params.id,
            { ativa: true },
            { new: true }
        ).populate('empresaId', 'nome setor');
        
        if (!vaga) {
            return res.status(404).json({
                success: false,
                message: 'Vaga não encontrada'
            });
        }
        
        res.json({
            success: true,
            message: 'Vaga ativada com sucesso',
            data: vaga
        });
    } catch (error) {
        console.error('Erro ao ativar vaga:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor ao ativar vaga'
        });
    }
});

// DELETE /api/vagas/:id - Remover vaga
router.delete('/:id', validarObjectId, async (req, res) => {
    try {
        const vaga = await Vaga.findByIdAndDelete(req.params.id)
            .populate('empresaId', 'nome setor');
        
        if (!vaga) {
            return res.status(404).json({
                success: false,
                message: 'Vaga não encontrada para remoção'
            });
        }
        
        res.json({
            success: true,
            message: 'Vaga removida com sucesso',
            data: vaga
        });
    } catch (error) {
        console.error('Erro ao remover vaga:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor ao remover vaga'
        });
    }
});

module.exports = router;