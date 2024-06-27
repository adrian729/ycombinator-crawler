import { fetchEntriesFromYCombinator } from '@/lib/data/data';
import Entries from '@/ui/entries';
import FilterEntries from '@/ui/filter-entries';

export default async function Page() {
    const entries = await fetchEntriesFromYCombinator();

    return (
        <div className="mx-auto w-4/5">
            <h1 className="font-bold text-2xl mb-2 underline">Entries</h1>
            <p className="text-sm text-slate-100/70 mb-4">
                Live fetch, parse and filter entries from Y Combinator&#39;s
                Hacker
            </p>
            <FilterEntries />
            <Entries entries={entries} />
        </div>
    );
}
