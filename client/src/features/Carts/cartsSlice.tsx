import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { AppThunk, RootState } from '../../app/store'

export interface CartItemInterface {
  id: string,
  brandName: string,
  pricePerUnit: number,
  discount: number,
  quantity: number,
}

export interface CartInterface {
  billId: string | null
  id: string,
  customer: {
    name: string | null,
    email: string | null,
    phone: string | null
  }
  items: CartItemInterface[],
  locked: boolean,
  branchId: string
}

export interface CartState {
  carts: CartInterface[];
}

const initialState: CartState = {
  carts: [],
}

interface CartCreatePayload {
  id: string
  branchId: string
}

interface CartActionsPayload {
  id: string
}

interface AddItemToCartPayload {
  cartID: string
  itemID: string
}

interface UpdateItemPayload extends AddItemToCartPayload {
  quantity?: number
  brandName?: string
  pricePerUnit?: number
  discount?: number
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
    addNewCart: (state, { payload }: PayloadAction<CartCreatePayload> ) => {
      state.carts.unshift({
        id: payload.id,
        items: [],
        customer: {
          name: null,
          email: null,
          phone: null
        },
        billId: null,
        locked: false,
        branchId: payload.branchId,
      })
    },
    removeCart: (state, { payload }: PayloadAction<CartActionsPayload> ) => {
      state.carts = state.carts.filter(cart => cart.id != payload.id)
    },
    addItemToCart: (state, { payload }: PayloadAction<AddItemToCartPayload> ) => {

      const carts = state.carts.filter(cart => cart.id == payload.cartID)

      if(carts.length > 1) throw new Error('Exception: Duplicate Cart ID Found')

      const cart = carts[0]

      if(cart.locked) {
        toast.error(`Cart (${cart.id}) is Locked, Failed to add Item`)
        return
      }

      let item: CartItemInterface | undefined = cart.items.filter(item => item.id == payload.itemID)[0]

      if(item) {
        item.quantity += 1
      }
      else {
        item = {
          id: payload.itemID,
          brandName: '',
          quantity: 1,
          discount: 0,
          pricePerUnit: 0
        }
        cart.items.unshift(item)
      }
    },
    updateItem: (state, { payload }: PayloadAction<UpdateItemPayload> ) => {

      const carts = state.carts.filter(cart => cart.id == payload.cartID)

      if(carts.length > 1) throw new Error('Exception: Duplicate Cart ID Found')
      if(carts.length == 0) throw new Error(`Exception: Invalid Cart ID ${payload.cartID}`)

      const cart = carts[0]

      if(cart.locked) {
        toast.error(`Cart (${cart.id}) is Locked, Failed to update Item`)
        return
      }

      const item: CartItemInterface | undefined = cart.items.filter(item => item.id == payload.itemID)[0]

      if(item) {
        if(payload.quantity !== undefined) item.quantity = payload.quantity
        if(payload.brandName !== undefined) item.brandName = payload.brandName
        if(payload.pricePerUnit !== undefined) item.pricePerUnit = payload.pricePerUnit
        if(payload.discount !== undefined) item.discount = payload.discount
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
      
      if(cart.locked) {
        toast.error(`Cart (${cart.id}) is Locked, Failed to update Item`)
        return
      }

      if(payload.email) cart.customer.email = payload.email
      if(payload.name) cart.customer.name = payload.name
      if(payload.phone) cart.customer.phone = payload.phone
    },
    updateCart: (state, { payload }: PayloadAction<{ cartId: string, billId?: string, locked?: boolean, branchId?: string }>) => {
      const carts = state.carts.filter(cart => cart.id == payload.cartId)

      if(carts.length > 1) throw new Error('Exception: Duplicate Cart ID Found')
      if(carts.length == 0) throw new Error(`Exception: Invalid Cart ID ${payload.cartId}`)

      const cart = carts[0]
      if(payload.billId !== undefined) cart.billId = payload.billId
      if(payload.locked !== undefined) cart.locked = payload.locked

      if(cart.locked) return
      if(payload.branchId !== undefined) cart.branchId = payload.branchId
    }
  },
})

export const { addNewCart, removeCart, addItemToCart, updateCustomerDetails, updateItem, updateCart } = cartSlice.actions

export const selectCarts = (state: RootState) => state.carts.carts

export const selectCart = (id: string) => (state: RootState) => {
  return state.carts.carts.filter(cart => cart.id == id)[0]
}

export const selectNextCart = (id: string) => (state: RootState): null | CartInterface => {
  const index = state.carts.carts.findIndex(cart => cart.id == id)
  if(index === -1) return null
  if(index === state.carts.carts.length - 1) return null
  return state.carts.carts[index + 1]
}

export const selectPrevCart = (id: string) => (state: RootState): null | CartInterface => {
  const index = state.carts.carts.findIndex(cart => cart.id == id)
  if(index === -1) return null
  if(index === 0) return null
  return state.carts.carts[index - 1]
}

export const removeItemFromCart = (payload: AddItemToCartPayload): AppThunk => (dispatch) => {
  dispatch(updateItem({...payload, quantity: 0}))
}

export default cartSlice.reducer