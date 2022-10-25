import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

interface Cart {
  id: string
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

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addNewCart: (state, { payload }: PayloadAction<CartActionsPayload> ) => {
      state.carts.unshift({
        id: payload.id
      })
    },
    removeCart: (state, { payload }: PayloadAction<CartActionsPayload> ) => {
      state.carts = state.carts.filter(cart => cart.id != payload.id)
    },
  },
})

export const { addNewCart, removeCart } = cartSlice.actions

export const selectCarts = (state: RootState) => state.carts.carts

export const nextCart = (id: string) => (state: RootState): null | string => {
  const index = state.carts.carts.findIndex(cart => cart.id == id)
  if(index === -1) return null
  if(index === state.carts.carts.length - 1) return null
  return state.carts.carts[index + 1].id
}

export const prevCart = (id: string) => (state: RootState): null | string => {
  const index = state.carts.carts.findIndex(cart => cart.id == id)
  if(index === -1) return null
  if(index === 0) return null
  return state.carts.carts[index - 1].id
}

export default cartSlice.reducer