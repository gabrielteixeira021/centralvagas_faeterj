-- Script SQL para criar o banco e tabelas do Central de Vagas
-- Execute este script no phpMyAdmin ou MySQL Workbench

-- 1. Criar o banco de dados (se não existir)
CREATE DATABASE IF NOT EXISTS centralvagas 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_general_ci;

-- 2. Usar o banco centralvagas
USE centralvagas;

-- 3. Criar tabela de alunos
CREATE TABLE IF NOT EXISTS aluno (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    curso VARCHAR(100),
    periodo VARCHAR(20),
    turno VARCHAR(20),
    competencias TEXT,
    experiencia TEXT,
    pontuacao INT DEFAULT 0,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Criar tabela de empresas
CREATE TABLE IF NOT EXISTS empresa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    cnpj VARCHAR(18),
    endereco VARCHAR(200),
    setor VARCHAR(100),
    descricao TEXT,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Criar tabela de vagas
CREATE TABLE IF NOT EXISTS vaga (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    empresa_id INT,
    requisitos TEXT,
    beneficios TEXT,
    salario DECIMAL(10,2),
    tipo_contrato VARCHAR(50), -- CLT, Estágio, PJ, etc.
    localizacao VARCHAR(100),
    modalidade VARCHAR(20), -- Presencial, Remoto, Híbrido
    status VARCHAR(20) DEFAULT 'ATIVA', -- ATIVA, PAUSADA, ENCERRADA
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_expiracao DATE,
    FOREIGN KEY (empresa_id) REFERENCES empresa(id) ON DELETE CASCADE
);

-- 6. Criar tabela de candidaturas (relacionamento entre aluno e vaga)
CREATE TABLE IF NOT EXISTS candidatura (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT NOT NULL,
    vaga_id INT NOT NULL,
    data_candidatura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'PENDENTE', -- PENDENTE, APROVADA, REJEITADA
    observacoes TEXT,
    FOREIGN KEY (aluno_id) REFERENCES aluno(id) ON DELETE CASCADE,
    FOREIGN KEY (vaga_id) REFERENCES vaga(id) ON DELETE CASCADE,
    UNIQUE KEY unique_candidatura (aluno_id, vaga_id) -- Evita candidatura duplicada
);

-- 7. Inserir dados de exemplo para teste

-- Empresas de exemplo
INSERT INTO empresa (nome, email, telefone, cnpj, endereco, setor, descricao) VALUES 
('TechStart Soluções', 'contato@techstart.com', '(21) 3333-4444', '12.345.678/0001-90', 
 'Av. Rio Branco, 123 - Centro, Rio de Janeiro', 'Tecnologia', 
 'Empresa especializada em desenvolvimento de software e soluções digitais para PMEs.'),

('Digital Innovations', 'rh@digitalinno.com', '(21) 2222-3333', '98.765.432/0001-10', 
 'Rua das Laranjeiras, 456 - Laranjeiras, Rio de Janeiro', 'Tecnologia', 
 'Startup focada em inovação digital e transformação de empresas tradicionais.'),

('WebDesign Pro', 'jobs@webdesignpro.com', '(21) 1111-2222', '11.222.333/0001-44', 
 'Av. Atlântica, 789 - Copacabana, Rio de Janeiro', 'Design', 
 'Agência de design especializada em experiência do usuário e interfaces modernas.');

-- Vagas de exemplo
INSERT INTO vaga (titulo, descricao, empresa_id, requisitos, beneficios, salario, tipo_contrato, localizacao, modalidade, data_expiracao) VALUES 
('Desenvolvedor Java Júnior', 
 'Desenvolvimento de aplicações web usando Java, Spring Boot e MySQL. Trabalhar em equipe ágil com foco em qualidade e boas práticas.',
 1, 
 'Conhecimento em Java, Spring Boot, MySQL, Git. Desejável conhecimento em JavaScript e HTML/CSS.',
 'Vale alimentação, Vale transporte, Plano de saúde, Ambiente jovem e dinâmico',
 3500.00, 'CLT', 'Rio de Janeiro - RJ', 'Híbrido', '2025-12-31'),

('Estagiário em Desenvolvimento Web', 
 'Oportunidade para estudantes de TI desenvolverem habilidades práticas em projetos reais. Mentoria com desenvolvedores sêniores.',
 2, 
 'Cursando Análise de Sistemas, Ciência da Computação ou similares. Conhecimento básico em HTML, CSS, JavaScript.',
 'Bolsa auxílio R$ 1.200, Vale transporte, Vale refeição, Certificado de estágio',
 1200.00, 'Estágio', 'Rio de Janeiro - RJ', 'Presencial', '2025-11-30'),

('Designer UX/UI', 
 'Criação de interfaces intuitivas e experiências digitais memoráveis. Trabalho colaborativo com equipes de produto e desenvolvimento.',
 3, 
 'Portfólio em UX/UI, conhecimento em Figma, Adobe Creative Suite. Experiência com prototipagem e testes de usabilidade.',
 'Salário competitivo, Plano de saúde e odontológico, Horário flexível, Home office',
 4500.00, 'CLT', 'Rio de Janeiro - RJ', 'Remoto', '2025-12-15');

-- Alunos de exemplo
INSERT INTO aluno (nome, email, telefone, curso, periodo, turno, competencias, experiencia, pontuacao) VALUES 
('João Silva Santos', 'joao.silva@aluno.faeterj.edu.br', '(21) 99999-8888', 
 'Análise e Desenvolvimento de Sistemas', '5º período', 'Noite', 
 'Java, Spring Boot, MySQL, HTML, CSS, JavaScript, Git', 
 'Estagiário em desenvolvimento web por 6 meses na TechStart.', 85),

('Maria Oliveira Costa', 'maria.costa@aluno.faeterj.edu.br', '(21) 96666-5555', 
 'Engenharia de Computação', '8º período', 'Manhã', 
 'C++, Python, MATLAB, Arduino, Raspberry Pi, Eletrônica, Redes', 
 'Projeto de iniciação científica em IoT. Desenvolveu sistema de monitoramento inteligente.', 92),

('Pedro Henrique Alves', 'pedro.alves@aluno.faeterj.edu.br', '(21) 95555-4444', 
 'Sistemas de Informação', '2º período', 'Manhã', 
 'HTML, CSS, JavaScript básico, Python básico', 
 'Estudante em formação. Desenvolveu projetos acadêmicos básicos.', 45);

-- Candidaturas de exemplo
INSERT INTO candidatura (aluno_id, vaga_id, status, observacoes) VALUES 
(1, 1, 'APROVADA', 'Candidato com ótimo perfil técnico e experiência relevante.'),
(2, 3, 'PENDENTE', 'Portfólio interessante, aguardando entrevista técnica.'),
(3, 2, 'APROVADA', 'Perfil ideal para estágio, demonstrou interesse e dedicação.');

-- Verificar se os dados foram inseridos corretamente
SELECT 'Empresas cadastradas:' as info;
SELECT COUNT(*) as total FROM empresa;

SELECT 'Vagas disponíveis:' as info;
SELECT COUNT(*) as total FROM vaga WHERE status = 'ATIVA';

SELECT 'Alunos cadastrados:' as info;
SELECT COUNT(*) as total FROM aluno;

SELECT 'Candidaturas realizadas:' as info;
SELECT COUNT(*) as total FROM candidatura;