import type { Entry } from '@/lib/utils/parse';
import {
    elementsToText,
    getEntries,
    getPoints,
    getRanks,
    getTitles,
} from '@/lib/utils/parse';
import * as cheerio from 'cheerio';
import { yCombinatorHtmlMock } from './mocks/yCombinatorMocks';

describe('Test parse html', () => {
    it('parse', () => {
        const result = getEntries(yCombinatorHtmlMock);

        const expected: Entry[] = [
            {
                rank: 1,
                title: 'Ghosts in the ROM (2012)',
                points: 56,
                comments: 6,
            },
            {
                rank: 4,
                title: 'Show HN: Rubbrband – A hosted ComfyUI alternative for image generation',
                points: 11,
                comments: 5,
            },
            {
                rank: 110,
                title: 'Short Title',
                points: 13,
                comments: 0,
            },
        ];

        expect(result).toStrictEqual(expected);
    });
});

describe.each([
    [
        '<html><span>1</span><span>2</span><span>3</span></html>',
        ['1', '2', '3'],
    ],
])('Test elementsToText', (html, expected) => {
    it('elementsToText', () => {
        const $ = cheerio.load(html);
        const elements = $('html span');

        const result = elementsToText(elements, $);

        expect(result).toStrictEqual(expected);
    });
});

describe('Get ranks', () => {
    it('Get ranks from html successfully should return a non empty array', () => {
        const $ = cheerio.load(yCombinatorHtmlMock);
        const elements = $('html');

        const ranks = getRanks(elements, $);

        const expected = [1, 4, 110];

        expect(ranks).toStrictEqual(expected);
    });

    it('Get ranks from html with no valid ranks should return an empty array', () => {
        const htmlMock = `
            <html>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
            </html>
        `;
        const $ = cheerio.load(htmlMock);
        const elements = $('html');

        const ranks = getRanks(elements, $);

        const expected: string[] = [];

        expect(ranks).toStrictEqual(expected);
    });
});

describe('Get titles', () => {
    it('Get titles from html successfully should return a non empty array', () => {
        const $ = cheerio.load(yCombinatorHtmlMock);
        const elements = $('html');

        const titles = getTitles(elements, $);

        const expected = [
            'Ghosts in the ROM (2012)',
            'Show HN: Rubbrband – A hosted ComfyUI alternative for image generation',
            'Short Title',
        ];

        expect(titles).toStrictEqual(expected);
    });

    it('Get titles from html with no valid titles should return an empty array', () => {
        const htmlMock = `
            <html>
                <div class="title"><span class="titleline>1</span></div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
            </html>
        `;
        const $ = cheerio.load(htmlMock);
        const elements = $('html');

        const titles = getTitles(elements, $);

        const expected: string[] = [];

        expect(titles).toStrictEqual(expected);
    });
});

describe('Get points', () => {
    it('Get points from html successfully should return a non empty array', () => {
        const $ = cheerio.load(yCombinatorHtmlMock);
        const elements = $('html');

        const points = getPoints(elements, $);

        const expected = [56, 11, 13];

        expect(points).toStrictEqual(expected);
    });

    it('Get points from html with no valid points should return an empty array', () => {
        const htmlMock = `
            <html>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
            </html>
        `;
        const $ = cheerio.load(htmlMock);
        const elements = $('html');

        const points = getPoints(elements, $);

        const expected: string[] = [];

        expect(points).toStrictEqual(expected);
    });
});
