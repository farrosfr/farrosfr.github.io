---
title: 'Un-bypassable Windows Hardening for Content Filtering'
publishDate: '2026-04-17'
description: 'A multi-layered defense-in-depth guide to locking down Windows using Registry policies, DNS over HTTPS, and privilege management to block adult content.'
tags: ['windows', 'security', 'red-teaming', 'dns']
heroImage: {src: './1.webp'}
---

Technology is a double-edged sword; while it has the power to empower and connect us, it can also be a tool for destruction. I am sharing this hardening method to combat the proliferation of content that is dangerous to our society—specifically explicit and harmful adult content—in an effort to protect and build a better generation.

When hardening a system against such content, a single layer is never enough. This guide uses a Red Teaming "Defense in Depth" approach to ensure filtering remains active even if the user tries to bypass it.

## Why OpenDNS FamilyShield?

Before settling on this setup, I researched several major DNS providers focused on family safety:

- **Cloudflare Family (1.1.1.3):** Fast and reliable, but sometimes lacks the granular strictness needed for deep content filtering.
- **CleanBrowsing:** Highly effective, but some advanced features are locked behind a subscription.
- **NextDNS:** Excellent customization and analytics. However, their free tier is limited to **300,000 queries per month**, which is often insufficient for a busy home or office environment, leading to filtered traffic being allowed once the limit is hit.

I chose **OpenDNS FamilyShield** because it is completely free, requires zero configuration to start blocking adult content (no custom IDs or links needed), and is incredibly strict by default. It provides a robust "set and forget" foundation for our hardening layers.

## Layer 1: The Network Perimeter (Router)

The first line of defense is your gateway. By setting DNS at the router level, every device on the network is protected by default.

**How to do it:** Log into your router's admin panel (usually `192.168.1.1`). Find the **DHCP** or **Internet** settings and set the DNS servers to OpenDNS FamilyShield:

- **IPv4:** `208.67.222.123` and `208.67.220.123`
- **IPv6:** `2620:119:35::123` and `2620:119:53::123`

## Layer 2: The OS Adapter Layer

Even if the router is bypassed, the Windows network adapter acts as a secondary filter.

![Configuring IPv4 DNS settings](image-2.png)

Run this in PowerShell as Admin to force system-wide DNS. You have two options:

### Option A: Active Adapters Only (Standard)

Use this if you only want to affect the connection you are currently using.

```powershell
$dnsIpv4 = @("208.67.222.123", "208.67.220.123")
$dnsIpv6 = @("2620:119:35::123", "2620:119:53::123")

$adapters = Get-NetAdapter | Where-Object { $_.Status -eq "Up" }
foreach ($adapter in $adapters) {
    Set-DnsClientServerAddress -InterfaceAlias $adapter.Name -ServerAddresses $dnsIpv4
    Set-DnsClientServerAddress -InterfaceAlias $adapter.Name -ServerAddresses $dnsIpv6 -ErrorAction SilentlyContinue
}
Clear-DnsClientCache
```

### Option B: Full Hardening (All Adapters)

Recommended for laptops. This ensures that even if you switch from Wi-Fi to Ethernet later, the protection remains active.

```powershell
$dnsIpv4 = @("208.67.222.123", "208.67.220.123")
$dnsIpv6 = @("2620:119:35::123", "2620:119:53::123")

Get-NetAdapter | Set-DnsClientServerAddress -ServerAddresses $dnsIpv4
Get-NetAdapter | Set-DnsClientServerAddress -ServerAddresses $dnsIpv6 -ErrorAction SilentlyContinue
Clear-DnsClientCache
```

## Layer 3: The Browser Layer (Policy Hardening)

Modern browsers often use **DNS over HTTPS (DoH)**, which can bypass both Router and Adapter settings. We use Windows Registry Policies to lock the browser into a secure DoH provider and prevent the user from disabling it.

### Firefox

```powershell
Stop-Process -Name firefox -Force -ErrorAction SilentlyContinue
$path = "HKLM:\SOFTWARE\Policies\Mozilla\Firefox\DNSOverHTTPS"
if (!(Test-Path $path)) { New-Item -Path $path -Force | Out-Null }

Set-ItemProperty -Path $path -Name "Enabled" -Value 1 -Type DWord
Set-ItemProperty -Path $path -Name "Locked" -Value 1 -Type DWord
Set-ItemProperty -Path $path -Name "ProviderURL" -Value "https://doh.familyshield.opendns.com/dns-query" -Type String
Write-Host "Firefox DNS is now locked to OpenDNS." -ForegroundColor Green
```

### Chrome, Edge, Brave, & Opera (Chromium-based)

