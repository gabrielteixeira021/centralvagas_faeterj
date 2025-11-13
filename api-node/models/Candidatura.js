const mongoose = require('mongoose');

const candidaturaSchema = new mongoose.Schema({
    alunoId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'ID do aluno é obrigatório'],
        ref: 'Aluno'
    },
    vagaId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'ID da vaga é obrigatório'],
        ref: 'Vaga'
    },
    empresaId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'ID da empresa é obrigatório'],
        ref: 'Empresa'
    },
    dataCandidatura: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Pendente', 'Analisando', 'Aprovado', 'Reprovado', 'Cancelado'],
        default: 'Pendente'
    },
    observacoes: {
        type: String,
        trim: true,
        maxlength: [500, 'Observações devem ter no máximo 500 caracteres']
    },
    pontuacao: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    dataResposta: {
        type: Date
    },
    feedbackEmpresa: {
        type: String,
        trim: true,
        maxlength: [1000, 'Feedback deve ter no máximo 1000 caracteres']
    }
}, {
    timestamps: true,
    collection: 'candidaturas'
});

// Índice único para evitar candidaturas duplicadas
candidaturaSchema.index({ alunoId: 1, vagaId: 1 }, { unique: true });

// Índices para consultas comuns
candidaturaSchema.index({ alunoId: 1 });
candidaturaSchema.index({ vagaId: 1 });
candidaturaSchema.index({ empresaId: 1 });
candidaturaSchema.index({ status: 1 });
candidaturaSchema.index({ dataCandidatura: -1 });

// Método para atualizar status
candidaturaSchema.methods.atualizarStatus = function(novoStatus, feedback = null) {
    this.status = novoStatus;
    this.dataResposta = new Date();
    if (feedback) {
        this.feedbackEmpresa = feedback;
    }
    return this.save();
};

// Método toJSON personalizado
candidaturaSchema.methods.toJSON = function() {
    const candidatura = this.toObject();
    return {
        id: candidatura._id,
        alunoId: candidatura.alunoId,
        vagaId: candidatura.vagaId,
        empresaId: candidatura.empresaId,
        dataCandidatura: candidatura.dataCandidatura,
        status: candidatura.status,
        observacoes: candidatura.observacoes,
        pontuacao: candidatura.pontuacao,
        dataResposta: candidatura.dataResposta,
        feedbackEmpresa: candidatura.feedbackEmpresa,
        createdAt: candidatura.createdAt,
        updatedAt: candidatura.updatedAt
    };
};

// Métodos estáticos para consultas comuns
candidaturaSchema.statics.buscarPorAluno = function(alunoId) {
    return this.find({ alunoId })
        .populate('vagaId', 'titulo empresa area tipo salario ativa')
        .populate('empresaId', 'nome setor')
        .sort({ dataCandidatura: -1 });
};

candidaturaSchema.statics.buscarPorVaga = function(vagaId) {
    return this.find({ vagaId })
        .populate('alunoId', 'nome email curso periodo competencias')
        .sort({ dataCandidatura: -1 });
};

candidaturaSchema.statics.buscarPorEmpresa = function(empresaId) {
    return this.find({ empresaId })
        .populate('alunoId', 'nome email curso periodo competencias')
        .populate('vagaId', 'titulo area tipo')
        .sort({ dataCandidatura: -1 });
};

module.exports = mongoose.model('Candidatura', candidaturaSchema);