import { AbstractItem } from "../../src/utils/classes/abstract-item.class";
import { ItemEnum } from "../../src/utils/classes/item.enum";

describe("AbstractItem", () => {
    const originalName = "foo";
    const originalSellIn = 10;
    const originalQuality = 10;

    class BasicItem extends AbstractItem {}
    let basicItem: BasicItem;
    beforeEach(() => {
        basicItem = new BasicItem({ name: originalName, sellIn: originalSellIn, quality: originalQuality });
    });

    it("should exist, have a name, sellIn, and quality", () => {
        expect(basicItem).toBeDefined();
        expect(basicItem.getName()).toBe(originalName);
        expect(basicItem.getSellIn()).toBe(originalSellIn);
        expect(basicItem.getQuality()).toBe(originalQuality);
    });

    it("should be able to age one day", () => {
        basicItem.ageOneDay();

        expect(basicItem.getSellIn()).toBe(originalSellIn - ItemEnum.DEFAULT_SELL_IN_MODIFIER);
        expect(basicItem.getQuality()).toBe(originalQuality - ItemEnum.DEFAULT_DEGRADE_MODIFIER);
    });

    it("should be able to age multiple days", () => {
        const numberOfDays = 3;

        for (let i = 0; i < numberOfDays; i++) {
            basicItem.ageOneDay();
        }

        expect(basicItem.getSellIn()).toBe(originalSellIn - numberOfDays * ItemEnum.DEFAULT_SELL_IN_MODIFIER);
        expect(basicItem.getQuality()).toBe(
            originalQuality - numberOfDays * ItemEnum.DEFAULT_DEGRADE_MODIFIER,
        );
    });

    it("should should have a quality lower than intended DEFAULT_MIN_QUALITY", () => {
        const numberOfDays = 100;

        for (let i = 0; i < numberOfDays; i++) {
            basicItem.ageOneDay();
        }

        expect(basicItem.getQuality()).toBe(ItemEnum.DEFAULT_MIN_QUALITY);
    });

    it("should be considered expired when sellIn is 0 or less", () => {
        const numberOfDays = originalSellIn;

        for (let i = 0; i < numberOfDays; i++) {
            basicItem.ageOneDay();
        }

        expect(basicItem.isExpired()).toBe(true);
    });
});
