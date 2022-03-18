let expect = require('chai').expect;
import { Item, StoreInventory } from './../index';

describe("Testing grocery inventory", () => {

  it("Should decrease the qualiity and sellIn for a normal product",() => {
    const item = [new Item("Apple", 10, 10)];
    const store = new StoreInventory(item);
    store.updateQuality();
    expect(item[0].quality).to.equal(9);
  })
})