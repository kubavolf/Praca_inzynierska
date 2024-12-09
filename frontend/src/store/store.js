import { configureStore } from '@reduxjs/toolkit'
import userApi from './userApi'
import userReducer from './userSlice'
import itemApi from './itemApi'

export const store = configureStore({

    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        logging: userReducer, //czemu tylko login? BO register jest jeden raz wpisany i inforamcje nie muszą być trzymane
        [itemApi.reducerPath]: itemApi.reducer,
    },
    
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware, itemApi.middleware),
})