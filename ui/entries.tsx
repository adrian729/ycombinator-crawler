'use client';

import { filterEntries, getFilterTypeOrDefault } from '@/lib/utils/filter';
import { Entry } from '@/types/entry';
import EntryCard, { EntryCardSkeleton } from '@/ui/entry-card';
import { useSearchParams } from 'next/navigation';

export default function Entries({ entries = [] }: { entries: Entry[] }) {
    const searchParams = useSearchParams();

    return (
        <ul className="flex flex-col justify-center items-stretch gap-2">
            {filterEntries(
                getFilterTypeOrDefault(searchParams.get('filter-type')),
                entries,
            ).map((entry, idx) => (
                <li key={idx}>
                    <EntryCard {...entry} />
                </li>
            ))}
        </ul>
    );
}

export function EntriesSkeleton() {
    return (
        <ul className="flex flex-col justify-center items-stretch gap-2">
            {Array.from({ length: 10 }, (_, idx) => (
                <EntryCardSkeleton key={idx} />
            ))}
        </ul>
    );
}
