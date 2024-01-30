const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  name: "",
  price: "",
  status: "",
  model: "",
  quantity: "",
};

const productSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setProductSearchResult: (state, action) => {
      state.name = action.payload.name;
      state.price = action.payload.price;
      state.status = action.payload.status;
      state.model = action.payload.model;
      state.quantity = action.payload.quantity;
    },
  },
});

export const { setProductSearchResult } = productSlice.actions;
export default productSlice.reducer;
