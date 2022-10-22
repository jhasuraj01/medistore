import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { auth } from '../../firebase'

type AuthToken = string | undefined

export interface AuthState {
  token: AuthToken
  active: boolean
  email: string
  displayName: string | undefined
  photoURL: string | undefined
  timestamp: number
}

const initialState: AuthState = {
  token: undefined,
  active: !auth.currentUser?.isAnonymous,
  email: auth.currentUser?.email || '',
  displayName: auth.currentUser?.displayName || '',
  photoURL: auth.currentUser?.photoURL || '',
  timestamp: Date.now()
}

export const updateAuthState = createAsyncThunk(
  'auth/updateAuthState',
  async () => {
    const token: AuthToken = await auth.currentUser?.getIdToken(true) || undefined
    return { token }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(updateAuthState.fulfilled, (state, { payload }) => {
      const user = auth.currentUser
      state.email = user?.email || ''
      state.displayName = user?.displayName || undefined
      state.photoURL = user?.photoURL || undefined
      state.active = Boolean(user && !user.isAnonymous)
      state.token = payload.token
    })
  },
})

// export const { } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth
export const selectAuthActive = (state: RootState) => state.auth.active
export const selectAuthToken = (state: RootState) => state.auth.token
export const selectAuthPhotoURL = (state: RootState) => state.auth.photoURL

export default authSlice.reducer