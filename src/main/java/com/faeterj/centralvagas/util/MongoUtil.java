package com.faeterj.centralvagas.util;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;
import org.bson.Document;

public class MongoUtil {

    private static MongoClient mongoClient;
    private static MongoDatabase database;

    // SUBSTITUA PELA SUA CONNECTION STRING DO ATLAS
    // Exemplo:
    // "mongodb+srv://username:password@cluster.mongodb.net/centralvagas?retryWrites=true&w=majority"
    private static final String CONNECTION_STRING = "mongodb+srv://centralvagas-user:senha123@centralvagas-cluster.aolwog2.mongodb.net/?appName=centralvagas-cluster";

    private static final String DATABASE_NAME = "centralvagas";

    static {
        initializeMongoDB();
    }

    private static void initializeMongoDB() {
        try {
            System.out.println("🍃 Conectando ao MongoDB...");

            // Conecta ao MongoDB
            mongoClient = MongoClients.create(CONNECTION_STRING);

            // Seleciona o database
            database = mongoClient.getDatabase(DATABASE_NAME);

            // Testa a conexão
            database.runCommand(new Document("ping", 1));

            System.out.println("✅ MongoDB conectado com sucesso!");
            System.out.println("📊 Database: " + DATABASE_NAME);

            // Criar índices únicos
            createIndexes();

        } catch (Exception e) {
            System.err.println("❌ Erro ao conectar MongoDB: " + e.getMessage());
            e.printStackTrace();
        }
    }

    private static void createIndexes() {
        try {
            // Índice único para email dos alunos
            getCollection("alunos").createIndex(
                    new Document("email", 1),
                    new com.mongodb.client.model.IndexOptions().unique(true));

            // Índice único para email das empresas
            getCollection("empresas").createIndex(
                    new Document("email", 1),
                    new com.mongodb.client.model.IndexOptions().unique(true));

            // Índice único para CNPJ das empresas
            getCollection("empresas").createIndex(
                    new Document("cnpj", 1),
                    new com.mongodb.client.model.IndexOptions().unique(true));

            // Índice para vagas ativas
            getCollection("vagas").createIndex(new Document("ativa", 1));

            System.out.println("📊 Índices criados com sucesso!");

        } catch (Exception e) {
            System.out.println("⚠️ Alguns índices já existem: " + e.getMessage());
        }
    }

    public static MongoDatabase getDatabase() {
        if (database == null) {
            initializeMongoDB();
        }
        return database;
    }

    public static MongoCollection<Document> getCollection(String collectionName) {
        return getDatabase().getCollection(collectionName);
    }

    // Collections específicas
    public static MongoCollection<Document> getAlunosCollection() {
        return getCollection("alunos");
    }

    public static MongoCollection<Document> getEmpresasCollection() {
        return getCollection("empresas");
    }

    public static MongoCollection<Document> getVagasCollection() {
        return getCollection("vagas");
    }

    public static MongoCollection<Document> getCandidaturasCollection() {
        return getCollection("candidaturas");
    }

    public static void close() {
        if (mongoClient != null) {
            mongoClient.close();
            System.out.println("🍃 MongoDB desconectado");
        }
    }

    // Método para testar conexão
    public static boolean testarConexao() {
        try {
            database.runCommand(new Document("ping", 1));
            System.out.println("✅ Conexão MongoDB OK!");
            return true;
        } catch (Exception e) {
            System.err.println("❌ Erro na conexão: " + e.getMessage());
            return false;
        }
    }
}