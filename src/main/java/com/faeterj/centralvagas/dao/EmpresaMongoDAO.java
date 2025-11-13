package com.faeterj.centralvagas.dao;

import com.faeterj.centralvagas.model.Empresa;
import com.faeterj.centralvagas.util.MongoUtil;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import com.mongodb.client.result.InsertOneResult;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class EmpresaMongoDAO {
    
    private final MongoCollection<Document> collection;
    
    public EmpresaMongoDAO() {
        this.collection = MongoUtil.getEmpresasCollection();
    }
    
    public boolean inserir(Empresa empresa) {
        try {
            Document doc = new Document()
                .append("nome", empresa.getNome())
                .append("cnpj", empresa.getCnpj())
                .append("email", empresa.getEmail())
                .append("telefone", empresa.getTelefone())
                .append("endereco", empresa.getEndereco())
                .append("setor", empresa.getSetor())
                .append("descricao", empresa.getDescricao())
                .append("senha", empresa.getSenha())
                .append("dataCadastro", new Date());
            
            InsertOneResult result = collection.insertOne(doc);
            
            if (result.wasAcknowledged()) {
                ObjectId insertedId = result.getInsertedId().asObjectId().getValue();
                empresa.setId(insertedId.toHexString());
                System.out.println("✅ Empresa inserida no MongoDB: " + empresa.getNome() + " (ID: " + empresa.getId() + ")");
                return true;
            }
            
        } catch (Exception e) {
            System.err.println("❌ Erro ao inserir empresa: " + e.getMessage());
            e.printStackTrace();
        }
        return false;
    }
    
    public Empresa buscarPorId(String id) {
        try {
            if (id == null || id.trim().isEmpty()) {
                return null;
            }
            
            ObjectId objectId = new ObjectId(id);
            Document doc = collection.find(Filters.eq("_id", objectId)).first();
            
            if (doc != null) {
                return documentParaEmpresa(doc);
            }
            
        } catch (Exception e) {
            System.err.println("❌ Erro ao buscar empresa por ID: " + e.getMessage());
            e.printStackTrace();
        }
        return null;
    }
    
    public Empresa buscarPorEmail(String email) {
        try {
            Document doc = collection.find(Filters.eq("email", email)).first();
            if (doc != null) {
                return documentParaEmpresa(doc);
            }
        } catch (Exception e) {
            System.err.println("❌ Erro ao buscar empresa por email: " + e.getMessage());
            e.printStackTrace();
        }
        return null;
    }
    
    public Empresa buscarPorCnpj(String cnpj) {
        try {
            Document doc = collection.find(Filters.eq("cnpj", cnpj)).first();
            if (doc != null) {
                return documentParaEmpresa(doc);
            }
        } catch (Exception e) {
            System.err.println("❌ Erro ao buscar empresa por CNPJ: " + e.getMessage());
            e.printStackTrace();
        }
        return null;
    }
    
    public List<Empresa> listarTodas() {
        List<Empresa> empresas = new ArrayList<>();
        try {
            for (Document doc : collection.find()) {
                Empresa empresa = documentParaEmpresa(doc);
                if (empresa != null) {
                    empresas.add(empresa);
                }
            }
            System.out.println("📋 Listadas " + empresas.size() + " empresas do MongoDB");
        } catch (Exception e) {
            System.err.println("❌ Erro ao listar empresas: " + e.getMessage());
            e.printStackTrace();
        }
        return empresas;
    }
    
    public boolean atualizar(Empresa empresa) {
        try {
            if (empresa.getId() == null || empresa.getId().trim().isEmpty()) {
                return false;
            }
            
            ObjectId objectId = new ObjectId(empresa.getId());
            Document updateDoc = new Document()
                .append("nome", empresa.getNome())
                .append("cnpj", empresa.getCnpj())
                .append("email", empresa.getEmail())
                .append("telefone", empresa.getTelefone())
                .append("endereco", empresa.getEndereco())
                .append("setor", empresa.getSetor())
                .append("descricao", empresa.getDescricao())
                .append("senha", empresa.getSenha());
            
            long modifiedCount = collection.updateOne(
                Filters.eq("_id", objectId),
                new Document("$set", updateDoc)
            ).getModifiedCount();
            
            if (modifiedCount > 0) {
                System.out.println("✅ Empresa atualizada no MongoDB: " + empresa.getNome());
                return true;
            }
            
        } catch (Exception e) {
            System.err.println("❌ Erro ao atualizar empresa: " + e.getMessage());
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
                System.out.println("✅ Empresa removida do MongoDB (ID: " + id + ")");
                return true;
            }
            
        } catch (Exception e) {
            System.err.println("❌ Erro ao remover empresa: " + e.getMessage());
            e.printStackTrace();
        }
        return false;
    }
    
    public List<Empresa> buscarPorSetor(String setor) {
        List<Empresa> empresas = new ArrayList<>();
        try {
            for (Document doc : collection.find(Filters.regex("setor", setor, "i"))) {
                Empresa empresa = documentParaEmpresa(doc);
                if (empresa != null) {
                    empresas.add(empresa);
                }
            }
        } catch (Exception e) {
            System.err.println("❌ Erro ao buscar empresas por setor: " + e.getMessage());
            e.printStackTrace();
        }
        return empresas;
    }
    
    private Empresa documentParaEmpresa(Document doc) {
        try {
            Empresa empresa = new Empresa();
            empresa.setId(doc.getObjectId("_id").toHexString());
            empresa.setNome(doc.getString("nome"));
            empresa.setCnpj(doc.getString("cnpj"));
            empresa.setEmail(doc.getString("email"));
            empresa.setTelefone(doc.getString("telefone"));
            empresa.setEndereco(doc.getString("endereco"));
            empresa.setSetor(doc.getString("setor"));
            empresa.setDescricao(doc.getString("descricao"));
            empresa.setSenha(doc.getString("senha"));
            return empresa;
        } catch (Exception e) {
            System.err.println("❌ Erro ao converter Document para Empresa: " + e.getMessage());
            return null;
        }
    }
}