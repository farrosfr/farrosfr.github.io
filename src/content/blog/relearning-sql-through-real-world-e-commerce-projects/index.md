---
title: Relearning SQL Through Real-World E-Commerce Projects
publishDate: '2026-02-09'
description: Sharing my journey relearning SQL by working on real e-commerce projects using MySQL and PostgreSQL, focusing on practical business-driven queries.
tags: [webdev, sql, e-commerce]
heroImage: { src: './image.png' }
---

I want to share my experience of relearning SQL, which I am currently diving back into.

This started because my current project is closely related to SQL, specifically an e-commerce platform. The backend stack uses MySQL with Laravel, and in some parts PostgreSQL as well. Because of that, I became interested in revisiting SQL fundamentals and sharpening my skills again.

To rebuild a solid foundation, I decided to study through DataCamp and completed the following courses:

- Introduction to SQL  
  <https://www.datacamp.com/completed/statement-of-accomplishment/course/2a5b95c3d50b83f77f051cbd99e0c10400d65458>

- Introduction to SQL Server  
  <https://www.datacamp.com/completed/statement-of-accomplishment/course/a115bdd43fa73424e6a572e71cc3c1261ab649b0>

- Intermediate SQL Server  
  <https://www.datacamp.com/completed/statement-of-accomplishment/course/ca7b3bed05e7b9e4404553adbb830d75b3c87317>

Previously, I worked as a data engineer for several years before taking a step back to explore different technical directions.

At the moment, I am learning SQL through more realistic and business-driven queries that reflect real workflows. Since my focus is e-commerce, I am exploring how to design and query data related to products, transactions, users, admins, categories, inventory stock, pricing, shipping processes, invoices, payments, and many other related tables.

The goal is not just to write SQL queries, but to truly understand how data flows in a real production system.

Below are several SQL and database technologies that I have worked with:

## MySQL

Well-suited for Laravel/PHP stacks, startups (mid-scale), and CRUD-heavy applications.

### MySQL Pros

- Simple and stable
- Widely supported by hosting providers
- Affordable and easy to maintain

### MySQL Cons

- Complex queries can become expensive
- Advanced SQL features matured relatively late

### MySQL E-commerce use cases

- Products
- Orders
- Users
- Payments

---

## PostgreSQL

Well-suited for B2B e-commerce, systems with complex queries, and hybrid OLTP + analytics workloads.

### PostgreSQL Pros

- Rich and strict SQL implementation
- Powerful features such as window functions, CTEs, and JSONB
- Excellent for reporting and analytics with strong data integrity

### PostgreSQL Cons

- More complex setup and tuning
- Hosting is relatively more expensive
- Requires strong schema discipline

### PostgreSQL E-commerce use cases

- Pricing rules
- Contract-based pricing
- Inventory movements
- Invoices and financial reports
- Shipment analytics

---

## SQL Server

Well-suited for enterprise B2B systems, finance, ERP, internal platforms, and BI/data engineering teams.

### SQL Server Pros

- Strong tooling (SSMS, reporting services)
- Stable and reliable performance
- Excellent support for ETL and BI workflows (SSIS)
- Strong support for stored procedures and views

### SQL Server Cons

- Expensive licensing
- Rarely used in startup environments
- Less flexible compared to PostgreSQL

### SQL Server E-commerce use cases

- Data warehouses
- Financial reporting
- Sales dashboards
- Audit and compliance systems

---

## NoSQL

Best used as a complementary technology rather than a replacement for SQL databases.

### NoSQL E-commerce use cases

- Shopping carts
- User sessions
- Product view caching
- Activity logs
- Search indexing
