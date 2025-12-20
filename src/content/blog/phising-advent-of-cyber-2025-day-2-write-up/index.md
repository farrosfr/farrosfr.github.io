---
title: Phising | Advent of Cyber 2025 Day 2 Write-Up
publishDate: '2025-12-21 06:35:00'
description: TryHackMe Write-Up for Advent of Cyber 2025.
tags: [tryhackme, write-up]
heroImage: {src: './image.png', alt: 'credit: TryHackMe'}
language: 'en'
---
Here i want to share about my write-up for the room [Phising | Advent of Cyber 2025 (Day 2)](https://tryhackme.com/room/phishing-aoc2025-h2tkye9fzU).

## Task 1: Introduction

This section introduces the scenario: The Best Festival Company (TBFC) has faced security threats, prompting a Red Team assessment. You are working with "Recon McRed" and others to execute a phishing campaign to test employee diligence. The objective is to learn about social engineering, types of phishing, creating fake login pages, and using the Social-Engineer Toolkit. This task also involves initializing the necessary AttackBox and Target VM environments.

**I have successfully started the AttackBox and the target machine!**

> No answer needed

---

## Task 2: Phishing Exercise for TBFC

This task dives into the mechanics of social engineering and phishing. It defines **Social Engineering** as manipulating humans into making security mistakes by exploiting psychology (urgency, curiosity, authority), and **Phishing** as a subset of this using communication mediums like email.

The task outlines the **S.T.O.P.** method for defense (Suspicious, Telling, Offering, Pushing) and guides the user through a Red Team attack simulation:

1. **Building the Trap:** A fake TBFC login page script (`server.py`) is provided. When run, it hosts a web server on port 8000 to capture credentials.
2. **Delivery:** Using the **Social-Engineer Toolkit (SET)** (`setoolkit`), the attacker configures a "Mass Mailer Attack".
3. **Configuration:** The email is spoofed to look like it comes from "Flying Deer" (`updates@flyingdeer.thm`) and is sent to `factory@wareville.thm` via the internal SMTP server. The body contains the link to the malicious server (`http://<IP>:8000`).
4. **Exploitation:** Once the target clicks the link and logs in, the credentials are captured in the attacker's terminal.

**What is the password used to access the TBFC portal?**

![alt text](<Screenshot 2025-12-21 062704.png>)

> unranked-wisdom-anthem

**Browse to [http://10.49.171.168](http://10.49.171.168) from within the AttackBox and try to access the mailbox of the factory user to see if the previously harvested admin password has been reused on the email portal. What is the total number of toys expected for delivery?**

![alt text](<Screenshot 2025-12-21 062821.png>)

![alt text](<Screenshot 2025-12-21 063038.png>)

> 1984000

**If you enjoyed today's room, feel free to check out the Phishing Prevention room.**

> No answer needed
