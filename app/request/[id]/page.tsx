import { fetchEntries, fetchRequest } from '@/lib/data/data';
import Entries from '@/ui/entries';
import { format } from '@formkit/tempo';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const entries = await fetchEntries(id);
    const request = await fetchRequest(id);

    return (
        <div className="mx-auto w-4/5">
            <h1 className="pb-1 font-bold text-2xl underline">Entries</h1>
            <p className="text-sm text-slate-100/70">
                <span>
                    {format(request.timestamp, {
                        date: 'short',
                        time: 'medium',
                    })}
                </span>{' '}
                | <span>{request.filterType}</span>
            </p>
            <Entries entries={entries} />
        </div>
    );
}
