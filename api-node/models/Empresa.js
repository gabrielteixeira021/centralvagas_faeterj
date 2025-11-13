const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const empresaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Nome da empresa é obrigatório'],
        trim: true,
        maxlength: [100, 'Nome deve ter no máximo 100 caracteres']
    },
    cnpj: {
        type: String,
        required: [true, 'CNPJ é obrigatório'],
        unique: true,
        match: [/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, 'CNPJ deve estar no formato XX.XXX.XXX/XXXX-XX']
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
    endereco: {
        type: String,
        required: [true, 'Endereço é obrigatório'],
        trim: true
    },
    setor: {
        type: String,
        required: [true, 'Setor é obrigatório'],
        trim: true,
        enum: [
            'Tecnologia', 'Saúde', 'Educação', 'Comércio', 'Indústria',
            'Serviços', 'Finanças', 'Logística', 'Marketing', 'Jurídico', 'Outros'
        ]
    },
    descricao: {
        type: String,
        required: [true, 'Descrição é obrigatória'],
        trim: true,
        maxlength: [500, 'Descrição deve ter no máximo 500 caracteres']
    },
    senha: {
        type: String,
        required: [true, 'Senha é obrigatória'],
        minlength: [6, 'Senha deve ter no mínimo 6 caracteres'],
        select: false // Não incluir senha nas consultas por padrão
    },
    ativa: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    collection: 'empresas'
});

// Índices
empresaSchema.index({ cnpj: 1 });
empresaSchema.index({ email: 1 });
empresaSchema.index({ setor: 1 });
empresaSchema.index({ nome: 1 });

// Hash da senha antes de salvar
empresaSchema.pre('save', async function(next) {
    if (!this.isModified('senha')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.senha = await bcrypt.hash(this.senha, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Método para comparar senhas
empresaSchema.methods.compararSenha = async function(senhaCandidata) {
    return await bcrypt.compare(senhaCandidata, this.senha);
};

// Método toJSON personalizado
empresaSchema.methods.toJSON = function() {
    const empresa = this.toObject();
    return {
        id: empresa._id,
        nome: empresa.nome,
        cnpj: empresa.cnpj,
        email: empresa.email,
        telefone: empresa.telefone,
        endereco: empresa.endereco,
        setor: empresa.setor,
        descricao: empresa.descricao,
        ativa: empresa.ativa,
        createdAt: empresa.createdAt,
        updatedAt: empresa.updatedAt
        // Senha nunca é retornada
    };
};

module.exports = mongoose.model('Empresa', empresaSchema);