import { ConcertTicketItemEnum, ItemEnum } from "../../src/utils/classes/items/enums/item.enum";
import { ConcertTicketItem } from "../../src/utils/classes/items/derived/concert-ticket-item.class";

describe("ConcertTicketItem", () => {
    const originalSellIn = 20;
    const originalQuality = 10;

    let concertTicketItem: ConcertTicketItem;
    beforeEach(() => {
        concertTicketItem = new ConcertTicketItem({
            name: "foo",
            sellIn: originalSellIn,
            quality: originalQuality,
        });
    });

    it("should increase in quality normally until a threshold is reached", () => {
        const highestThresholdValue = ConcertTicketItemEnum.SELL_IN_THRESHOLDS.at(-1)!.value;
        while (concertTicketItem.getSellIn() > highestThresholdValue + 1) {
            const previousQuality = concertTicketItem.getQuality();
            concertTicketItem.ageOneDay();
            expect(concertTicketItem.getQuality()).toBe(previousQuality + ItemEnum.DEFAULT_DEGRADE_MODIFIER);
        }
        expect(true).toBe(true);
    });

    it("should have a quality of 0 once it is expired", () => {
        while (!concertTicketItem.isExpired()) {
            concertTicketItem.ageOneDay();
        }
        expect(concertTicketItem.getQuality()).toBe(0);
    });

    it("should have a quality of 0 once it is expired, and it should stay at 0", () => {
        while (!concertTicketItem.isExpired()) {
            concertTicketItem.ageOneDay();
        }
        for (let i = 0; i < 20; i++) {
            concertTicketItem.ageOneDay();
            expect(concertTicketItem.getQuality()).toBe(0);
        }
    });

    /* The following tests assume that the THRESHOLDS array is:
            THRESHOLDS: [
                { value: 5, qualityModifier: 3 },
                { value: 10, qualityModifier: 2 },
            ]
        If the array is changed, these tests will need to be updated accordingly.
        DO NOT use the THRESHOLDS array directly, as it would defeat the purpose of these tests.
    */
    it("should have a working computeQualityModifier method", () => {
        expect(ConcertTicketItem.computeQualityModifier(17)).toBe(1);
        expect(ConcertTicketItem.computeQualityModifier(10)).toBe(2);
        expect(ConcertTicketItem.computeQualityModifier(9)).toBe(2);
        expect(ConcertTicketItem.computeQualityModifier(5)).toBe(3);
        expect(ConcertTicketItem.computeQualityModifier(4)).toBe(3);
    });
});
