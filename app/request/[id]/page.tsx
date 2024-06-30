import { RequestEntries, RequestEntriesSkeleton } from '@/ui/request-entries';
import { Suspense } from 'react';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;

    return (
        <div className="mx-auto w-4/5">
            <Suspense fallback={<RequestEntriesSkeleton />}>
                <RequestEntries id={id} />
            </Suspense>
        </div>
    );
}
