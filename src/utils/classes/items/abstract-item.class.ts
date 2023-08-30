import { ItemEnum } from "./enums/item.enum";

type AbstractItemConstructorArgs = {
    name: string;
    sellIn: number;
    quality: number;
    DEGRADE_MODIFIER?: number;
    SELL_IN_MODIFIER?: number;
    MIN_QUALITY?: number;
    MAX_QUALITY?: number;
};

export type ItemConstructorArgs = Omit<
    AbstractItemConstructorArgs,
    "DEGRADE_MODIFIER" | "SELL_IN_MODIFIER" | "MIN_QUALITY" | "MAX_QUALITY"
>;

export abstract class AbstractItem {
    protected _name: string;
    protected _sellIn: number;
    protected _quality: number;
    protected _DEGRADE_MODIFIER: number;
    protected _SELL_IN_MODIFIER: number;
    protected _MIN_QUALITY: number;
    protected _MAX_QUALITY: number;

    constructor(args: AbstractItemConstructorArgs) {
        this._name = args.name;
        this._sellIn = args.sellIn;
        this._quality = args.quality;
        this._DEGRADE_MODIFIER = args.DEGRADE_MODIFIER ?? ItemEnum.DEFAULT_DEGRADE_MODIFIER;
        this._SELL_IN_MODIFIER = args.SELL_IN_MODIFIER ?? ItemEnum.DEFAULT_SELL_IN_MODIFIER;
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
    protected sellInLogic(sellInModifierOverride?: number): void {
        this._sellIn -= sellInModifierOverride ?? this._SELL_IN_MODIFIER;
    }

    protected modifyQuality(qualityModifierOverride?: number): void {
        this._quality -= qualityModifierOverride ?? this._DEGRADE_MODIFIER;
    }

    protected expiredExtraLogic(skipLogic?: boolean): void {
        if (!skipLogic) this.modifyQuality();
    }

    public readonly ageOneDay = ({
        qualityModifierOverride,
        sellInModifierOverride,
        skipExtraExpiredQualityDegrade,
        skipQualityBoundariesEnforcement,
    }: AgeOneDayArgs = {}): this => {
        this.sellInLogic(sellInModifierOverride);

        this.modifyQuality(qualityModifierOverride);

        if (this.isExpired()) {
            this.expiredExtraLogic(skipExtraExpiredQualityDegrade);
        }

        if (!skipQualityBoundariesEnforcement) {
            this.enforceQualityBoundaries();
        }

        return this;
    };
}

type AgeOneDayArgs = {
    qualityModifierOverride?: number;
    sellInModifierOverride?: number;
    skipExtraExpiredQualityDegrade?: boolean;
    skipQualityBoundariesEnforcement?: boolean;
};