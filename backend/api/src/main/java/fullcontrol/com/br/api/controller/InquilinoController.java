package fullcontrol.com.br.api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
public class InquilinoController {


    // @PostMapping("/cadastrar")
    // public ResponseEntity<?> cadastrarInquilino() {
      
    // }

    @GetMapping("/")
    public String getMethodName() {
        return "FUNCIONOU PAINHO 🚓🚗🚗🚅😍🙂😎😏😑😑";
    }
    

}
