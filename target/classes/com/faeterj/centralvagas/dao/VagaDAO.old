/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.faeterj.centralvagas.dao;

import com.faeterj.centralvagas.model.Vaga;
import com.faeterj.centralvagas.util.DBUtil;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class VagaDAO {

    // CREATE - Inserir uma nova vaga
    public void inserir(Vaga vaga) throws SQLException {
        String sql = "INSERT INTO vaga (titulo, descricao, empresa, area, requisitos, beneficios, " +
                     "tipo, localizacao, salario, ativa, empresa_id) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, vaga.getTitulo());
            stmt.setString(2, vaga.getDescricao());
            stmt.setString(3, vaga.getEmpresa());
            stmt.setString(4, vaga.getArea());
            stmt.setString(5, vaga.getRequisitos());
            stmt.setString(6, vaga.getBeneficios());
            stmt.setString(7, vaga.getTipo());
            stmt.setString(8, vaga.getLocalizacao());
            stmt.setDouble(9, vaga.getSalario());
            stmt.setBoolean(10, vaga.isAtiva());
            stmt.setInt(11, vaga.getEmpresaId());
            
            stmt.executeUpdate();
        }
    }

    // READ - Buscar vaga por ID
    public Vaga buscarPorId(int id) throws SQLException {
        String sql = "SELECT * FROM vaga WHERE id = ?";
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            
            if (rs.next()) {
                return mapResultSetToVaga(rs);
            }
        }
        return null;
    }

    // READ - Listar todas as vagas ativas
    public List<Vaga> listarAtivas() throws SQLException {
        String sql = "SELECT * FROM vaga WHERE ativa = TRUE ORDER BY data_cadastro DESC";
        List<Vaga> vagas = new ArrayList<>();
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                vagas.add(mapResultSetToVaga(rs));
            }
        }
        return vagas;
    }

    // READ - Listar todas as vagas (ativas e inativas)
    public List<Vaga> listarTodas() throws SQLException {
        String sql = "SELECT * FROM vaga ORDER BY data_cadastro DESC";
        List<Vaga> vagas = new ArrayList<>();
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                vagas.add(mapResultSetToVaga(rs));
            }
        }
        return vagas;
    }

    // READ - Buscar vagas por empresa
    public List<Vaga> buscarPorEmpresa(int empresaId) throws SQLException {
        String sql = "SELECT * FROM vaga WHERE empresa_id = ? ORDER BY data_cadastro DESC";
        List<Vaga> vagas = new ArrayList<>();
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, empresaId);
            ResultSet rs = stmt.executeQuery();
            
            while (rs.next()) {
                vagas.add(mapResultSetToVaga(rs));
            }
        }
        return vagas;
    }

    // READ - Buscar vagas por área
    public List<Vaga> buscarPorArea(String area) throws SQLException {
        String sql = "SELECT * FROM vaga WHERE area = ? AND ativa = TRUE ORDER BY data_cadastro DESC";
        List<Vaga> vagas = new ArrayList<>();
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, area);
            ResultSet rs = stmt.executeQuery();
            
            while (rs.next()) {
                vagas.add(mapResultSetToVaga(rs));
            }
        }
        return vagas;
    }

    // UPDATE - Atualizar vaga
    public void atualizar(Vaga vaga) throws SQLException {
        String sql = "UPDATE vaga SET titulo = ?, descricao = ?, empresa = ?, area = ?, " +
                     "requisitos = ?, beneficios = ?, tipo = ?, localizacao = ?, salario = ?, ativa = ? " +
                     "WHERE id = ?";
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, vaga.getTitulo());
            stmt.setString(2, vaga.getDescricao());
            stmt.setString(3, vaga.getEmpresa());
            stmt.setString(4, vaga.getArea());
            stmt.setString(5, vaga.getRequisitos());
            stmt.setString(6, vaga.getBeneficios());
            stmt.setString(7, vaga.getTipo());
            stmt.setString(8, vaga.getLocalizacao());
            stmt.setDouble(9, vaga.getSalario());
            stmt.setBoolean(10, vaga.isAtiva());
            stmt.setInt(11, vaga.getId());
            
            stmt.executeUpdate();
        }
    }

    // DELETE - Deletar vaga
    public void deletar(int id) throws SQLException {
        String sql = "DELETE FROM vaga WHERE id = ?";
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, id);
            stmt.executeUpdate();
        }
    }

    // Método auxiliar para mapear ResultSet para Vaga
    private Vaga mapResultSetToVaga(ResultSet rs) throws SQLException {
        Vaga vaga = new Vaga();
        vaga.setId(rs.getInt("id"));
        vaga.setTitulo(rs.getString("titulo"));
        vaga.setDescricao(rs.getString("descricao"));
        vaga.setEmpresa(rs.getString("empresa"));
        vaga.setArea(rs.getString("area"));
        vaga.setRequisitos(rs.getString("requisitos"));
        vaga.setBeneficios(rs.getString("beneficios"));
        vaga.setTipo(rs.getString("tipo"));
        vaga.setLocalizacao(rs.getString("localizacao"));
        vaga.setSalario(rs.getDouble("salario"));
        vaga.setDataCadastro(rs.getTimestamp("data_cadastro"));
        vaga.setAtiva(rs.getBoolean("ativa"));
        vaga.setEmpresaId(rs.getInt("empresa_id"));
        return vaga;
    }
}
