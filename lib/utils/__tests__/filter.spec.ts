import {
    countWords,
    filterEntries,
    filterLongTitles,
    filterShortTitles,
    getFilterTypeOrDefault,
} from '@/lib/utils/filter';
import type { Entry } from '@/types/entry';
import {
    FILTER_LONG,
    FILTER_SHORT,
    FilterType,
    NO_FILTER,
} from '@/types/request';
import {
    entriesMock,
    expectedAfterLongFilterMock,
    expectedAfterShortFilterMock,
    longEntriesMock,
    shortEntriesMock,
} from './mocks/entriesMocks';

describe.each([
    [entriesMock, FILTER_LONG, expectedAfterLongFilterMock],
    [entriesMock, FILTER_SHORT, expectedAfterShortFilterMock],
    [entriesMock, NO_FILTER, entriesMock],
    [entriesMock, 'wront-filter', entriesMock],
    [[], FILTER_LONG, []],
    [[], FILTER_SHORT, []],
    [[], NO_FILTER, []],
])('Test filter entries', (entries, filterType, expected) => {
    it('filterEntries', () => {
        const result = filterEntries(filterType as FilterType, entries);

        expect(result).toStrictEqual(expected);
    });
});

describe.each([
    [longEntriesMock[0].title, 8],
    [shortEntriesMock[0].title, 3],
    [shortEntriesMock[1].title, 5],
    ['', 0],
])('Test count words excluding symbols', (words, expected) => {
    it('countWords', () => {
        const result = countWords(words);

        expect(result).toStrictEqual(expected);
    });
});

describe('Filter entries with long titles, sorted by comments', () => {
    it('Filter entries with long and short titles', () => {
        const result = filterLongTitles(entriesMock);

        const expected: Entry[] = expectedAfterLongFilterMock;

        expect(result).toStrictEqual(expected);
    });

    it('Filter entries without long titles', () => {
        const result = filterLongTitles(shortEntriesMock);

        const expected: Entry[] = [];

        expect(result).toStrictEqual(expected);
    });

    it('Filter empty entries', () => {
        const result = filterLongTitles([]);

        const expected: Entry[] = [];

        expect(result).toStrictEqual(expected);
    });
});

describe('Filter entries with short titles, sorted by points', () => {
    it('Filter entries with long and short titles', () => {
        const result = filterShortTitles(entriesMock);

        const expected: Entry[] = expectedAfterShortFilterMock;

        expect(result).toStrictEqual(expected);
    });

    it('Filter entries without short titles', () => {
        const result = filterShortTitles(longEntriesMock);

        const expected: Entry[] = [];

        expect(result).toStrictEqual(expected);
    });

    it('Filter empty entries', () => {
        const result = filterShortTitles([]);

        const expected: Entry[] = [];

        expect(result).toStrictEqual(expected);
    });
});

describe.each([
    [FILTER_LONG, FILTER_LONG],
    [FILTER_SHORT, FILTER_SHORT],
    [NO_FILTER, NO_FILTER],
    ['wrong-filter', NO_FILTER],
])('Test get filterType of default', (filterType, expected) => {
    it('getFilterTypeOrDefault', () => {
        const result = getFilterTypeOrDefault(filterType);

        expect(result).toBe(expected);
    });
});
