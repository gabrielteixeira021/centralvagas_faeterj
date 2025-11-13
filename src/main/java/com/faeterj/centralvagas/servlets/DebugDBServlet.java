package com.faeterj.centralvagas.servlets;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

@WebServlet("/teste-db")
public class DebugDBServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws IOException {
        
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        
        String url = "jdbc:h2:mem:centralvagas";
        String user = "sa";
        String password = "";
        
        try (Connection conn = DriverManager.getConnection(url, user, password);
             Statement stmt = conn.createStatement()) {
            
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head><title>Debug Database - CentralVagas</title>");
            out.println("<style>");
            out.println("body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }");
            out.println("h1 { color: #333; }");
            out.println("table { border-collapse: collapse; width: 100%; margin: 20px 0; background: white; }");
            out.println("th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }");
            out.println("th { background-color: #4CAF50; color: white; }");
            out.println("tr:nth-child(even) { background-color: #f2f2f2; }");
            out.println(".section { background: white; padding: 20px; margin: 20px 0; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }");
            out.println(".btn { background: #4CAF50; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 5px; }");
            out.println(".btn-console { background: #2196F3; }");
            out.println("</style>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>🔍 Debug do Banco - CentralVagas</h1>");
            out.println("<p><strong>URL:</strong> " + request.getRequestURL() + "</p>");
            
            // Links úteis
            out.println("<div class='section'>");
            out.println("<h2>🚀 Links Rápidos</h2>");
            out.println("<a href='http://localhost:10000/AP6/aluno' class='btn'>📝 Página de Alunos</a>");
            out.println("<a href='http://localhost:8082' class='btn btn-console' target='_blank'>📊 Console H2 (Porta 8082)</a>");
            out.println("</div>");
            
            // Resumo das tabelas
            out.println("<div class='section'>");
            out.println("<h2>📊 Resumo do Banco</h2>");
            String[] tabelas = {"aluno", "empresa", "vaga", "candidatura"};
            for (String tabela : tabelas) {
                ResultSet rs = stmt.executeQuery("SELECT COUNT(*) as total FROM " + tabela);
                if (rs.next()) {
                    out.println("<p><strong>" + tabela + ":</strong> " + rs.getInt("total") + " registros</p>");
                }
            }
            out.println("</div>");
            
            // Dados de cada tabela
            for (String tabela : tabelas) {
                out.println("<div class='section'>");
                out.println("<h2>📋 Tabela: " + tabela + "</h2>");
                
                ResultSet rs = stmt.executeQuery("SELECT * FROM " + tabela);
                out.println("<table>");
                out.println("<tr>");
                
                // Cabeçalho
                int columnCount = rs.getMetaData().getColumnCount();
                for (int i = 1; i <= columnCount; i++) {
                    out.println("<th>" + rs.getMetaData().getColumnName(i) + "</th>");
                }
                out.println("</tr>");
                
                // Dados
                int rowCount = 0;
                while (rs.next()) {
                    out.println("<tr>");
                    for (int i = 1; i <= columnCount; i++) {
                        out.println("<td>" + (rs.getString(i) != null ? rs.getString(i) : "NULL") + "</td>");
                    }
                    out.println("</tr>");
                    rowCount++;
                }
                
                if (rowCount == 0) {
                    out.println("<tr><td colspan='" + columnCount + "' style='text-align: center; color: #666;'>Nenhum registro encontrado</td></tr>");
                }
                
                out.println("</table>");
                out.println("</div>");
            }
            
            out.println("</body>");
            out.println("</html>");
            
        } catch (Exception e) {
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head><title>Erro</title></head>");
            out.println("<body style='font-family: Arial; margin: 20px;'>");
            out.println("<h1 style='color: red;'>💥 ERRO NO BANCO DE DADOS</h1>");
            out.println("<p><strong>Mensagem:</strong> " + e.getMessage() + "</p>");
            out.println("<pre>");
            e.printStackTrace(out);
            out.println("</pre>");
            out.println("</body>");
            out.println("</html>");
        }
    }
}