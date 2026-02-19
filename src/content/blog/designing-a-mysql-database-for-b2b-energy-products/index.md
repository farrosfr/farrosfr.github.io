---
title: Designing a MySQL Database for B2B Energy Products
publishDate: '2026-02-19'
description: Design a scalable MySQL database for B2B electrical and renewable energy products with tier pricing, categories, brands, and multi-currency support.
tags: [webdev, ]
heroImage: {src: './a.webp'}
---

## 1. Introduction

In this article, we will walk through how to design and implement a **MySQL database** for a B2B project that manages electrical materials and renewable energy products.

The system will handle:

* Core product data (SKU, price, stock, etc.)
* Multi-level categories (category → subcategory → sub-subcategory)
* Brand management
* Tier pricing (volume-based pricing)
* Multi-currency support (USD & IDR/Rupiah)

This design follows relational database best practices: normalization, foreign keys, indexing, and scalability.

---

## 2. System Overview

The project is a **B2B product catalog + pricing engine** for materials such as:

* Cables
* Circuit breakers
* Solar panels
* Inverters
* Battery systems
* Switchgear
* Renewable energy components

Because this is B2B, it requires:

* Tier pricing (bulk discount)
* Multiple currencies (USD & IDR)
* Clear product hierarchy
* Brand-based filtering
* Stock and MOQ control

---

## 3. System Architecture Diagram (ASCII)

### System Flow (User → Database)

```bash
+-------------------+
|   B2B Customer    |
+---------+---------+
          |
          v
+-------------------+
|   Web / API App   |
| (Laravel / Node)  |
+---------+---------+
          |
          v
+-------------------+
|   Business Logic  |
| - Pricing Engine  |
| - Tier Calculation|
| - Currency Logic  |
+---------+---------+
          |
          v
+-------------------+
|      MySQL DB     |
|-------------------|
| products          |
| brands            |
| categories        |
| tier_prices       |
| product_categories|
+-------------------+
```

---

### Product Data Relationship Flow (Database Structure)

```bash
                 +----------------+
                 |    brands      |
                 |----------------|
                 | id (PK)        |
                 | name           |
                 +--------+-------+
                          |
                          |
                          v
+----------------+    +----------------+
|   categories   |    |    products    |
|----------------|    |----------------|
| id (PK)        |    | id (PK)        |
| name           |    | sku            |
| parent_id (FK) |    | product_name   |
+--------+-------+    | brand_id (FK)  |
         |            | price_usd      |
         |            | price_idr      |
         |            +--------+-------+
         |                     |
         |                     v
         |            +----------------+
         |            |  tier_prices   |
         |            |----------------|
         |            | product_id (FK)|
         |            | min_qty        |
         |            | price_usd      |
         |            | price_idr      |
         |            +----------------+
         |
         v
+----------------------+
| product_categories   |
|----------------------|
| product_id (FK)      |
| category_id (FK)     |
+----------------------+
```

---

### Tier Pricing Logic Flow (Business Logic)

```bash
Customer selects quantity (Q)
              |
              v
Fetch all tier_prices
ORDER BY min_qty DESC
              |
              v
Find first tier where:
Q >= min_qty
              |
              v
Apply tier price
              |
              v
Return final price (USD / IDR)
```

---

### Category Hierarchy Logic

```bash
Electrical
   |
   +-- Cable
   |      |
   |      +-- Solar Cable
   |
   +-- Circuit Breaker
   |
   +-- Renewable Energy
          |
          +-- Solar Panel
          +-- Inverter
```

---

## 4. Database Design

We will design the following tables:

### Main Tables

* `products`
* `brands`
* `categories`
* `product_categories`
* `tier_prices`

Optional extension:

* `currencies`
* `product_documents`

---

## 5. Table Implementation

### Category Structure

Since we have:

* Category
* Sub Category
* Sub Sub Category

We will use a **self-referencing (adjacency list) model**.

#### categories table

```sql
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    parent_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES categories(id)
);
```

#### How it works

| id | name        | parent_id |
| -- | ----------- | --------- |
| 1  | Electrical  | NULL      |
| 2  | Cable       | 1         |
| 3  | Solar Cable | 2         |

