package com.api.crud.product;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "producto") // Nombre de la tabla en español
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name; // Puedes cambiar esto a "nombre" si prefieres en español

    private float price; // Puedes cambiar esto a "precio" si prefieres en español

    private LocalDate fecha;

    // Nuevos campos
    private String codigo; // Código del producto
    private String descripcion; // Descripción del producto
    private String categoria; // Categoría o familia del producto
    private float costo; // Costo de producción
    private String unidadDeMedida; // Unidad en la que se mide el producto
    private float peso; // Peso del producto
    private String marca; // Marca del producto
    private float margenDeGanancia; // Margen de ganancia
    private String tipo; // Tipo de producto (e.g., "Inventariable", "Gasto")
    private boolean vendible; // Si el producto está disponible para la venta
    private String estado; // Estado del producto (e.g., "Activo", "Inactivo")
    private String ean13; // Código EAN-13 del producto
    private float volumen; // Volumen del producto
    private String procedencia; // Procedencia del producto (e.g., "Nacional", "Importado")
    private String moneda; // Moneda en la que se establece el precio
    private String afectoOExento; // Afecto o exento de impuestos
    private String imagen; // URL o ruta del archivo de la imagen

    public Producto() {
    }

    public Producto(Long id, String name, float price, LocalDate fecha, String codigo, String descripcion,
                    String categoria, float costo, String unidadDeMedida, float peso, String marca,
                    float margenDeGanancia, String tipo, boolean vendible, String estado, String ean13,
                    float volumen, String procedencia, String moneda, String afectoOExento, String imagen) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.fecha = fecha;
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.costo = costo;
        this.unidadDeMedida = unidadDeMedida;
        this.peso = peso;
        this.marca = marca;
        this.margenDeGanancia = margenDeGanancia;
        this.tipo = tipo;
        this.vendible = vendible;
        this.estado = estado;
        this.ean13 = ean13;
        this.volumen = volumen;
        this.procedencia = procedencia;
        this.moneda = moneda;
        this.afectoOExento = afectoOExento;
        this.imagen = imagen;
    }

    public Producto(String name, float price, LocalDate fecha, String codigo, String descripcion, String categoria,
                    float costo, String unidadDeMedida, float peso, String marca, float margenDeGanancia, String tipo,
                    boolean vendible, String estado, String ean13, float volumen, String procedencia, String moneda,
                    String afectoOExento, String imagen) {
        this.name = name;
        this.price = price;
        this.fecha = fecha;
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.costo = costo;
        this.unidadDeMedida = unidadDeMedida;
        this.peso = peso;
        this.marca = marca;
        this.margenDeGanancia = margenDeGanancia;
        this.tipo = tipo;
        this.vendible = vendible;
        this.estado = estado;
        this.ean13 = ean13;
        this.volumen = volumen;
        this.procedencia = procedencia;
        this.moneda = moneda;
        this.afectoOExento = afectoOExento;
        this.imagen = imagen;
    }

    // Métodos Getters y Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public float getCosto() {
        return costo;
    }

    public void setCosto(float costo) {
        this.costo = costo;
    }

    public String getUnidadDeMedida() {
        return unidadDeMedida;
    }

    public void setUnidadDeMedida(String unidadDeMedida) {
        this.unidadDeMedida = unidadDeMedida;
    }

    public float getPeso() {
        return peso;
    }

    public void setPeso(float peso) {
        this.peso = peso;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public float getMargenDeGanancia() {
        return margenDeGanancia;
    }

    public void setMargenDeGanancia(float margenDeGanancia) {
        this.margenDeGanancia = margenDeGanancia;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public boolean isVendible() {
        return vendible;
    }

    public void setVendible(boolean vendible) {
        this.vendible = vendible;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getEan13() {
        return ean13;
    }

    public void setEan13(String ean13) {
        this.ean13 = ean13;
    }

    public float getVolumen() {
        return volumen;
    }

    public void setVolumen(float volumen) {
        this.volumen = volumen;
    }

    public String getProcedencia() {
        return procedencia;
    }

    public void setProcedencia(String procedencia) {
        this.procedencia = procedencia;
    }

    public String getMoneda() {
        return moneda;
    }

    public void setMoneda(String moneda) {
        this.moneda = moneda;
    }

    public String getAfectoOExento() {
        return afectoOExento;
    }

    public void setAfectoOExento(String afectoOExento) {
        this.afectoOExento = afectoOExento;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }
}
