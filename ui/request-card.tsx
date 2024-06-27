import { RequestInfo } from '@/types/request';
import { format } from '@formkit/tempo';
import Link from 'next/link';

export default async function RequestCard({
    id,
    timestamp,
    filterType,
}: RequestInfo) {
    return (
        <Link
            href={`/request/${id}`}
            className="w-96 px-4 py-2 bg-slate-900 border border-slate-700 shadow shadow-slate-500 rounded flex justify-center items-center"
        >
            <p className="px-4 py-2 text-sm text-slate-100/70">
                <span>
                    {format(timestamp, { date: 'short', time: 'medium' })}
                </span>{' '}
                | <span>{filterType}</span>
            </p>
        </Link>
    );
}
