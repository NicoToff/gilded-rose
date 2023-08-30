import { AbstractItem } from "../abstract-item.class";
import { ConcertTicketItemEnum, ItemEnum } from "../enums/item.enum";

export class ConcertTicketItem extends AbstractItem {
    protected override modifyQualityLogic(): void {
        const qualityModifier = ConcertTicketItem.computeQualityModifier(this.getSellIn());
        this._quality += qualityModifier;
    }

    protected override expiredExtraLogic(): void {
        this._quality = 0;
    }

    public static computeQualityModifier(currentSellIn: number): number {
        for (const { value, qualityModifier } of ConcertTicketItemEnum.SELL_IN_THRESHOLDS) {
            const thresholdIsReached = currentSellIn <= value;
            if (thresholdIsReached) {
                return qualityModifier;
            }
        }
        return ItemEnum.DEFAULT_DEGRADE_MODIFIER;
    }
}
