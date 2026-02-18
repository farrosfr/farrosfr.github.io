---
title: OWASP Top 10 2025: Insecure Data Handling | TryHackMe
publishDate: '2026-02-18'
description: Learn about A04, A05, and A08 as they related to insecure data handling.
tags: []
heroImage: {src: './a.webp'}
---

🔗 <https://tryhackme.com/room/owasptopten2025three>

## Task 1: Introduction

This room covers three elements of the OWASP Top 10 (2025) list related to application behaviour and user input: Cryptographic Failures (A04), Injection (A05), and Software or Data Integrity Failures (A08). You will learn about these vulnerabilities, how to prevent them, and practice exploiting them using a deployed Virtual Machine.

**I'm ready!**

> No answer needed

## Task 2: A04: Cryptographic Failures

Cryptographic failures occur when sensitive data is not adequately protected due to weak encryption algorithms (like MD5 or SHA1), lack of hashing, or poor key management. Prevention involves using strong, modern algorithms (like bcrypt for passwords) and never embedding credentials in source code. The practical exercise involves a note-sharing app using a weak shared key.

**Decrypt the encrypted notes. One of them will contain a flag value. What is it?**

> THM{...}

## Task 3: A05: Injection

Injection happens when an application processes untrusted user input directly into a system (like a database or shell) without sanitization. Common types include SQL Injection, Command Injection, and Server Side Template Injection (SSTI). To prevent this, input should always be treated as untrusted, using parameterized queries and strict validation. The practical demonstrates an SSTI attack.

**Perform an SSTI attack on the practical. You need to read the contents of flag.txt that is located within the same directory as the web application.**

> THM{...}

## Task 4: A08: Software or Data Integrity Failures

This vulnerability occurs when applications rely on code, updates, or data without verifying their integrity or origin (e.g., unverified software updates or insecure deserialization). Prevention requires establishing trust boundaries and using cryptographic checks (checksums) to verify artifacts. The practical demonstrates a Python deserialization attack using the pickle module.

**Use Python to pickle a malicious, serialised payload that reads the contents of flag.txt and submits it to the application. What are the contents of flag.txt?**

> THM{...}
