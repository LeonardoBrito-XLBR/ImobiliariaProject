package fullcontrol.com.br.api.model;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "imovel")
public class Imovel {
    

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private int numero; 

    @Enumerated(EnumType.STRING)
    private String tipo;

    @Column(nullable = false)
    private int metroQuadrado;
    

    @Override
    public String toString() {
        return "Imovel{numero=" + numero + ", tipo='" + tipo + '\'' + ", metroQuadrado=" + metroQuadrado + '}';
    }
}
