package com.faeterj.centralvagas.dao;

import com.faeterj.centralvagas.model.Vaga;
import com.faeterj.centralvagas.util.MongoUtil;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import com.mongodb.client.result.InsertOneResult;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class VagaMongoDAO {
    
    private final MongoCollection<Document> collection;
    
    public VagaMongoDAO() {
        this.collection = MongoUtil.getVagasCollection();
    }
    
    public boolean inserir(Vaga vaga) {
        try {
            Document doc = new Document()
                .append("titulo", vaga.getTitulo())
                .append("descricao", vaga.getDescricao())
                .append("empresa", vaga.getEmpresa())
                .append("area", vaga.getArea())
                .append("requisitos", vaga.getRequisitos())
                .append("beneficios", vaga.getBeneficios())
                .append("tipo", vaga.getTipo())
                .append("localizacao", vaga.getLocalizacao())
                .append("salario", vaga.getSalario())
                .append("empresaId", vaga.getEmpresaId())
                .append("dataCadastro", new Date())
                .append("ativa", true);
            
            InsertOneResult result = collection.insertOne(doc);
            
            if (result.wasAcknowledged()) {
                ObjectId insertedId = result.getInsertedId().asObjectId().getValue();
                vaga.setId(insertedId.toHexString());
                System.out.println("✅ Vaga inserida no MongoDB: " + vaga.getTitulo() + " (ID: " + vaga.getId() + ")");
                return true;
            }
            
        } catch (Exception e) {
            System.err.println("❌ Erro ao inserir vaga: " + e.getMessage());
            e.printStackTrace();
        }
        return false;
    }
    
    public Vaga buscarPorId(String id) {
        try {
            if (id == null || id.trim().isEmpty()) {
                return null;
            }
            
            ObjectId objectId = new ObjectId(id);
            Document doc = collection.find(Filters.eq("_id", objectId)).first();
            
            if (doc != null) {
                return documentParaVaga(doc);
            }
            
        } catch (Exception e) {
            System.err.println("❌ Erro ao buscar vaga por ID: " + e.getMessage());
            e.printStackTrace();
        }
        return null;
    }
    
    public List<Vaga> listarTodas() {
        List<Vaga> vagas = new ArrayList<>();
        try {
            for (Document doc : collection.find()) {
                Vaga vaga = documentParaVaga(doc);
                if (vaga != null) {
                    vagas.add(vaga);
                }
            }
            System.out.println("📋 Listadas " + vagas.size() + " vagas do MongoDB");
        } catch (Exception e) {
            System.err.println("❌ Erro ao listar vagas: " + e.getMessage());
            e.printStackTrace();
        }
        return vagas;
    }
    
    public List<Vaga> listarAtivas() {
        List<Vaga> vagas = new ArrayList<>();
        try {
            for (Document doc : collection.find(Filters.eq("ativa", true))) {
                Vaga vaga = documentParaVaga(doc);
                if (vaga != null) {
                    vagas.add(vaga);
                }
            }
            System.out.println("📋 Listadas " + vagas.size() + " vagas ativas do MongoDB");
        } catch (Exception e) {
            System.err.println("❌ Erro ao listar vagas ativas: " + e.getMessage());
            e.printStackTrace();
        }
        return vagas;
    }
    
    public List<Vaga> buscarPorEmpresa(String empresaId) {
        List<Vaga> vagas = new ArrayList<>();
        try {
            for (Document doc : collection.find(Filters.eq("empresaId", empresaId))) {
                Vaga vaga = documentParaVaga(doc);
                if (vaga != null) {
                    vagas.add(vaga);
                }
            }
        } catch (Exception e) {
            System.err.println("❌ Erro ao buscar vagas por empresa: " + e.getMessage());
            e.printStackTrace();
        }
        return vagas;
    }
    
    public List<Vaga> buscarPorArea(String area) {
        List<Vaga> vagas = new ArrayList<>();
        try {
            for (Document doc : collection.find(Filters.regex("area", area, "i"))) {
                Vaga vaga = documentParaVaga(doc);
                if (vaga != null) {
                    vagas.add(vaga);
                }
            }
        } catch (Exception e) {
            System.err.println("❌ Erro ao buscar vagas por área: " + e.getMessage());
            e.printStackTrace();
        }
        return vagas;
    }
    
    public List<Vaga> buscarPorTipo(String tipo) {
        List<Vaga> vagas = new ArrayList<>();
        try {
            for (Document doc : collection.find(Filters.eq("tipo", tipo))) {
                Vaga vaga = documentParaVaga(doc);
                if (vaga != null) {
                    vagas.add(vaga);
                }
            }
        } catch (Exception e) {
            System.err.println("❌ Erro ao buscar vagas por tipo: " + e.getMessage());
            e.printStackTrace();
        }
        return vagas;
    }
    
    public boolean atualizar(Vaga vaga) {
        try {
            if (vaga.getId() == null || vaga.getId().trim().isEmpty()) {
                return false;
            }
            
            ObjectId objectId = new ObjectId(vaga.getId());
            Document updateDoc = new Document()
                .append("titulo", vaga.getTitulo())
                .append("descricao", vaga.getDescricao())
                .append("empresa", vaga.getEmpresa())
                .append("area", vaga.getArea())
                .append("requisitos", vaga.getRequisitos())
                .append("beneficios", vaga.getBeneficios())
                .append("tipo", vaga.getTipo())
                .append("localizacao", vaga.getLocalizacao())
                .append("salario", vaga.getSalario())
                .append("ativa", vaga.isAtiva());
            
            long modifiedCount = collection.updateOne(
                Filters.eq("_id", objectId),
                new Document("$set", updateDoc)
            ).getModifiedCount();
            
            if (modifiedCount > 0) {
                System.out.println("✅ Vaga atualizada no MongoDB: " + vaga.getTitulo());
                return true;
            }
            
        } catch (Exception e) {
            System.err.println("❌ Erro ao atualizar vaga: " + e.getMessage());
            e.printStackTrace();
        }
        return false;
    }
    
    public boolean desativar(String id) {
        try {
            if (id == null || id.trim().isEmpty()) {
                return false;
            }
            
            ObjectId objectId = new ObjectId(id);
            long modifiedCount = collection.updateOne(
                Filters.eq("_id", objectId),
                new Document("$set", new Document("ativa", false))
            ).getModifiedCount();
            
            if (modifiedCount > 0) {
                System.out.println("✅ Vaga desativada no MongoDB (ID: " + id + ")");
                return true;
            }
            
        } catch (Exception e) {
            System.err.println("❌ Erro ao desativar vaga: " + e.getMessage());
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
                System.out.println("✅ Vaga removida do MongoDB (ID: " + id + ")");
                return true;
            }
            
        } catch (Exception e) {
            System.err.println("❌ Erro ao remover vaga: " + e.getMessage());
            e.printStackTrace();
        }
        return false;
    }
    
    private Vaga documentParaVaga(Document doc) {
        try {
            Vaga vaga = new Vaga();
            vaga.setId(doc.getObjectId("_id").toHexString());
            vaga.setTitulo(doc.getString("titulo"));
            vaga.setDescricao(doc.getString("descricao"));
            vaga.setEmpresa(doc.getString("empresa"));
            vaga.setArea(doc.getString("area"));
            vaga.setRequisitos(doc.getString("requisitos"));
            vaga.setBeneficios(doc.getString("beneficios"));
            vaga.setTipo(doc.getString("tipo"));
            vaga.setLocalizacao(doc.getString("localizacao"));
            vaga.setSalario(doc.getDouble("salario") != null ? doc.getDouble("salario") : 0.0);
            vaga.setEmpresaId(doc.getString("empresaId"));
            vaga.setDataCadastro(doc.getDate("dataCadastro"));
            vaga.setAtiva(doc.getBoolean("ativa", true));
            return vaga;
        } catch (Exception e) {
            System.err.println("❌ Erro ao converter Document para Vaga: " + e.getMessage());
            return null;
        }
    }
}