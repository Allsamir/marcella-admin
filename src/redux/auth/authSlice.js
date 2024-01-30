const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  accessToken: undefined,
  email: undefined,
  role: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    adminLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },

    adminLoggedOut: (state) => {
      state.accessToken = undefined;
      state.email = undefined;
      state.role = undefined;
    },
  },
});

export const { adminLoggedIn, adminLoggedOut } = authSlice.actions;
export default authSlice.reducer;
