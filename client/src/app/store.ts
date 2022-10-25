import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import counterReducer from '../features/counter/counterSlice'
import subNavReducer from '../features/SubNav/subNavSlice'
import authReducer from '../features/Auth/authSlice'
import cartsReducer from '../features/Carts/cartsSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    subNav: persistReducer<ReturnType<typeof subNavReducer>>({ key: 'subNav', storage }, subNavReducer),
    auth: authReducer,
    carts: persistReducer<ReturnType<typeof cartsReducer>>({ key: 'carts', storage }, cartsReducer),
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
