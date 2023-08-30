export function itemLogger(
    name: string,
    sellIn: number | string,
    quality: number | string,
    padding: { name: number; sellIn: number; quality: number },
): void {
    console.log(
        `${name.padStart(padding.name)}, ${sellIn.toString().padStart(padding.sellIn)}, ${quality
            .toString()
            .padStart(padding.quality)}`,
    );
}

export type ItemLoggerPadding = Parameters<typeof itemLogger>["3"];
