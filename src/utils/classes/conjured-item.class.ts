import { AbstractItem, type ItemConstructorArgs } from "./abstract-item.class";
import { ConjuredItemEnum } from "./item.enum";

export class ConjuredItem extends AbstractItem {
    constructor(args: ItemConstructorArgs) {
        super({
            ...args,
            DEFAULT_DEGRADE_MODIFIER: ConjuredItemEnum.DEGRADE_MODIFIER,
        });
    }
}
