package com.faeterj.centralvagas.api;

import com.faeterj.centralvagas.dao.VagaMongoDAO;
import com.faeterj.centralvagas.model.Vaga;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/api/vagas")
public class VagaAPIServlet extends HttpServlet {
    
    private VagaMongoDAO vagaDAO;
    private Gson gson;
    
    @Override
    public void init() throws ServletException {
        this.vagaDAO = new VagaMongoDAO();
        this.gson = new Gson();
        System.out.println("🚀 API Vagas inicializada!");
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        configureJsonResponse(response);
        
        try {
            String id = request.getParameter("id");
            String filtro = request.getParameter("filtro");
            String valor = request.getParameter("valor");
            
            if (id != null && !id.trim().isEmpty()) {
                // Buscar vaga específica
                Vaga vaga = vagaDAO.buscarPorId(id);
                
                if (vaga != null) {
                    JsonObject result = createSuccessResponse();
                    result.add("vaga", gson.toJsonTree(vaga));
                    response.getWriter().write(gson.toJson(result));
                } else {
                    sendErrorResponse(response, 404, "Vaga não encontrada");
                }
                
            } else {
                // Listar com filtros (mesma lógica do servlet original)
                List<Vaga> vagas;
                String descricaoFiltro = "Todas as vagas";
                
                if ("ativas".equals(filtro)) {
                    vagas = vagaDAO.listarAtivas();
                    descricaoFiltro = "Vagas ativas";
                    
                } else if ("area".equals(filtro) && valor != null && !valor.trim().isEmpty()) {
                    vagas = vagaDAO.buscarPorArea(valor);
                    descricaoFiltro = "Vagas da área: " + valor;
                    
                } else if ("tipo".equals(filtro) && valor != null && !valor.trim().isEmpty()) {
                    vagas = vagaDAO.buscarPorTipo(valor);
                    descricaoFiltro = "Vagas do tipo: " + valor;
                    
                } else if ("empresa".equals(filtro) && valor != null && !valor.trim().isEmpty()) {
                    vagas = vagaDAO.buscarPorEmpresa(valor);
                    descricaoFiltro = "Vagas da empresa ID: " + valor;
                    
                } else {
                    vagas = vagaDAO.listarTodas();
                }
                
                JsonObject result = createSuccessResponse();
                result.addProperty("filtro", descricaoFiltro);
                result.addProperty("total", vagas.size());
                result.add("vagas", gson.toJsonTree(vagas));
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
            String titulo = request.getParameter("titulo");
            String descricao = request.getParameter("descricao");
            String empresa = request.getParameter("empresa");
            String empresaId = request.getParameter("empresaId");
            String area = request.getParameter("area");
            String requisitos = request.getParameter("requisitos");
            String beneficios = request.getParameter("beneficios");
            String tipo = request.getParameter("tipo");
            String localizacao = request.getParameter("localizacao");
            String salarioStr = request.getParameter("salario");
            
            // Validações básicas
            if (titulo == null || empresa == null || empresaId == null) {
                sendErrorResponse(response, 400, "Título, empresa e empresaId são obrigatórios");
                return;
            }
            
            double salario = 0.0;
            if (salarioStr != null && !salarioStr.trim().isEmpty()) {
                try {
                    salario = Double.parseDouble(salarioStr.replace(",", "."));
                } catch (NumberFormatException e) {
                    sendErrorResponse(response, 400, "Formato de salário inválido");
                    return;
                }
            }
            
            Vaga vaga = new Vaga(titulo, descricao, empresa, area, requisitos, 
                               beneficios, tipo, localizacao, salario, empresaId);
            
            if (vagaDAO.inserir(vaga)) {
                JsonObject result = createSuccessResponse();
                result.addProperty("message", "Vaga cadastrada com sucesso!");
                result.addProperty("id", vaga.getId());
                result.add("vaga", gson.toJsonTree(vaga));
                
                response.setStatus(201);
                response.getWriter().write(gson.toJson(result));
                
            } else {
                sendErrorResponse(response, 400, "Erro ao cadastrar vaga");
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
            String operacao = request.getParameter("operacao");
            
            if (id == null || id.trim().isEmpty()) {
                sendErrorResponse(response, 400, "ID é obrigatório para atualização");
                return;
            }
            
            if ("desativar".equals(operacao)) {
                // Desativar vaga
                if (vagaDAO.desativar(id)) {
                    JsonObject result = createSuccessResponse();
                    result.addProperty("message", "Vaga desativada com sucesso!");
                    response.getWriter().write(gson.toJson(result));
                } else {
                    sendErrorResponse(response, 404, "Vaga não encontrada ou erro ao desativar");
                }
                return;
            }
            
            // Atualização normal
            Vaga vaga = vagaDAO.buscarPorId(id);
            if (vaga == null) {
                sendErrorResponse(response, 404, "Vaga não encontrada");
                return;
            }
            
            // Atualizar campos
            String titulo = request.getParameter("titulo");
            if (titulo != null) vaga.setTitulo(titulo);
            
            String descricao = request.getParameter("descricao");
            if (descricao != null) vaga.setDescricao(descricao);
            
            String empresa = request.getParameter("empresa");
            if (empresa != null) vaga.setEmpresa(empresa);
            
            String area = request.getParameter("area");
            if (area != null) vaga.setArea(area);
            
            String requisitos = request.getParameter("requisitos");
            if (requisitos != null) vaga.setRequisitos(requisitos);
            
            String beneficios = request.getParameter("beneficios");
            if (beneficios != null) vaga.setBeneficios(beneficios);
            
            String tipo = request.getParameter("tipo");
            if (tipo != null) vaga.setTipo(tipo);
            
            String localizacao = request.getParameter("localizacao");
            if (localizacao != null) vaga.setLocalizacao(localizacao);
            
            String salarioStr = request.getParameter("salario");
            if (salarioStr != null && !salarioStr.trim().isEmpty()) {
                try {
                    double salario = Double.parseDouble(salarioStr.replace(",", "."));
                    vaga.setSalario(salario);
                } catch (NumberFormatException e) {
                    sendErrorResponse(response, 400, "Formato de salário inválido");
                    return;
                }
            }
            
            String ativaStr = request.getParameter("ativa");
            if (ativaStr != null) {
                vaga.setAtiva(Boolean.parseBoolean(ativaStr));
            }
            
            if (vagaDAO.atualizar(vaga)) {
                JsonObject result = createSuccessResponse();
                result.addProperty("message", "Vaga atualizada com sucesso!");
                result.add("vaga", gson.toJsonTree(vaga));
                response.getWriter().write(gson.toJson(result));
                
            } else {
                sendErrorResponse(response, 400, "Erro ao atualizar vaga");
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
            
            if (vagaDAO.remover(id)) {
                JsonObject result = createSuccessResponse();
                result.addProperty("message", "Vaga excluída com sucesso!");
                response.getWriter().write(gson.toJson(result));
                
            } else {
                sendErrorResponse(response, 404, "Vaga não encontrada ou erro na exclusão");
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
        configureJsonResponse(response);
        response.setStatus(HttpServletResponse.SC_OK);
    }
}