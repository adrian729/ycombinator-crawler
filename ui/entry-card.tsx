import type { Entry } from '@/types/entry';

export default function EntryCard({ title, points, comments, rank }: Entry) {
    return (
        <div className="px-4 py-2 bg-slate-900 border border-slate-700 shadow shadow-slate-500 rounded">
            <h1 className="font-semibold text-lg">{title}</h1>
            <p className="px-4 py-2 text-sm text-slate-100/70">
                <span>Rank: {rank}</span> | <span>{points} points</span> |{' '}
                <span>{comments} comments</span>{' '}
            </p>
        </div>
    );
}

export function EntryCardSkeleton() {
    return (
        <div
            className={
                'animate-pulse-slow px-4 pt-4 pb-2 bg-slate-900 border border-slate-700 shadow shadow-slate-500 rounded'
            }
        >
            <div className="w-144 h-6 bg-slate-100"></div>
            <div className="px-4 py-2 text-sm text-slate-100/70 flex items-center gap-[1ch]">
                <div className="flex items-center gap-[1ch]">
                    <span>Rank: </span>
                    <div className="w-4 h-4 bg-slate-100/70"></div>
                </div>
                <span>|</span>
                <div className="flex items-center gap-[1ch]">
                    <div className="w-10 h-4 bg-slate-100/70"></div>
                    <span>points</span>
                </div>
                <span>|</span>
                <div className="flex items-center gap-[1ch]">
                    <div className="w-8 h-4 bg-slate-100/70"></div>
                    <span>comments</span>
                </div>
            </div>
        </div>
    );
}
