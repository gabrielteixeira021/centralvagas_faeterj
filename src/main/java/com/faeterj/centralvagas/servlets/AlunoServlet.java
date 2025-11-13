package com.faeterj.centralvagas.servlets;

import com.faeterj.centralvagas.dao.AlunoMongoDAO;
import com.faeterj.centralvagas.model.Aluno;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "AlunoServlet", urlPatterns = {"/aluno"})
public class AlunoServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            AlunoMongoDAO alunoDAO = new AlunoMongoDAO();
            List<Aluno> alunos = alunoDAO.listarTodos(); // Lista todos alunos
            request.setAttribute("alunos", alunos);
            request.getRequestDispatcher("aluno.jsp").forward(request, response);
        } catch (Exception e) {
            request.setAttribute("msgErro", "Erro ao carregar alunos: " + e.getMessage());
            e.printStackTrace();
            request.getRequestDispatcher("aluno.jsp").forward(request, response);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        String operacao = request.getParameter("operacao"); // ex: "inserir", "atualizar".

        String nome = request.getParameter("nome");
        String email = request.getParameter("email");
        String telefone = request.getParameter("telefone");
        String curso = request.getParameter("curso");
        String periodo = request.getParameter("periodo");
        String turno = request.getParameter("turno");
        String competencias = request.getParameter("competencias");
        String experiencia = request.getParameter("experiencia");
        String idStr = request.getParameter("id");
        int pontuacao = 0; // ajuste caso tenha gamificação no cadastro

        AlunoMongoDAO alunoDAO = new AlunoMongoDAO();
        try {
            if ("atualizar".equals(operacao) && idStr != null && !idStr.isEmpty()) {
                Aluno aluno = alunoDAO.buscarPorId(idStr); // ID agora é String
                if (aluno != null) {
                    aluno.setNome(nome);
                    aluno.setEmail(email);
                    aluno.setTelefone(telefone);
                    aluno.setCurso(curso);
                    aluno.setPeriodo(periodo);
                    aluno.setTurno(turno);
                    aluno.setCompetencias(competencias);
                    aluno.setExperiencia(experiencia);
                    aluno.setPontuacao(pontuacao);
                    alunoDAO.atualizar(aluno);
                    request.setAttribute("msgSucesso", "Cadastro atualizado com sucesso!");
                }
            } else {
                Aluno aluno = new Aluno(nome, email, telefone, curso, periodo, turno, competencias, experiencia);
                aluno.setPontuacao(pontuacao);
                alunoDAO.inserir(aluno);
                request.setAttribute("msgSucesso", "Cadastro realizado com sucesso!");
            }
        } catch (Exception e) {
            request.setAttribute("msgErro", "Erro: " + e.getMessage());
            e.printStackTrace(); // Log para debugging
        }
        doGet(request, response); // Para atualizar a listagem após inserção/atualização
    }
}
