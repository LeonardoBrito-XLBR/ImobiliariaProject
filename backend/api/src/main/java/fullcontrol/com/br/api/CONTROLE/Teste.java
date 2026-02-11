package fullcontrol.com.br.api.CONTROLE;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/teste")
@CrossOrigin(origins = "*")
public class Teste {
    
    
    @GetMapping("/")
    public String hello() {
        return "Hello, World!";
    }

}
