// import { Item } from "../src/utils/classes/legendary-item.class";
// import { GildedRose } from "../src/utils/classes/gilded-rose";

// const items = [
//     new Item({ name: "+5 Dexterity Vest", sellIn: 10, quality: 20 }), //
//     new Item({ name: "Aged Brie", sellIn: 2, quality: 0, agesWell: true }), //
//     new Item({ name: "Elixir of the Mongoose", sellIn: 5, quality: 7 }), //
//     new Item({ name: "Sulfuras, Hand of Ragnaros", sellIn: 0, quality: 80, isLegendary: true }), //
//     new Item({ name: "Sulfuras, Hand of Ragnaros", sellIn: -1, quality: 80, isLegendary: true }),
//     new Item({ name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 15, quality: 20, agesWell: true }),
//     new Item({ name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 10, quality: 49, agesWell: true }),
//     new Item({ name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 5, quality: 49, agesWell: true }),
//     // this conjured item does not work properly yet
//     new Item({ name: "Conjured Mana Cake", sellIn: 3, quality: 6, isConjured: true }),
// ];

// const gildedRose = new GildedRose(items);

// let days: number = 2;
// if (process.argv.length > 2) {
//     days = +process.argv[2];
// }

// for (let i = 0; i < days; i++) {
//     console.log("-------- day " + i + " --------");
//     console.log("name, sellIn, quality");
//     items.forEach((element) => {
//         console.log(element.getName() + " " + element.getSellIn() + " " + element.getQuality());
//     });
//     console.log();
//     gildedRose.updateQuality();
// }
