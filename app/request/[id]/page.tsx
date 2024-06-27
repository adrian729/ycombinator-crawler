import { fetchEntries } from '@/lib/data/data';
import Entries from '@/ui/entries';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const entries = await fetchEntries(id);

    if (!entries) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 className="font-bold text-2xl underline">Entries</h1>
            <Entries entries={entries} />
        </div>
    );
}
