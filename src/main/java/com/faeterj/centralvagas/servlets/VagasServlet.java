package com.faeterj.centralvagas.servlets;

import com.faeterj.centralvagas.dao.VagaMongoDAO;
import com.faeterj.centralvagas.dao.EmpresaMongoDAO;
import com.faeterj.centralvagas.model.Vaga;
import com.faeterj.centralvagas.model.Empresa;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "VagasServlet", urlPatterns = {"/vagas"})
public class VagasServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            VagaMongoDAO vagaDAO = new VagaMongoDAO();
            EmpresaMongoDAO empresaDAO = new EmpresaMongoDAO();
            
            String filtro = request.getParameter("filtro");
            String valor = request.getParameter("valor");
            
            List<Vaga> vagas;
            
            if ("area".equals(filtro) && valor != null && !valor.trim().isEmpty()) {
                vagas = vagaDAO.buscarPorArea(valor);
                request.setAttribute("filtroAtivo", "Área: " + valor);
            } else if ("tipo".equals(filtro) && valor != null && !valor.trim().isEmpty()) {
                vagas = vagaDAO.buscarPorTipo(valor);
                request.setAttribute("filtroAtivo", "Tipo: " + valor);
            } else if ("empresa".equals(filtro) && valor != null && !valor.trim().isEmpty()) {
                vagas = vagaDAO.buscarPorEmpresa(valor);
                request.setAttribute("filtroAtivo", "Empresa ID: " + valor);
            } else if ("ativas".equals(filtro)) {
                vagas = vagaDAO.listarAtivas();
                request.setAttribute("filtroAtivo", "Apenas vagas ativas");
            } else {
                vagas = vagaDAO.listarTodas();
            }
            
            List<Empresa> empresas = empresaDAO.listarTodas();
            
            request.setAttribute("vagas", vagas);
            request.setAttribute("empresas", empresas);
            request.getRequestDispatcher("vagas.jsp").forward(request, response);
        } catch (Exception e) {
            request.setAttribute("msgErro", "Erro ao carregar vagas: " + e.getMessage());
            e.printStackTrace();
            request.getRequestDispatcher("vagas.jsp").forward(request, response);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        String operacao = request.getParameter("operacao");

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
        String idStr = request.getParameter("id");

        VagaMongoDAO vagaDAO = new VagaMongoDAO();
        try {
            double salario = 0.0;
            if (salarioStr != null && !salarioStr.trim().isEmpty()) {
                try {
                    salario = Double.parseDouble(salarioStr.replace(",", "."));
                } catch (NumberFormatException e) {
                    request.setAttribute("msgErro", "Formato de salário inválido!");
                    doGet(request, response);
                    return;
                }
            }

            if ("atualizar".equals(operacao) && idStr != null && !idStr.isEmpty()) {
                Vaga vaga = vagaDAO.buscarPorId(idStr);
                if (vaga != null) {
                    vaga.setTitulo(titulo);
                    vaga.setDescricao(descricao);
                    vaga.setEmpresa(empresa);
                    vaga.setArea(area);
                    vaga.setRequisitos(requisitos);
                    vaga.setBeneficios(beneficios);
                    vaga.setTipo(tipo);
                    vaga.setLocalizacao(localizacao);
                    vaga.setSalario(salario);
                    
                    boolean atualizado = vagaDAO.atualizar(vaga);
                    if (atualizado) {
                        request.setAttribute("msgSucesso", "Vaga atualizada com sucesso!");
                    } else {
                        request.setAttribute("msgErro", "Erro ao atualizar vaga!");
                    }
                } else {
                    request.setAttribute("msgErro", "Vaga não encontrada!");
                }
            } else if ("desativar".equals(operacao) && idStr != null && !idStr.isEmpty()) {
                boolean desativada = vagaDAO.desativar(idStr);
                if (desativada) {
                    request.setAttribute("msgSucesso", "Vaga desativada com sucesso!");
                } else {
                    request.setAttribute("msgErro", "Erro ao desativar vaga!");
                }
            } else if ("remover".equals(operacao) && idStr != null && !idStr.isEmpty()) {
                boolean removida = vagaDAO.remover(idStr);
                if (removida) {
                    request.setAttribute("msgSucesso", "Vaga removida com sucesso!");
                } else {
                    request.setAttribute("msgErro", "Erro ao remover vaga!");
                }
            } else {
                // Cadastrar nova vaga
                Vaga vaga = new Vaga(titulo, descricao, empresa, area, requisitos, 
                                   beneficios, tipo, localizacao, salario, empresaId);
                
                boolean inserida = vagaDAO.inserir(vaga);
                if (inserida) {
                    request.setAttribute("msgSucesso", "Vaga cadastrada com sucesso!");
                } else {
                    request.setAttribute("msgErro", "Erro ao cadastrar vaga!");
                }
            }
        } catch (Exception e) {
            request.setAttribute("msgErro", "Erro: " + e.getMessage());
            e.printStackTrace();
        }
        doGet(request, response);
    }
}