/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.faeterj.centralvagas.dao;

import com.faeterj.centralvagas.model.Empresa;
import com.faeterj.centralvagas.util.DBUtil;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class EmpresaDAO {

    // CREATE - Inserir uma nova empresa
    public void inserir(Empresa empresa) throws SQLException {
        String sql = "INSERT INTO empresa (nome, cnpj, email, telefone, endereco, setor, descricao, senha) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, empresa.getNome());
            stmt.setString(2, empresa.getCnpj());
            stmt.setString(3, empresa.getEmail());
            stmt.setString(4, empresa.getTelefone());
            stmt.setString(5, empresa.getEndereco());
            stmt.setString(6, empresa.getSetor());
            stmt.setString(7, empresa.getDescricao());
            stmt.setString(8, empresa.getSenha());
            
            stmt.executeUpdate();
        }
    }

    // READ - Buscar empresa por ID
    public Empresa buscarPorId(int id) throws SQLException {
        String sql = "SELECT * FROM empresa WHERE id = ?";
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            
            if (rs.next()) {
                return mapResultSetToEmpresa(rs);
            }
        }
        return null;
    }

    // READ - Buscar empresa por email
    public Empresa buscarPorEmail(String email) throws SQLException {
        String sql = "SELECT * FROM empresa WHERE email = ?";
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, email);
            ResultSet rs = stmt.executeQuery();
            
            if (rs.next()) {
                return mapResultSetToEmpresa(rs);
            }
        }
        return null;
    }

    // READ - Listar todas as empresas
    public List<Empresa> listarTodas() throws SQLException {
        String sql = "SELECT * FROM empresa ORDER BY nome";
        List<Empresa> empresas = new ArrayList<>();
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                empresas.add(mapResultSetToEmpresa(rs));
            }
        }
        return empresas;
    }

    // UPDATE - Atualizar empresa
    public void atualizar(Empresa empresa) throws SQLException {
        String sql = "UPDATE empresa SET nome = ?, cnpj = ?, email = ?, telefone = ?, " +
                     "endereco = ?, setor = ?, descricao = ?, senha = ? WHERE id = ?";
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, empresa.getNome());
            stmt.setString(2, empresa.getCnpj());
            stmt.setString(3, empresa.getEmail());
            stmt.setString(4, empresa.getTelefone());
            stmt.setString(5, empresa.getEndereco());
            stmt.setString(6, empresa.getSetor());
            stmt.setString(7, empresa.getDescricao());
            stmt.setString(8, empresa.getSenha());
            stmt.setInt(9, empresa.getId());
            
            stmt.executeUpdate();
        }
    }

    // DELETE - Deletar empresa
    public void deletar(int id) throws SQLException {
        String sql = "DELETE FROM empresa WHERE id = ?";
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, id);
            stmt.executeUpdate();
        }
    }

    // Método auxiliar para mapear ResultSet para Empresa
    private Empresa mapResultSetToEmpresa(ResultSet rs) throws SQLException {
        Empresa empresa = new Empresa();
        empresa.setId(rs.getInt("id"));
        empresa.setNome(rs.getString("nome"));
        empresa.setCnpj(rs.getString("cnpj"));
        empresa.setEmail(rs.getString("email"));
        empresa.setTelefone(rs.getString("telefone"));
        empresa.setEndereco(rs.getString("endereco"));
        empresa.setSetor(rs.getString("setor"));
        empresa.setDescricao(rs.getString("descricao"));
        empresa.setSenha(rs.getString("senha"));
        return empresa;
    }
}
