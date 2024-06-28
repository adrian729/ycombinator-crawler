'use client';

import { filterEntries, getFilterTypeOrDefault } from '@/lib/utils/filter';
import { Entry } from '@/types/entry';
import { useSearchParams } from 'next/navigation';
import EntryCard from './entry-card';

export default function Entries({ entries = [] }: { entries: Entry[] }) {
    const searchParams = useSearchParams();

    return (
        <ul className="my-10 flex flex-col justify-center items-stretch gap-2">
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
