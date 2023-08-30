import { AbstractItem, type ItemConstructorArgs } from "../abstract-item.class";

export class AgeWellItem extends AbstractItem {
    constructor(args: ItemConstructorArgs) {
        super({
            ...args,
            DEGRADE_MODIFIER: -1,
        });
    }
}
