import { AbstractItem } from "../../src/utils/classes/abstract-item.class";

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

        expect(basicItem.getSellIn()).toBe(originalSellIn - 1);
        expect(basicItem.getQuality()).toBe(originalQuality - 1);
    });

    it("should be able to age multiple days", () => {
        const numberOfDays = 3;

        for (let i = 0; i < numberOfDays; i++) {
            basicItem.ageOneDay();
        }

        expect(basicItem.getSellIn()).toBe(originalSellIn - numberOfDays);
        expect(basicItem.getQuality()).toBe(originalQuality - numberOfDays);
    });
});
