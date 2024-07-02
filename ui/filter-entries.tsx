'use client';

import { FILTER_LONG, FILTER_SHORT, NO_FILTER } from '@/types/request';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const QUERY = 'filterType';

export default function FilterEntries() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleFilter = (selectedFilter: string) => {
        const params = new URLSearchParams(searchParams);
        if (selectedFilter) {
            params.set(QUERY, selectedFilter);
        } else {
            params.delete(QUERY);
        }
        replace(`${pathname}?${params.toString()}`);
    };

    const isChecked = (value: string): boolean => {
        return searchParams.get(QUERY) === value;
    };

    return (
        <div>
            <fieldset className="px-4 py-2 w-fit border border-slate-500 rounded flex flex-col justify-between items-start gap-2">
                <legend className="px-2">Select filter</legend>
                <div>
                    <input
                        id={NO_FILTER}
                        className="cursor-pointer"
                        type="radio"
                        name="filter"
                        value={NO_FILTER}
                        onChange={(e) => handleFilter(e.target.value)}
                        defaultChecked={
                            isChecked(NO_FILTER) || !searchParams.get(QUERY)
                        }
                    />
                    <label className="px-4 cursor-pointer" htmlFor={NO_FILTER}>
                        No filter
                    </label>
                </div>
                <div>
                    <input
                        id={FILTER_LONG}
                        className="cursor-pointer"
                        type="radio"
                        name="filter"
                        value={FILTER_LONG}
                        onChange={(e) => handleFilter(e.target.value)}
                        defaultChecked={isChecked(FILTER_LONG)}
                    />
                    <label
                        className="px-4 cursor-pointer"
                        htmlFor={FILTER_LONG}
                    >
                        Filter titles with more than 5 words, sort by comments.
                    </label>
                </div>
                <div>
                    <input
                        id={FILTER_SHORT}
                        className="cursor-pointer"
                        type="radio"
                        name="filter"
                        value={FILTER_SHORT}
                        onChange={(e) => handleFilter(e.target.value)}
                        defaultChecked={isChecked(FILTER_SHORT)}
                    />
                    <label
                        className="px-4 cursor-pointer"
                        htmlFor={FILTER_SHORT}
                    >
                        Filter titles with les or equal than 5 words, sort by
                        points.
                    </label>
                </div>
            </fieldset>
        </div>
    );
}
