package com.faeterj.centralvagas.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import org.h2.tools.Server;

public class DBUtil {
    
    private static final String URL = "jdbc:h2:mem:centralvagas;DB_CLOSE_DELAY=-1";
    private static final String USER = "sa";
    private static final String PASSWORD = "";

    static {
        try {
            // Inicia console web na porta 8082
            Server.createWebServer("-web", "-webAllowOthers", "-webPort", "8082").start();
            System.out.println("✅ Console H2: http://localhost:8082");
            
            initializeDatabase();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    
    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
    
    private static void initializeDatabase() throws SQLException {
        try (Connection conn = getConnection();
             Statement stmt = conn.createStatement()) {
            
            // Criar tabela ALUNO
            String createAlunoTable = 
                "CREATE TABLE IF NOT EXISTS aluno (" +
                "    id INT AUTO_INCREMENT PRIMARY KEY," +
                "    nome VARCHAR(100) NOT NULL," +
                "    email VARCHAR(100) NOT NULL," +
                "    telefone VARCHAR(20)," +
                "    curso VARCHAR(50)," +
                "    periodo VARCHAR(20)," +
                "    turno VARCHAR(20)," +
                "    competencias TEXT," +
                "    experiencia TEXT," +
                "    pontuacao INT DEFAULT 0" +
                ")";
            stmt.execute(createAlunoTable);
            System.out.println("✅ Tabela 'aluno' criada com sucesso!");
            
            // Criar tabela EMPRESA
            String createEmpresaTable = 
                "CREATE TABLE IF NOT EXISTS empresa (" +
                "    id INT AUTO_INCREMENT PRIMARY KEY," +
                "    nome VARCHAR(100) NOT NULL," +
                "    cnpj VARCHAR(18) NOT NULL," +
                "    email VARCHAR(100) NOT NULL," +
                "    telefone VARCHAR(20)," +
                "    endereco VARCHAR(200)," +
                "    setor VARCHAR(50)," +
                "    descricao TEXT," +
                "    senha VARCHAR(255) NOT NULL" +
                ")";
            stmt.execute(createEmpresaTable);
            System.out.println("✅ Tabela 'empresa' criada com sucesso!");
            
            // Criar tabela VAGA
            String createVagaTable = 
                "CREATE TABLE IF NOT EXISTS vaga (" +
                "    id INT AUTO_INCREMENT PRIMARY KEY," +
                "    titulo VARCHAR(100) NOT NULL," +
                "    descricao TEXT," +
                "    empresa VARCHAR(100)," +
                "    area VARCHAR(50)," +
                "    requisitos TEXT," +
                "    beneficios TEXT," +
                "    tipo VARCHAR(20)," +
                "    localizacao VARCHAR(100)," +
                "    salario DECIMAL(10, 2)," +
                "    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
                "    ativa BOOLEAN DEFAULT TRUE," +
                "    empresa_id INT" +
                ")";
            stmt.execute(createVagaTable);
            System.out.println("✅ Tabela 'vaga' criada com sucesso!");
            
            // Criar tabela CANDIDATURA
            String createCandidaturaTable = 
                "CREATE TABLE IF NOT EXISTS candidatura (" +
                "    id INT AUTO_INCREMENT PRIMARY KEY," +
                "    aluno_id INT NOT NULL," +
                "    vaga_id INT NOT NULL," +
                "    data_candidatura TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
                "    status VARCHAR(20) DEFAULT 'Pendente'," +
                "    mensagem TEXT" +
                ")";
            stmt.execute(createCandidaturaTable);
            System.out.println("✅ Tabela 'candidatura' criada com sucesso!");
            
            // Inserir alguns dados de exemplo
            insertSampleData(stmt);
            
        } catch (SQLException e) {
            System.err.println("❌ Erro ao inicializar banco: " + e.getMessage());
            throw e;
        }
    }
    
    private static void insertSampleData(Statement stmt) throws SQLException {
        try {
            // Inserir alunos exemplo
            stmt.execute(
                "INSERT INTO aluno (nome, email, telefone, curso, periodo, turno, competencias, experiencia) " +
                "VALUES ('João Silva', 'joao.silva@email.com', '(21) 9999-8888', 'Engenharia de Software', '5º', 'Noite', 'Java, Spring Boot, SQL', 'Estágio em desenvolvimento')"
            );
            
            stmt.execute(
                "INSERT INTO aluno (nome, email, telefone, curso, periodo, turno, competencias, experiencia) " +
                "VALUES ('Maria Santos', 'maria.santos@email.com', '(21) 9777-6666', 'Ciência da Computação', '3º', 'Manhã', 'Python, Django, PostgreSQL', 'Projetos acadêmicos')"
            );
            
            // Inserir empresas exemplo
            stmt.execute(
                "INSERT INTO empresa (nome, cnpj, email, telefone, endereco, setor, descricao, senha) " +
                "VALUES ('Tech Solutions Ltda', '12.345.678/0001-90', 'rh@techsolutions.com', '(21) 3333-4444', 'Rua das Flores, 100 - Centro', 'Tecnologia', 'Empresa de desenvolvimento de software', '123456')"
            );
            
            stmt.execute(
                "INSERT INTO empresa (nome, cnpj, email, telefone, endereco, setor, descricao, senha) " +
                "VALUES ('Inova Systems', '98.765.432/0001-10', 'contato@inovasystems.com', '(21) 2222-3333', 'Av. Principal, 500 - Jardim', 'TI', 'Consultoria em tecnologia', '123456')"
            );
            
            // Inserir vagas exemplo
            stmt.execute(
                "INSERT INTO vaga (titulo, descricao, empresa, area, requisitos, beneficios, tipo, localizacao, salario, empresa_id) " +
                "VALUES ('Desenvolvedor Java Junior', 'Vaga para desenvolvedor Java com Spring Boot', 'Tech Solutions', 'Desenvolvimento', 'Java, Spring Boot, SQL', 'Vale alimentação, plano de saúde', 'CLT', 'Rio de Janeiro', 3500.00, 1)"
            );
            
            stmt.execute(
                "INSERT INTO vaga (titulo, descricao, empresa, area, requisitos, beneficios, tipo, localizacao, salario, empresa_id) " +
                "VALUES ('Estágio em Desenvolvimento', 'Estágio para estudantes de TI', 'Inova Systems', 'Estágio', 'Lógica de programação, Python', 'Bolsa estágio, vale transporte', 'Estágio', 'Híbrido', 1500.00, 2)"
            );
            
            System.out.println("✅ Dados de exemplo inseridos com sucesso!");
            
        } catch (SQLException e) {
            System.out.println("⚠️  Alguns dados de exemplo já existem (normal em reinicializações)");
        }
    }
    
    public static void closeConnection(Connection conn) {
        if (conn != null) {
            try {
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
    
    // Método para debug - ver todas as tabelas e contagens
    public static void debugDatabase() {
        try (Connection conn = getConnection();
             Statement stmt = conn.createStatement()) {
            
            System.out.println("\n=== DEBUG DATABASE ===");
            
            String[] tabelas = {"aluno", "empresa", "vaga", "candidatura"};
            for (String tabela : tabelas) {
                ResultSet rs = stmt.executeQuery("SELECT COUNT(*) as total FROM " + tabela);
                if (rs.next()) {
                    System.out.println("📊 " + tabela + ": " + rs.getInt("total") + " registros");
                }
            }
            
        } catch (SQLException e) {
            System.err.println("❌ Erro no debug: " + e.getMessage());
        }
    }
}