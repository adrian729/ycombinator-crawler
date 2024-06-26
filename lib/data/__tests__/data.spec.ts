import { fetchEntries, fetchYCombinator } from '@/lib/data/data';
import { Entry } from '@/lib/utils/parse';
import '@testing-library/jest-dom';
import { server } from './api-mocks/msw-server';
import { yCombinatorHtmlMock } from './mocks/yCombinatorMocks';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Get ycombinator HTML', () => {
    it('fetch succesful', async () => {
        const response = await fetchYCombinator();
        expect(response).toBe(yCombinatorHtmlMock);
    });
});

describe('Get entries', () => {
    it('fetch entries', async () => {
        const response = await fetchEntries();
        const expected: Entry[] = [
            {
                comments: 6,
                points: 56,
                rank: 1,
                title: 'Ghosts in the ROM (2012)',
            },
            {
                comments: 102,
                points: 156,
                rank: 2,
                title: 'Test with a long long title with some extra words',
            },
            {
                comments: 0,
                points: 156,
                rank: 11,
                title: '- - - - Short title (- - -)',
            },
        ];

        expect(response).toStrictEqual(expected);
    });
});
