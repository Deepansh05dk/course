// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	integrations: [
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
				{ label: 'Case Studies', items: [{ autogenerate: { directory: 'case-studies' } }] },
			],
		}),
	],
});
