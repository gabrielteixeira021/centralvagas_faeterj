const express = require('express');
const { body, validationResult } = require('express-validator');
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

// Validações para criar/atualizar empresa
const validarEmpresa = [
    body('nome')
        .notEmpty()
        .withMessage('Nome da empresa é obrigatório')
        .isLength({ min: 2, max: 100 })
        .withMessage('Nome deve ter entre 2 e 100 caracteres'),
    body('cnpj')
        .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)
        .withMessage('CNPJ deve estar no formato XX.XXX.XXX/XXXX-XX'),
    body('email')
        .isEmail()
        .withMessage('Email deve ter formato válido')
        .normalizeEmail(),
    body('telefone')
        .notEmpty()
        .withMessage('Telefone é obrigatório'),
    body('endereco')
        .notEmpty()
        .withMessage('Endereço é obrigatório'),
    body('setor')
        .isIn(['Tecnologia', 'Saúde', 'Educação', 'Comércio', 'Indústria', 'Serviços', 'Finanças', 'Logística', 'Marketing', 'Jurídico', 'Outros'])
        .withMessage('Setor inválido'),
    body('descricao')
        .notEmpty()
        .withMessage('Descrição é obrigatória')
        .isLength({ max: 500 })
        .withMessage('Descrição deve ter no máximo 500 caracteres'),
    body('senha')
        .isLength({ min: 6 })
        .withMessage('Senha deve ter no mínimo 6 caracteres')
];

// GET /api/empresas - Listar todas as empresas
router.get('/', async (req, res) => {
    try {
        const { setor, ativa, page = 1, limit = 50 } = req.query;
        
        // Construir filtro
        const filtro = {};
        if (setor) filtro.setor = setor;
        if (ativa !== undefined) filtro.ativa = ativa === 'true';
        
        // Paginação
        const skip = (page - 1) * limit;
        
        const empresas = await Empresa.find(filtro)
            .select('-senha') // Nunca retornar senha
            .sort({ nome: 1 })
            .skip(skip)
            .limit(parseInt(limit));
            
        const total = await Empresa.countDocuments(filtro);
        
        res.json({
            success: true,
            data: empresas,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalItems: total,
                itemsPerPage: parseInt(limit)
            }
        });
    } catch (error) {
        console.error('Erro ao listar empresas:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor ao listar empresas'
        });
    }
});

// GET /api/empresas/setores - Listar setores disponíveis
router.get('/setores', (req, res) => {
    const setores = [
        'Tecnologia', 'Saúde', 'Educação', 'Comércio', 'Indústria',
        'Serviços', 'Finanças', 'Logística', 'Marketing', 'Jurídico', 'Outros'
    ];
    
    res.json({
        success: true,
        data: setores
    });
});

// GET /api/empresas/:id - Buscar empresa por ID
router.get('/:id', validarObjectId, async (req, res) => {
    try {
        const empresa = await Empresa.findById(req.params.id).select('-senha');
        
        if (!empresa) {
            return res.status(404).json({
                success: false,
                message: 'Empresa não encontrada'
            });
        }
        
        res.json({
            success: true,
            data: empresa
        });
    } catch (error) {
        console.error('Erro ao buscar empresa:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor ao buscar empresa'
        });
    }
});

// POST /api/empresas - Criar nova empresa
router.post('/', validarEmpresa, async (req, res) => {
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
        
        // Verificar se CNPJ já existe
        const empresaExistenteCnpj = await Empresa.findOne({ cnpj: req.body.cnpj });
        if (empresaExistenteCnpj) {
            return res.status(409).json({
                success: false,
                message: 'Já existe uma empresa com este CNPJ'
            });
        }
        
        // Verificar se email já existe
        const empresaExistenteEmail = await Empresa.findOne({ email: req.body.email });
        if (empresaExistenteEmail) {
            return res.status(409).json({
                success: false,
                message: 'Já existe uma empresa com este email'
            });
        }
        
        // Criar nova empresa
        const empresa = new Empresa(req.body);
        await empresa.save();
        
        res.status(201).json({
            success: true,
            message: 'Empresa criada com sucesso',
            data: empresa
        });
    } catch (error) {
        console.error('Erro ao criar empresa:', error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Dados inválidos',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor ao criar empresa'
        });
    }
});

