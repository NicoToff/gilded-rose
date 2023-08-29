import { ItemEnum } from "./item.enum";

export type ItemConstructorArgs = {
    name: string;
    sellIn: number;
    quality: number;
    isLegendary?: boolean;
    agesWell?: boolean;
    isConjured?: boolean;
};
export class Item {
    private _name: string;
    private _sellIn: number;
    private _quality: number;
    private _isLegendary: boolean;
    private _agesWell: boolean;
    private _isConjured: boolean;

    constructor(args: ItemConstructorArgs) {
        if (args.quality < ItemEnum.MIN_QUALITY)
            throw new Error(`Quality cannot be less than ${ItemEnum.MIN_QUALITY}`);
        if (args.quality > ItemEnum.MAX_QUALITY && !args.isLegendary)
            throw new Error(`Quality cannot be more than ${ItemEnum.MAX_QUALITY}, unless item is legendary`);
        this._name = args.name;
        this._sellIn = args.sellIn;
        this._quality = args.quality;
        this._isLegendary = args.isLegendary || false;
        this._agesWell = args.agesWell || false;
        this._isConjured = args.isConjured || false;
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

    public isLegendary(): boolean {
        return this._isLegendary;
    }

    public agesWell(): boolean {
        return this._agesWell;
    }

    public isConjured(): boolean {
        return this._isConjured;
    }

    public ageOneDay(modifierOverride?: number): this {
        if (this._isLegendary) return this;

        let modifier = modifierOverride ?? 1;
        if (!modifierOverride) {
            if (this._isConjured) modifier *= 2;
            if (this.isExpired()) modifier *= 2;
            if (this._agesWell) modifier *= -1;
        }

        this._quality -= modifier;

        this._sellIn -= 1;

        // Ensures boundaries are respected
        if (this._quality < ItemEnum.MIN_QUALITY) {
            this._quality = ItemEnum.MIN_QUALITY;
        } else if (this._quality > 50) {
            this._quality = 50;
        }

        return this;
    }
}