Most modern browsers are Chromium-based and share similar policy structures, but they use different Registry paths. Run these to lock DoH for your preferred browser:

```powershell
# Define the DNS settings
$dohMode = "secure"
$dohTemplate = "https://doh.familyshield.opendns.com/dns-query"

# Registry Paths for different browsers
$paths = @(
    "HKLM:\SOFTWARE\Policies\Google\Chrome",        # Chrome
    "HKLM:\SOFTWARE\Policies\Microsoft\Edge",      # Edge
    "HKLM:\SOFTWARE\Policies\BraveSoftware\Brave", # Brave
    "HKLM:\SOFTWARE\Policies\Vivaldi",             # Vivaldi
    "HKLM:\SOFTWARE\Policies\Opera"                # Opera
)

foreach ($path in $paths) {
    if (!(Test-Path $path)) { New-Item -Path $path -Force | Out-Null }
    Set-ItemProperty -Path $path -Name "DnsOverHttpsMode" -Value $dohMode -Type String
    Set-ItemProperty -Path $path -Name "DnsOverHttpsTemplates" -Value $dohTemplate -Type String
}

Write-Host "Chromium-based browsers are now locked to OpenDNS." -ForegroundColor Green
```

## Layer 4: Content & Search Enforcement (Hosts)

We can force "SafeSearch" at the IP level by modifying the `hosts` file. This prevents users from seeing explicit results even on "clean" search engines. We also block "Proxy Search Engines" like Startpage, which can be used to bypass DNS filters via their "Anonymous View" feature.

```bash
# Google & YouTube SafeSearch
216.239.38.120 www.google.com
216.239.38.120 google.com
216.239.38.120 www.youtube.com
216.239.38.120 m.youtube.com

# Bing SafeSearch
204.79.197.220 www.bing.com

# DuckDuckGo SafeSearch
52.149.246.39 safe.duckduckgo.com

# Brave SafeSearch
# (Note: Brave uses its own indexing, but blocking specific domains can help)
0.0.0.0 search.brave.com # Optional: Block if you want to force Google/Bing SafeSearch

# Startpage (Proxy Bypass)
# Startpage's "Anonymous View" acts as a web proxy, bypassing DNS filters.
0.0.0.0 startpage.com
0.0.0.0 www.startpage.com
0.0.0.0 s7.startpage.com
```

## Layer 5: Privilege Management (The Lock)

The most critical layer. All the settings above can be reversed if the user has Administrative privileges. By switching to a **Standard User** account, the user cannot modify the Registry, the Hosts file, or Network Adapter settings.

![Setting up a Standard User account](image-3.png)

**Security Note:** For this "Lock" to be effective, your primary Administrative account must have a strong password that the Standard User does not know. This prevents the user from using "Run as Administrator" to bypass your policies.

This final step also prevents the installation of **VPNs, Proxies, or Portable Browsers** that could tunnel traffic past our DNS filters. Since a Standard User cannot install new network drivers, they are effectively locked into the hardened environment.

---

## How to Verify Your Setup

Once you've applied all layers, perform these tests to ensure your "Defense in Depth" is active:

1. **OpenDNS Welcome Page:** Visit [welcome.opendns.com](https://welcome.opendns.com). You should see a message saying: *"Welcome to OpenDNS! Your internet is safer, faster, and smarter."*
2. **The "Blocked" Test:** Try to visit a known adult site. You should be greeted by the OpenDNS "This site is blocked" page.
3. **The Browser Lock:** Open your browser's DNS settings. You should see a message stating: *"Your browser is managed by your organization"* and the option to change DNS settings should be disabled (greyed out).

---

## Red Team Insight: The Defense in Depth Structure

As a Red Teamer, I approach security by looking for the "weakest link." A single filter is just a hurdle; a multi-layered defense is a wall. This guide follows a **Defense in Depth (DiD)** structure designed to fail-safe:

1. **Perimeter (Router):** The first line of defense. It catches every device on the network before they even reach the OS.
2. **System (Adapter):** If a device leaves the network or uses a VPN that doesn't leak DNS, the OS-level adapter settings act as a secondary guard.
3. **Application (Browser Policy):** Many modern threats (and bypasses) happen at the application layer. By using Registry Policies, we force the browser to obey the rules, even if the user tries to toggle settings in the UI.
4. **Content (Hosts):** We target the specific content delivery method (Search Engines) to ensure that even "clean" sites don't serve explicit results.
5. **Privilege (Standard User):** The ultimate lock. In security, **Identity and Access Management (IAM)** is king. Without Admin rights, the user cannot tear down the other four layers.

By layering these controls, you create a system where the "cost of bypass" is higher than the user's technical ability or patience.
