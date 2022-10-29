import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { auth } from '../../firebase'

type AuthToken = string | undefined
export interface AuthState {
  active: boolean
  token: AuthToken
  uid: string | undefined
  email: string | null | undefined
  emailVerified: boolean | undefined
  phoneNumber: string | null | undefined
  displayName: string | null | undefined
  photoURL: string | null | undefined
  lastSignInTime: number | null | undefined
  creationTime: number | null | undefined
  providers: string[] | undefined
  timestamp: number
}

// undefined:- field isn't intialized
// null:- field isn't available

const initialState: AuthState = {
  token: undefined,
  active: !auth.currentUser?.isAnonymous,
  email: auth.currentUser?.email,
  displayName: auth.currentUser?.displayName,
  photoURL: auth.currentUser ? auth.currentUser.photoURL : undefined,
  timestamp: Date.now(),
  uid: auth.currentUser ? auth.currentUser.uid : undefined,
  emailVerified: auth.currentUser ? auth.currentUser.emailVerified : undefined,
  phoneNumber: auth.currentUser ? auth.currentUser.phoneNumber : undefined,
  lastSignInTime: undefined,
  creationTime: undefined,
  providers: undefined
}

export const updateAuthState = createAsyncThunk(
  'auth/updateAuthState',
  async () => {
    const token: AuthToken = await auth.currentUser?.getIdToken(true) || undefined
    if(token)
      localStorage.setItem('token', token)
    else
      localStorage.removeItem('token')
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
      state.timestamp = Date.now()
      if(user) {
        state.active = true
        state.email = user.email
        state.displayName = user.displayName
        state.photoURL = user.photoURL
        state.uid = user.uid,
        state.emailVerified = user.emailVerified
        state.phoneNumber = user.phoneNumber
        state.lastSignInTime = user.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).getTime() : null
        state.creationTime = user.metadata.creationTime ? new Date(user.metadata.creationTime).getTime() : null
        state.providers = user.providerData.map(p => p.providerId)
      }
      else {
        state.active = false
        state.email = undefined
        state.displayName = undefined
        state.photoURL = undefined
        state.uid = undefined
        state.emailVerified = undefined
        state.phoneNumber = undefined
        state.lastSignInTime = undefined
        state.creationTime = undefined
        state.providers = undefined
      }
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