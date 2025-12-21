---
title: Splunk | Advent of Cyber 2025 Day 3 Write-Up
publishDate: '2025-12-21 21:31:00'
description: TryHackMe Write-Up for Advent of Cyber 2025.
tags: [tryhackme, write-up]
heroImage: {src: './image.png', alt: 'credit: TryHackMe'}
language: 'en'
---
Here i want to share about my write-up for the room [Splunk | Advent of Cyber 2025 (Day 3)](https://tryhackme.com/room/splunkforloganalysis-aoc2025-x8fj2k4rqp).

Here is the extracted material formatted according to your requirements.

## Task 1: Introduction

The story begins in Wareville, where The Best Festival Company (TBFC) is preparing for Christmas. However, a ransom message from King Malhare appears, threatening to turn the holiday into "EAST-mas." With the network under attack and McSkidy missing, the SOC team must utilize **Splunk** to investigate the ransomware infiltration and stop the plan.

The learning objectives for this task include ingesting custom log data, creating field extractions, using Search Processing Language (SPL), and conducting a forensic investigation. The environment contains a pre-configured Splunk instance with the necessary logs.

**I successfully have access to the Splunk instance!**

> No answer needed

---

## Task 2: Log Analysis with Splunk

In this task, we investigate the incident using two pre-ingested datasets: `web_traffic` (web server logs) and `firewall_logs` (traffic allowed/blocked). The investigation process follows these steps:

1. **Initial Triage:** querying `index=main` reveals a massive spike in traffic. Using `timechart`, we can pinpoint the exact day of the attack.
2. **Anomaly Detection:** Analyzing the `user_agent` field shows suspicious tools (unlike standard Mozilla/Chrome browsers). Filtering out benign traffic reveals a single attacker IP address.
3. **Tracing the Attack Chain:**

* **Reconnaissance:** The attacker used tools like `curl` and `wget` to probe for configuration files (e.g., `/.env`, `/.git`).
* **Enumeration:** Path traversal attempts (`../../`) were detected to access system files.
* **Exploitation:** SQL Injection attacks were identified via user agents like `sqlmap` and `Havij`.
* **Exfiltration:** Large files (`backup.zip`, `logs.tar.gz`) were downloaded.
* **Ransomware Staging:** A web shell (`shell.php`) was used to execute a ransomware binary (`bunnylock.bin`), confirming Remote Code Execution (RCE).

1. **C2 Correlation:** By pivoting to `firewall_logs`, we confirmed the compromised server (10.10.1.5) established an outbound connection to the attacker's IP, transferring a significant volume of data.

**What is the attacker IP found attacking and compromising the web server?**

index=main sourcetype=web_traffic

![alt text](<Screenshot 2025-12-21 134028.png>)

> 198.51.100.55

**Which day was the peak traffic in the logs?**

index=main sourcetype=web_traffic

![alt text](<Screenshot 2025-12-21 134139.png>)

> 2025-10-12

**What is the count of Havij user_agent events found in the logs?**

index=main sourcetype=web_traffic user_agent=*Havij*

![alt text](<Screenshot 2025-12-21 134300.png>)

> 993

**How many path traversal attempts to access sensitive files on the server were observed?**

index=main sourcetype=web_traffic path="*..\/..\/*"

![alt text](<Screenshot 2025-12-21 134336.png>)

> 658

**Examine the firewall logs. How many bytes were transferred to the C2 server IP from the compromised web server?**

index=main sourcetype=firewall_logs action=ALLOWED| stats sum(bytes_transferred)

![alt text](<Screenshot 2025-12-21 135021.png>)

> 126167

**If you enjoyed today's room, check out the Incident Handling With Splunk room to learn more about analyzing logs with Splunk.**

> No answer needed
