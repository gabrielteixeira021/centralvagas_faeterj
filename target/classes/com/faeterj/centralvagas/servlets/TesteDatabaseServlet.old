package com.faeterj.centralvagas.servlets;

import com.faeterj.centralvagas.util.DBUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

@WebServlet(name = "TesteDatabaseServlet", urlPatterns = {"/teste-db"})
public class TesteDatabaseServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        
        out.println("<!DOCTYPE html>");
        out.println("<html><head><title>Teste de Conexão com Banco</title></head>");
        out.println("<body>");
        out.println("<h1>Diagnóstico da Conexão com Banco de Dados</h1>");
        
        try {
            // Teste 1: Verificar conexão
            out.println("<h2>1. Testando Conexão...</h2>");
            Connection conn = DBUtil.getConnection();
            out.println("<p style='color:green'>✅ Conexão estabelecida com sucesso!</p>");
            
            // Teste 2: Verificar metadados do banco
            out.println("<h2>2. Informações do Banco:</h2>");
            DatabaseMetaData metaData = conn.getMetaData();
            out.println("<p><strong>URL:</strong> " + metaData.getURL() + "</p>");
            out.println("<p><strong>Usuário:</strong> " + metaData.getUserName() + "</p>");
            out.println("<p><strong>Driver:</strong> " + metaData.getDriverName() + "</p>");
            out.println("<p><strong>Versão do Driver:</strong> " + metaData.getDriverVersion() + "</p>");
            
            // Teste 3: Verificar se o banco 'centralvagas' existe
            out.println("<h2>3. Verificando Banco 'centralvagas':</h2>");
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT DATABASE() as current_db");
            if (rs.next()) {
                String currentDb = rs.getString("current_db");
                out.println("<p><strong>Banco Atual:</strong> " + currentDb + "</p>");
                if ("centralvagas".equals(currentDb)) {
                    out.println("<p style='color:green'>✅ Banco 'centralvagas' está sendo usado!</p>");
                } else {
                    out.println("<p style='color:red'>❌ Banco atual não é 'centralvagas'!</p>");
                }
            }
            
            // Teste 4: Verificar se a tabela 'aluno' existe
            out.println("<h2>4. Verificando Tabela 'aluno':</h2>");
            ResultSet tables = metaData.getTables("centralvagas", null, "aluno", null);
            if (tables.next()) {
                out.println("<p style='color:green'>✅ Tabela 'aluno' existe!</p>");
                
                // Mostrar estrutura da tabela
                out.println("<h3>Estrutura da Tabela:</h3>");
                ResultSet columns = metaData.getColumns("centralvagas", null, "aluno", null);
                out.println("<ul>");
                while (columns.next()) {
                    String columnName = columns.getString("COLUMN_NAME");
                    String columnType = columns.getString("TYPE_NAME");
                    String columnSize = columns.getString("COLUMN_SIZE");
                    boolean nullable = columns.getBoolean("NULLABLE");
                    out.println("<li><strong>" + columnName + "</strong> - " + columnType + 
                              "(" + columnSize + ") " + (nullable ? "NULL" : "NOT NULL") + "</li>");
                }
                out.println("</ul>");
                
                // Contar registros na tabela
                ResultSet countResult = stmt.executeQuery("SELECT COUNT(*) as total FROM aluno");
                if (countResult.next()) {
                    int total = countResult.getInt("total");
                    out.println("<p><strong>Total de registros:</strong> " + total + "</p>");
                }
            } else {
                out.println("<p style='color:red'>❌ Tabela 'aluno' NÃO existe!</p>");
                out.println("<p>Execute o script SQL para criar a tabela:</p>");
                out.println("<pre>");
                out.println("CREATE TABLE aluno (");
                out.println("    id INT AUTO_INCREMENT PRIMARY KEY,");
                out.println("    nome VARCHAR(100) NOT NULL,");
                out.println("    email VARCHAR(100) NOT NULL UNIQUE,");
                out.println("    telefone VARCHAR(20),");
                out.println("    curso VARCHAR(100),");
                out.println("    periodo VARCHAR(20),");
                out.println("    turno VARCHAR(20),");
                out.println("    competencias TEXT,");
                out.println("    experiencia TEXT,");
                out.println("    pontuacao INT DEFAULT 0");
                out.println(");");
                out.println("</pre>");
            }
            
            // Teste 5: Testar inserção simples
            out.println("<h2>5. Teste de Inserção:</h2>");
            try {
                String insertTest = "INSERT INTO aluno (nome, email, telefone, curso, periodo, turno, competencias, experiencia, pontuacao) " +
                                  "VALUES ('Teste Usuario', 'teste@teste.com', '(21)99999-9999', 'Teste Curso', '1º período', 'Manhã', 'Java', 'Nenhuma', 0)";
                int result = stmt.executeUpdate(insertTest);
                out.println("<p style='color:green'>✅ Inserção teste executada! Linhas afetadas: " + result + "</p>");
                
                // Remover o registro de teste
                stmt.executeUpdate("DELETE FROM aluno WHERE email = 'teste@teste.com'");
                out.println("<p>🗑️ Registro de teste removido.</p>");
            } catch (SQLException e) {
                out.println("<p style='color:red'>❌ Erro na inserção teste: " + e.getMessage() + "</p>");
            }
            
            conn.close();
            
        } catch (SQLException e) {
            out.println("<p style='color:red'>❌ Erro de conexão: " + e.getMessage() + "</p>");
            out.println("<p><strong>Causa:</strong> " + e.getCause() + "</p>");
            out.println("<p><strong>SQL State:</strong> " + e.getSQLState() + "</p>");
            out.println("<p><strong>Código de Erro:</strong> " + e.getErrorCode() + "</p>");
        }
        
        out.println("</body></html>");
    }
}