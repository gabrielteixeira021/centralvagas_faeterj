/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.faeterj.centralvagas.model;

import java.util.Date;

public class Candidatura {
    private String id; // MongoDB usa String ID (ObjectId)
    private String alunoId; // String para referenciar ObjectId
    private String vagaId; // String para referenciar ObjectId
    private Date dataCandidatura;
    private String status; // Pendente, Aceita, Rejeitada
    private String mensagem;

    // Construtor vazio
    public Candidatura() {}

    // Construtor completo
    public Candidatura(String alunoId, String vagaId, String mensagem) {
        this.alunoId = alunoId;
        this.vagaId = vagaId;
        this.dataCandidatura = new Date();
        this.status = "Pendente";
        this.mensagem = mensagem;
    }

    // Getters e Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getAlunoId() { return alunoId; }
    public void setAlunoId(String alunoId) { this.alunoId = alunoId; }

    public String getVagaId() { return vagaId; }
    public void setVagaId(String vagaId) { this.vagaId = vagaId; }

    public Date getDataCandidatura() { return dataCandidatura; }
    public void setDataCandidatura(Date dataCandidatura) { this.dataCandidatura = dataCandidatura; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getMensagem() { return mensagem; }
    public void setMensagem(String mensagem) { this.mensagem = mensagem; }
}
