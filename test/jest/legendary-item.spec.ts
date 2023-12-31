import { LegendaryItemEnum } from "../../src/utils/classes/items/enums/item.enum";
import { LegendaryItem } from "../../src/utils/classes/items/derived/legendary-item.class";

describe("LegendaryItem", () => {
    const originalSellIn = 10;

    let legendaryItem: LegendaryItem;
    beforeEach(() => {
        legendaryItem = new LegendaryItem({ name: "foo", sellIn: 10 });
    });

    it("should stay constant in quality and sellIn over time", () => {
        legendaryItem.ageOneDay();
        legendaryItem.ageOneDay();
        legendaryItem.ageOneDay();

        expect(legendaryItem.getQuality()).toBe(LegendaryItemEnum.QUALITY_CONSTANT);
        expect(legendaryItem.getSellIn()).toBe(originalSellIn);
    });
});
