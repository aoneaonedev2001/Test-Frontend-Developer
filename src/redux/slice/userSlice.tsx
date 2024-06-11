import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Users {
  id: string;
  title: string;
  firstname: string;
  lastname: string;
  birthday: any;
  nationality: string;
  citizenID: string[];
  gender: string;
  mobilePhone: string;
  passportNo: string;
  expectedSalary: string;
}

interface UsersState {
  users: Users[];
  selectedUser: Users | null;
}

const initialState: UsersState = {
  users: JSON.parse(localStorage.getItem("Users") || "[]"),
  selectedUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<Users>) => {
      state.users.push(action.payload);
      localStorage.setItem("Users", JSON.stringify(state.users));
    },
    editUser: (state, action: PayloadAction<Users>) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
        localStorage.setItem("Users", JSON.stringify(state.users));
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
      localStorage.setItem("Users", JSON.stringify(state.users));
    },
    findUserById: (state, action: PayloadAction<string>) => {
      const user =
        state.users.find((user) => user.id === action.payload) || null;
      state.selectedUser = user;
    },
  },
});


export const { addUser, editUser, deleteUser, findUserById } =
  userSlice.actions;

export default userSlice.reducer;
