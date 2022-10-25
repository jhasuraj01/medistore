import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import counterReducer from '../features/counter/counterSlice'
import subNavReducer from '../features/SubNav/subNavSlice'
import authReducer from '../features/Auth/authSlice'
import cartsReducer from '../features/Carts/cartsSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    subNav: persistReducer({ key: 'subNav', storage, serialize: true }, subNavReducer),
    auth: authReducer,
    carts: persistReducer({ key: 'carts', storage, serialize: true }, cartsReducer),
  },
  middleware: getDefaultMiddleware({
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
