package com.api.crud.despacho;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class DespachoService {

    private final DespachoRepository despachoRepository;

    @Autowired
    public DespachoService(DespachoRepository despachoRepository) {
        this.despachoRepository = despachoRepository;
    }

    public List<Despacho> getDespacho() {
        return despachoRepository.findAll();
    }

    public ResponseEntity<Object> createDespacho(Despacho despacho) {
        HashMap<String, Object> response = new HashMap<>();
        Despacho savedDespacho = despachoRepository.save(despacho);
        response.put("data", savedDespacho);
        response.put("MESSAGE", "Se guardó con éxito");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    public ResponseEntity<Object> updateDespacho(Despacho despacho) {
        HashMap<String, Object> response = new HashMap<>();
        Optional<Despacho> existingDespacho = despachoRepository.findById(despacho.getId());

        if (existingDespacho.isEmpty()) {
            response.put("ERROR", true);
            response.put("MESSAGE", "DESPACHO NO EXISTE");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        Despacho updatedDespacho = despachoRepository.save(despacho);
        response.put("data", updatedDespacho);
        response.put("MESSAGE", "ACTUALIZADO CON ÉXITO");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<Object> deleteDespacho(Long id) {
        HashMap<String, Object> response = new HashMap<>();
        if (!despachoRepository.existsById(id)) {
            response.put("ERROR", true);
            response.put("MESSAGE", "ESTE DESPACHO NO EXISTE");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        despachoRepository.deleteById(id);
        response.put("MESSAGE", "Despacho eliminado con éxito");
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
}
