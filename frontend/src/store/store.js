import { configureStore } from '@reduxjs/toolkit'
import userApi from './userApi'
import userReducer from './userSlice'
import itemApi from './itemApi'

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        logging: userReducer,
        [itemApi.reducerPath]: itemApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware, itemApi.middleware),
})