'use client';

import { Entry } from '@/types/entry';
import EntryCard, { EntryCardSkeleton } from '@/ui/entry-card';

export default function Entries({ entries = [] }: { entries: Entry[] }) {
    return (
        <ul className="flex flex-col justify-center items-stretch gap-2">
            {entries.map((entry, idx) => (
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
