import { AbstractItem, type ItemConstructorArgs } from "./abstract-item.class";

export class AgeWellItem extends AbstractItem {
    constructor(args: ItemConstructorArgs) {
        super({
            ...args,
            DEFAULT_DEGRADE_MODIFIER: -1,
        });
    }
}
