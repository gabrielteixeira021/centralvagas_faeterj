package com.faeterj.centralvagas.servlets;

import com.faeterj.centralvagas.dao.AlunoDAO;
import com.faeterj.centralvagas.model.Aluno;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@WebServlet(name = "AlunoServlet", urlPatterns = {"/aluno"})
public class AlunoServlet extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            AlunoDAO alunoDAO = new AlunoDAO();
            List<Aluno> alunos = alunoDAO.listarTodos(); // Lista todos alunos
            request.setAttribute("alunos", alunos);
            request.getRequestDispatcher("aluno.jsp").forward(request, response);
        } catch (ServletException | IOException | SQLException e) {
            throw new ServletException(e);
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

        AlunoDAO alunoDAO = new AlunoDAO();
        try {
            if ("atualizar".equals(operacao) && idStr != null && !idStr.isEmpty()) {
                int id = Integer.parseInt(idStr);
                Aluno aluno = alunoDAO.buscarPorId(id);
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
        } catch (NumberFormatException | SQLException e) {
            request.setAttribute("msgErro", "Erro ao salvar: " + e.getMessage());
        }
        doGet(request, response); // Para atualizar a listagem após inserção/atualização
    }
}
