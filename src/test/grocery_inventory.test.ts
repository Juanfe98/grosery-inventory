let expect = require('chai').expect;
import { Item, StoreInventory } from './../index';

describe("Testing grocery inventory system", () => {

  const test = (items: Array<Item>) => {
    const store = new StoreInventory(items);
    store.updateQuality();
  }

  it("Should decrease the quality and sellIn for a normal product",() => {
    const item = [new Item("Apple", 10, 10)];
    test(item);
    expect(item[0].quality).to.equal(9);
    expect(item[0].sellIn).to.equal(9);
  })

  it("Should degrades quality twice as fast once the sell by date has passed", () => {
    const item = [new Item("Apple",0,10)];
    test(item);
    expect(item[0].quality).to.equal(8);
  })

  it("The Quality of an item is never negative", () => {
    const item = [new Item("Apple",10,0), new Item("Apple",0,0)];
    test(item);
    expect(item[0].quality).to.greaterThan(-1);
    expect(item[1].quality).to.greaterThan(-1);
  })

  it("Cheddar Cheese actually increases in Quality the older it gets", () => {
    const item = [new Item("Cheddar Cheese",10,10)];
    test(item);
    expect(item[0].quality).to.equal(11);
  })

  it("Quality should never be greater than 25", () => {
    const item = [new Item("Cheddar Cheese",10,25)];
    test(item);
    expect(item[0].quality).to.equal(25);
  })

  it("Instant Ramen, never has to be sold or decreases in Quality", () => {
    const item = [new Item("Instant Ramen",10,10)];
    test(item);
    expect(item[0].quality).to.equal(10);
    expect(item[0].sellIn).to.equal(10);
  })
})