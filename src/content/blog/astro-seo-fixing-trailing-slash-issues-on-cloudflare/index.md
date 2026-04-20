---
title: 'Astro SEO: Fixing Trailing Slash Issues on Cloudflare'
publishDate: '2026-04-20'
description: 'Learn how a mismatched trailing slash configuration between Astro and Cloudflare Pages caused a 70% drop in indexed pages and how I fixed the redirect loop.'
tags: ['seo', 'astro', 'cloudflare', 'webdev']
heroImage: { src: './1.png', color: '#223655' }
---

## The Shock: A Near-Zero Performance Drop

It started with a routine check of Google Search Console (GSC). What I saw was developer’s nightmare: a performance graph that looked like a cliff. After a steady climb to over 1,000 clicks, the traffic suddenly cratered to near zero.

![GSC Performance Drop](./image.png)

At first, I was confused. I hadn't changed any content, and there were no security manual actions or server errors. However, when I looked at the **Indexing** report, the truth came out. My indexed pages had plummeted from over 200 down to just 57.

![GSC Indexing Drop](./image2.png)

## The Context: Migrating from GitHub Pages to Cloudflare

The timing of this drop aligned with my migration from GitHub Pages to **Cloudflare Pages**. I made the move because I needed more advanced features, better edge performance, and higher bandwidth for my research lab, `farros.co`.

On GitHub Pages, my setup worked well with `trailingSlash: false` in my Astro config. But Cloudflare Pages handles URLs differently.

## The Investigation: Hunting the "Blocked" URLs

I turned to Ahrefs to get a deeper look at the site's health. The dashboard confirmed: a **Health Score of 57** and nearly 500 "Blocked" or redirect-heavy URLs.

![Ahrefs Dashboard Status](./image3.png)

When I dug into the "What's New" section of the audit, two errors were screaming for attention:

1. **Canonical points to redirect** (229 instances)
2. **3XX redirect in sitemap** (229 instances)

![Ahrefs Top Issues](./image4.png)

This was the "smoking gun." So many of my blog posts and category tags was stuck in a redirect loop.

## The Root Cause: The "Trailing Slash Bounce"

By looking at the Ahrefs crawl details, I found the "bounce" pattern. It was a conflict between the application logic (Astro) and the hosting provider (Cloudflare).

![Redirect Bounce Detail](./image5.png)

### How the conflict happened

1. **Astro Config:** I had `trailingSlash: 'never'` in my `astro.config.ts`.
2. **Canonical Tag:** Astro generated canonical links like `https://farros.co/blog/my-post` (no slash).
3. **Cloudflare Hosting:** Cloudflare Pages uses "Pretty URLs" by default. When it sees a directory-based build (which Astro uses for SSG), it **enforces** a trailing slash.
4. **The Loop:**
    - Googlebot visits `https://farros.co/blog/my-post/` (with slash).
    - The HTML says: *"The official (canonical) version is `https://farros.co/blog/my-post` (no slash)."*
    - Googlebot tries to go to the no-slash version.
    - Cloudflare catches the request and says: *"Nope, we use slashes here!"* and sends a **308 Permanent Redirect** back to the slash version.

Google sees this as a site that doesn't know where its own pages are, so it stops indexing them to avoid "Redirect Loops."

## The Fix: Synchronizing Astro with Cloudflare

The solution was to stop fighting the server and align Astro with Cloudflare's behavior. I modified the `astro.config.ts` to force trailing slashes:

```typescript
// astro.config.ts
export default defineConfig({
  site: 'https://farros.co',
  trailingSlash: 'always', // Changed from 'never'
  // ...
})
```

I also updated the RSS feed configuration to ensure the `rss.xml` generated URLs that matched the new standard:

```typescript
// src/pages/rss.xml.ts
return rss({
  trailingSlash: true,
  // ...
})
```

## Lessons Learned

Moving from one host to another isn't just about moving files; it's about understanding how the new environment handles path normalization.

- **GitHub Pages** is flexible and doesn't usually force redirects, making `trailingSlash: 'never'` safe.
- **Cloudflare Pages** is stricter with its "Pretty URLs" feature, making `trailingSlash: 'always'` the best practice for SEO consistency.

### References

- [Astro: Trailing Slash Configuration](https://docs.astro.build/en/reference/configuration-reference/#trailingslash)
- [Cloudflare Pages: Pretty URLs Documentation](https://developers.cloudflare.com/pages/configuration/serving-pages/#pretty-urls)
- [Google Search Central: Canonicalization Guide](https://developers.google.com/search/docs/crawling-indexing/canonicalization)

After deploying this fix, I triggered a re-crawl in Ahrefs and requested re-indexing in Google Search Console.

## Current Status: The Validation Phase (April 2026)

As mostly SEO professional knows, **technical fixes are instant, but indexing is slow.** While the code changes are live and the redirect loops are technically resolved, it will take 1-2 weeks for Google and Ahrefs to fully update their dashboards.

**Current Metrics:**

- **Technical Fix:** Deployed & Verified (308 loops gone).
- **Ahrefs Health Score:** 57 (Pending re-crawl).
- **GSC Indexed Pages:** 57 (Pending re-index).

I will be monitoring the Search Console. Once the "Health Score" returns to the 90s and my indexed page count recovers, I will post a follow-up article with the final "Before vs. After" data.

**Stay tuned for the update!**
