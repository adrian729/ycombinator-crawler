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
        <div className="mx-auto my-12 w-4/5 flex justify-around">
            <div>
                <h1 className="font-bold text-2xl underline">Requests</h1>
                <div className="flex flex-col items-center gap-2">
                    <Requests
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                    />
                    <Pagination totalPages={totalPages} />
                </div>
            </div>
            <div className="flex justify-between items-start">
                <RequestEntriesForm />
            </div>
        </div>
    );
}
