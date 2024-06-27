import { fetchEntries } from '@/lib/data/data';

export default async function TestFetch() {
    const entries = await fetchEntries();

    if (!entries) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 className="font-bold text-xl underline">Entries</h1>
            <ul>
                {entries.map((entry) => (
                    <li key={entry.rank}>
                        <p>
                            <strong>{entry.rank}</strong> {entry.title}
                        </p>
                        <p>
                            {entry.points} points | {entry.comments} comments
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
