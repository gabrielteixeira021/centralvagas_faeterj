package com.faeterj.centralvagas.servlets;

import com.faeterj.centralvagas.dao.VagaDAO;
import com.faeterj.centralvagas.model.Vaga;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@WebServlet(name = "VagasServlet", urlPatterns = {"/vagas"})
public class VagasServlet extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            VagaDAO vagaDAO = new VagaDAO();
            List<Vaga> vagas = vagaDAO.listarAtivas();
            request.setAttribute("vagas", vagas);
            request.getRequestDispatcher("vagas.jsp").forward(request, response);
        } catch (ServletException | IOException | SQLException e) {
            throw new ServletException(e);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        String operacao = request.getParameter("operacao"); // Ex: "inserir" ou "atualizar"

        String titulo = request.getParameter("titulo");
        String descricao = request.getParameter("descricao");
        String empresa = request.getParameter("empresa");
        String area = request.getParameter("area");
        String requisitos = request.getParameter("requisitos");
        String beneficios = request.getParameter("beneficios");
        String tipo = request.getParameter("tipo");
        String localizacao = request.getParameter("localizacao");
        String salarioStr = request.getParameter("salario");
        String ativaStr = request.getParameter("ativa");
        String empresaIdStr = request.getParameter("empresa_id");
        String idStr = request.getParameter("id");

        double salario = salarioStr != null && !salarioStr.isEmpty() ? Double.parseDouble(salarioStr) : 0.0;
        boolean ativa = ativaStr == null || ativaStr.equals("true");
        int empresaId = empresaIdStr != null && !empresaIdStr.isEmpty() ? Integer.parseInt(empresaIdStr) : 0;

        VagaDAO vagaDAO = new VagaDAO();
        try {
            if ("atualizar".equals(operacao) && idStr != null && !idStr.isEmpty()) {
                int id = Integer.parseInt(idStr);
                Vaga vaga = vagaDAO.buscarPorId(id);
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
                    vaga.setAtiva(ativa);
                    vaga.setEmpresaId(empresaId);
                    vagaDAO.atualizar(vaga);
                    request.setAttribute("msgSucesso", "Vaga atualizada com sucesso!");
                }
            } else {
                Vaga vaga = new Vaga(titulo, descricao, empresa, area, requisitos, beneficios, tipo, localizacao, salario, empresaId);
                vaga.setAtiva(ativa);
                vagaDAO.inserir(vaga);
                request.setAttribute("msgSucesso", "Vaga cadastrada com sucesso!");
            }
        } catch (NumberFormatException | SQLException e) {
            request.setAttribute("msgErro", "Erro ao salvar vaga: " + e.getMessage());
        }
        doGet(request, response);
    }
}
