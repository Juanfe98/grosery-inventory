"use strict";
/*

  ======================================================
  Replicant Grocery Inventory Requirements Specification
  ======================================================

  Hi and welcome to team Replicant. As you know, we have extended our platform functionality to include
  grocery inventory management. We also buy and sell only the finest goods. Unfortunately, our goods
  are constantly degrading in quality as they approach their sell by date. We have a system in place
  that updates our inventory for us. It was developed by a no-nonsense type named Iain, who has working
  on self-service work. Your task is to add the new feature to our system so that we can begin selling
  a new category of items. First an introduction to our system:

    - All items have a SellIn value which denotes the number of days we have to sell the item
    - All items have a Quality value which denotes how valuable the item is
    - At the end of each day our system lowers both values for every item

  Pretty simple, right? Well this is where it gets interesting:

    - Once the sell by date has passed, Quality degrades twice as fast
    - The Quality of an item is never negative
    - "Cheddar Cheese" actually increases in Quality the older it gets
    - The Quality of an item is never more than 25
    - "Instant Ramen", never has to be sold or decreases in Quality

  We have recently signed a supplier of organic items. This requires an update to our system:

    - "Organic" items degrade in Quality twice as fast as normal items
    - Once an item is 5 days past its sell date we can no longer sell it and it should be removed from our system

  Feel free to make any changes to the UpdateQuality method and add any new code as long as everything
  still works correctly.
  
  Please ensure everything still works correctly by writing unit tests.

  Free to use Google!
  Feel free to break things.
  Feel free to save often.

*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreInventory = exports.Item = void 0;
class Item {
    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}
exports.Item = Item;
class StoreInventory {
    constructor(items = []) {
        this.items = items;
    }
    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].name != 'Cheddar Cheese') {
                // if (this.items[i].sellIn < 3) { # Summer sale promotion
                //     this.items[i].onSale = true;
                // }
                if (this.items[i].quality > 0) {
                    if (this.items[i].name != 'Instant Ramen') {
                        this.items[i].quality = this.items[i].quality - 1;
                    }
                }
            }
            else {
                // if (this.items[i].sellIn < 3) { # Summer sale promotion
                //     this.items[i].onSale = true;
                // }              
                if (this.items[i].quality < 25) {
                    this.items[i].quality = this.items[i].quality + 1;
                }
            }
            if (this.items[i].name != 'Instant Ramen') {
                this.items[i].sellIn = this.items[i].sellIn - 1;
            }
            if (this.items[i].sellIn < 0) {
                if (this.items[i].name != 'Cheddar Cheese') {
                    this.items[i].quality = this.items[i].quality - this.items[i].quality;
                }
                else {
                    if (this.items[i].quality < 50) {
                        this.items[i].quality = this.items[i].quality + 1;
                    }
                }
            }
        }
        return this.items;
    }
    testMethod() {
        console.log('yeep executing');
    }
}
exports.StoreInventory = StoreInventory;
let items = [
    new Item("Apple", 10, 10),
    //new Item("Banana", 2, 10),
    //new Item("Strawberry", 5, 10),
    new Item("Cheddar Cheese", 10, 20),
    new Item("Instant Ramen", 0, 5),
    // this Organic item does not work properly yet
    new Item("Organic Avocado", 20, 20)
];
let storeInventory = new StoreInventory(items);
let days = 5;
for (let i = 0; i < days; i++) {
    console.log("-------- day " + i + " --------");
    console.log("                  name        sellIn  quality");
    let data = items.map(element => {
        return [element.name, element.sellIn, element.quality];
    });
    console.table(data);
    console.log();
    storeInventory.updateQuality();
}
