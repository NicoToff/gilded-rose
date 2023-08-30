import { ItemEnum } from "./item.enum";

type AbstractItemConstructorArgs = {
    name: string;
    sellIn: number;
    quality: number;
    DEFAULT_DEGRADE_MODIFIER?: number;
    DEFAULT_SELL_IN_MODIFIER?: number;
    MIN_QUALITY?: number;
    MAX_QUALITY?: number;
};

export type ItemConstructorArgs = Omit<
    AbstractItemConstructorArgs,
    "DEFAULT_DEGRADE_MODIFIER" | "DEFAULT_SELL_IN_MODIFIER" | "MIN_QUALITY" | "MAX_QUALITY"
>;

export abstract class AbstractItem {
    protected _name: string;
    protected _sellIn: number;
    protected _quality: number;
    protected _DEFAULT_DEGRADE_MODIFIER: number;
    protected _DEFAULT_SELL_IN_MODIFIER: number;
    protected _MIN_QUALITY: number;
    protected _MAX_QUALITY: number;

    constructor(args: AbstractItemConstructorArgs) {
        this._name = args.name;
        this._sellIn = args.sellIn;
        this._quality = args.quality;
        this._DEFAULT_DEGRADE_MODIFIER = args.DEFAULT_DEGRADE_MODIFIER ?? ItemEnum.DEFAULT_DEGRADE_MODIFIER;
        this._DEFAULT_SELL_IN_MODIFIER = args.DEFAULT_DEGRADE_MODIFIER ?? ItemEnum.DEFAULT_SELL_IN_MODIFIER;
        this._MIN_QUALITY = args.MIN_QUALITY ?? ItemEnum.DEFAULT_MIN_QUALITY;
        this._MAX_QUALITY = args.MAX_QUALITY ?? ItemEnum.DEFAULT_MAX_QUALITY;
    }

    public getName(): string {
        return this._name;
    }

    public getSellIn(): number {
        return this._sellIn;
    }

    public isExpired(): boolean {
        return this._sellIn < 0;
    }

    public getQuality(): number {
        return this._quality;
    }

    private enforceQualityBoundaries(): void {
        if (this._quality < this._MIN_QUALITY) {
            this._quality = this._MIN_QUALITY;
        } else if (this._quality > this._MAX_QUALITY) {
            this._quality = this._MAX_QUALITY;
        }
    }

    protected ageOneDayLogic({
        qualityModifierOverride,
        sellInModifierOverride,
        skipExtraExpiredQualityDegrade,
    }: AgeOneDayLogicArgs = {}): void {
        this._quality -= qualityModifierOverride ?? this._DEFAULT_DEGRADE_MODIFIER;

        if (!skipExtraExpiredQualityDegrade && this.isExpired()) {
            this._quality -= this._DEFAULT_DEGRADE_MODIFIER;
        }

        this._sellIn -= sellInModifierOverride ?? this._DEFAULT_SELL_IN_MODIFIER;
    }

    public readonly ageOneDay = ({
        qualityModifierOverride,
        sellInModifierOverride,
        skipQualityBoundariesEnforcement: skipEnforcement,
    }: AgeOneDayArgs = {}): this => {
        this.ageOneDayLogic({ qualityModifierOverride, sellInModifierOverride });

        if (!skipEnforcement) {
            this.enforceQualityBoundaries();
        }

        return this;
    };
}
export type AgeOneDayLogicArgs = {
    qualityModifierOverride?: number;
    sellInModifierOverride?: number;
    skipExtraExpiredQualityDegrade?: boolean;
};
export type AgeOneDayArgs = {
    skipQualityBoundariesEnforcement?: boolean;
} & AgeOneDayLogicArgs;
