/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.faeterj.centralvagas.model;

public class Empresa {
    private String id; // MongoDB usa String ID (ObjectId)
    private String nome;
    private String cnpj;
    private String email;
    private String telefone;
    private String endereco;
    private String setor;
    private String descricao;
    private String senha;

    // Construtor vazio
    public Empresa() {}

    // Construtor completo
    public Empresa(String nome, String cnpj, String email, String telefone, 
                   String endereco, String setor, String descricao, String senha) {
        this.nome = nome;
        this.cnpj = cnpj;
        this.email = email;
        this.telefone = telefone;
        this.endereco = endereco;
        this.setor = setor;
        this.descricao = descricao;
        this.senha = senha;
    }

    // Getters e Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getCnpj() { return cnpj; }
    public void setCnpj(String cnpj) { this.cnpj = cnpj; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }

    public String getEndereco() { return endereco; }
    public void setEndereco(String endereco) { this.endereco = endereco; }

    public String getSetor() { return setor; }
    public void setSetor(String setor) { this.setor = setor; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
}
