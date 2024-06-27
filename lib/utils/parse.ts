import type { Entry, EntryInfo } from '@/types/entry';
import * as cheerio from 'cheerio';

export function getRows($: cheerio.Root): {
    titleRows: cheerio.Cheerio;
    infoRows: cheerio.Cheerio;
} {
    // Cleanup table and get only relevant rows
    const tableRows = $('#hnmain tbody tr:nth-of-type(3) tbody tr').not(
        '.spacer, .morespace, tr.morespace ~ *',
    );
    const titleRows = tableRows.filter('.athing');
    const infoRows = tableRows.not('.athing');

    return { titleRows, infoRows };
}

export function getRanks(elements: cheerio.Cheerio, $: cheerio.Root): number[] {
    return elementsToText(elements.find('.rank'), $)
        .map((rank) => rank.replace('.', ''))
        .map((rank) => parseInt(rank, 10));
}

export function getTitles(
    elements: cheerio.Cheerio,
    $: cheerio.Root,
): string[] {
    return elementsToText(elements.find('.title .titleline > a'), $).map(
        (title) => title.trim(),
    );
}

export function elementsToText(
    elements: cheerio.Cheerio,
    $: cheerio.Root,
): string[] {
    return elements.toArray().map((element) => $(element).text());
}

export function getPoints(element: cheerio.Cheerio, $: cheerio.Root): number {
    const pointsStr = element
        .find('.score')
        .text()
        .replace('points', '')
        .replace('point', '')
        .trim();

    return parseInt(pointsStr, 10) || 0;
}

export function getComments(element: cheerio.Cheerio, $: cheerio.Root): number {
    const comments = element
        .find('a:contains("comments"), a:contains("discuss")')
        .text()
        .replace('&nbsp;comments', '')
        .replace('&nbsp;comment', '')
        .replace('discuss', '0')
        .trim();

    return parseInt(comments, 10) || 0;
}

export function getInfoEntries(
    infoRows: cheerio.Cheerio,
    $: cheerio.Root,
): EntryInfo[] {
    const infoObjects: EntryInfo[] = [];
    infoRows.each((_, elem) => {
        const points = getPoints($(elem), $);
        const comments = getComments($(elem), $);
        infoObjects.push({ points, comments });
    });

    return infoObjects;
}

export function getEntries(html: string): Entry[] {
    const $ = cheerio.load(html);

    const { titleRows, infoRows } = getRows($);

    const ranks = getRanks(titleRows, $);
    const titles = getTitles(titleRows, $);
    const infoEntries = getInfoEntries(infoRows, $);

    const numEntries = Math.min(titleRows.length, infoRows.length);
    return Array.from({ length: numEntries }, (_, i) => {
        const { points, comments } = infoEntries[i];
        const entry: Entry = {
            rank: ranks[i],
            title: titles[i],
            points,
            comments,
        };
        return entry;
    });
}
