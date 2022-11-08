import { Branch, Item } from "../../../../gql/graphql";

export class BranchProxy implements Branch {
  public id: string;
  public name: string;
  public items: ItemProxy[] = []

  constructor({ id, name }: Branch) {
    this.name = name;
    this.id = id;
  }

  set item(items: Item[]) {
    this.items = items.map(item => new ItemProxy(item))
  }

}

export class ItemProxy implements Item {
  costPerUnit: number;
  discount: number;
  id: string;
  name: string;
  pricePerUnit: number;
  quantity: number;

  constructor({ costPerUnit, discount, id, name, pricePerUnit, quantity }: Item) {
    this.costPerUnit = costPerUnit
    this.discount = discount
    this.id = id
    this.name = name
    this.pricePerUnit = pricePerUnit
    this.quantity = quantity
  }


}