This allows unlimited depth while keeping schema simple.

### Brand Table

```sql
CREATE TABLE brands (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Products Table

This is the core of the system.

#### Required Fields

* SKU
* Product Name
* Description / Specification
* Datasheet
* Price (USD & IDR)
* Stock
* Unit
* MOQ
* Brand reference

```sql
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sku VARCHAR(50) NOT NULL UNIQUE,
    product_name VARCHAR(255) NOT NULL,
    description TEXT,
    datasheet_url VARCHAR(255),

    price_usd DECIMAL(15,2) NOT NULL,
    price_idr DECIMAL(18,2) NOT NULL,

    stock INT DEFAULT 0,
    unit VARCHAR(50) NOT NULL,
    moq INT DEFAULT 1,

    brand_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (brand_id) REFERENCES brands(id)
);
```

### Product–Category Relationship

A product may belong to multiple categories.

```sql
CREATE TABLE product_categories (
    product_id INT,
    category_id INT,
    PRIMARY KEY (product_id, category_id),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);
```

---

## 6. Tier Pricing Logic

This is critical in B2B.

Example:

* 1–9 units: $100
* 10–49 units: $90
* 50+ units: $80

```sql
CREATE TABLE tier_prices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    min_qty INT NOT NULL,
    price_usd DECIMAL(15,2) NOT NULL,
    price_idr DECIMAL(18,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
```

### Example Data

| product_id | min_qty | price_usd | price_idr |
| ---------- | ------- | --------- | --------- |
| 1          | 1       | 100.00    | 1500000   |
| 1          | 10      | 90.00     | 1350000   |
| 1          | 50      | 80.00     | 1200000   |

---

## 7. Query Examples

```sql
INSERT INTO brands (name)
VALUES ('Schneider Electric');

INSERT INTO products (
    sku,
    product_name,
    description,
    datasheet_url,
    price_usd,
    price_idr,
    stock,
    unit,
    moq,
    brand_id
) VALUES (
    'MCB-SCH-16A',
    'Miniature Circuit Breaker 16A',
    '1P 16A MCB for residential and industrial use',
    'https://example.com/datasheet.pdf',
    25.00,
    375000,
    500,
    'pcs',
    10,
    1
);
```

### Get Product With Tier Price

```sql
SELECT p.product_name, t.min_qty, t.price_usd
FROM products p
JOIN tier_prices t ON p.id = t.product_id
WHERE p.sku = 'MCB-SCH-16A'
ORDER BY t.min_qty ASC;
```

---

### Get All Solar Category Products

```sql
SELECT p.product_name
FROM products p
JOIN product_categories pc ON p.id = pc.product_id
JOIN categories c ON pc.category_id = c.id
WHERE c.name = 'Solar Cable';
```

---

### Multi-Currency Strategy

Two approaches:

### Approach A: Store Both USD & IDR (Simple)

✔ Fast

✔ No conversion needed

❌ Must manually update exchange rates

### Approach B: Store USD Only + Exchange Rate Table

```sql
CREATE TABLE exchange_rates (
    currency_code VARCHAR(10) PRIMARY KEY,
    rate_to_usd DECIMAL(15,6),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Then convert dynamically.

For B2B in Indonesia, storing both USD & IDR is usually practical.

---

## 10. Performance Considerations

Add indexes:

```sql
CREATE INDEX idx_sku ON products(sku);
CREATE INDEX idx_category_parent ON categories(parent_id);
CREATE INDEX idx_tier_product ON tier_prices(product_id);
```

For large datasets:

* Use pagination
* Avoid SELECT *
* Consider caching tier pricing

---

### Scaling for Real B2B

To make it production-ready:

Add:

* `customers`
* `customer_groups`
* Custom pricing per group
* Order management
* Quotation system
* API layer
* Soft delete column

---

### Final Architecture Summary

This MySQL design provides:

* Structured hierarchical categories
* Brand management
* Multi-currency pricing
* Tier pricing for bulk
* Clean relational design
* Scalable B2B foundation

It is optimized for:

* Electrical material distributors
* Renewable energy suppliers
* Solar project vendors
* Industrial procurement platforms
