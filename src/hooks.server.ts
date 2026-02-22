import type { Handle } from '@sveltejs/kit';

export const securityHeaders: [string, string][] = [
	['Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload'],
	['X-Content-Type-Options', 'nosniff'],
	['X-Frame-Options', 'DENY'],
	['X-XSS-Protection', '1; mode=block'],
	[
		'Content-Security-Policy',
		[
			"default-src 'self'",
			"script-src 'self' 'unsafe-inline'",
			"style-src 'self' 'unsafe-inline'",
			"font-src 'self'",
			"img-src 'self' data:",
			"connect-src 'self'",
			"frame-ancestors 'none'",
			"base-uri 'self'",
			"form-action 'self'",
			"report-uri /csp-report"
		].join('; ')
	],
	[
		'Permissions-Policy',
		[
			'camera=()',
			'microphone=()',
			'geolocation=()',
			'payment=()',
			'usb=()',
			'magnetometer=()',
			'gyroscope=()',
			'accelerometer=()'
		].join(', ')
	]
];

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	const headers = new Headers(response.headers);
	for (const [name, value] of securityHeaders) {
		headers.set(name, value);
	}
	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers
	});
};
