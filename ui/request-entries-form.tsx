'use client';

import { State, newRequestEntries } from '@/lib/actions';
import { FILTER_LONG, FILTER_SHORT, NO_FILTER } from '@/types/request';
import { useFormState } from 'react-dom';

export default function RequestEntriesForm() {
    const initialState = { message: null, errors: {} };
    const [state, dispatch] = useFormState<State, FormData>(
        newRequestEntries,
        initialState,
    );

    return (
        <form action={dispatch} className="px-4 py-2 flex flex-col gap-2">
            <fieldset className="px-4 py-2 w-fit border border-slate-500 rounded flex flex-col justify-between items-start gap-2 shadow shadow-slate-500">
                <legend className="px-2">Select filter</legend>
                <div>
                    <input
                        id={NO_FILTER}
                        className="cursor-pointer"
                        type="radio"
                        name="filterType"
                        value={NO_FILTER}
                        defaultChecked
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
                        name="filterType"
                        value={FILTER_LONG}
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
                        name="filterType"
                        value={FILTER_SHORT}
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
            <div className="flex justify-end">
                <button
                    className="cursor-pointer px-4 py-2 border border-slate-500 rounded font-semibold text-slate-100 bg-slate-800 hover:bg-slate-700 shadow shadow-slate-500 transition-colors"
                    type="submit"
                >
                    New Request
                </button>
            </div>
            <div id="customer-error" aria-live="polite" aria-atomic="true">
                {state.errors?.filterType &&
                    state.errors.filterType.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
            </div>
        </form>
    );
}
