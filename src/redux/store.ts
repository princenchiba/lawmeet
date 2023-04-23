import { configureStore } from '@reduxjs/toolkit'
import dbCLientReducer from './dbClient'

const store = configureStore({
  reducer: {
    dbClient: dbCLientReducer
  },
})

export type RootState = ReturnType<typeof store.getState>;

export default store;