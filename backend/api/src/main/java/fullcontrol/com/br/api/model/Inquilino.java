package fullcontrol.com.br.api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import java.util.UUID;

import jakarta.persistence.Column;

@Data
@Entity
@Table(name = "inquilino")
public class Inquilino {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    // IDENTIFICAÇÃO
    
    @Column(nullable = false)
    private String nomeCompleto;

    @Column(nullable = false, unique = true, length = 11)
    private int cpf;

    @Column(nullable = false, unique = false, length = 11)
    private int telefone;

    // public UUID getId() {
    //     return id;
    // }

    // public void setId(UUID id) {
    //     this.id = id;
    // }

    // public int getCpf() {
    //     return cpf;
    // }

    // public void setCpf(int cpf) {
    //     this.cpf = cpf;
    // }

    // public String getNome() {
    //     return nome;
    // }

    // public void setNome(String nome) {
    //     this.nome = nome;
    // }

    // public int getIdade() {
    //     return idade;
    // }

    // public void setIdade(int idade) {
    //     this.idade = idade;
    // }

    @Override
    public String toString() {
        return "Inquilino{nome='" + getNomeCompleto() + '\'' + ", cpf=" + getCpf() + ", telefone=" + getTelefone() + '}';
    }
}
