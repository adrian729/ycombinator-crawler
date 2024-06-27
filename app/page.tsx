import { fetchEntriesFromYCombinator } from '@/lib/data/data';
import Entries from '@/ui/entries';
import FilterEntries from '@/ui/filter-entries';

export default async function Page() {
    const entries = await fetchEntriesFromYCombinator();

    return (
        <div className="mx-auto my-12 w-4/5">
            <FilterEntries />
            <Entries entries={entries} />
        </div>
    );
}
