import { en, type Messages } from './messages/en';

export type Locale = 'en';

const messages: Record<Locale, Messages> = { en };

function getNested(obj: Record<string, unknown>, path: string): string | undefined {
	const parts = path.split('.');
	let current: unknown = obj;
	for (const p of parts) {
		if (current == null || typeof current !== 'object') return undefined;
		current = (current as Record<string, unknown>)[p];
	}
	return typeof current === 'string' ? current : undefined;
}

export function translate(locale: Locale, key: string): string {
	const value = getNested(messages[locale] as Record<string, unknown>, key);
	return value ?? key;
}
