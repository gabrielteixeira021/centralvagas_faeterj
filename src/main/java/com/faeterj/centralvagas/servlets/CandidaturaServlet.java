package com.faeterj.centralvagas.servlets;

import com.faeterj.centralvagas.dao.CandidaturaMongoDAO;
import com.faeterj.centralvagas.dao.AlunoMongoDAO;
import com.faeterj.centralvagas.dao.VagaMongoDAO;
import com.faeterj.centralvagas.model.Candidatura;
import com.faeterj.centralvagas.model.Aluno;
import com.faeterj.centralvagas.model.Vaga;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "CandidaturaServlet", urlPatterns = {"/candidatura"})
public class CandidaturaServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            CandidaturaMongoDAO candidaturaDAO = new CandidaturaMongoDAO();
            AlunoMongoDAO alunoDAO = new AlunoMongoDAO();
            VagaMongoDAO vagaDAO = new VagaMongoDAO();
            
            String filtro = request.getParameter("filtro");
            String valor = request.getParameter("valor");
            
            List<Candidatura> candidaturas;
            
            if ("aluno".equals(filtro) && valor != null && !valor.trim().isEmpty()) {
                candidaturas = candidaturaDAO.buscarPorAluno(valor);
                request.setAttribute("filtroAtivo", "Aluno ID: " + valor);
            } else if ("vaga".equals(filtro) && valor != null && !valor.trim().isEmpty()) {
                candidaturas = candidaturaDAO.buscarPorVaga(valor);
                request.setAttribute("filtroAtivo", "Vaga ID: " + valor);
            } else if ("status".equals(filtro) && valor != null && !valor.trim().isEmpty()) {
                candidaturas = candidaturaDAO.buscarPorStatus(valor);
                request.setAttribute("filtroAtivo", "Status: " + valor);
            } else {
                candidaturas = candidaturaDAO.listarTodas();
            }
            
            List<Aluno> alunos = alunoDAO.listarTodos();
            List<Vaga> vagas = vagaDAO.listarAtivas();
            
            request.setAttribute("candidaturas", candidaturas);
            request.setAttribute("alunos", alunos);
            request.setAttribute("vagas", vagas);
            request.getRequestDispatcher("candidatura.jsp").forward(request, response);
        } catch (Exception e) {
            request.setAttribute("msgErro", "Erro ao carregar candidaturas: " + e.getMessage());
            e.printStackTrace();
            request.getRequestDispatcher("candidatura.jsp").forward(request, response);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        String operacao = request.getParameter("operacao");

        String alunoId = request.getParameter("alunoId");
        String vagaId = request.getParameter("vagaId");
        String mensagem = request.getParameter("mensagem");
        String status = request.getParameter("status");
        String idStr = request.getParameter("id");

        CandidaturaMongoDAO candidaturaDAO = new CandidaturaMongoDAO();
        try {
            if ("atualizarStatus".equals(operacao) && idStr != null && !idStr.isEmpty()) {
                boolean atualizado = candidaturaDAO.atualizarStatus(idStr, status);
                if (atualizado) {
                    request.setAttribute("msgSucesso", "Status da candidatura atualizado para: " + status);
                } else {
                    request.setAttribute("msgErro", "Erro ao atualizar status da candidatura!");
                }
            } else if ("atualizar".equals(operacao) && idStr != null && !idStr.isEmpty()) {
                Candidatura candidatura = candidaturaDAO.buscarPorId(idStr);
                if (candidatura != null) {
                    candidatura.setStatus(status);
                    candidatura.setMensagem(mensagem);
                    
                    boolean atualizado = candidaturaDAO.atualizar(candidatura);
                    if (atualizado) {
                        request.setAttribute("msgSucesso", "Candidatura atualizada com sucesso!");
                    } else {
                        request.setAttribute("msgErro", "Erro ao atualizar candidatura!");
                    }
                } else {
                    request.setAttribute("msgErro", "Candidatura não encontrada!");
                }
            } else if ("remover".equals(operacao) && idStr != null && !idStr.isEmpty()) {
                boolean removida = candidaturaDAO.remover(idStr);
                if (removida) {
                    request.setAttribute("msgSucesso", "Candidatura removida com sucesso!");
                } else {
                    request.setAttribute("msgErro", "Erro ao remover candidatura!");
                }
            } else {
                // Verificar se já existe candidatura
                if (candidaturaDAO.jaSeCandidata(alunoId, vagaId)) {
                    request.setAttribute("msgErro", "Este aluno já se candidatou para esta vaga!");
                } else {
                    // Cadastrar nova candidatura
                    Candidatura candidatura = new Candidatura(alunoId, vagaId, mensagem);
                    
                    boolean inserida = candidaturaDAO.inserir(candidatura);
                    if (inserida) {
                        request.setAttribute("msgSucesso", "Candidatura realizada com sucesso!");
                    } else {
                        request.setAttribute("msgErro", "Erro ao realizar candidatura!");
                    }
                }
            }
        } catch (Exception e) {
            request.setAttribute("msgErro", "Erro: " + e.getMessage());
            e.printStackTrace();
        }
        doGet(request, response);
    }
}