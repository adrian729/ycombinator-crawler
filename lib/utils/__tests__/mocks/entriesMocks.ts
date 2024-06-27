import type { Entry } from '@/types/entry';

export const entriesMock: Entry[] = [
    {
        rank: 5,
        title: 'Short . with ; symbols ; -',
        points: 2,
        comments: 3,
    },
    {
        rank: 2,
        title: 'long long title with numbers 123 and symbols !@#',
        points: 23,
        comments: 4,
    },
    {
        rank: 7,
        title: 'yet another long title is here',
        points: 4,
        comments: 30,
    },
    {
        rank: 7,
        title: 'and another long title is here',
        points: 4,
        comments: 30,
    },
    {
        rank: 3,
        title: 'Exactly 5 words in title',
        points: 1,
        comments: 2,
    },
    {
        rank: 4,
        title: 'a short title',
        points: 1,
        comments: 2,
    },
    {
        rank: 7,
        title: 'yet another long title is here again',
        points: 4,
        comments: 30,
    },
    {
        rank: 4,
        title: 'a long title    :with  symb-ols in the mid-./le of words (123) ',
        points: 1,
        comments: 2,
    },
];

export const longEntriesMock: Entry[] = [
    {
        rank: 2,
        title: 'long long title with numbers 123 and symbols !@#',
        points: 23,
        comments: 4,
    },
    {
        rank: 7,
        title: 'yet another long title is here',
        points: 4,
        comments: 30,
    },
    {
        rank: 7,
        title: 'and another long title is here',
        points: 4,
        comments: 30,
    },
    {
        rank: 7,
        title: 'yet another long title is here again',
        points: 4,
        comments: 30,
    },
];

export const shortEntriesMock: Entry[] = [
    {
        rank: 5,
        title: 'Short . with ; symbols ; -',
        points: 2,
        comments: 3,
    },
    {
        rank: 3,
        title: 'Exactly 5 words in title',
        points: 1,
        comments: 2,
    },
    {
        rank: 4,
        title: 'a short title',
        points: 1,
        comments: 2,
    },
];
