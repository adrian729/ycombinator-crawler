import { fetchYCombinator } from '@/lib/data/data';
import '@testing-library/jest-dom';
import { server } from './api-mocks/msw-server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Get ycombinator', () => {
    it('fetch succesful', async () => {
        const response = await fetchYCombinator();
        expect(response).toBe('Fetch data for ycombinator');
    });
});
