import { yCombinatorUrl } from '@/lib/data/data';
import { http, HttpResponse } from 'msw';

const yCombinatorHandler = http.get(yCombinatorUrl, () => {
    return new HttpResponse('Fetch data for ycombinator', { status: 200 });
});

export const handlers = [yCombinatorHandler];
