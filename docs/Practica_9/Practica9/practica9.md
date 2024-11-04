# Practica 9

## Integrantes

- Diego Lecanda
- Grecia Lorena
- Fernando Horta

---

### Diagrama E-R

![Diagrama E-R](/docs/Practica_9/Img/Diagram_E-R.png)

---

### Codigo SQL

```-- Crear tabla de usuarios
CREATE TABLE USER (
    ID_user INT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Address VARCHAR(255),
    zip_code VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Telephone VARCHAR(20)
);

-- Crear tabla de categorías
CREATE TABLE CATEGORY (
    ID_category INT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description TEXT
);

-- Crear tabla de productos
CREATE TABLE PRODUCT (
    ID_product INT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    Price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    Category INT,
    Stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Category) REFERENCES CATEGORY(ID_category)
);

-- Crear tabla de carrito
CREATE TABLE CART (
    ID_cart INT PRIMARY KEY,
    ID_user INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Status VARCHAR(50),
    FOREIGN KEY (ID_user) REFERENCES USER(ID_user)
);

-- Crear tabla de items del carrito
CREATE TABLE CART_ITEMS (
    ID_cart_item INT PRIMARY KEY,
    ID_cart INT,
    ID_product INT,
    Quantity INT NOT NULL,
    Subtotal DECIMAL(10, 2),
    FOREIGN KEY (ID_cart) REFERENCES CART(ID_cart),
    FOREIGN KEY (ID_product) REFERENCES PRODUCT(ID_product)
);

-- Crear tabla de órdenes
CREATE TABLE ORDERS (
    ID_order INT PRIMARY KEY,
    ID_user INT,
    ID_cart INT,
    Total DECIMAL(10, 2),
    Status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ID_user) REFERENCES USER(ID_user),
    FOREIGN KEY (ID_cart) REFERENCES CART(ID_cart)
);

-- Crear tabla de información de producto (relación entre producto y categoría)
CREATE TABLE PRODUCT_INFO (
    ID_pxc INT PRIMARY KEY,
    ID_Product INT,
    ID_Category INT,
    FOREIGN KEY (ID_Product) REFERENCES PRODUCT(ID_product),
    FOREIGN KEY (ID_Category) REFERENCES CATEGORY(ID_category)
);
```
