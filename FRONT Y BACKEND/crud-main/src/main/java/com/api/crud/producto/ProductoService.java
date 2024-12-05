package com.api.crud.producto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;

    @Autowired
    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    // Método para obtener todos los productos
    public List<Producto> getProductos() {
        return productoRepository.findAll();
    }

    // Método para registrar un nuevo producto
    public ResponseEntity<Object> createProducto(Producto producto) {
        HashMap<String, Object> datos = new HashMap<>();

        // Verificar si el producto ya existe por nombre
        Optional<Producto> existingProductByName = productoRepository.findProductByName(producto.getName());
        if (existingProductByName.isPresent()) {
            datos.put("ERROR", true);
            datos.put("MESSAGE", "Este producto ya existe con el nombre proporcionado.");
            return new ResponseEntity<>(datos, HttpStatus.CONFLICT);
        }

        // Verificar si el producto ya existe por código
        Optional<Producto> existingProductByCodigo = productoRepository.findProductByCodigo(producto.getCodigo());
        if (existingProductByCodigo.isPresent()) {
            datos.put("ERROR", true);
            datos.put("MESSAGE", "Este producto ya existe con el código proporcionado.");
            return new ResponseEntity<>(datos, HttpStatus.CONFLICT);
        }

        // Verificar si el producto ya existe por ean13 (permitir nulos)
        if (producto.getEan13() != null) {
            Optional<Producto> existingProductByEan13 = productoRepository.findProductByEan13(producto.getEan13());
            if (existingProductByEan13.isPresent()) {
                datos.put("ERROR", true);
                datos.put("MESSAGE", "Este producto ya existe con el código EAN-13 proporcionado.");
                return new ResponseEntity<>(datos, HttpStatus.CONFLICT);
            }
        }

        // Guardar el nuevo producto
        Producto savedProduct = productoRepository.save(producto);

        // Preparar la respuesta
        datos.put("MESSAGE", "Producto creado.");
        datos.put("data", savedProduct);

        return new ResponseEntity<>(datos, HttpStatus.CREATED);
    }

    // Método para actualizar un producto existente
    public ResponseEntity<Object> updateProducto(Long id, Producto producto) {
        HashMap<String, Object> datos = new HashMap<>();

        // Verificar si el producto existe por id
        Optional<Producto> existingProduct = productoRepository.findById(id);
        if (existingProduct.isEmpty()) {
            datos.put("ERROR", true);
            datos.put("MESSAGE", "Producto no encontrado para actualizar.");
            return new ResponseEntity<>(datos, HttpStatus.NOT_FOUND);
        }

        // Actualizar el ID del producto
        producto.setId(id);

        // Verificar si el producto ya existe por ean13 (permitir nulos)
        if (producto.getEan13() != null) {
            Optional<Producto> existingProductByEan13 = productoRepository.findProductByEan13(producto.getEan13());
            if (existingProductByEan13.isPresent() && !existingProductByEan13.get().getId().equals(id)) {
                datos.put("ERROR", true);
                datos.put("MESSAGE", "Este producto ya existe con el código EAN-13 proporcionado.");
                return new ResponseEntity<>(datos, HttpStatus.CONFLICT);
            }
        }

        // Guardar el producto actualizado
        Producto updatedProduct = productoRepository.save(producto);

        // Preparar la respuesta
        datos.put("MESSAGE", "Producto actualizado.");
        datos.put("data", updatedProduct);

        return new ResponseEntity<>(datos, HttpStatus.OK);
    }

    // Método para eliminar un producto existente
    public ResponseEntity<Object> deleteProducto(Long id) {
        HashMap<String, Object> datos = new HashMap<>();

        // Verificar si el producto existe por id
        if (!productoRepository.existsById(id)) {
            datos.put("ERROR", true);
            datos.put("MESSAGE", "El producto no existe.");
            return new ResponseEntity<>(datos, HttpStatus.NOT_FOUND);
        }

        // Eliminar el producto por id
        productoRepository.deleteById(id);

        // Preparar la respuesta
        datos.put("MESSAGE", "Producto eliminado.");
        return new ResponseEntity<>(datos, HttpStatus.ACCEPTED);
    }
}
