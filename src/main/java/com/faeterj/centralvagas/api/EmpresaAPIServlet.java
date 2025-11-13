package com.faeterj.centralvagas.api;

import com.faeterj.centralvagas.dao.EmpresaMongoDAO;
import com.faeterj.centralvagas.model.Empresa;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/api/empresas")
public class EmpresaAPIServlet extends HttpServlet {
    
    private EmpresaMongoDAO empresaDAO;
    private Gson gson;
    
    @Override
    public void init() throws ServletException {
        this.empresaDAO = new EmpresaMongoDAO();
        this.gson = new Gson();
        System.out.println("🚀 API Empresas inicializada!");
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        configureJsonResponse(response);
        
        try {
            String id = request.getParameter("id");
            String setor = request.getParameter("setor");
            
            if (id != null && !id.trim().isEmpty()) {
                // Buscar empresa específica
                Empresa empresa = empresaDAO.buscarPorId(id);
                
                if (empresa != null) {
                    JsonObject result = createSuccessResponse();
                    result.add("empresa", gson.toJsonTree(empresa));
                    response.getWriter().write(gson.toJson(result));
                } else {
                    sendErrorResponse(response, 404, "Empresa não encontrada");
                }
                
            } else if (setor != null && !setor.trim().isEmpty()) {
                // Buscar por setor
                List<Empresa> empresas = empresaDAO.buscarPorSetor(setor);
                
                JsonObject result = createSuccessResponse();
                result.addProperty("filtro", "setor: " + setor);
                result.addProperty("total", empresas.size());
                result.add("empresas", gson.toJsonTree(empresas));
                response.getWriter().write(gson.toJson(result));
                
            } else {
                // Listar todas as empresas
                List<Empresa> empresas = empresaDAO.listarTodas();
                
                JsonObject result = createSuccessResponse();
                result.addProperty("total", empresas.size());
                result.add("empresas", gson.toJsonTree(empresas));
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
            String nome = request.getParameter("nome");
            String cnpj = request.getParameter("cnpj");
            String email = request.getParameter("email");
            String telefone = request.getParameter("telefone");
            String endereco = request.getParameter("endereco");
            String setor = request.getParameter("setor");
            String descricao = request.getParameter("descricao");
            String senha = request.getParameter("senha");
            
            // Validações básicas
            if (nome == null || cnpj == null || email == null) {
                sendErrorResponse(response, 400, "Nome, CNPJ e email são obrigatórios");
                return;
            }
            
            // Verificar duplicatas (mesma lógica do servlet original)
            Empresa existenteCnpj = empresaDAO.buscarPorCnpj(cnpj);
            if (existenteCnpj != null) {
                sendErrorResponse(response, 409, "CNPJ já cadastrado");
                return;
            }
            
            Empresa existenteEmail = empresaDAO.buscarPorEmail(email);
            if (existenteEmail != null) {
                sendErrorResponse(response, 409, "Email já cadastrado");
                return;
            }
            
            Empresa empresa = new Empresa(nome, cnpj, email, telefone, endereco, setor, descricao, senha);
            
            if (empresaDAO.inserir(empresa)) {
                JsonObject result = createSuccessResponse();
                result.addProperty("message", "Empresa cadastrada com sucesso!");
                result.addProperty("id", empresa.getId());
                result.add("empresa", gson.toJsonTree(empresa));
                
                response.setStatus(201);
                response.getWriter().write(gson.toJson(result));
                
            } else {
                sendErrorResponse(response, 400, "Erro ao cadastrar empresa");
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
            
            Empresa empresa = empresaDAO.buscarPorId(id);
            if (empresa == null) {
                sendErrorResponse(response, 404, "Empresa não encontrada");
                return;
            }
            
            // Atualizar campos
            String nome = request.getParameter("nome");
            if (nome != null) empresa.setNome(nome);
            
            String cnpj = request.getParameter("cnpj");
            if (cnpj != null) empresa.setCnpj(cnpj);
            
            String email = request.getParameter("email");
            if (email != null) empresa.setEmail(email);
            
            String telefone = request.getParameter("telefone");
            if (telefone != null) empresa.setTelefone(telefone);
            
            String endereco = request.getParameter("endereco");
            if (endereco != null) empresa.setEndereco(endereco);
            
            String setor = request.getParameter("setor");
            if (setor != null) empresa.setSetor(setor);
            
            String descricao = request.getParameter("descricao");
            if (descricao != null) empresa.setDescricao(descricao);
            
            String senha = request.getParameter("senha");
            if (senha != null && !senha.trim().isEmpty()) {
                empresa.setSenha(senha);
            }
            
            if (empresaDAO.atualizar(empresa)) {
                JsonObject result = createSuccessResponse();
                result.addProperty("message", "Empresa atualizada com sucesso!");
                result.add("empresa", gson.toJsonTree(empresa));
                response.getWriter().write(gson.toJson(result));
                
            } else {
                sendErrorResponse(response, 400, "Erro ao atualizar empresa");
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
            
            if (empresaDAO.remover(id)) {
                JsonObject result = createSuccessResponse();
                result.addProperty("message", "Empresa excluída com sucesso!");
                response.getWriter().write(gson.toJson(result));
                
            } else {
                sendErrorResponse(response, 404, "Empresa não encontrada ou erro na exclusão");
            }
            
        } catch (Exception e) {
            sendErrorResponse(response, 500, "Erro interno: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    // Métodos auxiliares (iguais ao AlunoAPIServlet)
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
        configureJsonResponse(response);
        response.setStatus(HttpServletResponse.SC_OK);
    }
}