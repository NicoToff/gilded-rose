import { AbstractItem, type ItemConstructorArgs } from "./abstract-item.class";
import { LegendaryItemEnum } from "./item.enum";

export class LegendaryItem extends AbstractItem {
    constructor(args: Omit<ItemConstructorArgs, "quality">) {
        super({
            ...args,
            quality: LegendaryItemEnum.QUALITY_CONSTANT,
            DEFAULT_DEGRADE_MODIFIER: 0,
            DEFAULT_SELL_IN_MODIFIER: 0,
            MIN_QUALITY: LegendaryItemEnum.QUALITY_CONSTANT,
            MAX_QUALITY: LegendaryItemEnum.QUALITY_CONSTANT,
        });
    }
}
