package fullcontrol.com.br.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fullcontrol.com.br.api.model.Inquilino;
import fullcontrol.com.br.api.repository.InquilinoRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class InquilinoService {

    @Autowired
    private InquilinoRepository repository;

    public List<Inquilino> getAllInquilinos() {
        return repository.findAll();
    }

    public Optional<Inquilino> getInquilinoById(UUID id) {
        return repository.findById(id);
    }

    public Inquilino saveInquilino(Inquilino inquilino) {
        return repository.save(inquilino);
    }

    public void deleteInquilino(UUID id) {
        repository.deleteById(id);
    }
}
