# Arquitectura de código [ e-commerce ]

## Entidades y Relaciones

1. **User**

   - **Atributos:**
     - id_user (PK)
     - name
     - email
     - dni
     - phone
     - birthdate
     - country
     - city
     - address
     - user_name
     - password
     - rol (para diferenciar entre usuario normal y administrador)
   - **Relaciones:**
     - Un usuario puede tener muchas órdenes de compra (relación uno a muchos con Orden de Compra).

2. **Product**

   - **Atributos:**
     - id_product (PK)
     - name
     - description
     - price
     - stock
     - url_image
   - **Relaciones:**
     - Un producto puede estar en muchos detalles de compra (relación muchos a muchos con Detalle de Compra).

3. **Purchase Order**

   - **Atributos:**
     - id_orden (PK)
     - date
     - total_price
     - id_user (FK)
   - **Relaciones:**
     - Una orden de compra pertenece a un Usuario (relación muchos a uno con Usuario).
     - Una orden de compra tiene un detalle de compra (relación uno a uno con Detalle de Compra).

4. **Purschase Detail**

   - **Atributos:**
     - id_detail (PK)
     - id_order (FK)
     - id_product (FK)
     - quantity
     - unit_price
     - payment_type
   - **Relaciones:**
     - Un detalle de compra pertenece a una orden de compra (relación uno a uno con Orden de Compra).
     - Un detalle de compra está asociado a un o varios productos (relación muchos a muchos con Producto).

5. **Categories**
   - **Atributos:**
     - id (PK)
     - name
   - **Relaciones:**
     - Una categoria puede estar en varios productos y varios productos pueden tener varias categorias (relación muchos a muchos con productos).

# Diagrama Entidad Relación

![DER e-commerce](<./assets/Diagrama ER de base de datos.png>)
