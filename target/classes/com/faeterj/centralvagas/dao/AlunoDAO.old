package com.faeterj.centralvagas.dao;

import com.faeterj.centralvagas.model.Aluno;
import com.faeterj.centralvagas.util.DBUtil;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class AlunoDAO {

    // CREATE - Inserir um novo aluno
    public void inserir(Aluno aluno) throws SQLException {
        String sql = "INSERT INTO aluno (nome, email, telefone, curso, periodo, turno, competencias, experiencia, pontuacao) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, aluno.getNome());
            stmt.setString(2, aluno.getEmail());
            stmt.setString(3, aluno.getTelefone());
            stmt.setString(4, aluno.getCurso());
            stmt.setString(5, aluno.getPeriodo());
            stmt.setString(6, aluno.getTurno());
            stmt.setString(7, aluno.getCompetencias());
            stmt.setString(8, aluno.getExperiencia());
            stmt.setInt(9, aluno.getPontuacao());
            
            stmt.executeUpdate();
        }
    }

    // READ - Buscar aluno por ID
    public Aluno buscarPorId(int id) throws SQLException {
        String sql = "SELECT * FROM aluno WHERE id = ?";
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            
            if (rs.next()) {
                return mapResultSetToAluno(rs);
            }
        }
        return null;
    }

    // READ - Buscar aluno por email
    public Aluno buscarPorEmail(String email) throws SQLException {
        String sql = "SELECT * FROM aluno WHERE email = ?";
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, email);
            ResultSet rs = stmt.executeQuery();
            
            if (rs.next()) {
                return mapResultSetToAluno(rs);
            }
        }
        return null;
    }

    // READ - Listar todos os alunos
    public List<Aluno> listarTodos() throws SQLException {
        String sql = "SELECT * FROM aluno ORDER BY nome";
        List<Aluno> alunos = new ArrayList<>();
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                alunos.add(mapResultSetToAluno(rs));
            }
        }
        return alunos;
    }

    // UPDATE - Atualizar dados do aluno
    public void atualizar(Aluno aluno) throws SQLException {
        String sql = "UPDATE aluno SET nome = ?, email = ?, telefone = ?, curso = ?, " +
                     "periodo = ?, turno = ?, competencias = ?, experiencia = ?, pontuacao = ? " +
                     "WHERE id = ?";
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, aluno.getNome());
            stmt.setString(2, aluno.getEmail());
            stmt.setString(3, aluno.getTelefone());
            stmt.setString(4, aluno.getCurso());
            stmt.setString(5, aluno.getPeriodo());
            stmt.setString(6, aluno.getTurno());
            stmt.setString(7, aluno.getCompetencias());
            stmt.setString(8, aluno.getExperiencia());
            stmt.setInt(9, aluno.getPontuacao());
            stmt.setInt(10, aluno.getId());
            
            stmt.executeUpdate();
        }
    }

    // DELETE - Deletar aluno
    public void deletar(int id) throws SQLException {
        String sql = "DELETE FROM aluno WHERE id = ?";
        
        try (Connection conn = DBUtil.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, id);
            stmt.executeUpdate();
        }
    }

    // Método auxiliar para mapear ResultSet para Aluno
    private Aluno mapResultSetToAluno(ResultSet rs) throws SQLException {
        Aluno aluno = new Aluno();
        aluno.setId(rs.getInt("id"));
        aluno.setNome(rs.getString("nome"));
        aluno.setEmail(rs.getString("email"));
        aluno.setTelefone(rs.getString("telefone"));
        aluno.setCurso(rs.getString("curso"));
        aluno.setPeriodo(rs.getString("periodo"));
        aluno.setTurno(rs.getString("turno"));
        aluno.setCompetencias(rs.getString("competencias"));
        aluno.setExperiencia(rs.getString("experiencia"));
        aluno.setPontuacao(rs.getInt("pontuacao"));
        return aluno;
    }
}
