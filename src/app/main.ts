import { GildedRose } from "../utils/classes/gilded-rose";

const items = [
    new Item({ name: "+5 Dexterity Vest", sellIn: 10, quality: 20 }), //
    new Item({ name: "Aged Brie", sellIn: 2, quality: 0, agesWell: true }), //
    new Item({ name: "Elixir of the Mongoose", sellIn: 5, quality: 7 }), //
    new Item({ name: "Sulfuras, Hand of Ragnaros", sellIn: 0, quality: 80, isLegendary: true }), //
    new Item({ name: "Sulfuras, Hand of Ragnaros", sellIn: -1, quality: 80, isLegendary: true }),
    new Item({ name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 15, quality: 20, agesWell: true }),
    new Item({ name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 10, quality: 49, agesWell: true }),
    new Item({ name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 5, quality: 49, agesWell: true }),
    // this conjured item does not work properly yet
    new Item({ name: "Conjured Mana Cake", sellIn: 3, quality: 6, isConjured: true }),
];
