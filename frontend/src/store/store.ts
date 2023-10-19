import { configureStore } from '@reduxjs/toolkit'
import receiptsReducer from './slices/receiptsSlice'
import profileReducer from './slices/profileSlice'

export const store = configureStore({
  reducer: {
    receipts: receiptsReducer,
    profile: profileReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch