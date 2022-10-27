import { Cart, CartItem } from './cartsSlice'

export class CartItemProxy implements CartItem {
  private item: CartItem
  constructor(item: CartItem) {
    this.item = item
  }
  get id() : string {
    return this.item.id
  }
  get name(): string {
    return this.item.name
  }
  get pricePerQuantity(): number {
    return this.item.pricePerQuantity
  }
  get discount(): number {
    return this.item.discount
  }
  get quantity(): number {
    return this.item.quantity
  }
  get finalPricePerQuantity(): number {
    return this.pricePerQuantity * (100 - this.discount) / 100
  }
  get totalPrice(): number {
    return this.finalPricePerQuantity * this.quantity
  }
}

export class CartProxy implements Cart {
  private cart: Cart
  private _items: CartItemProxy[]
  constructor(cart: Cart) {
    this.cart = cart
    this._items = this.cart.items.map(item => new CartItemProxy(item))
  }

  get id(): string {
    return this.cart.id
  }

  get customer(): Cart['customer'] {
    return this.cart.customer
  }

  get totalBillValue(): number {
    return this.cart.totalBillValue
  }

  get items(): CartItemProxy[] {
    return this._items
  }

}