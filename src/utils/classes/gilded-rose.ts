import { AbstractItem } from "./abstract-item.class";

export class GildedRose {
    items: Array<AbstractItem>;

    constructor(items: Array<AbstractItem> = []) {
        this.items = items;
    }

    public readonly updateItems = () => {
        this.items.forEach((item) => {
            item.ageOneDay();
        });
        return this.items;
    };
}
