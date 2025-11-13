package com.faeterj.centralvagas.dao;

import com.faeterj.centralvagas.model.Aluno;
import com.faeterj.centralvagas.util.MongoUtil;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.result.InsertOneResult;
import com.mongodb.client.result.UpdateResult;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.List;

import static com.mongodb.client.model.Filters.*;

public class AlunoMongoDAO {
    
    private final MongoCollection<Document> collection;
    
    public AlunoMongoDAO() {
        this.collection = MongoUtil.getAlunosCollection();
    }
    
    // Inserir aluno
    public boolean inserir(Aluno aluno) {
        try {
            // Converter Aluno para Document (BSON)
            Document doc = new Document()
                .append("nome", aluno.getNome())
                .append("email", aluno.getEmail())
                .append("telefone", aluno.getTelefone())
                .append("curso", aluno.getCurso())
                .append("periodo", aluno.getPeriodo())
                .append("turno", aluno.getTurno())
                .append("competencias", aluno.getCompetencias())
                .append("experiencia", aluno.getExperiencia())
                .append("pontuacao", aluno.getPontuacao())
                .append("dataCadastro", new java.util.Date());
            
            // Inserir no MongoDB
            InsertOneResult result = collection.insertOne(doc);
            
            if (result.wasAcknowledged()) {
                // Pegar o ID gerado pelo MongoDB
                ObjectId insertedId = result.getInsertedId().asObjectId().getValue();
                aluno.setId(insertedId.toHexString());
                
                System.out.println("✅ Aluno inserido no MongoDB: " + aluno.getNome() + " (ID: " + aluno.getId() + ")");
                return true;
            }
            
        } catch (Exception e) {
            System.err.println("❌ Erro ao inserir aluno: " + e.getMessage());
            e.printStackTrace();
        }
        
        return false;
    }
    
    // Listar todos os alunos
    public List<Aluno> listarTodos() {
        List<Aluno> alunos = new ArrayList<>();
        
        try {
            // Buscar todos os documentos, ordenados por data de cadastro
            for (Document doc : collection.find().sort(new Document("dataCadastro", -1))) {
                Aluno aluno = documentToAluno(doc);
                if (aluno != null) {
                    alunos.add(aluno);
                }
            }
            
            System.out.println("📋 Listados " + alunos.size() + " alunos do MongoDB");
            
        } catch (Exception e) {
            System.err.println("❌ Erro ao listar alunos: " + e.getMessage());
        }
        
        return alunos;
    }
    
    // Buscar aluno por ID
    public Aluno buscarPorId(String id) {
        try {
            if (!ObjectId.isValid(id)) {
                System.err.println("❌ ID inválido: " + id);
                return null;
            }
            
            Document doc = collection.find(eq("_id", new ObjectId(id))).first();
            
            if (doc != null) {
                return documentToAluno(doc);
            }
            
        } catch (Exception e) {
            System.err.println("❌ Erro ao buscar aluno por ID: " + e.getMessage());
        }
        
        return null;
    }
    
    // Buscar aluno por email
    public Aluno buscarPorEmail(String email) {
        try {
            Document doc = collection.find(eq("email", email)).first();
            
            if (doc != null) {
                return documentToAluno(doc);
            }
            
        } catch (Exception e) {
            System.err.println("❌ Erro ao buscar aluno por email: " + e.getMessage());
        }
        
        return null;
    }
    
    // Atualizar aluno
    public boolean atualizar(Aluno aluno) {
        try {
            if (!ObjectId.isValid(aluno.getId())) {
                System.err.println("❌ ID inválido para atualização: " + aluno.getId());
                return false;
            }
            
            Document updateDoc = new Document("$set", new Document()
                .append("nome", aluno.getNome())
                .append("email", aluno.getEmail())
                .append("telefone", aluno.getTelefone())
                .append("curso", aluno.getCurso())
                .append("periodo", aluno.getPeriodo())
                .append("turno", aluno.getTurno())
                .append("competencias", aluno.getCompetencias())
                .append("experiencia", aluno.getExperiencia())
                .append("pontuacao", aluno.getPontuacao())
                .append("dataAtualizacao", new java.util.Date())
            );
            
            UpdateResult result = collection.updateOne(
                eq("_id", new ObjectId(aluno.getId())), 
                updateDoc
            );
            
            if (result.getModifiedCount() > 0) {
                System.out.println("✅ Aluno atualizado no MongoDB: " + aluno.getNome());
                return true;
            }
            
        } catch (Exception e) {
            System.err.println("❌ Erro ao atualizar aluno: " + e.getMessage());
        }
        
        return false;
    }
    
    // Excluir aluno
    public boolean excluir(String id) {
        try {
            if (!ObjectId.isValid(id)) {
                return false;
            }
            
            long deletedCount = collection.deleteOne(eq("_id", new ObjectId(id))).getDeletedCount();
            
            if (deletedCount > 0) {
                System.out.println("🗑️ Aluno excluído do MongoDB: " + id);
                return true;
            }
            
        } catch (Exception e) {
            System.err.println("❌ Erro ao excluir aluno: " + e.getMessage());
        }
        
        return false;
    }
    
    // Converter Document MongoDB para objeto Aluno
    private Aluno documentToAluno(Document doc) {
        if (doc == null) return null;
        
        try {
            Aluno aluno = new Aluno();
            
            // MongoDB usa _id como campo padrão
            ObjectId objectId = doc.getObjectId("_id");
            if (objectId != null) {
                aluno.setId(objectId.toHexString());
            }
            
            aluno.setNome(doc.getString("nome"));
            aluno.setEmail(doc.getString("email"));
            aluno.setTelefone(doc.getString("telefone"));
            aluno.setCurso(doc.getString("curso"));
            aluno.setPeriodo(doc.getString("periodo"));
            aluno.setTurno(doc.getString("turno"));
            aluno.setCompetencias(doc.getString("competencias"));
            aluno.setExperiencia(doc.getString("experiencia"));
            
            // Pontuação pode ser Integer ou Long
            Object pontuacao = doc.get("pontuacao");
            if (pontuacao instanceof Number) {
                aluno.setPontuacao(((Number) pontuacao).intValue());
            }
            
            return aluno;
            
        } catch (Exception e) {
            System.err.println("❌ Erro ao converter Document para Aluno: " + e.getMessage());
            return null;
        }
    }
}