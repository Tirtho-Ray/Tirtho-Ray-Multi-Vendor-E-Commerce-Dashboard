import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DecodedUser } from "@/utils/jwt";

interface AuthState {
  user: DecodedUser | null;
  accessToken: string | null;
}

const initialState: AuthState = { user: null, accessToken: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: DecodedUser; accessToken: string }>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setUser, updateAccessToken, clearUser } = authSlice.actions;
export default authSlice.reducer;
