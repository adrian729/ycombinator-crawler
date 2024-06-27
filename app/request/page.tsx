import { fetchRequestsPages } from '@/lib/data/data';
import Pagination from '@/ui/pagination';
import RequestEntriesForm from '@/ui/request-entries-form';
import Requests from '@/ui/requests';

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        page?: string;
    };
}) {
    const itemsPerPage = 10;
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchRequestsPages(itemsPerPage);

    return (
        <div className="mx-auto w-4/5 flex justify-around">
            <div>
                <h1 className="mb-2 font-bold text-2xl underline">Requests</h1>
                <p className="w-96 text-sm text-slate-100/70 mb-4">
                    Fetch requests logged in the database, or do a new request.
                </p>
                <div className="flex flex-col items-center gap-4">
                    <Pagination totalPages={totalPages} />
                    <Requests
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                    />
                </div>
            </div>
            <div className="flex justify-between items-start">
                <RequestEntriesForm />
            </div>
        </div>
    );
}
