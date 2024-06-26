package com.api.crud.ventas;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class VentasService {

    HashMap<String, Object> datos;

    private final VentasRepository ventasRepository;

    @Autowired
    public VentasService(VentasRepository ventasRepository) {
        this.ventasRepository = ventasRepository;
    }

    public List<Ventas> getVentas() {
        return this.ventasRepository.findAll();
    }

    public ResponseEntity<Object> newVentas(Ventas ventas) {
        datos = new HashMap<>();

        if (ventas.getId() != null) {
            datos.put("MESSAGE", "ACTUALIZADO");
        }

        ventasRepository.save(ventas);
        datos.put("data", ventas);
        datos.put("MESSAGE", "Se guardó con éxito");
        return new ResponseEntity<>(datos, HttpStatus.CREATED);
    }

    public ResponseEntity<Object> updateVentas(Long id, Ventas ventas) {
        datos = new HashMap<>();

        Optional<Ventas> optionalVenta = ventasRepository.findById(id);
        if (!optionalVenta.isPresent()) {
            datos.put("ERROR", true);
            datos.put("MESSAGE", "DESPACHO NO EXISTE");
            return new ResponseEntity<>(datos, HttpStatus.NOT_FOUND);
        }

        Ventas existingVenta = optionalVenta.get();
        existingVenta.setIdCliente(ventas.getIdCliente());
        existingVenta.setFecha(ventas.getFecha());
        existingVenta.setIdProducto(ventas.getIdProducto());
        existingVenta.setCantidad(ventas.getCantidad());
        existingVenta.setTotalNeto(ventas.getTotalNeto());
        existingVenta.setIva(ventas.getIva());
        existingVenta.setTotal(ventas.getTotal());

        ventasRepository.save(existingVenta);
        datos.put("data", existingVenta);
        datos.put("MESSAGE", "ACTUALIZADO CON ÉXITO");
        return new ResponseEntity<>(datos, HttpStatus.OK);
    }

    public ResponseEntity<Object> deleteVentas(Long id) {
        datos = new HashMap<>();

        boolean existe = this.ventasRepository.existsById(id);
        if (!existe) {
            datos.put("ERROR", true);
            datos.put("MESSAGE", "ESTE PRODUCTO NO EXISTE");
            return new ResponseEntity<>(datos, HttpStatus.CONFLICT);
        }

        ventasRepository.deleteById(id);
        datos.put("data", "venta eliminado");
        return new ResponseEntity<>(datos, HttpStatus.ACCEPTED);
    }
}
