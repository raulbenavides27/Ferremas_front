package com.api.crud.producto;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
    Optional<Producto> findProductByName(String name);
    Optional<Producto> findProductByCodigo(String codigo);
    Optional<Producto> findProductByEan13(String ean13);
}
