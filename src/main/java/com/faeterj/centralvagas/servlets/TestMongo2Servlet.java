package com.faeterj.centralvagas.servlets;

import com.faeterj.centralvagas.util.MongoUtil;
import com.mongodb.client.MongoCollection;
import org.bson.Document;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

@WebServlet("/test-mongo2")
public class TestMongo2Servlet extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        
        out.println("<!DOCTYPE html>");
        out.println("<html><head><title>Teste MongoDB</title>");
        out.println("<style>body{font-family:Arial;margin:20px;} .success{color:green;} .error{color:red;} .info{color:blue;}</style>");
        out.println("</head><body>");
        out.println("<h1>🍃 Central Vagas - Teste MongoDB</h1>");
        
        try {
            // Testar conexão
            boolean conexaoOK = MongoUtil.testarConexao();
            
            if (conexaoOK) {
                out.println("<div class='success'>");
                out.println("<h2>✅ MongoDB Funcionando!</h2>");
                out.println("<p>🍃 Conexão estabelecida com sucesso</p>");
                out.println("</div>");
                
                // Inserir dados de teste
                inserirDadosTeste(out);
                
                // Contar documentos
                contarDocumentos(out);
                
                out.println("<h3>🔗 Próximos Passos:</h3>");
                out.println("<ol>");
                out.println("<li><strong>MongoDB Local:</strong> Está funcionando! ✅</li>");
                out.println("<li><strong>Para MongoDB Atlas:</strong> Substitua a CONNECTION_STRING no MongoUtil.java</li>");
                out.println("<li><strong>Teste a aplicação:</strong> <a href='aluno'>Página de Alunos</a></li>");
                out.println("</ol>");
                
            } else {
                out.println("<div class='error'>");
                out.println("<h2>❌ Erro na conexão</h2>");
                out.println("<p>Verifique se o MongoDB está rodando:</p>");
                out.println("<ul>");
                out.println("<li>MongoDB local: <code>mongod</code></li>");
                out.println("<li>Ou configure MongoDB Atlas na CONNECTION_STRING</li>");
                out.println("</ul>");
                out.println("</div>");
            }
            
        } catch (Exception e) {
            out.println("<div class='error'>");
            out.println("<h2>❌ Erro: " + e.getMessage() + "</h2>");
            out.println("<p>Stack trace no console do servidor</p>");
            out.println("</div>");
            e.printStackTrace();
        }
        
        out.println("<br><hr>");
        out.println("<p><a href='index.jsp'>← Voltar ao início</a></p>");
        out.println("</body></html>");
    }
    
    private void inserirDadosTeste(PrintWriter out) {
        try {
            // Inserir aluno de teste
            MongoCollection<Document> alunos = MongoUtil.getAlunosCollection();
            
            String emailTeste = "joao.teste@mongodb.com";
            
            // Só insere se não existir
            if (alunos.countDocuments(new Document("email", emailTeste)) == 0) {
                Document alunoTeste = new Document()
                    .append("nome", "João Silva MongoDB")
                    .append("email", emailTeste)
                    .append("telefone", "(21) 99999-8888")
                    .append("curso", "Análise e Desenvolvimento de Sistemas")
                    .append("periodo", "5º período")
                    .append("turno", "Noite")
                    .append("competencias", "Java, MongoDB, NoSQL, Spring Boot")
                    .append("experiencia", "Testando integração com MongoDB")
                    .append("pontuacao", 95)
                    .append("dataCadastro", new Date());
                
                alunos.insertOne(alunoTeste);
                out.println("<p class='success'>✅ Aluno de teste inserido!</p>");
                System.out.println("✅ Aluno de teste inserido no MongoDB!");
            } else {
                out.println("<p class='info'>ℹ️ Aluno de teste já existe</p>");
            }
            
            // Inserir empresa de teste
            MongoCollection<Document> empresas = MongoUtil.getEmpresasCollection();
            
            String emailEmpresa = "contato@techcorp-mongo.com";
            
            if (empresas.countDocuments(new Document("email", emailEmpresa)) == 0) {
                Document empresaTeste = new Document()
                    .append("nome", "TechCorp MongoDB")
                    .append("cnpj", "12.345.678/0001-90")
                    .append("email", emailEmpresa)
                    .append("telefone", "(21) 3333-4444")
                    .append("endereco", "Rua MongoDB, 123 - Centro")
                    .append("setor", "Tecnologia")
                    .append("descricao", "Empresa especializada em MongoDB")
                    .append("senha", "senha123hash")
                    .append("dataCadastro", new Date());
                
                empresas.insertOne(empresaTeste);
                out.println("<p class='success'>✅ Empresa de teste inserida!</p>");
                System.out.println("✅ Empresa de teste inserida no MongoDB!");
            } else {
                out.println("<p class='info'>ℹ️ Empresa de teste já existe</p>");
            }
            
        } catch (Exception e) {
            out.println("<p class='error'>❌ Erro ao inserir dados de teste: " + e.getMessage() + "</p>");
            System.err.println("❌ Erro ao inserir dados de teste: " + e.getMessage());
        }
    }
    
    private void contarDocumentos(PrintWriter out) {
        try {
            long alunosCount = MongoUtil.getAlunosCollection().countDocuments();
            long empresasCount = MongoUtil.getEmpresasCollection().countDocuments();
            long vagasCount = MongoUtil.getVagasCollection().countDocuments();
            long candidaturasCount = MongoUtil.getCandidaturasCollection().countDocuments();
            
            out.println("<h3>📊 Estatísticas do Banco:</h3>");
            out.println("<table border='1' style='border-collapse:collapse;'>");
            out.println("<tr style='background:#f0f0f0;'><th style='padding:8px;'>Collection</th><th style='padding:8px;'>Documentos</th></tr>");
            out.println("<tr><td style='padding:8px;'><strong>Alunos</strong></td><td style='padding:8px;'>" + alunosCount + "</td></tr>");
            out.println("<tr><td style='padding:8px;'><strong>Empresas</strong></td><td style='padding:8px;'>" + empresasCount + "</td></tr>");
            out.println("<tr><td style='padding:8px;'><strong>Vagas</strong></td><td style='padding:8px;'>" + vagasCount + "</td></tr>");
            out.println("<tr><td style='padding:8px;'><strong>Candidaturas</strong></td><td style='padding:8px;'>" + candidaturasCount + "</td></tr>");
            out.println("</table>");
            
        } catch (Exception e) {
            out.println("<p class='error'>❌ Erro ao contar documentos: " + e.getMessage() + "</p>");
        }
    }
}