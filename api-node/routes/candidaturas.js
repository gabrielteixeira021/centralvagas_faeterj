const express = require('express');
const { body, validationResult } = require('express-validator');
const Candidatura = require('../models/Candidatura');
const Aluno = require('../models/Aluno');
const Vaga = require('../models/Vaga');
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

// Validações para criar candidatura
const validarCandidatura = [
    body('alunoId')
        .isMongoId()
        .withMessage('ID do aluno deve ser válido'),
    body('vagaId')
        .isMongoId()
        .withMessage('ID da vaga deve ser válido'),
    body('observacoes')
        .optional()
        .isLength({ max: 500 })
        .withMessage('Observações devem ter no máximo 500 caracteres')
];

// GET /api/candidaturas - Listar todas as candidaturas
router.get('/', async (req, res) => {
    try {
        const { 
            alunoId, vagaId, empresaId, status,
            page = 1, limit = 50, sort = '-dataCandidatura'
        } = req.query;
        
        // Construir filtro
        const filtro = {};
        if (alunoId) filtro.alunoId = alunoId;
        if (vagaId) filtro.vagaId = vagaId;
        if (empresaId) filtro.empresaId = empresaId;
        if (status) filtro.status = status;
        
        // Paginação
        const skip = (page - 1) * limit;
        
        const candidaturas = await Candidatura.find(filtro)
            .populate('alunoId', 'nome email curso periodo competencias')
            .populate('vagaId', 'titulo empresa area tipo salario ativa')
            .populate('empresaId', 'nome setor')
            .sort(sort)
            .skip(skip)
            .limit(parseInt(limit));
            
        const total = await Candidatura.countDocuments(filtro);
        
        res.json({
            success: true,
            data: candidaturas,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalItems: total,
                itemsPerPage: parseInt(limit)
            }
        });
    } catch (error) {
        console.error('Erro ao listar candidaturas:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor ao listar candidaturas'
        });
    }
});

// GET /api/candidaturas/status - Listar status disponíveis
router.get('/status', (req, res) => {
    const status = ['Pendente', 'Analisando', 'Aprovado', 'Reprovado', 'Cancelado'];
    
    res.json({
        success: true,
        data: status
    });
});

// GET /api/candidaturas/aluno/:alunoId - Candidaturas de um aluno
router.get('/aluno/:alunoId', validarObjectId, async (req, res) => {
    try {
        const candidaturas = await Candidatura.buscarPorAluno(req.params.alunoId);
        
        res.json({
            success: true,
            data: candidaturas,
            message: `${candidaturas.length} candidatura(s) encontrada(s)`
        });
    } catch (error) {
        console.error('Erro ao buscar candidaturas do aluno:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor ao buscar candidaturas do aluno'
        });
    }
});

// GET /api/candidaturas/vaga/:vagaId - Candidaturas de uma vaga
router.get('/vaga/:vagaId', validarObjectId, async (req, res) => {
    try {
        const candidaturas = await Candidatura.buscarPorVaga(req.params.vagaId);
        
        res.json({
            success: true,
            data: candidaturas,
            message: `${candidaturas.length} candidatura(s) encontrada(s)`
        });
    } catch (error) {
        console.error('Erro ao buscar candidaturas da vaga:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor ao buscar candidaturas da vaga'
        });
    }
});

// GET /api/candidaturas/empresa/:empresaId - Candidaturas de uma empresa
router.get('/empresa/:empresaId', validarObjectId, async (req, res) => {
    try {
        const candidaturas = await Candidatura.buscarPorEmpresa(req.params.empresaId);
        
        res.json({
            success: true,
            data: candidaturas,
            message: `${candidaturas.length} candidatura(s) encontrada(s)`
        });
    } catch (error) {
        console.error('Erro ao buscar candidaturas da empresa:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor ao buscar candidaturas da empresa'
        });
    }
});

// GET /api/candidaturas/:id - Buscar candidatura por ID
router.get('/:id', validarObjectId, async (req, res) => {
    try {
        const candidatura = await Candidatura.findById(req.params.id)
            .populate('alunoId', 'nome email curso periodo competencias experiencia')
            .populate('vagaId', 'titulo descricao empresa area requisitos tipo salario')
            .populate('empresaId', 'nome setor email telefone');
        
        if (!candidatura) {
            return res.status(404).json({
                success: false,
                message: 'Candidatura não encontrada'
            });
        }
        
        res.json({
            success: true,
            data: candidatura
        });
    } catch (error) {
        console.error('Erro ao buscar candidatura:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor ao buscar candidatura'
        });
    }
});

