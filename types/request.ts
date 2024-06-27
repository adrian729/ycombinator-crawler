export const NO_FILTER = 'no-filter';
export const FILTER_LONG = 'filter-long';
export const FILTER_SHORT = 'filter-short';

export type FilterType =
    | typeof NO_FILTER
    | typeof FILTER_LONG
    | typeof FILTER_SHORT;

export type RequestInfo = {
    id: string;
    timestamp: Date;
    filterType: FilterType;
};
