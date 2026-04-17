---
title: Calculating Global Import Costs for Industrial Products
publishDate: '2026-04-14'
description: A step-by-step guide to calculating the total cost of importing industrial goods, including shipping, duties, and taxes, featuring a 50MWp PV module case study.
tags: [Logistics, Industry]
heroImage: {src: './1.webp'}
---

When importing industrial products from the global market, the price you see on a B2B website is only the beginning. To determine the true "landed cost," you must account for logistics, duties, and local taxes.

In this guide, I will demonstrate how to calculate the pricing flow using **PV Modules (Solar Panels)** imported from China to Indonesia as a case study.

## 1. Understanding Product Pricing (EXW)

Most industrial suppliers quote prices based on **EXW (Ex Works)**, meaning the price only covers the goods at the factory door. Shipping and handling are your responsibility.

![Industrial Pricing Example](./image.png)

**Example Project Details:**

* **Project Size:** 50 MWp (50,000,000 Wp)
* **Module Capacity:** 650 Wp per panel
* **Unit Price:** $0.08 / Wp

**Cost of Goods Calculation:**

* **Total Panels:** 50,000,000 Wp ÷ 650 Wp = **76,924 panels**
* **Total EXW Cost:** 50,000,000 Wp × $0.08 = **$4,000,000.00**

## 2. Logistics & Container Calculation

Industrial orders are shipped in containers. For PV modules, we typically use 40'HC (High Cube) containers.

* **Load per Container:** 31 panels per pallet × 20 pallets = 620 panels
* **Total Containers Required:** 76,924 panels ÷ 620 = **125 x 40'HC containers**

To estimate shipping costs, you can use platforms like [Freightos](https://ship.freightos.com). Register an account and input your details:

![Freightos Interface](./image-1.png)

You can choose your preferred currency (USD, EUR, or GBP) and then fill in these four key fields:

* **Origin**
* **Destination**
* **Load**
* **Goods**

![Freightos Input Fields](./image-2.png)

**Estimated Shipping Cost:** ~$448,683.58 (based on current market rates).

## 3. Adding Duties and Taxes (The "Hidden" Costs)

This is where many calculations fail. For Indonesia, you must consider the **HS Code (8541.43.00)** for PV modules.

| Component | Rate | Calculation Base | Estimated Cost |
| :--- | :--- | :--- | :--- |
| **Import Duty** | 0% | CIF (Goods + Insurance + Freight) | $0 (ACFTA Agreement) |
| **VAT (PPN)** | 11% | CIF + Duty | ~$489,355 |
| **Income Tax (PPh 22)** | 2.5% | CIF + Duty | ~$111,217 |

*Note: PPh 22 is 2.5% for owners of an API (Import Identification Number) and 7.5% without one.*

## 4. Final Landed Cost

To get your final price per unit, sum all costs:

1. **EXW Cost:** $4,000,000
2. **Shipping & Insurance:** $448,683
3. **Taxes (VAT + PPh 22):** $600,572
4. **Total Landed Cost:** **$5,049,255**

**Final Unit Price:** $5,049,255 ÷ 50,000,000 Wp = **$0.101 / Wp**

By following this flow, you can accurately predict whether your project is financially viable before signing any contracts. Always remember to check for the latest **SNI certifications** and **TKDN (Local Content)** regulations in your specific country!


---


Hidden logistic cost
- Inland China TRansport: door-to-door or port-to-port
- Destination port charges: Lifting 125 containers need terminal handling changes (THC)
- Custom agent & inland trucking: you have to pay aPPJK (custom clearance agency) and hire 125 trucks to move panel from indonesian port to actual solar farm site

