package com.api.crud.despacho;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table
public class Despacho {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String idCliente;

    private String direccion;
    private LocalDate fechaEntrega;
    private String idProducto;
    private int cantidad;

    public Despacho() {
    }

    public Despacho(Long id, String idCliente, String direccion, LocalDate fechaEntrega, String idProducto, int cantidad) {
        this.id = id;
        this.idCliente = idCliente;
        this.direccion = direccion;
        this.fechaEntrega = fechaEntrega;
        this.idProducto = idProducto;
        this.cantidad = cantidad;
    }

    public Despacho(String idCliente, String direccion, LocalDate fechaEntrega, String idProducto, int cantidad) {
        this.idCliente = idCliente;
        this.direccion = direccion;
        this.fechaEntrega = fechaEntrega;
        this.idProducto = idProducto;
        this.cantidad = cantidad;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(String idCliente) {
        this.idCliente = idCliente;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public LocalDate getFechaEntrega() {
        return fechaEntrega;
    }

    public void setFechaEntrega(LocalDate fechaEntrega) {
        this.fechaEntrega = fechaEntrega;
    }

    public String getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(String idProducto) {
        this.idProducto = idProducto;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }
}
