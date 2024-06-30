import { fetchEntriesFromYCombinator } from '@/lib/data/data';
import Entries from '@/ui/entries';

export async function LiveEntries() {
    const entries = await fetchEntriesFromYCombinator();

    return <Entries entries={entries} />;
}
