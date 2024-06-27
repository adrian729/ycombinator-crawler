'use client';

import { clsMerge } from '@/lib/utils/class-name';
import { generatePagination } from '@/lib/utils/pagination';
import { ArrowLeftIcon, ArrowRightIcon } from '@/ui/icons';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

type PaginationNumberPosition = 'single' | 'middle';
type PaginationArrowDirection = 'left' | 'right';

// Pagination component modified from Next.js example
export default function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const allPages = generatePagination(currentPage, totalPages);

    return (
        <>
            <div className="inline-flex">
                <PaginationArrow
                    direction="left"
                    href={createPageURL(currentPage - 1)}
                    isDisabled={currentPage <= 1}
                />

                <div className="flex -space-x-px">
                    {allPages.map((page) => {
                        let position: PaginationNumberPosition | undefined =
                            undefined;

                        if (allPages.length === 1) position = 'single';
                        if (page === '...') position = 'middle';

                        return (
                            <PaginationNumber
                                key={page}
                                href={createPageURL(page)}
                                page={page}
                                position={position}
                                isActive={currentPage === page}
                            />
                        );
                    })}
                </div>

                <PaginationArrow
                    direction="right"
                    href={createPageURL(currentPage + 1)}
                    isDisabled={currentPage >= totalPages}
                />
            </div>
        </>
    );
}

function PaginationNumber({
    page,
    href,
    isActive,
    position,
}: {
    page: number | string;
    href: string;
    position?: PaginationNumberPosition;
    isActive: boolean;
}) {
    const className = clsMerge([
        'flex h-10 w-10 items-center justify-center text-sm rounded text-slate-100/50',
        isActive && 'border border-slate-500 font-semibold text-slate-100/100',
        !isActive && position !== 'middle' && 'hover:bg-gray-700/50',
    ]);

    return isActive || position === 'middle' ? (
        <div className={className}>{page}</div>
    ) : (
        <Link href={href} className={className}>
            {page}
        </Link>
    );
}

function PaginationArrow({
    href,
    direction,
    isDisabled,
}: {
    href: string;
    direction: PaginationArrowDirection;
    isDisabled?: boolean;
}) {
    const className = clsMerge([
        'flex h-10 w-10 items-center justify-center rounded-md text-slate-100/100',
        isDisabled && 'pointer-events-none text-slate-100/40',
        !isDisabled && 'hover:bg-slate-700/50',
        direction === 'left' && 'mr-2 md:mr-4',
        direction === 'right' && 'ml-2 md:ml-4',
    ]);

    const icon = direction === 'left' ? <ArrowLeftIcon /> : <ArrowRightIcon />;

    return isDisabled ? (
        <div className={className}>{icon}</div>
    ) : (
        <Link className={className} href={href}>
            {icon}
        </Link>
    );
}
