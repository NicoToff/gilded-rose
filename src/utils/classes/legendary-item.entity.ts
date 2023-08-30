import { AbstractItem, type ItemConstructorArgs } from "./item.abstract";

export class LegendaryItem extends AbstractItem {
    constructor(args: ItemConstructorArgs) {
        super({
            ...args,
            DEFAULT_DEGRADE_MODIFIER: 0,
            DEFAULT_SELL_IN_MODIFIER: 0,
            MIN_QUALITY: 80,
            MAX_QUALITY: 80,
        });
    }
}
