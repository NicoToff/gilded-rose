export const ItemEnum = {
    DEFAULT_MIN_QUALITY: 0,
    DEFAULT_MAX_QUALITY: 50,
    DEFAULT_DEGRADE_MODIFIER: 1,
    DEFAULT_SELL_IN_MODIFIER: 1,
} as const;

export type ItemEnum = keyof typeof ItemEnum;
