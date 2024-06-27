import {
    countWords,
    filterLongTitles,
    filterShortTitles,
} from '@/lib/utils/filter';
import type { Entry } from '@/types/entry';
import {
    entriesMock,
    longEntriesMock,
    shortEntriesMock,
} from './mocks/entriesMocks';

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

        const expected: Entry[] = [
            {
                rank: 7,
                title: 'and another long title is here',
                points: 4,
                comments: 30,
            },
            {
                rank: 7,
                title: 'yet another long title is here',
                points: 4,
                comments: 30,
            },
            {
                rank: 7,
                title: 'yet another long title is here again',
                points: 4,
                comments: 30,
            },
            {
                rank: 2,
                title: 'long long title with numbers 123 and symbols !@#',
                points: 23,
                comments: 4,
            },
            {
                rank: 4,
                title: 'a long title    :with  symb-ols in the mid-./le of words (123) ',
                points: 1,
                comments: 2,
            },
        ];

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

        const expected: Entry[] = [
            {
                rank: 5,
                title: 'Short . with ; symbols ; -',
                points: 2,
                comments: 3,
            },
            {
                rank: 4,
                title: 'a short title',
                points: 1,
                comments: 2,
            },
            {
                rank: 3,
                title: 'Exactly 5 words in title',
                points: 1,
                comments: 2,
            },
        ];

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
