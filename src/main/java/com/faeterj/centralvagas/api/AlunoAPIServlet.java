package com.faeterj.centralvagas.api;

import com.faeterj.centralvagas.dao.AlunoMongoDAO;
import com.faeterj.centralvagas.model.Aluno;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/api/alunos")
public class AlunoAPIServlet extends HttpServlet {
    
    private AlunoMongoDAO alunoDAO;
    private Gson gson;
    
    @Override
    public void init() throws ServletException {
        this.alunoDAO = new AlunoMongoDAO();
        this.gson = new Gson();
        System.out.println("🚀 API Alunos inicializada!");
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        configureJsonResponse(response);
        
        try {
            String id = request.getParameter("id");
            
            if (id != null && !id.trim().isEmpty()) {
                // Buscar aluno específico
                Aluno aluno = alunoDAO.buscarPorId(id);
                
                if (aluno != null) {
                    JsonObject result = createSuccessResponse();
                    result.add("aluno", gson.toJsonTree(aluno));
                    response.getWriter().write(gson.toJson(result));
                } else {
                    sendErrorResponse(response, 404, "Aluno não encontrado");
                }
                
            } else {
                // Listar todos os alunos
                List<Aluno> alunos = alunoDAO.listarTodos();
                
                JsonObject result = createSuccessResponse();
                result.addProperty("total", alunos.size());
                result.add("alunos", gson.toJsonTree(alunos));
                response.getWriter().write(gson.toJson(result));
            }
            
        } catch (Exception e) {
            sendErrorResponse(response, 500, "Erro interno: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        configureJsonResponse(response);
        request.setCharacterEncoding("UTF-8");
        
        try {
            // Criar novo aluno usando os mesmos parâmetros do servlet original
            String nome = request.getParameter("nome");
            String email = request.getParameter("email");
            String telefone = request.getParameter("telefone");
            String curso = request.getParameter("curso");
            String periodo = request.getParameter("periodo");
            String turno = request.getParameter("turno");
            String competencias = request.getParameter("competencias");
            String experiencia = request.getParameter("experiencia");
            
            // Validações básicas
            if (nome == null || email == null) {
                sendErrorResponse(response, 400, "Nome e email são obrigatórios");
                return;
            }
            
            // Verificar se email já existe
            Aluno existente = alunoDAO.buscarPorEmail(email);
            if (existente != null) {
                sendErrorResponse(response, 409, "Email já cadastrado");
                return;
            }
            
            Aluno aluno = new Aluno(nome, email, telefone, curso, periodo, turno, competencias, experiencia);
            
            if (alunoDAO.inserir(aluno)) {
                JsonObject result = createSuccessResponse();
                result.addProperty("message", "Aluno cadastrado com sucesso!");
                result.addProperty("id", aluno.getId());
                result.add("aluno", gson.toJsonTree(aluno));
                
                response.setStatus(201); // Created
                response.getWriter().write(gson.toJson(result));
                
            } else {
                sendErrorResponse(response, 400, "Erro ao cadastrar aluno");
            }
            
        } catch (Exception e) {
            sendErrorResponse(response, 500, "Erro interno: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        configureJsonResponse(response);
        request.setCharacterEncoding("UTF-8");
        
        try {
            String id = request.getParameter("id");
            
            if (id == null || id.trim().isEmpty()) {
                sendErrorResponse(response, 400, "ID é obrigatório para atualização");
                return;
            }
            
            // Buscar aluno existente
            Aluno aluno = alunoDAO.buscarPorId(id);
            if (aluno == null) {
                sendErrorResponse(response, 404, "Aluno não encontrado");
                return;
            }
            
            // Atualizar campos (mesma lógica do servlet original)
            String nome = request.getParameter("nome");
            if (nome != null) aluno.setNome(nome);
            
            String email = request.getParameter("email");
            if (email != null) aluno.setEmail(email);
            
            String telefone = request.getParameter("telefone");
            if (telefone != null) aluno.setTelefone(telefone);
            
            String curso = request.getParameter("curso");
            if (curso != null) aluno.setCurso(curso);
            
            String periodo = request.getParameter("periodo");
            if (periodo != null) aluno.setPeriodo(periodo);
            
            String turno = request.getParameter("turno");
            if (turno != null) aluno.setTurno(turno);
            
            String competencias = request.getParameter("competencias");
            if (competencias != null) aluno.setCompetencias(competencias);
            
            String experiencia = request.getParameter("experiencia");
            if (experiencia != null) aluno.setExperiencia(experiencia);
            
            if (alunoDAO.atualizar(aluno)) {
                JsonObject result = createSuccessResponse();
                result.addProperty("message", "Aluno atualizado com sucesso!");
                result.add("aluno", gson.toJsonTree(aluno));
                response.getWriter().write(gson.toJson(result));
                
            } else {
                sendErrorResponse(response, 400, "Erro ao atualizar aluno");
            }
            
        } catch (Exception e) {
            sendErrorResponse(response, 500, "Erro interno: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        configureJsonResponse(response);
        
        try {
            String id = request.getParameter("id");
            
            if (id == null || id.trim().isEmpty()) {
                sendErrorResponse(response, 400, "ID é obrigatório para exclusão");
                return;
            }
            
            if (alunoDAO.excluir(id)) {
                JsonObject result = createSuccessResponse();
                result.addProperty("message", "Aluno excluído com sucesso!");
                response.getWriter().write(gson.toJson(result));
                
            } else {
                sendErrorResponse(response, 404, "Aluno não encontrado ou erro na exclusão");
            }
            
        } catch (Exception e) {
            sendErrorResponse(response, 500, "Erro interno: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    // Métodos auxiliares
    private void configureJsonResponse(HttpServletResponse response) {
        response.setContentType("application/json;charset=UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }
    
    private JsonObject createSuccessResponse() {
        JsonObject result = new JsonObject();
        result.addProperty("success", true);
        result.addProperty("timestamp", System.currentTimeMillis());
        return result;
    }
    
    private void sendErrorResponse(HttpServletResponse response, int status, String message) throws IOException {
        response.setStatus(status);
        
        JsonObject error = new JsonObject();
        error.addProperty("success", false);
        error.addProperty("error", message);
        error.addProperty("timestamp", System.currentTimeMillis());
        
        response.getWriter().write(gson.toJson(error));
    }
    
    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response) {
        // CORS preflight
        configureJsonResponse(response);
        response.setStatus(HttpServletResponse.SC_OK);
    }
}