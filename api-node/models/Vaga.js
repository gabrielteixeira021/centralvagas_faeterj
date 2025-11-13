const mongoose = require('mongoose');

const vagaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'Título da vaga é obrigatório'],
        trim: true,
        maxlength: [100, 'Título deve ter no máximo 100 caracteres']
    },
    descricao: {
        type: String,
        required: [true, 'Descrição é obrigatória'],
        trim: true,
        maxlength: [1000, 'Descrição deve ter no máximo 1000 caracteres']
    },
    empresa: {
        type: String,
        required: [true, 'Nome da empresa é obrigatório'],
        trim: true
    },
    empresaId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'ID da empresa é obrigatório'],
        ref: 'Empresa'
    },
    area: {
        type: String,
        required: [true, 'Área é obrigatória'],
        trim: true,
        enum: [
            'Tecnologia da Informação', 'Saúde', 'Educação', 'Comércio', 
            'Indústria', 'Serviços', 'Finanças', 'Logística', 'Marketing', 
            'Jurídico', 'Administração', 'Engenharia', 'Design', 'Outros'
        ]
    },
    requisitos: {
        type: String,
        required: [true, 'Requisitos são obrigatórios'],
        trim: true
    },
    beneficios: {
        type: String,
        trim: true,
        default: 'A combinar'
    },
    tipo: {
        type: String,
        required: [true, 'Tipo da vaga é obrigatório'],
        enum: ['Estágio', 'Emprego', 'Freela', 'Temporário']
    },
    localizacao: {
        type: String,
        required: [true, 'Localização é obrigatória'],
        trim: true
    },
    salario: {
        type: Number,
        required: [true, 'Salário é obrigatório'],
        min: [0, 'Salário deve ser positivo']
    },
    dataCadastro: {
        type: Date,
        default: Date.now
    },
    ativa: {
        type: Boolean,
        default: true
    },
    visualizacoes: {
        type: Number,
        default: 0,
        min: 0
    },
    candidaturas: {
        type: Number,
        default: 0,
        min: 0
    }
}, {
    timestamps: true,
    collection: 'vagas'
});

// Índices para melhor performance
vagaSchema.index({ empresaId: 1 });
vagaSchema.index({ area: 1 });
vagaSchema.index({ tipo: 1 });
vagaSchema.index({ ativa: 1 });
vagaSchema.index({ dataCadastro: -1 }); // Mais recentes primeiro
vagaSchema.index({ salario: 1 });

// Índice composto para filtros comuns
vagaSchema.index({ ativa: 1, area: 1, tipo: 1 });

// Método para incrementar visualizações
vagaSchema.methods.incrementarVisualizacoes = function() {
    this.visualizacoes += 1;
    return this.save();
};

// Método para incrementar candidaturas
vagaSchema.methods.incrementarCandidaturas = function() {
    this.candidaturas += 1;
    return this.save();
};

// Método toJSON personalizado
vagaSchema.methods.toJSON = function() {
    const vaga = this.toObject();
    return {
        id: vaga._id,
        titulo: vaga.titulo,
        descricao: vaga.descricao,
        empresa: vaga.empresa,
        empresaId: vaga.empresaId,
        area: vaga.area,
        requisitos: vaga.requisitos,
        beneficios: vaga.beneficios,
        tipo: vaga.tipo,
        localizacao: vaga.localizacao,
        salario: vaga.salario,
        dataCadastro: vaga.dataCadastro,
        ativa: vaga.ativa,
        visualizacoes: vaga.visualizacoes,
        candidaturas: vaga.candidaturas,
        createdAt: vaga.createdAt,
        updatedAt: vaga.updatedAt
    };
};

// Método estático para buscar vagas ativas
vagaSchema.statics.buscarAtivas = function() {
    return this.find({ ativa: true }).sort({ dataCadastro: -1 });
};

// Método estático para buscar por área
vagaSchema.statics.buscarPorArea = function(area) {
    return this.find({ area, ativa: true }).sort({ dataCadastro: -1 });
};

module.exports = mongoose.model('Vaga', vagaSchema);