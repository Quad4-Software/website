import type { RequestHandler } from './$types';
import { cspReportResponse } from '$lib/cspReport';

export const POST: RequestHandler = async () => cspReportResponse();
