package com.faeterj.centralvagas.servlets;

import com.faeterj.centralvagas.dao.EmpresaDAO;
import com.faeterj.centralvagas.model.Empresa;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@WebServlet(name = "EmpresaServlet", urlPatterns = {"/empresa"})
public class EmpresaServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            EmpresaDAO dao = new EmpresaDAO();
            List<Empresa> empresas = dao.listarTodas();
            request.setAttribute("empresas", empresas);
            request.getRequestDispatcher("empresa.jsp").forward(request, response);
        } catch (ServletException | IOException | SQLException e) {
            throw new ServletException(e);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        String operacao = request.getParameter("operacao"); // ex: "inserir" ou "login"

        String nome = request.getParameter("nome");
        String cnpj = request.getParameter("cnpj");
        String email = request.getParameter("email");
        String telefone = request.getParameter("telefone");
        String endereco = request.getParameter("endereco");
        String setor = request.getParameter("setor");
        String descricao = request.getParameter("descricao");
        String senha = request.getParameter("senha");
        String idStr = request.getParameter("id");

        EmpresaDAO dao = new EmpresaDAO();
        try {
            if ("login".equals(operacao)) {
                Empresa emp = dao.buscarPorEmail(email);
                if (emp != null && emp.getSenha().equals(senha)) {
                    request.getSession().setAttribute("empresaLogada", emp);
                    request.setAttribute("msgSucesso", "Login realizado com sucesso");
                } else {
                    request.setAttribute("msgErro", "Login ou senha incorretos");
                }
            } else if ("atualizar".equals(operacao) && idStr != null && !idStr.isEmpty()) {
                int id = Integer.parseInt(idStr);
                Empresa emp = dao.buscarPorId(id);
                if (emp != null) {
                    emp.setNome(nome);
                    emp.setCnpj(cnpj);
                    emp.setEmail(email);
                    emp.setTelefone(telefone);
                    emp.setEndereco(endereco);
                    emp.setSetor(setor);
                    emp.setDescricao(descricao);
                    emp.setSenha(senha);
                    dao.atualizar(emp);
                    request.setAttribute("msgSucesso", "Empresa atualizada!");
                }
            } else {
                Empresa emp = new Empresa(nome, cnpj, email, telefone, endereco, setor, descricao, senha);
                dao.inserir(emp);
                request.setAttribute("msgSucesso", "Cadastro realizado com sucesso!");
            }
        } catch (NumberFormatException | SQLException e) {
            request.setAttribute("msgErro", "Erro ao processar empresa: " + e.getMessage());
        }
        doGet(request, response);
    }
}
