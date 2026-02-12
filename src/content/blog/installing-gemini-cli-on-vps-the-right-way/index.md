---
title: Installing Gemini CLI on VPS the Right Way
publishDate: '2026-02-11'
description: Step-by-step guide to installing Gemini CLI on a VPS with proper PATH configuration so you can run it globally with a single command.
tags: [ai, js]
heroImage: {src: './image.png'}
---

Installing Gemini CLI on a VPS is straightforward — until it isn’t.  
Most people stop at `npm install -g`, but on many VPS setups (especially with aaPanel or custom Node builds), the binary won’t be available globally.

This guide shows how to install it properly so you can simply type:

```bash
gemini
```

And it just works.

## 1. Install Node.js (If Not Installed)

Check your Node version:

```bash
node -v
npm -v
```

If you’re using aaPanel, Node is usually located under:

```bash
/www/server/nodejs/
```

## 2. Install Gemini CLI Globally

Run:

```bash
npm install -g @google/gemini-cli
```

After installation, verify where global packages are installed:

```bash
npm root -g
npm config get prefix
```

Example output:

```bash
/www/server/nodejs/v20.18.1
```

That means the binary is located at:

```bash
/www/server/nodejs/v20.18.1/bin
```

## 3. Fix the PATH (Critical Step)

On many VPS environments, that directory is NOT included in `$PATH`.

Without fixing this, you'll get:

```bash
gemini: command not found
```

### Temporary Fix

```bash
export PATH=$PATH:/www/server/nodejs/v20.18.1/bin
```

### Permanent Fix

Edit your shell profile:

```bash
nano ~/.bashrc
```

Add:

```bash
export PATH=$PATH:/www/server/nodejs/v20.18.1/bin
```

Reload:

```bash
source ~/.bashrc
```

Now test:

```bash
gemini
```

If everything is correct, the CLI should launch immediately.

## 4. Authenticate with Gemini

Run:

```bash
gemini /auth
```

Or set your API key manually:

```bash
export GEMINI_API_KEY=your_api_key_here
```

To persist it:

```bash
nano ~/.bashrc
```

Add:

```bash
export GEMINI_API_KEY=your_api_key_here
```

Reload:

```bash
source ~/.bashrc
```

## Why PATH Matters (Opinionated Take)

Most “installation guides” stop after `npm install -g`.  
But on real production VPS environments, especially with custom Node paths, that’s incomplete.

If you cannot run a tool globally with a single command, the setup isn’t finished.

Clean environments matter.  
Developer ergonomics matter.  
Typing `gemini` and having it instantly available is how it should be.

## Final Result

Once configured correctly, you should be able to:

```bash
gemini
```

---
If you’re setting up production environments and want a clean, reliable server stack, feel free to connect.