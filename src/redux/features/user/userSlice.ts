import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type IUser } from "../../../types/common";

interface InitialState {
  users: IUser[];
}

const initialState: InitialState = {
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      state.users.push(action.payload);
    },
    removeUser: (state, actions: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user._id !== actions.payload);
    },
  },
});

export const selectUsers = (state: { user: InitialState }) => state.user.users;

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
