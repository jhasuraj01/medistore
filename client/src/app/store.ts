import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import subNavReducer from '../features/SubNav/subNavSlice'
import authReducer from '../features/Auth/authSlice'
import cartsReducer from '../features/Carts/cartsSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    subNav: subNavReducer,
    auth: authReducer,
    carts: cartsReducer,
  },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
