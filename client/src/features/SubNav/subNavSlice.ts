import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export interface SubNavState {
  isExpanded: boolean;
}

const initialState: SubNavState = {
  isExpanded: true,
}

export const subNavSlice = createSlice({
  name: 'subNav',
  initialState,
  reducers: {
    toggleExpansion: (state) => {
      state.isExpanded = !state.isExpanded
    },
  },
})

export const { toggleExpansion } = subNavSlice.actions

export const selectSubNavExpanded = (state: RootState) => state.subNav.isExpanded

export default subNavSlice.reducer