---
title: Database SQL Basics | TryHackMe Write-up
publishDate: '2026-4-1'
description: Complete walkthrough for Database SQL Basics TryHackme room. Learn the basics of databases and SQL by writing simple queries to retrieve and manage data.
tags: [tryhackme, write-up, security, ctf]
heroImage: {src: './1.webp'}
---
This is my write-up for the TryHackMe room on [Database SQL Basics](https://tryhackme.com/room/databasesqlbasics). Written in 2026, I hope this write-up helps others learn and practice cybersecurity.

## Task 1: Introduction

This section introduces the concept of databases by comparing them to a café's physical notebook. As a business grows, tracking orders with simple files becomes slow and confusing. Databases solve this by storing information in a structured, easily searchable, and manageable way. The learning objectives include understanding data, the purpose of databases, SQL, the structure of tables (rows and columns), and writing basic queries.

### Prerequisites

- [Inside a Computer System](https://tryhackme.com/room/insideacomputer)
- [Client-Server Basics](https://tryhackme.com/jr/clientserverbasics)
- [Data Representation](https://tryhackme.com/room/datarepresentation)

**I am ready to dive into the database!**
> No answer needed

## Task 2: Understanding Tables, Rows, and Columns

Databases organize information digitally so computers can search, count, and sort data in seconds. Inside a database, data is stored in tables, which resemble spreadsheets. Columns represent the type of information (e.g., drink, price), while rows represent a complete individual record (e.g., a single customer's order). SQL is the language used to ask the database questions, known as queries, to retrieve specific data without altering it.

**Inside databases, what is the term for the "spreadsheets" that store the information?**
> Table

## Task 3: Writing Your First SQL Query

This task explains the four core components of a basic SQL query:

- `SELECT`: Chooses which columns to display (using `*` selects all columns).
- `FROM`: Specifies which table the data comes from.
- `WHERE`: Filters the results to only show rows that match a specific condition.
- `ORDER BY`: Sorts the output by a specific column (defaults to lowest-to-highest; adding `DESC` reverses it to highest-to-lowest).
These keywords can be combined to run highly specific searches, like filtering for a specific drink and sorting the results by price.

**When you showed all orders, how many rows were returned?**

This is the script for the solution: SELECT * FROM Orders;

> 50

**When you sorted orders by price from cheapest to most expensive, which drink appeared first?**

This is the script for the solution: SELECT * FROM Orders ORDER BY price;

> Tea

**When you sorted the menu by price from most expensive to cheapest, which drink appeared first?**

This is the script for the solution: SELECT * FROM Orders ORDER BY price DESC;

> latte

## Task 4: Conclusion

The room concludes with a review of how databases store information using tables, rows, and columns. It recaps the four foundational SQL commands learned (`SELECT`, `FROM`, `WHERE`, `ORDER BY`) and how they are used to show, filter, sort, and retrieve data. Finally, it leaves you with a conceptual question about the security implications of allowing unauthorized users to modify or delete data.

**I have successfully completed this room and can write basic SQL queries.**
> No answer needed

Thanks for reading. See you in the next lab.
