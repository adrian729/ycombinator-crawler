import { getFilterTypeOrDefault } from '@/lib/utils/filter';
import { EntriesSkeleton } from '@/ui/entries';
import FilterEntries from '@/ui/filter-entries';
import { LiveEntries } from '@/ui/live-entries';
import { Suspense } from 'react';

export default async function Page({
    searchParams,
}: {
    searchParams?: { filterType?: string };
}) {
    const filterType = getFilterTypeOrDefault(searchParams?.filterType);

    return (
        <div className="mx-auto w-4/5">
            <h1 className="font-bold text-2xl mb-2 underline">Entries</h1>
            <p className="text-sm text-slate-100/70 mb-4">
                Live fetch, parse and filter entries from YCombinator&#39;s
                Hacker
            </p>
            <div className="pb-4">
                <FilterEntries />
            </div>
            <Suspense fallback={<EntriesSkeleton />}>
                <LiveEntries filterType={filterType} />
            </Suspense>
        </div>
    );
}
