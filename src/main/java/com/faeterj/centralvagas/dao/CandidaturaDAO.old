/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.faeterj.centralvagas.dao;

import com.faeterj.centralvagas.model.Candidatura;
import com.faeterj.centralvagas.util.DBUtil;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class CandidaturaDAO {

    // CREATE - Inserir uma nova candidatura
    public void inserir(Candidatura candidatura) throws SQLException {
        String sql = "INSERT INTO candidatura (aluno_id, vaga_id, status, mensagem) " +
                     "VALUES (?, ?, ?, ?)";
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, candidatura.getAlunoId());
            stmt.setInt(2, candidatura.getVagaId());
            stmt.setString(3, candidatura.getStatus());
            stmt.setString(4, candidatura.getMensagem());
            
            stmt.executeUpdate();
        }
    }

    // READ - Buscar candidatura por ID
    public Candidatura buscarPorId(int id) throws SQLException {
        String sql = "SELECT * FROM candidatura WHERE id = ?";
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            
            if (rs.next()) {
                return mapResultSetToCandidatura(rs);
            }
        }
        return null;
    }

    // READ - Listar candidaturas de um aluno
    public List<Candidatura> buscarPorAluno(int alunoId) throws SQLException {
        String sql = "SELECT * FROM candidatura WHERE aluno_id = ? ORDER BY data_candidatura DESC";
        List<Candidatura> candidaturas = new ArrayList<>();
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, alunoId);
            ResultSet rs = stmt.executeQuery();
            
            while (rs.next()) {
                candidaturas.add(mapResultSetToCandidatura(rs));
            }
        }
        return candidaturas;
    }

    // READ - Listar candidaturas para uma vaga
    public List<Candidatura> buscarPorVaga(int vagaId) throws SQLException {
        String sql = "SELECT * FROM candidatura WHERE vaga_id = ? ORDER BY data_candidatura DESC";
        List<Candidatura> candidaturas = new ArrayList<>();
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, vagaId);
            ResultSet rs = stmt.executeQuery();
            
            while (rs.next()) {
                candidaturas.add(mapResultSetToCandidatura(rs));
            }
        }
        return candidaturas;
    }

    // READ - Listar todas as candidaturas
    public List<Candidatura> listarTodas() throws SQLException {
        String sql = "SELECT * FROM candidatura ORDER BY data_candidatura DESC";
        List<Candidatura> candidaturas = new ArrayList<>();
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                candidaturas.add(mapResultSetToCandidatura(rs));
            }
        }
        return candidaturas;
    }

    // UPDATE - Atualizar candidatura
    public void atualizar(Candidatura candidatura) throws SQLException {
        String sql = "UPDATE candidatura SET aluno_id = ?, vaga_id = ?, status = ?, mensagem = ? " +
                     "WHERE id = ?";
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, candidatura.getAlunoId());
            stmt.setInt(2, candidatura.getVagaId());
            stmt.setString(3, candidatura.getStatus());
            stmt.setString(4, candidatura.getMensagem());
            stmt.setInt(5, candidatura.getId());
            
            stmt.executeUpdate();
        }
    }

    // DELETE - Deletar candidatura
    public void deletar(int id) throws SQLException {
        String sql = "DELETE FROM candidatura WHERE id = ?";
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, id);
            stmt.executeUpdate();
        }
    }

    // Método auxiliar para mapear ResultSet para Candidatura
    private Candidatura mapResultSetToCandidatura(ResultSet rs) throws SQLException {
        Candidatura candidatura = new Candidatura();
        candidatura.setId(rs.getInt("id"));
        candidatura.setAlunoId(rs.getInt("aluno_id"));
        candidatura.setVagaId(rs.getInt("vaga_id"));
        candidatura.setDataCandidatura(rs.getTimestamp("data_candidatura"));
        candidatura.setStatus(rs.getString("status"));
        candidatura.setMensagem(rs.getString("mensagem"));
        return candidatura;
    }
}
