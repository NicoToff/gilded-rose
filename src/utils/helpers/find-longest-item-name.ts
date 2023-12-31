import { AbstractItem } from "../classes/items/abstract-item.class";

export function findLongestItemName(items: AbstractItem[]) {
    return items.reduce((longest, currentItem) => {
        const currentLength = currentItem.getName().length;
        return currentLength > longest ? currentLength : longest;
    }, 0);
}
