# AI in Production

An interactive course (Astro + Starlight) for software engineers moving into
**Applied AI Engineer**, **GenAI Engineer**, and **Forward Deployed Engineer** roles.

- Curriculum: `src/content/docs/curriculum.md`
- Lessons: `src/content/docs/<module>/*.mdx`
- Interactive components (quizzes, incident drills, design drills, failure cards,
  cost calculator, context budget, agent stepper, Mermaid diagrams): `src/components/`

Progress and quiz scores are stored in the reader's browser (`localStorage`).

## Run locally

```bash
npm install
npm run dev
```

Requires Node 22.12+.

The local site runs at the root: http://localhost:4321/.

## Deploy to GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds the site and publishes it to
**https://deepansh05dk.github.io/course/** on every push to `main` or
`claude/fervent-pascal-ih62on` (or manually from the Actions tab).

One-time setup in the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
The repository must be public (or on a paid plan) for Pages.

How the `/course/` path works: the workflow sets `BASE_PATH=/course`, and
`src/plugins/base-links.mjs` prefixes root links in the built HTML (lessons link to
`/agents/memory/`, the deployed page links to `/course/agents/memory/`). To preview the
deployed form locally:

```bash
BASE_PATH=/course npm run build && npx astro preview
```

For a custom domain or a `<user>.github.io` repository, set `BASE_PATH: /` in the workflow
(and `SITE_URL` to the domain).
