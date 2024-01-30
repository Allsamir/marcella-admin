import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarShow: true,
  unfoldable: true,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    changeState: (state, action) => {
      if (action.payload.type === "fold") {
        state.unfoldable = action.payload.unfoldable;
      }
      if (action.payload.type === "side") {
        state.sidebarShow = action.payload.sidebarShow;
      }
    },
  },
});

export const { changeState } = sidebarSlice.actions;
export default sidebarSlice.reducer;
