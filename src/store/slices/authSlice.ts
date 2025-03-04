import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { IUser } from "../../types";

interface AuthState {
  isAuthenticated: boolean;
  currentUser: string | null;
  users: IUser[];
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  currentUser: null,
  users: [],
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: (state, action: PayloadAction<IUser>) => {
      const { username, password } = action.payload;
      const userExists = state.users.some((user) => user.username === username);
      if (userExists) {
        state.error = "Username already exists";
      } else {
        state.users.push({ username, password });
        state.isAuthenticated = true;
        state.currentUser = username;
        state.error = null;
      }
    },

    login: (state, action: PayloadAction<IUser>) => {
      const { username, password } = action.payload;
      const user = state.users.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        state.isAuthenticated = true;
        state.currentUser = username;
        state.error = null;
      } else {
        state.error = "Invalid username or password";
      }
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["users", "isAuthenticated", "currentUser"],
};

export const { signup, login, logout, clearError } = authSlice.actions;
export default persistReducer(persistConfig, authSlice.reducer);
