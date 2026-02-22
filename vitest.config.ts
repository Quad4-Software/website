import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	resolve: {
		alias: { $lib: path.resolve(__dirname, 'src/lib') }
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'jsdom',
		coverage: {
			provider: 'v8',
			reporter: ['text', 'text-summary'],
			include: ['src/**/*.ts'],
			exclude: [
				'src/**/*.spec.ts',
				'src/**/*.test.ts',
				'src/**/$types*',
				'src/app.d.ts',
				'**/node_modules/**'
			]
		}
	}
});
