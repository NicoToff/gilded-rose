import { Item } from "../../src/utils/classes/item.class";
import { ItemEnum } from "../../src/utils/classes/item.enum";

describe("AbstractItem", () => {
    const originalName = "foo";
    const originalSellIn = 10;
    const originalQuality = 20;

    let basicItem: Item;
    beforeEach(() => {
        basicItem = new Item({ name: originalName, sellIn: originalSellIn, quality: originalQuality });
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

    it("should be considered expired when sellIn is less than 0", () => {
        const numberOfDays = originalSellIn + 1;

        for (let i = 0; i < numberOfDays; i++) {
            basicItem.ageOneDay();
        }

        expect(basicItem.isExpired()).toBe(true);
    });

    it("should degrade twice as fast when expired", () => {
        const numberOfDays = originalSellIn;
        const qualityWhenSellInIsReached =
            originalQuality - originalSellIn * ItemEnum.DEFAULT_DEGRADE_MODIFIER;

        for (let i = 0; i < numberOfDays; i++) {
            basicItem.ageOneDay();
        }

        expect(basicItem.getQuality()).toBe(qualityWhenSellInIsReached);

        basicItem.ageOneDay();

        expect(basicItem.getQuality()).toBe(
            qualityWhenSellInIsReached - 2 * ItemEnum.DEFAULT_DEGRADE_MODIFIER,
        );
    });

    it("should be possible to override the qualityModifier", () => {
        const qualityModifierOverride = 2;
        basicItem.ageOneDay({ qualityModifierOverride });

        expect(basicItem.getQuality()).toBe(originalQuality - qualityModifierOverride);
    });

    it("should be possible to override the sellInModifier", () => {
        const sellInModifierOverride = -2;
        basicItem.ageOneDay({ sellInModifierOverride });

        expect(basicItem.getSellIn()).toBe(originalSellIn - sellInModifierOverride);
    });
});
