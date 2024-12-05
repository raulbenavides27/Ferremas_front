package com.api.crud.ventas;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/ventas")
public class VentasController {
    private final VentasService ventasService;

    @Autowired
    public VentasController(VentasService ventasService) {
        this.ventasService = ventasService;
    }

    @GetMapping
    public List<Ventas> getVentas() {
        return this.ventasService.getVentas();
    }

    @PostMapping
    public ResponseEntity<Object> registrarDespachado(@RequestBody Ventas ventas) {
        return this.ventasService.newVentas(ventas);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<Object> actualizarDespachado(@PathVariable("id") Long id, @RequestBody Ventas ventas) {
        return this.ventasService.updateVentas(id, ventas);
    }

    @DeleteMapping(path = "/{ventasId}")
    public ResponseEntity<Object> eliminar(@PathVariable("ventasId") Long id) {
        return this.ventasService.deleteVentas(id);
    }
}
