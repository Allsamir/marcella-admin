import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderId: "",
  name: "",
  paymentMethod: "",
  price: "",
  dateAdded: "",
  area: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderSearchResult: (state, action) => {
      state.orderId = action.payload.orderId;
      state.name = action.payload.name;
      state.paymentMethod = action.payload.paymentMethod;
      state.price = action.payload.price;
      // const date = action.payload.dateAdded.split("-");

      // let mDate = [];
      // mDate.push(date[1]);
      // mDate.push(date[2]);
      // mDate.push(date[0]);
      // const modifiedDate = mDate.splice(",").join("/");
      state.dateAdded = action.payload.dateAdded;
      state.area = action.payload.area;
    },
  },
});

export const { setOrderSearchResult } = orderSlice.actions;
export default orderSlice.reducer;
