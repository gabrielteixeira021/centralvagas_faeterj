/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.faeterj.centralvagas.model;

import java.util.Date;

public class Vaga {
    private int id;
    private String titulo;
    private String descricao;
    private String empresa;
    private String area;
    private String requisitos;
    private String beneficios;
    private String tipo; // Estágio ou Emprego
    private String localizacao;
    private double salario;
    private Date dataCadastro;
    private boolean ativa;
    private int empresaId;

    // Construtor vazio
    public Vaga() {}

    // Construtor completo
    public Vaga(String titulo, String descricao, String empresa, String area, 
                String requisitos, String beneficios, String tipo, String localizacao, 
                double salario, int empresaId) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.empresa = empresa;
        this.area = area;
        this.requisitos = requisitos;
        this.beneficios = beneficios;
        this.tipo = tipo;
        this.localizacao = localizacao;
        this.salario = salario;
        this.empresaId = empresaId;
        this.dataCadastro = new Date();
        this.ativa = true;
    }

    // Getters e Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public String getEmpresa() { return empresa; }
    public void setEmpresa(String empresa) { this.empresa = empresa; }

    public String getArea() { return area; }
    public void setArea(String area) { this.area = area; }

    public String getRequisitos() { return requisitos; }
    public void setRequisitos(String requisitos) { this.requisitos = requisitos; }

    public String getBeneficios() { return beneficios; }
    public void setBeneficios(String beneficios) { this.beneficios = beneficios; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public String getLocalizacao() { return localizacao; }
    public void setLocalizacao(String localizacao) { this.localizacao = localizacao; }

    public double getSalario() { return salario; }
    public void setSalario(double salario) { this.salario = salario; }

    public Date getDataCadastro() { return dataCadastro; }
    public void setDataCadastro(Date dataCadastro) { this.dataCadastro = dataCadastro; }

    public boolean isAtiva() { return ativa; }
    public void setAtiva(boolean ativa) { this.ativa = ativa; }

    public int getEmpresaId() { return empresaId; }
    public void setEmpresaId(int empresaId) { this.empresaId = empresaId; }
}
