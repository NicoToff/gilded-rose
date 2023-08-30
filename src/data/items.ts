import { Item } from "../utils/classes/item.class";
import { LegendaryItem } from "../utils/classes/legendary-item.class";
import { AgeWellItem } from "../utils/classes/age-well-item.class";
import { ConjuredItem } from "../utils/classes/conjured-item.class";
import { ConcertTicketItem } from "../utils/classes/concert-ticket-item.class";

export const originalItems = [
    new Item({ name: "+5 Dexterity Vest", sellIn: 10, quality: 20 }),
    new AgeWellItem({ name: "Aged Brie", sellIn: 2, quality: 0 }),
    new Item({ name: "Elixir of the Mongoose", sellIn: 5, quality: 7 }),
    new LegendaryItem({ name: "Sulfuras, Hand of Ragnaros", sellIn: 0 }),
    new LegendaryItem({ name: "Sulfuras, Hand of Ragnaros", sellIn: -1 }),
    new ConcertTicketItem({ name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 15, quality: 20 }),
    new ConcertTicketItem({ name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 10, quality: 49 }),
    new ConcertTicketItem({ name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 5, quality: 49 }),
    new ConjuredItem({ name: "Conjured Mana Cake", sellIn: 3, quality: 6 }),
];

export const newItems = [
    new Item({ name: "Orcish Helm", sellIn: 7, quality: 80 }),
    new AgeWellItem({ name: "Ancient Dwarven Ale", sellIn: 4, quality: 10 }),
    new Item({ name: "Elixir of Giant Growth", sellIn: 3, quality: 15 }),
    new LegendaryItem({ name: "Thunderfury, Blessed Blade of the Windseeker", sellIn: 5 }),
    new ConcertTicketItem({ name: "Front Row Tickets to the Darkmoon Faire", sellIn: 12, quality: 30 }),
    new ConjuredItem({ name: "Conjured Mana Pudding", sellIn: 4, quality: 12 }),
    new Item({ name: "Felsteel Longblade", sellIn: 6, quality: 22 }),
    new AgeWellItem({ name: "Moonberry Juice", sellIn: 2, quality: 5 }),
];
