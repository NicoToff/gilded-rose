# AbstractItem

This class is the base for all items classes. It is the more complex of them and can be derived into more specific classes.

## Main properties

Its three main properties are:

- `_name`: the name of the item
- `_sellIn`: the number of days remaining before the item expires
- `_quality`: the current quality of the item

## Changing the item's properties

The properties cannot the directly set. The `AbstractItem` class instead provides an `ageOneDay` method that must be called to automatically update the item's properties. Its default implementation does the following:

- `sellIn` is decremented by 1
- `quality` is decremented by 1
- `quality` is further decremented by 1 if `sellIn` is less than 0 (i.e. the item is expired)
- it ensures `quality` remains within predefined bounds (generally, between 0 and 50)

The `ageOneDay` method cannot be overridden. To change the aging behaviour you can either:

- Override the secondary properties of the item (see below)
- Override all necessary pieces of logic that the `ageOneDay` method performs (see below)

## Secondary properties

The `AbstractItem` class has four secondary properties:

- `_DEGRADE_MODIFIER`: The amount that gets subtracted from the `quality` property when the `ageOneDay` method is called. This value is used twice if the item is expired. 
- `_SELL_IN_MODIFIER`: The amount that gets subtracted from the `sellIn` property when the `ageOneDay` method is called.
- `_MIN_QUALITY`: The minimum value the `quality` property can have.
- `_MAX_QUALITY`: The maximum value the `quality` property can have.

If those values aren't defined, the `AbstractItem` class will use the default value that are found in `ItemEnum`.

Overriding those values is the easiest way to change the aging behaviour of an item. Take the `AgeWellItem` class for example:

```typescript
class AgeWellItem extends AbstractItem {
    constructor(args: ItemConstructorArgs) {
        super({
            ...args,
            DEGRADE_MODIFIER: -1,
        });
    }
}
```

By simply subtracting -1 (i.e. adding 1) when aging the item, we improve its quality instead of degrading it.

Let's take another example with the `LegendaryItem` class:

```typescript
class LegendaryItem extends AbstractItem {
    constructor(args: Omit<ItemConstructorArgs, "quality">) {
        super({
            ...args,
            quality: LegendaryItemEnum.QUALITY_CONSTANT,
            DEGRADE_MODIFIER: 0,
            SELL_IN_MODIFIER: 0,
            MIN_QUALITY: LegendaryItemEnum.QUALITY_CONSTANT,
            MAX_QUALITY: LegendaryItemEnum.QUALITY_CONSTANT,
        });
    }
}
```

Legendary items don't age and don't degrade in quality. They also all have a constant quality of 80 (see `LegendaryItemEnum`). By overriding the secondary properties, we can ensure that the item's properties will never change. Furthermore, we can remove the `quality` property from the constructor arguments and set it ourselves since it will always be the same.

**NOTE:** When extending the `AbstractItem` class, it is recommended to expose only the main properties of the item in the constructor. To do so, we use the `ItemConstructorArgs` type instead of `AbstractItemConstructorArgs`. This keeps the derived class easier to use and less prone to error.

## Overriding the `ageOneDay` method

If you need more control over the aging behaviour of an item, you can override the logic behind the `ageOneDay` method. The three pieces of logic that are performed are:

```typescript
export abstract class AbstractItem {
    // ...
    protected sellInLogic(): void {
        this._sellIn -= this._SELL_IN_MODIFIER;
    }

    protected modifyQualityLogic(): void {
        this._quality -= this._DEGRADE_MODIFIER;
    }

    protected expiredExtraLogic(): void {
        this.modifyQualityLogic();
    }
    // ...
}
```

Let's take the `ConcertTicketItem` class as an example:

```typescript
class ConcertTicketItem extends AbstractItem {
    protected override modifyQualityLogic(): void {
        const qualityModifier = ConcertTicketItem.computeQualityModifier(this.getSellIn());
        this._quality += qualityModifier;
    }

    protected override expiredExtraLogic(): void {
        this._quality = 0;
    }

    // ...
}
```

Concert tickets have a very specific aging behaviour, based on how close the concert is. Their quality increases more and more, based on specific thresholds. When the concert is over (i.e. the item is expired), the quality drops and remains at 0.

Thus, this class is a good candidate for an override of the `modifyQualityLogic` and `expiredExtraLogic` methods.

<details>

<summary>(more) See the <code>computeQualityModifier</code> static method</summary>

```typescript
class ConcertTicketItem extends AbstractItem {
    // ...
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
```

**NOTE:** The `ConcertTicketEnum` is the following (more values can be easily added):
    
```typescript
export const ConcertTicketItemEnum = {
    SELL_IN_THRESHOLDS: [
        { value: 5, qualityModifier: 3 },
        { value: 10, qualityModifier: 2 },
    ],
} as const;
```

</details>

## Override behaviour as arguments

The third and last way to change the aging behaviour of an item is to pass arguments to the `ageOneDay` method. This ensures flexibility for the consumers of derived class who need a *very* specific behaviour. This is especially useful when the situation doesn't warrant a new class. This is also good for the maintainability of the codebase and the longevity of the project.

The `ageOneDay` method accepts an object of type `AgeOneDayArgs` as an argument:

```typescript
type AgeOneDayArgs = {
    qualityModifierOverride?: number;
    sellInModifierOverride?: number;
    skipExtraExpiredQualityDegrade?: boolean;
    skipQualityBoundariesEnforcement?: boolean;
};
```
### Full explanation of the arguments

When `qualityModifierOverride` is passed, the `modifyQualityLogic()` is entirely ignored and the value passed is used instead. 

When `sellInModifierOverride` is passed, the `sellInLogic()` is entirely ignored and the value passed is used instead. 

When `skipExtraExpiredQualityDegrade` is passed, the `expiredExtraLogic()` is ignored.

Finally, when `skipQualityBoundariesEnforcement` is passed, the `enforceQualityBoundaries()` is ignored (this private method normally ensures the `_quality` remains within the predefined bounds).