import { AgeWellItem } from "../../src/utils/classes/age-well-item.class";
import { ItemEnum } from "../../src/utils/classes/item.enum";

describe("AgeWellItem", () => {
    const originalSellIn = 10;
    const originalQuality = 20;
    const qualityWhenSellInIsReached = originalQuality + ItemEnum.DEFAULT_DEGRADE_MODIFIER * originalSellIn;

    let ageWellItem: AgeWellItem;
    beforeEach(() => {
        ageWellItem = new AgeWellItem({ name: "foo", sellIn: originalSellIn, quality: originalQuality });
    });

    it("should increase in quality over time", () => {
        ageWellItem.ageOneDay();

        expect(ageWellItem.getQuality()).toBe(originalQuality + ItemEnum.DEFAULT_DEGRADE_MODIFIER);
    });

    it("should increase regularly until sellIn is reached", () => {
        const numberOfDays = originalSellIn;

        for (let i = 0; i < numberOfDays; i++) {
            ageWellItem.ageOneDay();
        }

        expect(ageWellItem.getQuality()).toBe(qualityWhenSellInIsReached);
    });

    it("should increase in quality twice as fast after sellIn date", () => {
        const EXTRAS = [1, 2, 4, 6];
        EXTRAS.forEach((EXTRA) => {
            const ageWellItem = new AgeWellItem({
                name: "foo",
                sellIn: originalSellIn,
                quality: originalQuality,
            });
            const numberOfDays = originalSellIn + EXTRA;

            for (let i = 0; i < numberOfDays; i++) {
                ageWellItem.ageOneDay();
            }

            expect(ageWellItem.getQuality()).toBe(
                qualityWhenSellInIsReached + EXTRA * ItemEnum.DEFAULT_DEGRADE_MODIFIER * 2,
            );
        });
    });
});
