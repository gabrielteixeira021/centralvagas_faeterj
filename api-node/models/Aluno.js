const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Nome é obrigatório'],
        trim: true,
        maxlength: [100, 'Nome deve ter no máximo 100 caracteres']
    },
    email: {
        type: String,
        required: [true, 'Email é obrigatório'],
        unique: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email inválido']
    },
    telefone: {
        type: String,
        required: [true, 'Telefone é obrigatório'],
        trim: true
    },
    curso: {
        type: String,
        required: [true, 'Curso é obrigatório'],
        trim: true
    },
    periodo: {
        type: String,
        required: [true, 'Período é obrigatório'],
        trim: true
    },
    turno: {
        type: String,
        required: [true, 'Turno é obrigatório'],
        enum: ['Manhã', 'Tarde', 'Noite', 'Integral']
    },
    competencias: {
        type: String,
        required: [true, 'Competências são obrigatórias'],
        trim: true
    },
    experiencia: {
        type: String,
        required: [true, 'Experiência é obrigatória'],
        trim: true
    },
    pontuacao: {
        type: Number,
        default: 0,
        min: 0
    }
}, {
    timestamps: true, // Adiciona createdAt e updatedAt automaticamente
    collection: 'alunos'
});

// Índices para melhor performance
alunoSchema.index({ email: 1 });
alunoSchema.index({ nome: 1 });
alunoSchema.index({ curso: 1 });

// Métodos do esquema
alunoSchema.methods.toJSON = function() {
    const aluno = this.toObject();
    return {
        id: aluno._id,
        nome: aluno.nome,
        email: aluno.email,
        telefone: aluno.telefone,
        curso: aluno.curso,
        periodo: aluno.periodo,
        turno: aluno.turno,
        competencias: aluno.competencias,
        experiencia: aluno.experiencia,
        pontuacao: aluno.pontuacao,
        createdAt: aluno.createdAt,
        updatedAt: aluno.updatedAt
    };
};

module.exports = mongoose.model('Aluno', alunoSchema);