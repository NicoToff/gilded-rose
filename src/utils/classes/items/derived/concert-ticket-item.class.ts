import { AbstractItem } from "../abstract-item.class";
import { ConcertTicketItemEnum, ItemEnum } from "../enums/item.enum";

export class ConcertTicketItem extends AbstractItem {
    protected override modifyQualityLogic(qualityModifierOverride?: number | undefined): void {
        const qualityModifier =
            qualityModifierOverride ?? ConcertTicketItem.computeQualityModifier(this.getSellIn());
        this._quality += qualityModifier;
    }

    protected override expiredExtraLogic(skipLogic?: boolean | undefined): void {
        if (!skipLogic) {
            this._quality = 0;
        }
    }

    public static computeQualityModifier(currentSellIn: number): number {
        for (const { value, qualityModifier } of ConcertTicketItemEnum.SELL_IN_THRESHOLDS) {
            if (currentSellIn <= value) {
                return qualityModifier;
            }
        }
        return ItemEnum.DEFAULT_DEGRADE_MODIFIER;
    }
}
