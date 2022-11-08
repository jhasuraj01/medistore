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
  organizationId: string;
  branchId: string;
  id: string;
  brandName: string;
  companyName: string;
  costPerUnit: number;
  pricePerUnit: number;
  discount: number;
  quantity: number;
  manufactureAt: number;
  expireAt: number | null | undefined;

  constructor(item: Item) {
    this.organizationId = item.organizationId
    this.branchId = item.branchId
    this.id = item.id
    this.brandName = item.brandName
    this.companyName = item.companyName
    this.costPerUnit = item.costPerUnit
    this.pricePerUnit = item.pricePerUnit
    this.discount = item.discount
    this.quantity = item.quantity
    this.manufactureAt = item.manufactureAt
    this.expireAt = item.expireAt
  }

  public get marginPerUnit() {
    return this.pricePerUnit - this.costPerUnit
  }

  public get profitLossPerUnit() {
    return this.pricePerUnit * (1 - this.discount) - this.costPerUnit
  }

  public get marginTotal() {
    return this.marginPerUnit * this.quantity
  }

  public get profitLossTotal() {
    return this.profitLossPerUnit * this.quantity
  }
}