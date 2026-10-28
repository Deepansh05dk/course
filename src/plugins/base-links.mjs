// Astro integration: after a build, prefix root-relative links in the generated HTML with the
// site's base path (e.g. "/course"), so lessons can link to /agents/memory/ and still work on
// GitHub Pages. Links Astro and Starlight already prefixed are left alone.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

async function* htmlFiles(dir) {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const path = join(dir, entry.name);
		if (entry.isDirectory()) yield* htmlFiles(path);
		else if (entry.name.endsWith('.html')) yield path;
	}
}

export default function baseLinks() {
	let base = '/';
	return {
		name: 'base-links',
		hooks: {
			'astro:config:done': ({ config }) => {
				base = config.base;
			},
			'astro:build:done': async ({ dir, logger }) => {
				const prefix = base.replace(/\/$/, '');
				if (!prefix) return;
				// href="/x" or src="/x", but not "//cdn...", and not already "/course/..." or exactly "/course".
				const pattern = new RegExp(`\\b(href|src)="/(?!/|${prefix.slice(1)}(?:/|"))`, 'g');
				let files = 0;
				let links = 0;
				for await (const file of htmlFiles(fileURLToPath(dir))) {
					const html = await readFile(file, 'utf8');
					const fixed = html.replace(pattern, (_, attr) => {
						links++;
						return `${attr}="${prefix}/`;
					});
					if (fixed !== html) {
						files++;
						await writeFile(file, fixed);
					}
				}
				logger.info(`prefixed ${links} root links with ${prefix} in ${files} pages`);
			},
		},
	};
}
