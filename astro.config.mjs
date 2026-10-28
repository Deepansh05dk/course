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
				{ label: 'Curriculum (draft for review)', link: '/curriculum/' },
				{ label: 'Research: roles & skills', link: '/research/' },
			],
		}),
	],
});
