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
