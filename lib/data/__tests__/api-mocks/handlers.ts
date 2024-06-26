import { yCombinatorUrl } from '@/lib/data/data';
import { http, HttpResponse } from 'msw';
import { yCombinatorHtmlMock } from '../mocks/yCombinatorMocks';

const yCombinatorHandler = http.get(yCombinatorUrl, () => {
    return new HttpResponse(yCombinatorHtmlMock, { status: 200 });
});

export const handlers = [yCombinatorHandler];
