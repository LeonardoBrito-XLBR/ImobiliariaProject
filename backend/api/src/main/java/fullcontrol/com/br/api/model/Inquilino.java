package fullcontrol.com.br.api.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Data;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;



import java.util.UUID;

import fullcontrol.com.br.api.enumns.StatusInquilino;
import fullcontrol.com.br.api.enumns.TipoPessoa;
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

    @Column(nullable = false, unique = true, length = 18)
    private int cpfCpnj;

    @Column(nullable = false, unique = false, length = 11)
    private int telefone;

    @Column(unique = true, length = 100)
    private String email;

     @Enumerated(EnumType.STRING) // ← salva "FISICA" ou "JURIDICA" no banco
    private TipoPessoa tipoPessoa;  

    @Enumerated(EnumType.STRING) // ← salva "ATIVO", "INATIVO" ou "INADIMPLENTE"
    private StatusInquilino status;
 
    
    // SALVAR A DATA DA ALTERACAO E CRIACAO DO REGISTRO   
    // @Column (updatable = false )
    // private LocalDateTime dataCriacao;
    // private LocalDateTime dataAtualizacao;
    

    @Override
    public String toString() {
        return "Inquilino{nome='" + getNomeCompleto() + '\'' + ", cpfCpnj=" + getCpfCpnj() + ", telefone=" + getTelefone() + '}';
    }
}
