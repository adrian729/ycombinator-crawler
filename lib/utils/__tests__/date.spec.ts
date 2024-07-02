import { dateMillisToTimestamp } from '@/lib/utils/date';

describe.each([
    [171906199, 171906],
    [111111111, 111111],
    [0, 0],
])('Test convert date millis to timestamp(6)', (millis, expected) => {
    it('dateMillisToTimestamp', () => {
        const result = dateMillisToTimestamp(millis);

        expect(result).toStrictEqual(expected);
    });
});
