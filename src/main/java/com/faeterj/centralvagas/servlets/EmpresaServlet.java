package com.faeterj.centralvagas.servlets;

import com.faeterj.centralvagas.dao.EmpresaMongoDAO;
import com.faeterj.centralvagas.model.Empresa;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "EmpresaServlet", urlPatterns = {"/empresa"})
public class EmpresaServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            EmpresaMongoDAO empresaDAO = new EmpresaMongoDAO();
            List<Empresa> empresas = empresaDAO.listarTodas();
            request.setAttribute("empresas", empresas);
            request.getRequestDispatcher("empresa.jsp").forward(request, response);
        } catch (Exception e) {
            request.setAttribute("msgErro", "Erro ao carregar empresas: " + e.getMessage());
            e.printStackTrace();
            request.getRequestDispatcher("empresa.jsp").forward(request, response);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        String operacao = request.getParameter("operacao");

        String nome = request.getParameter("nome");
        String cnpj = request.getParameter("cnpj");
        String email = request.getParameter("email");
        String telefone = request.getParameter("telefone");
        String endereco = request.getParameter("endereco");
        String setor = request.getParameter("setor");
        String descricao = request.getParameter("descricao");
        String senha = request.getParameter("senha");
        String idStr = request.getParameter("id");

        EmpresaMongoDAO empresaDAO = new EmpresaMongoDAO();
        try {
            if ("atualizar".equals(operacao) && idStr != null && !idStr.isEmpty()) {
                Empresa empresa = empresaDAO.buscarPorId(idStr);
                if (empresa != null) {
                    empresa.setNome(nome);
                    empresa.setCnpj(cnpj);
                    empresa.setEmail(email);
                    empresa.setTelefone(telefone);
                    empresa.setEndereco(endereco);
                    empresa.setSetor(setor);
                    empresa.setDescricao(descricao);
                    if (senha != null && !senha.trim().isEmpty()) {
                        empresa.setSenha(senha); // Idealmente deveria ser hash da senha
                    }
                    empresaDAO.atualizar(empresa);
                    request.setAttribute("msgSucesso", "Empresa atualizada com sucesso!");
                } else {
                    request.setAttribute("msgErro", "Empresa não encontrada!");
                }
            } else if ("remover".equals(operacao) && idStr != null && !idStr.isEmpty()) {
                boolean removido = empresaDAO.remover(idStr);
                if (removido) {
                    request.setAttribute("msgSucesso", "Empresa removida com sucesso!");
                } else {
                    request.setAttribute("msgErro", "Erro ao remover empresa!");
                }
            } else {
                // Verificar se CNPJ ou email já existem
                Empresa existenteCnpj = empresaDAO.buscarPorCnpj(cnpj);
                Empresa existenteEmail = empresaDAO.buscarPorEmail(email);
                
                if (existenteCnpj != null) {
                    request.setAttribute("msgErro", "CNPJ já cadastrado!");
                } else if (existenteEmail != null) {
                    request.setAttribute("msgErro", "Email já cadastrado!");
                } else {
                    Empresa empresa = new Empresa(nome, cnpj, email, telefone, endereco, setor, descricao, senha);
                    boolean inserido = empresaDAO.inserir(empresa);
                    if (inserido) {
                        request.setAttribute("msgSucesso", "Empresa cadastrada com sucesso!");
                    } else {
                        request.setAttribute("msgErro", "Erro ao cadastrar empresa!");
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