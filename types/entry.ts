export type Entry = {
    rank: number;
    title: string;
    points: number;
    comments: number;
};

export type EntryInfo = Pick<Entry, 'points' | 'comments'>;
