package fullcontrol.com.br.api.repository;

import fullcontrol.com.br.api.model.Inquilino;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;



public interface InquilinoRepository extends JpaRepository<Inquilino, UUID> {
}
