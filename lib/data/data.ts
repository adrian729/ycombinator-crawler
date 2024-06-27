import { filterEntries } from '@/lib/utils/filter';
import { getEntries } from '@/lib/utils/parse';
import { Entry } from '@/types/entry';
import { FilterType, NO_FILTER, RequestInfo } from '@/types/request';
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

export async function fetchEntriesFromYCombinator(
    filterType: FilterType = NO_FILTER,
): Promise<Entry[]> {
    const entries = await fetchYCombinator().then((html) => getEntries(html));
    return filterEntries(filterType, entries);
}

type RequestData = {
    id: string;
    requested_at: Date;
    filter_type: FilterType;
};

export async function fetchRequests(
    currentPage: number = 1,
    itemsPerPage: number = 10,
): Promise<RequestInfo[]> {
    noStore();

    const offset = (currentPage - 1) * itemsPerPage;

    try {
        console.log('Fetching requests data...');
        const data = await sql<RequestData>`
            SELECT *
            FROM requests
            ORDER BY requested_at DESC
            OFFSET ${offset} LIMIT ${itemsPerPage};
        `;
        console.log('Requests data fetched...');

        const requests = data.rows.map(({ id, requested_at, filter_type }) => {
            const requestInfo: RequestInfo = {
                id,
                timestamp: requested_at,
                filterType: filter_type,
            };
            return requestInfo;
        });

        return requests;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch requests data.');
    }
}

export async function fetchRequest(requestId: string): Promise<RequestInfo> {
    noStore();

    try {
        console.log('Fetching requests data...');
        const data = await sql<RequestData>`
            SELECT *
            FROM Requests
            WHERE id = ${requestId};
        `;
        console.log('Requests data fetched...');

        const requestData = data.rows[0];

        if (!requestData) {
            throw new Error('Request not found.');
        }

        const requestInfo: RequestInfo = {
            id: requestData.id,
            timestamp: requestData.requested_at,
            filterType: requestData.filter_type,
        };
        return requestInfo;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch requests data.');
    }
}

export async function fetchRequestsPages(itemsPerPage: number = 10) {
    noStore();

    try {
        const count = await sql`SELECT COUNT(*) FROM requests;`;

        const totalPages = Math.ceil(
            Number(count.rows[0].count) / itemsPerPage,
        );
        return totalPages;
    } catch (error) {
        console.error('Database Error fetching requests pages number:', error);
        throw new Error('Failed to fetch requests pages number.');
    }
}

export async function fetchEntries(requestId: string): Promise<Entry[]> {
    noStore();

    try {
        console.log('Fetching entries data...');
        const data = await sql<Entry>`
            SELECT rank, title, points, comments, request_id
            FROM entries
            WHERE request_id = ${requestId}
            ORDER BY rank ASC;
        `;
        console.log('Entries data fetched...');

        return data.rows;
    } catch (error) {
        console.error(
            `Database Error fetching entries from ${requestId}:`,
            error,
        );
        throw new Error(`Failed to fetch entries from ${requestId}.`);
    }
}
