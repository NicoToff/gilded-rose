import { GildedRose } from "../utils/classes/gilded-rose";
import { originalItems, newItems } from "../data/items";
import { itemLogger, type ItemLoggerPadding } from "../utils/helpers/logger";
import { findLongestItemName } from "../utils/helpers/find-longest-item-name";

const daysArgument = Number(process.argv.at(2));

if (daysArgument) {
    if (isNaN(daysArgument)) {
        console.log(`Invalid argument ${daysArgument}: days must be a number`);
        process.exit(1);
    }
    if (daysArgument < 0) {
        console.log(`Invalid argument ${daysArgument}: days must be a positive number`);
        process.exit(1);
    }
    if (daysArgument > 365) {
        console.log(`Invalid argument ${daysArgument}: days must be less or equal to 365`);
        process.exit(1);
    }
}

const days = daysArgument || 15;

const allItems = [...originalItems, ...newItems];
const gildedRoseInn = new GildedRose(allItems);

const loggerPadding: ItemLoggerPadding = { name: findLongestItemName(allItems), sellIn: 6, quality: 4 };
for (let i = 0; i < days; i++) {
    console.log(`\n----------------------- day ${i} ------------------------`);
    itemLogger("name", "sellIn", "qual.", loggerPadding);
    gildedRoseInn.items.forEach((item) => {
        itemLogger(item.getName(), item.getSellIn(), item.getQuality(), loggerPadding);
    });
    gildedRoseInn.updateItems();
}
