import type { Entry } from '@/types/entry';
import {
    FILTER_LONG,
    FILTER_SHORT,
    FilterType,
    NO_FILTER,
} from '@/types/request';

export function filterEntries(filterType: FilterType, entries: Entry[]) {
    if (filterType === FILTER_LONG) {
        return filterLongTitles(entries);
    }

    if (filterType === FILTER_SHORT) {
        return filterShortTitles(entries);
    }

    return entries;
}

export function filterLongTitles(entries: Entry[]): Entry[] {
    return entries
        .filter(({ title }) => countWords(title) > 5)
        .sort(
            (a, b) => b.comments - a.comments || a.title.localeCompare(b.title),
        );
}

export function filterShortTitles(entries: Entry[]): Entry[] {
    return entries
        .filter(({ title }) => countWords(title) < 6)
        .sort((a, b) => b.points - a.points || a.title.localeCompare(b.title));
}

export function countWords(title: string): number {
    const words = title
        .split(' ')
        .filter((word) => word.replace(/[^a-zA-Z0-9]/g, ''))
        .filter((word) => word.length > 0);
    return words.length;
}

export function filterTypeOrDefault(
    maybeFilter: string | undefined | null,
): FilterType {
    return maybeFilter && [FILTER_LONG, FILTER_SHORT].includes(maybeFilter)
        ? (maybeFilter as FilterType)
        : NO_FILTER;
}
