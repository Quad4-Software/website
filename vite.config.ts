import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
	const isProd = command === 'build';
	return {
		plugins: [tailwindcss(), sveltekit()],
		build: {
			sourcemap: !isProd,
			minify: isProd ? 'esbuild' : false
		}
	};
});
