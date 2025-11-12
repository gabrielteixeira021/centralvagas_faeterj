/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.faeterj.centralvagas.model;

import java.util.Date;

public class Candidatura {
    private int id;
    private int alunoId;
    private int vagaId;
    private Date dataCandidatura;
    private String status; // Pendente, Aceita, Rejeitada
    private String mensagem;

    // Construtor vazio
    public Candidatura() {}

    // Construtor completo
    public Candidatura(int alunoId, int vagaId, String mensagem) {
        this.alunoId = alunoId;
        this.vagaId = vagaId;
        this.dataCandidatura = new Date();
        this.status = "Pendente";
        this.mensagem = mensagem;
    }

    // Getters e Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getAlunoId() { return alunoId; }
    public void setAlunoId(int alunoId) { this.alunoId = alunoId; }

    public int getVagaId() { return vagaId; }
    public void setVagaId(int vagaId) { this.vagaId = vagaId; }

    public Date getDataCandidatura() { return dataCandidatura; }
    public void setDataCandidatura(Date dataCandidatura) { this.dataCandidatura = dataCandidatura; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getMensagem() { return mensagem; }
    public void setMensagem(String mensagem) { this.mensagem = mensagem; }
}
