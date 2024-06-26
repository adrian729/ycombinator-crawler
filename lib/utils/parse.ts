import * as cheerio from 'cheerio';

export type Entry = {
    rank: number;
    title: string;
    points: number;
    comments: number;
};

export function getRows(
    html: string,
    $: cheerio.Root,
): { titleRows: cheerio.Cheerio; infoRows: cheerio.Cheerio } {
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

export function getPoints(
    elements: cheerio.Cheerio,
    $: cheerio.Root,
): number[] {
    return elementsToText(elements.find('.score'), $)
        .map((score) => score.replace('points', '').replace('point', '').trim())
        .map((score) => parseInt(score, 10));
}

export function getComments(
    elements: cheerio.Cheerio,
    $: cheerio.Root,
): number[] {
    return elementsToText(
        elements.find('a:contains("comments"), a:contains("discuss")'),
        $,
    )
        .map((comments) =>
            comments
                .replace('&nbsp;comments', '')
                .replace('&nbsp;comment', '')
                .replace('discuss', '0')
                .trim(),
        )
        .map((comments) => parseInt(comments, 10));
}

export function getEntries(html: string): Entry[] {
    const $ = cheerio.load(html);

    const { titleRows, infoRows } = getRows(html, $);

    const numEntries = Math.min(titleRows.length, infoRows.length);

    const ranks = getRanks(titleRows, $);
    const titles = getTitles(titleRows, $);
    const points = getPoints(infoRows, $);
    const comments = getComments(infoRows, $);

    return Array.from({ length: numEntries }, (_, i) => {
        const entry: Entry = {
            rank: ranks[i],
            title: titles[i],
            points: points[i],
            comments: comments[i],
        };
        return entry;
    });
}
