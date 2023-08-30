import { ConjuredItem } from "../../src/utils/classes/conjured-item.class";
import { ConjuredItemEnum } from "../../src/utils/classes/item.enum";

describe("LegendaryItem", () => {
    const originalSellIn = 10;
    const originalQuality = 50;
    const qualityWhenSellInIsReached = originalQuality - ConjuredItemEnum.DEGRADE_MODIFIER * originalSellIn;

    let conjuredItem: ConjuredItem;
    beforeEach(() => {
        conjuredItem = new ConjuredItem({ name: "foo", sellIn: originalSellIn, quality: originalQuality });
    });

    it("should degrade in quality faster than normal items 1/2", () => {
        conjuredItem.ageOneDay();

        expect(conjuredItem.getQuality()).toBe(originalQuality - ConjuredItemEnum.DEGRADE_MODIFIER);
    });

    it("should degrade in quality faster than normal items 2/2", () => {
        const numberOfDays = originalSellIn;

        for (let i = 0; i < numberOfDays; i++) {
            conjuredItem.ageOneDay();
            const expired = conjuredItem.getQuality();
            console.log("sellIn", conjuredItem.getSellIn(), " ; expired", expired);
        }

        expect(conjuredItem.getQuality()).toBe(qualityWhenSellInIsReached);
    });

    it("should degrade in quality twice as fast after sellIn date", () => {
        const EXTRA = 4;
        const numberOfDays = originalSellIn + EXTRA;

        for (let i = 0; i < numberOfDays; i++) {
            conjuredItem.ageOneDay();
        }

        expect(conjuredItem.getQuality()).toBe(
            qualityWhenSellInIsReached - EXTRA * ConjuredItemEnum.DEGRADE_MODIFIER,
        );
    });
});