// POST /api/candidaturas - Criar nova candidatura
router.post('/', validarCandidatura, async (req, res) => {
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
        
        // Verificar se aluno existe
        const aluno = await Aluno.findById(req.body.alunoId);
        if (!aluno) {
            return res.status(404).json({
                success: false,
                message: 'Aluno não encontrado'
            });
        }
        
        // Verificar se vaga existe e está ativa
        const vaga = await Vaga.findById(req.body.vagaId);
        if (!vaga) {
            return res.status(404).json({
                success: false,
                message: 'Vaga não encontrada'
            });
        }
        
        if (!vaga.ativa) {
            return res.status(400).json({
                success: false,
                message: 'Não é possível se candidatar a uma vaga inativa'
            });
        }
        
        // Verificar se já existe candidatura
        const candidaturaExistente = await Candidatura.findOne({
            alunoId: req.body.alunoId,
            vagaId: req.body.vagaId
        });
        
        if (candidaturaExistente) {
            return res.status(409).json({
                success: false,
                message: 'Aluno já se candidatou a esta vaga'
            });
        }
        
        // Criar candidatura
        const dadosCandidatura = {
            ...req.body,
            empresaId: vaga.empresaId
        };
        
        const candidatura = new Candidatura(dadosCandidatura);
        await candidatura.save();
        
        // Incrementar contador de candidaturas da vaga
        await vaga.incrementarCandidaturas();
        
        // Popular dados
        await candidatura.populate([
            { path: 'alunoId', select: 'nome email curso periodo' },
            { path: 'vagaId', select: 'titulo empresa area tipo' },
            { path: 'empresaId', select: 'nome setor' }
        ]);
        
        res.status(201).json({
            success: true,
            message: 'Candidatura criada com sucesso',
            data: candidatura
        });
    } catch (error) {
        console.error('Erro ao criar candidatura:', error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Dados inválidos',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }
        
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'Aluno já se candidatou a esta vaga'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor ao criar candidatura'
        });
    }
});

// PUT /api/candidaturas/:id/status - Atualizar status da candidatura
router.put('/:id/status', validarObjectId, async (req, res) => {
    try {
        const { status, feedbackEmpresa } = req.body;
        
        if (!status) {
            return res.status(400).json({
                success: false,
                message: 'Status é obrigatório'
            });
        }
        
        const statusValidos = ['Pendente', 'Analisando', 'Aprovado', 'Reprovado', 'Cancelado'];
        if (!statusValidos.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Status inválido. Use: ' + statusValidos.join(', ')
            });
        }
        
        const candidatura = await Candidatura.findById(req.params.id);
        if (!candidatura) {
            return res.status(404).json({
                success: false,
                message: 'Candidatura não encontrada'
            });
        }
        
        // Atualizar status
        await candidatura.atualizarStatus(status, feedbackEmpresa);
        
        // Popular dados atualizados
        await candidatura.populate([
            { path: 'alunoId', select: 'nome email' },
            { path: 'vagaId', select: 'titulo empresa' },
            { path: 'empresaId', select: 'nome' }
        ]);
        
        res.json({
            success: true,
            message: `Status da candidatura atualizado para: ${status}`,
            data: candidatura
        });
    } catch (error) {
        console.error('Erro ao atualizar status:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor ao atualizar status'
        });
    }
});

// DELETE /api/candidaturas/:id - Remover candidatura
router.delete('/:id', validarObjectId, async (req, res) => {
    try {
        const candidatura = await Candidatura.findByIdAndDelete(req.params.id)
            .populate('alunoId', 'nome email')
            .populate('vagaId', 'titulo empresa')
            .populate('empresaId', 'nome');
        
        if (!candidatura) {
            return res.status(404).json({
                success: false,
                message: 'Candidatura não encontrada para remoção'
            });
        }
        
        res.json({
            success: true,
            message: 'Candidatura removida com sucesso',
            data: candidatura
        });
    } catch (error) {
        console.error('Erro ao remover candidatura:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor ao remover candidatura'
        });
    }
});

// GET /api/candidaturas/estatisticas/geral - Estatísticas gerais
router.get('/estatisticas/geral', async (req, res) => {
    try {
        const stats = await Candidatura.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);
        
        const total = await Candidatura.countDocuments();
        const totalHoje = await Candidatura.countDocuments({
            dataCandidatura: {
                $gte: new Date(new Date().setHours(0, 0, 0, 0))
            }
        });
        
        res.json({
            success: true,
            data: {
                total,
                hoje: totalHoje,
                porStatus: stats
            }
        });
    } catch (error) {
        console.error('Erro ao obter estatísticas:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor ao obter estatísticas'
        });
    }
});

module.exports = router;