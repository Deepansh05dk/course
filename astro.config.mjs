// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import baseLinks from './src/plugins/base-links.mjs';

// GitHub Pages serves this repo at https://deepansh05dk.github.io/course/ (the deploy workflow sets
// BASE_PATH=/course). Locally the site runs at the root, so `npm run dev` works at localhost:4321/.
const site = process.env.SITE_URL ?? 'https://deepansh05dk.github.io';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
	site,
	base,
	integrations: [
		baseLinks(),
		starlight({
			title: 'AI in Production',
			description:
				'A practical course for software engineers becoming Applied AI, GenAI and Forward Deployed Engineers.',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/deepansh05dk/course' },
			],
			customCss: ['./src/styles/custom.css'],
			lastUpdated: false,
			sidebar: [
				{ label: 'Curriculum', link: '/curriculum/' },
				{ label: 'Research: roles & skills', link: '/research/' },
				{ label: '0 · Start Here', items: [{ autogenerate: { directory: 'start' } }] },
				{ label: '1 · LLM Foundations', items: [{ autogenerate: { directory: 'foundations' } }] },
				{ label: '2 · AI-Native UX', items: [{ autogenerate: { directory: 'ai-ux' } }] },
				{ label: '3 · Embeddings & Vector Search', items: [{ autogenerate: { directory: 'embeddings' } }] },
				{ label: '4 · Production RAG', items: [{ autogenerate: { directory: 'rag' } }] },
				{ label: '5 · Evals & CI', items: [{ autogenerate: { directory: 'evals' } }] },
				{ label: '6 · Tools, Workflows & Agents', items: [{ autogenerate: { directory: 'agents' } }] },
				{ label: '7 · MCP & Integrations', items: [{ autogenerate: { directory: 'mcp' } }] },
				{ label: '8 · AI Security', items: [{ autogenerate: { directory: 'security' } }] },
				{ label: '9 · LLMOps & Observability', items: [{ autogenerate: { directory: 'llmops' } }] },
				{ label: '10 · Performance & Cost', items: [{ autogenerate: { directory: 'performance' } }] },
				{ label: '11 · Deployment & Models', items: [{ autogenerate: { directory: 'deployment' } }] },
				{ label: '12 · Forward Deployed Engineering', items: [{ autogenerate: { directory: 'fde' } }] },
				{ label: 'Case Studies', items: [{ autogenerate: { directory: 'case-studies' } }] },
				{ label: 'Capstone Projects', items: [{ autogenerate: { directory: 'capstones' } }] },
			],
		}),
	],
});
