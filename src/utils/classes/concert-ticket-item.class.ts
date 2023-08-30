import { AbstractItem, type AgeOneDayLogicArgs } from "./abstract-item.class";
import { ConcertTicketItemEnum, ItemEnum } from "./item.enum";

export class ConcertTicketItem extends AbstractItem {
    protected override ageOneDayLogic({
        qualityModifierOverride,
        sellInModifierOverride,
        skipExtraExpiredQualityDegrade,
    }: AgeOneDayLogicArgs = {}) {
        this._sellIn -= sellInModifierOverride ?? this._SELL_IN_MODIFIER;

        if (!skipExtraExpiredQualityDegrade && this.isExpired()) {
            this._quality = 0;
        } else {
            this._quality += qualityModifierOverride ?? this.computeQualityModifier();
        }
    }

    computeQualityModifier(currentSellIn = this.getSellIn()): number {
        for (const { value, qualityModifier } of ConcertTicketItemEnum.SELL_IN_THRESHOLDS) {
            if (currentSellIn <= value) {
                return qualityModifier;
            }
        }
        return ItemEnum.DEFAULT_DEGRADE_MODIFIER;
    }
}
