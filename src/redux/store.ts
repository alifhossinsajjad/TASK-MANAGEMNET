import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import todoReducer from "./features/todo/todoSlice";
import userReducer from "./features/user/userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  counter: counterReducer,
  user: userReducer,
  todo: todoReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
});

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//     todo: persistedReducer,
//     user: userReducer,
//   },
// });

export const persistedStore = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
