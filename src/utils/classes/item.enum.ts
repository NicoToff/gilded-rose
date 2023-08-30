export const ItemEnum = {
    DEFAULT_MIN_QUALITY: 0,
    DEFAULT_MAX_QUALITY: 50,
    DEFAULT_DEGRADE_MODIFIER: 1,
    DEFAULT_SELL_IN_MODIFIER: 1,
} as const;

export const LegendaryItemEnum = {
    QUALITY_CONSTANT: 80,
} as const;

export const ConjuredItemEnum = {
    DEGRADE_MODIFIER: 2,
} as const;

export const ConcertTicketItemEnum = {
    // WARNING: This array must be sorted by value in ascending order
    SELL_IN_THRESHOLDS: [
        { value: 5, qualityModifier: 3 },
        { value: 10, qualityModifier: 2 },
    ],
} as const;
