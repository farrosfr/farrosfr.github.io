# FarrosFR.com Website Repository

This directory contains presets to help you quick-start your personal projects. The live version of this website can be viewed at [farrosfr.com](https://farrosfr.com/).

## 🚀 Tech Stack

- ![:astro](https://img.shields.io/badge/astro-%232C2052.svg?style=for-the-badge&logo=astro&logoColor=white) **Astro:** The web framework for building fast, content-focused websites.
- ![:unocss](https://img.shields.io/badge/unocss-333333.svg?style=for-the-badge&logo=unocss&logoColor=white) **UnoCSS:** The instant on-demand atomic CSS engine.
- ![:typescript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) **TypeScript:** For type-safe code.
- ![:vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white) **Waline:** A simple, safe comment system.
- ![:githubactions](https://img.shields.io/badge/githubactions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white) **GitHub Actions:** For CI/CD and deployment.
- ![:prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E) **Prettier:** For code formatting.
- ![:eslint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white) **ESLint:** For code linting.

## 📂 Project Structure

The project is organized as follows:

- **`preset/`**: Contains resource presets like icons and experimental components.
  - `icons/`: Alternative icons for `src/assets/tools`.
  - `components/`: Experimental component templates.
- **`public/`**: Contains static assets like fonts, images, and other files.
- **`src/`**: Contains the source code of the website.
  - `assets/`: Static assets used within Astro components.
  - `components/`: Reusable Astro components.
  - `content/`: Markdown files for blog posts and other content.
  - `layouts/`: Base layouts for pages.
  - `pages/`: Website pages and API endpoints.

## 🧩 Components

Here are some of the main components used in this project:

- `BaseHead.astro`: Manages the `<head>` section, including metadata and styles.
- **`about/`**:
  - `Substats.astro`: Component for displaying substats.
  - `ToolSection.astro`: Displays a section of tools.
- **`home/`**:
  - `ProjectCard.astro`: Card for displaying project information.
  - `Section.astro`: A general-purpose section component.
  - `SkillLayout.astro`: Layout for displaying skills.
- **`projects/`**:
  - `ProjectSection.astro`: A section for projects.
  - `Sponsors.astro`: Component to display sponsors.
- **`waline/`**:
  - `Comment.astro`: Integrates the Waline comment system.
  - `Pageview.astro`: Displays page views.

## 🗺️ Routes

The main pages and routes are defined in `src/pages`:

- `/`: The home page.
- `/about`: The about page.
- `/archives`: The archives page.
- `/blog/[...id]`: Individual blog posts.
- `/projects`: The projects page.
- `/search`: The search page.
- `/tags/[tag]`: Pages for specific tags.
- `/rss.xml`: The RSS feed.
- `/api/`: API routes.
