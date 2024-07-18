package com.api.crud.despacho;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/despachos")
public class DespachoController {

    private final DespachoService despachoService;

    @Autowired
    public DespachoController(DespachoService despachoService) {
        this.despachoService = despachoService;
    }

    @GetMapping
    public List<Despacho> getDespachos() {return despachoService.getDespacho();
    }

    @PostMapping
    public ResponseEntity<Object> registrarDespacho(@RequestBody Despacho despacho) {
        return despachoService.createDespacho(despacho);
    }

    @PutMapping( "/{id}")
    public ResponseEntity<Object> actualizarDespachado(@PathVariable Long id, @RequestBody Despacho despacho) {
        return despachoService.updateDespacho(despacho);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> eliminar(@PathVariable Long id) {
        return despachoService.deleteDespacho(id);
    }
}

