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

interface AddNewCartPayload {
  id: string
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addNewCart: (state, { payload }: PayloadAction<AddNewCartPayload> ) => {
      state.carts.unshift({
        id: payload.id
      })
    },
  },
})

export const { addNewCart } = cartSlice.actions

export const selectCarts = (state: RootState) => state.carts.carts

export default cartSlice.reducer