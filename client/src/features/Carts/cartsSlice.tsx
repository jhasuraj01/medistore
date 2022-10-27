import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../app/store'

export interface CartItem {
  id: string,
  name: string,
  pricePerQuantity: number,
  discount: number,
  quantity: number
}

export interface Cart {
  id: string,
  customer: {
    name: string | null,
    email: string | null,
    phone: string | null
  }
  totalBillValue: number
  items: CartItem[]
}

export interface CartState {
  carts: Cart[];
}

const initialState: CartState = {
  carts: [],
}

interface CartActionsPayload {
  id: string
}

interface AddItemToCartPayload {
  cartID: string
  itemID: string
}

interface UpdateItemQuantityPayload extends AddItemToCartPayload {
  quantity: number
}

interface UpdateCustomerDetailsPayload extends CartActionsPayload {
  name?: string,
  email?: string,
  phone?: string
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addNewCart: (state, { payload }: PayloadAction<CartActionsPayload> ) => {
      state.carts.unshift({
        id: payload.id,
        items: [],
        customer: {
          name: null,
          email: null,
          phone: null
        },
        totalBillValue: 0
      })
    },
    removeCart: (state, { payload }: PayloadAction<CartActionsPayload> ) => {
      state.carts = state.carts.filter(cart => cart.id != payload.id)
    },
    addItemToCart: (state, { payload }: PayloadAction<AddItemToCartPayload> ) => {

      const carts = state.carts.filter(cart => cart.id == payload.cartID)

      if(carts.length > 1) throw new Error('Exception: Duplicate Cart ID Found')

      const cart = carts[0]

      let item: CartItem | undefined = cart.items.filter(item => item.id == payload.itemID)[0]

      if(item) {
        item.quantity += 1
      }
      else {
        item = {
          id: payload.itemID,
          name: 'Lorem Ipsum Dolar Shit',
          quantity: 1,
          discount: 0.1,
          pricePerQuantity: 100
        }
        cart.items.unshift(item)
      }
      cart.totalBillValue += item.pricePerQuantity * (1 - item.discount)
    },
    updateItemQuantity: (state, { payload }: PayloadAction<UpdateItemQuantityPayload> ) => {

      const carts = state.carts.filter(cart => cart.id == payload.cartID)

      if(carts.length > 1) throw new Error('Exception: Duplicate Cart ID Found')
      if(carts.length == 0) throw new Error('Exception: Invalid Cart ID')

      const cart = carts[0]

      const item: CartItem | undefined = cart.items.filter(item => item.id == payload.itemID)[0]

      if(item) {
        const difference = Math.max(payload.quantity, 0) - item.quantity
        item.quantity = Math.max(payload.quantity, 0)
        cart.totalBillValue += difference * item.pricePerQuantity * (1 - item.discount)

        if(item.quantity === 0) {
          cart.items = cart.items.filter(item => item.id != payload.itemID)
        }
      }
      else {
        throw new Error('Exception: Invalid Item ID')
      }
    },
    updateCustomerDetails: (state, { payload }: PayloadAction<UpdateCustomerDetailsPayload> ) => {

      const carts = state.carts.filter(cart => cart.id == payload.id)

      if(carts.length > 1) throw new Error('Exception: Duplicate Cart ID Found')

      const cart = carts[0]

      if(payload.email) cart.customer.email = payload.email
      if(payload.name) cart.customer.name = payload.name
      if(payload.phone) cart.customer.phone = payload.phone
    },
  },
})

export const { addNewCart, removeCart, addItemToCart, updateCustomerDetails, updateItemQuantity } = cartSlice.actions

export const selectCarts = (state: RootState) => state.carts.carts

export const selectCart = (id: string) => (state: RootState) => {
  return state.carts.carts.filter(cart => cart.id == id)[0]
}

export const selectNextCart = (id: string) => (state: RootState): null | Cart => {
  const index = state.carts.carts.findIndex(cart => cart.id == id)
  if(index === -1) return null
  if(index === state.carts.carts.length - 1) return null
  return state.carts.carts[index + 1]
}

export const selectPrevCart = (id: string) => (state: RootState): null | Cart => {
  const index = state.carts.carts.findIndex(cart => cart.id == id)
  if(index === -1) return null
  if(index === 0) return null
  return state.carts.carts[index - 1]
}

export const removeItemFromCart = (payload: AddItemToCartPayload): AppThunk => (dispatch) => {
  dispatch(updateItemQuantity({...payload, quantity: 0}))
}


export default cartSlice.reducer