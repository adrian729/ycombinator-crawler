import { getEntries } from '@/lib/utils/parse';
import { unstable_noStore as noStore } from 'next/cache';

export const yCombinatorUrl = 'https://news.ycombinator.com/';

export async function fetchYCombinator() {
    noStore();

    const url = 'https://news.ycombinator.com/';

    try {
        const response = await fetch(url, {
            headers: { accept: 'text/html' },
        });

        if (!response.ok) {
            console.error('Failed to fetch Y Combinator');
            throw new Error('Failed to fetch Y Combinator');
        }

        return response.text();
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch Y Combinator');
    }
}

export function fetchEntries() {
    return fetchYCombinator().then((html) => getEntries(html));
}
