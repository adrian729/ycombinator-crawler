import { fetchEntries, fetchRequest } from '@/lib/data/data';
import Entries, { EntriesSkeleton } from '@/ui/entries';
import { format } from '@formkit/tempo';

export async function RequestEntries({ id }: { id: string }) {
    const request = await fetchRequest(id);
    const entries = await fetchEntries(id);

    return (
        <>
            <p className="text-sm text-slate-100/70">
                {`${format(request.timestamp, { date: 'short', time: 'medium' })} | ${request.filterType}`}
            </p>
            <h1 className="pb-4 font-bold text-xl">
                {id} <span className="text-sm text-slate-100/70">request</span>
            </h1>
            <h2 className="pb-1 font-bold text-lg underline">Entries</h2>
            <Entries entries={entries} />
        </>
    );
}

export function RequestEntriesSkeleton() {
    return (
        <>
            <div className="text-sm text-slate-100/70 flex items-center gap-[1ch]">
                <div className="w-40 h-4 bg-slate-100/70"></div>
                <span>|</span>
                <div className="w-24 h-4 bg-slate-100/70"></div>
            </div>
            <div className="pt-2 pb-4 flex items-center gap-[1ch]">
                <div className="w-128 h-6 bg-slate-100"></div>{' '}
                <span className="text-sm text-slate-100/70">request</span>
            </div>
            <h2 className="pb-1 font-bold text-lg underline">Entries</h2>
            <EntriesSkeleton />
        </>
    );
}
