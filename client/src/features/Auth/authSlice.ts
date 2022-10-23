import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { auth } from '../../firebase'

type AuthToken = string | undefined
export interface AuthState {
  active: boolean
  token: AuthToken
  uid: string | undefined
  email: string | undefined
  emailVerified: boolean | undefined
  phoneNumber: string | undefined
  displayName: string | undefined
  photoURL: string | undefined
  lastSignInTime: number | undefined
  creationTime: number | undefined
  providers: string[] | undefined
  timestamp: number
}

const initialState: AuthState = {
  token: undefined,
  active: !auth.currentUser?.isAnonymous,
  email: auth.currentUser?.email || '',
  displayName: auth.currentUser?.displayName || '',
  photoURL: auth.currentUser?.photoURL || '',
  timestamp: Date.now(),
  uid: undefined,
  emailVerified: undefined,
  phoneNumber: undefined,
  lastSignInTime: undefined,
  creationTime: undefined,
  providers: undefined
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
    builder.addCase(updateAuthState.pending, (state) => {
      const user = auth.currentUser
      state.email = user?.email || undefined
      state.displayName = user?.displayName || undefined
      state.photoURL = user?.photoURL || undefined
      state.active = Boolean(user && !user.isAnonymous)
      state.uid = user?.uid || undefined,
      state.emailVerified = user ? user?.emailVerified : undefined,
      state.phoneNumber = user?.phoneNumber || undefined,
      state.lastSignInTime = user?.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).getTime() : undefined,
      state.creationTime = user?.metadata.creationTime ? new Date(user.metadata.creationTime).getTime() : undefined,
      state.providers = user?.providerData ? user.providerData.map(p => p.providerId) : undefined
    })
    builder.addCase(updateAuthState.fulfilled, (state, { payload }) => {
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