// PUT /api/empresas/:id - Atualizar empresa
router.put('/:id', validarObjectId, async (req, res) => {
    try {
        // Remover senha das atualizações diretas (usar endpoint específico)
        const dadosAtualizacao = { ...req.body };
        delete dadosAtualizacao.senha;
        
        // Verificar se CNPJ já existe em outra empresa
        if (dadosAtualizacao.cnpj) {
            const empresaExistente = await Empresa.findOne({ 
                cnpj: dadosAtualizacao.cnpj,
                _id: { $ne: req.params.id }
            });
            if (empresaExistente) {
                return res.status(409).json({
                    success: false,
                    message: 'Já existe outra empresa com este CNPJ'
                });
            }
        }
        
        // Verificar se email já existe em outra empresa
        if (dadosAtualizacao.email) {
            const empresaExistente = await Empresa.findOne({ 
                email: dadosAtualizacao.email,
                _id: { $ne: req.params.id }
            });
            if (empresaExistente) {
                return res.status(409).json({
                    success: false,
                    message: 'Já existe outra empresa com este email'
                });
            }
        }
        
        const empresa = await Empresa.findByIdAndUpdate(
            req.params.id,
            dadosAtualizacao,
            { new: true, runValidators: true }
        ).select('-senha');
        
        if (!empresa) {
            return res.status(404).json({
                success: false,
                message: 'Empresa não encontrada para atualização'
            });
        }
        
        res.json({
            success: true,
            message: 'Empresa atualizada com sucesso',
            data: empresa
        });
    } catch (error) {
        console.error('Erro ao atualizar empresa:', error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Dados inválidos',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor ao atualizar empresa'
        });
    }
});

// DELETE /api/empresas/:id - Remover empresa
router.delete('/:id', validarObjectId, async (req, res) => {
    try {
        const empresa = await Empresa.findByIdAndDelete(req.params.id).select('-senha');
        
        if (!empresa) {
            return res.status(404).json({
                success: false,
                message: 'Empresa não encontrada para remoção'
            });
        }
        
        res.json({
            success: true,
            message: 'Empresa removida com sucesso',
            data: empresa
        });
    } catch (error) {
        console.error('Erro ao remover empresa:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor ao remover empresa'
        });
    }
});

// PUT /api/empresas/:id/senha - Atualizar senha da empresa
router.put('/:id/senha', validarObjectId, async (req, res) => {
    try {
        const { senhaAtual, novaSenha } = req.body;
        
        if (!senhaAtual || !novaSenha) {
            return res.status(400).json({
                success: false,
                message: 'Senha atual e nova senha são obrigatórias'
            });
        }
        
        if (novaSenha.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Nova senha deve ter no mínimo 6 caracteres'
            });
        }
        
        // Buscar empresa com senha
        const empresa = await Empresa.findById(req.params.id).select('+senha');
        
        if (!empresa) {
            return res.status(404).json({
                success: false,
                message: 'Empresa não encontrada'
            });
        }
        
        // Verificar senha atual
        const senhaValida = await empresa.compararSenha(senhaAtual);
        if (!senhaValida) {
            return res.status(400).json({
                success: false,
                message: 'Senha atual incorreta'
            });
        }
        
        // Atualizar senha
        empresa.senha = novaSenha;
        await empresa.save();
        
        res.json({
            success: true,
            message: 'Senha atualizada com sucesso'
        });
    } catch (error) {
        console.error('Erro ao atualizar senha:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor ao atualizar senha'
        });
    }
});

module.exports = router;