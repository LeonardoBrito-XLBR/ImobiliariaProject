package fullcontrol.com.br.api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@CrossOrigin(origins = "*") // POR ENQUANTO, DEPOIS VAMOS CONFIGURAR MELHOR ISSO
@RestController
public class InquilinoController {
    
    

    @GetMapping("")
    public String getMethodName() {
        return "FUNCIONOU PAINHO 🚓🚗🚗🚅😍🙂😎😏😑😑";
    }


    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrarInquilino(@RequestBody Inquilino inquilino) {
        // Implementar lógica de criação
        return ResponseEntity.ok("Inquilino cadastrado");
    }

    // @GetMapping("/listar")
    // public ResponseEntity<List<Inquilino>> listarInquilinos() {
    //     // Implementar lógica de listagem
    //     return ResponseEntity.ok(new ArrayList<>());
    // }

    // @GetMapping("/{id}")
    // public ResponseEntity<Inquilino> obterInquilino(@PathVariable Long id) {
    //     // Implementar lógica de obtenção por ID
    //     return ResponseEntity.ok(new Inquilino());
    // }

    // @PutMapping("/{id}")
    // public ResponseEntity<?> atualizarInquilino(@PathVariable Long id, @RequestBody Inquilino inquilino) {
    //     // Implementar lógica de atualização
    //     return ResponseEntity.ok("Inquilino atualizado");
    // }

    // @DeleteMapping("/{id}")
    // public ResponseEntity<?> deletarInquilino(@PathVariable Long id) {
    //     // Implementar lógica de exclusão
    //     return ResponseEntity.ok("Inquilino deletado");
    // }
    

}
