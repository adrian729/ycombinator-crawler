import { Entry } from '@/lib/utils/parse';

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
        .filter((word) => word.match(/^[a-zA-Z0-9]+$/))
        .filter((word) => word.length > 0);
    return words.length;
}
