import { describe, it, expect } from 'vitest';
import { cspReportResponse } from './cspReport';

describe('cspReportResponse', () => {
	it('returns 204 No Content', () => {
		const res = cspReportResponse();
		expect(res.status).toBe(204);
		expect(res.body).toBeNull();
	});
});
