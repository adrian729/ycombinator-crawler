'use server';

import { fetchEntriesFromYCombinator } from '@/lib/data/data';
import { dateMillisToTimestamp } from '@/lib/utils/date';
import {
    FILTER_LONG,
    FILTER_SHORT,
    FilterType,
    NO_FILTER,
} from '@/types/request';
import { QueryResult, QueryResultRow, sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const FormSchema = z.object({
    filterType: z
        .string({
            invalid_type_error: 'Please select a filter type.',
        })
        .refine((filterType) =>
            [NO_FILTER, FILTER_LONG, FILTER_SHORT].includes(filterType),
        ),
});

export type State = {
    errors?: {
        filterType?: string[];
    };
    message?: string | null;
};

export async function newRequestEntries(formData: FormData): Promise<State> {
    const validatedFields = FormSchema.safeParse({
        filterType: formData.get('filterType'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to request entries.',
        };
    }

    const { filterType } = validatedFields.data;
    const currentTimestamp = dateMillisToTimestamp(Date.now());

    // We validated that filterType has to be one of the valid filters with zod, so should be fine.
    // I am not sure right now how to add custom TS types to zod so I will force the casting for the moment...
    const entries = await fetchEntriesFromYCombinator(filterType as FilterType);

    let requestId: string | null = null;
    try {
        const queryResult: QueryResult<QueryResultRow> = await sql`
            INSERT INTO requests (requested_at, filter_type)
            VALUES (to_timestamp(${currentTimestamp}), ${filterType})
            RETURNING id;
        `;
        requestId = queryResult.rows[0].id;
    } catch (error) {
        console.error('Database Error creating request item:', error);
        return {
            message: 'Database Error: Failed to Create Request Item.',
        };
    }

    if (!requestId) {
        return {
            message: 'New request id is invalid.',
        };
    }

    try {
        entries.forEach(async ({ rank, title, points, comments }) => {
            const queryResult: QueryResult<QueryResultRow> = await sql`
                INSERT INTO entries (rank, title, points, comments, request_id)
                VALUES (${rank}, ${title}, ${points}, ${comments}, ${requestId})
                RETURNING id;
            `;
        });
    } catch (error) {
        console.error('Database Error creating entries:', error);
    }

    revalidatePath('/request');

    return {
        message: 'Request Entries Successfully Created.',
    };
}
