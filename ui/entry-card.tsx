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
