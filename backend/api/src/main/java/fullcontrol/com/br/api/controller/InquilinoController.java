package fullcontrol.com.br.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fullcontrol.com.br.api.model.Inquilino;
import fullcontrol.com.br.api.service.InquilinoService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/inquilinos")
public class InquilinoController {

    // @Autowired
    // private InquilinoService service;

    // @GetMapping("path")
    // public String getMethodName(@RequestParam String param) {
    //     return new String();
    // }
    
    // public ResponseEntity<Page<Inquilino>> listar(Pageable pageable) {
    //     return ResponseEntity.ok(service.listarTodos(pageable));
    // }

    // @GetMapping("/{id}")
    // public ResponseEntity<Inquilino> buscarPorId(@PathVariable Long id) {
    //     return ResponseEntity.ok(service.buscarPorId(id));
    // }

    // @GetMapping("/cpf/{cpfCnpj}")
    // public ResponseEntity<Inquilino> buscarPorCpfCnpj(@PathVariable String cpfCnpj) {
    //     return ResponseEntity.ok(service.buscarPorCpfCnpj(cpfCnpj));
    // }

    // @PostMapping 
    // public ResponseEntity<Inquilino> criar(@RequestBody @Valid InquilinoDTO dto) {
    //     return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(dto));
    // }

    // @PutMapping("/{id}")
    // public ResponseEntity<Inquilino> atualizar(@PathVariable Long id,
    //                                            @RequestBody @Valid InquilinoDTO dto) {
    //     return ResponseEntity.ok(service.atualizar(id, dto));
    // }

    // @PatchMapping("/{id}/status")
    // public ResponseEntity<Void> atualizarStatus(@PathVariable Long id,
    //                                              @RequestParam StatusInquilino status) {
    //     service.atualizarStatus(id, status);
    //     return ResponseEntity.noContent().build();
    // }

    // @DeleteMapping("/{id}")
    // public ResponseEntity<Void> deletar(@PathVariable Long id) {
    //     service.deletar(id);
    //     return ResponseEntity.noContent().build();
    // }
}