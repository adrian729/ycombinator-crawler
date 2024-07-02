import { fetchEntriesFromYCombinator } from '@/lib/data/data';
import { FilterType, NO_FILTER } from '@/types/request';
import Entries from '@/ui/entries';

export async function LiveEntries({
    filterType = NO_FILTER,
}: {
    filterType?: FilterType;
    searchParams?: { filterType?: string };
}) {
    const entries = await fetchEntriesFromYCombinator(filterType);

    return <Entries entries={entries} />;
}
