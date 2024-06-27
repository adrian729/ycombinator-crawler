import { getEntries } from '@/lib/utils/parse';
import { Entry } from '@/types/entry';
import { FilterType, RequestInfo } from '@/types/request';
import { sql } from '@vercel/postgres';
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

export function fetchEntries(): Promise<Entry[]> {
    return fetchYCombinator().then((html) => getEntries(html));
}

type RequestData = {
    id: string;
    requested_at: Date;
    filter_type: FilterType;
};

export async function fetchRequests(): Promise<RequestInfo[]> {
    noStore();

    try {
        console.log('Fetching requests data...');
        const data = await sql<RequestData>`SELECT * FROM requests`;
        console.log('Requests data fetched...');

        const requests: RequestData[] = data.rows.map(
            ({ id, requested_at, filter_type }) => {
                const requestInfo: RequestInfo = {
                    id,
                    timestamp: requested_at,
                    filterType: filter_type,
                };
                return requestInfo;
            },
        );
        console.log('data:', requests);

        return requests;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch requests data.');
    }
}
