import { fetchRequests } from '@/lib/data/data';
import RequestCard from '@/ui/request-card';

export default async function Requests({
    currentPage,
    itemsPerPage,
}: {
    currentPage: number;
    itemsPerPage: number;
}) {
    const requests = await fetchRequests(currentPage, itemsPerPage);

    if (!requests) {
        return <div>Loading...</div>;
    }

    return (
        <ul className="flex flex-col justify-center items-stretch gap-2">
            {requests.map((request, idx) => (
                <li key={idx}>
                    <RequestCard {...request} />
                </li>
            ))}
        </ul>
    );
}
