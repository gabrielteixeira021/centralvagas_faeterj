package com.faeterj.centralvagas.dao;

import com.faeterj.centralvagas.model.Candidatura;
import com.faeterj.centralvagas.util.MongoUtil;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import com.mongodb.client.result.InsertOneResult;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class CandidaturaMongoDAO {
    
    private final MongoCollection<Document> collection;
    
    public CandidaturaMongoDAO() {
        this.collection = MongoUtil.getCandidaturasCollection();
    }
    
    public boolean inserir(Candidatura candidatura) {
        try {
            Document doc = new Document()
                .append("alunoId", candidatura.getAlunoId())
                .append("vagaId", candidatura.getVagaId())
                .append("dataCandidatura", new Date())
                .append("status", "Pendente")
                .append("mensagem", candidatura.getMensagem());
            
            InsertOneResult result = collection.insertOne(doc);
            
            if (result.wasAcknowledged()) {
                ObjectId insertedId = result.getInsertedId().asObjectId().getValue();
                candidatura.setId(insertedId.toHexString());
                System.out.println("✅ Candidatura inserida no MongoDB (ID: " + candidatura.getId() + ")");
                return true;
            }
            
        } catch (Exception e) {
            System.err.println("❌ Erro ao inserir candidatura: " + e.getMessage());
            e.printStackTrace();
        }
        return false;
    }
    
    public Candidatura buscarPorId(String id) {
        try {
            if (id == null || id.trim().isEmpty()) {
                return null;
            }
            
            ObjectId objectId = new ObjectId(id);
            Document doc = collection.find(Filters.eq("_id", objectId)).first();
            
            if (doc != null) {
                return documentParaCandidatura(doc);
            }
            
        } catch (Exception e) {
            System.err.println("❌ Erro ao buscar candidatura por ID: " + e.getMessage());
            e.printStackTrace();
        }
        return null;
    }
    
    public List<Candidatura> listarTodas() {
        List<Candidatura> candidaturas = new ArrayList<>();
        try {
            for (Document doc : collection.find()) {
                Candidatura candidatura = documentParaCandidatura(doc);
                if (candidatura != null) {
                    candidaturas.add(candidatura);
                }
            }
            System.out.println("📋 Listadas " + candidaturas.size() + " candidaturas do MongoDB");
        } catch (Exception e) {
            System.err.println("❌ Erro ao listar candidaturas: " + e.getMessage());
            e.printStackTrace();
        }
        return candidaturas;
    }
    
    public List<Candidatura> buscarPorAluno(String alunoId) {
        List<Candidatura> candidaturas = new ArrayList<>();
        try {
            for (Document doc : collection.find(Filters.eq("alunoId", alunoId))) {
                Candidatura candidatura = documentParaCandidatura(doc);
                if (candidatura != null) {
                    candidaturas.add(candidatura);
                }
            }
        } catch (Exception e) {
            System.err.println("❌ Erro ao buscar candidaturas por aluno: " + e.getMessage());
            e.printStackTrace();
        }
        return candidaturas;
    }
    
    public List<Candidatura> buscarPorVaga(String vagaId) {
        List<Candidatura> candidaturas = new ArrayList<>();
        try {
            for (Document doc : collection.find(Filters.eq("vagaId", vagaId))) {
                Candidatura candidatura = documentParaCandidatura(doc);
                if (candidatura != null) {
                    candidaturas.add(candidatura);
                }
            }
        } catch (Exception e) {
            System.err.println("❌ Erro ao buscar candidaturas por vaga: " + e.getMessage());
            e.printStackTrace();
        }
        return candidaturas;
    }
    
    public List<Candidatura> buscarPorStatus(String status) {
        List<Candidatura> candidaturas = new ArrayList<>();
        try {
            for (Document doc : collection.find(Filters.eq("status", status))) {
                Candidatura candidatura = documentParaCandidatura(doc);
                if (candidatura != null) {
                    candidaturas.add(candidatura);
                }
            }
        } catch (Exception e) {
            System.err.println("❌ Erro ao buscar candidaturas por status: " + e.getMessage());
            e.printStackTrace();
        }
        return candidaturas;
    }
    
    public boolean atualizarStatus(String id, String novoStatus) {
        try {
            if (id == null || id.trim().isEmpty()) {
                return false;
            }
            
            ObjectId objectId = new ObjectId(id);
            long modifiedCount = collection.updateOne(
                Filters.eq("_id", objectId),
                new Document("$set", new Document("status", novoStatus))
            ).getModifiedCount();
            
            if (modifiedCount > 0) {
                System.out.println("✅ Status da candidatura atualizado para: " + novoStatus + " (ID: " + id + ")");
                return true;
            }
            
        } catch (Exception e) {
            System.err.println("❌ Erro ao atualizar status da candidatura: " + e.getMessage());
            e.printStackTrace();
        }
        return false;
    }
    
    public boolean atualizar(Candidatura candidatura) {
        try {
            if (candidatura.getId() == null || candidatura.getId().trim().isEmpty()) {
                return false;
            }
            
            ObjectId objectId = new ObjectId(candidatura.getId());
            Document updateDoc = new Document()
                .append("status", candidatura.getStatus())
                .append("mensagem", candidatura.getMensagem());
            
            long modifiedCount = collection.updateOne(
                Filters.eq("_id", objectId),
                new Document("$set", updateDoc)
            ).getModifiedCount();
            
            if (modifiedCount > 0) {
                System.out.println("✅ Candidatura atualizada no MongoDB (ID: " + candidatura.getId() + ")");
                return true;
            }
            
        } catch (Exception e) {
            System.err.println("❌ Erro ao atualizar candidatura: " + e.getMessage());
            e.printStackTrace();
        }
        return false;
    }
    
    public boolean remover(String id) {
        try {
            if (id == null || id.trim().isEmpty()) {
                return false;
            }
            
            ObjectId objectId = new ObjectId(id);
            long deletedCount = collection.deleteOne(Filters.eq("_id", objectId)).getDeletedCount();
            
            if (deletedCount > 0) {
                System.out.println("✅ Candidatura removida do MongoDB (ID: " + id + ")");
                return true;
            }
            
        } catch (Exception e) {
            System.err.println("❌ Erro ao remover candidatura: " + e.getMessage());
            e.printStackTrace();
        }
        return false;
    }
    
    public boolean jaSeCandidata(String alunoId, String vagaId) {
        try {
            Document doc = collection.find(
                Filters.and(
                    Filters.eq("alunoId", alunoId),
                    Filters.eq("vagaId", vagaId)
                )
            ).first();
            
            return doc != null;
            
        } catch (Exception e) {
            System.err.println("❌ Erro ao verificar candidatura existente: " + e.getMessage());
            e.printStackTrace();
        }
        return false;
    }
    
    private Candidatura documentParaCandidatura(Document doc) {
        try {
            Candidatura candidatura = new Candidatura();
            candidatura.setId(doc.getObjectId("_id").toHexString());
            candidatura.setAlunoId(doc.getString("alunoId"));
            candidatura.setVagaId(doc.getString("vagaId"));
            candidatura.setDataCandidatura(doc.getDate("dataCandidatura"));
            candidatura.setStatus(doc.getString("status"));
            candidatura.setMensagem(doc.getString("mensagem"));
            return candidatura;
        } catch (Exception e) {
            System.err.println("❌ Erro ao converter Document para Candidatura: " + e.getMessage());
            return null;
        }
    }
}