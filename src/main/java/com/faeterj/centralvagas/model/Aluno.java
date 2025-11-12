/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.faeterj.centralvagas.model;

public class Aluno {
    private int id;
    private String nome;
    private String email;
    private String telefone;
    private String curso;
    private String periodo;
    private String turno;
    private String competencias;
    private String experiencia;
    private int pontuacao;

    // Construtor vazio
    public Aluno() {}

    // Construtor completo
    public Aluno(String nome, String email, String telefone, String curso, 
                 String periodo, String turno, String competencias, String experiencia) {
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.curso = curso;
        this.periodo = periodo;
        this.turno = turno;
        this.competencias = competencias;
        this.experiencia = experiencia;
        this.pontuacao = 0;
    }

    // Getters e Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }

    public String getCurso() { return curso; }
    public void setCurso(String curso) { this.curso = curso; }

    public String getPeriodo() { return periodo; }
    public void setPeriodo(String periodo) { this.periodo = periodo; }

    public String getTurno() { return turno; }
    public void setTurno(String turno) { this.turno = turno; }

    public String getCompetencias() { return competencias; }
    public void setCompetencias(String competencias) { this.competencias = competencias; }

    public String getExperiencia() { return experiencia; }
    public void setExperiencia(String experiencia) { this.experiencia = experiencia; }

    public int getPontuacao() { return pontuacao; }
    public void setPontuacao(int pontuacao) { this.pontuacao = pontuacao; }
}
