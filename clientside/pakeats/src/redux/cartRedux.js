import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1; // Cart Quantity
      //   state.products.push(action.payload.product);
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity; // Product Quantity
    },

    reset:(state)=> {
      state.products = [];
      state.isFetching = false;
      state.error = false;
      state.quantity = 0;
      state.total = 0;
    },

    //Delete
    deleteProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload.id),
        1
      );
      state.quantity -= 1;
      state.total -= action.payload.totalPrice;
    },
    deleteProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //Update
    updateProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products[
        state.products.findIndex(
          (item) => item._id === action.payload.productItem._id
        )
      ] = action.payload.productItem;
      state.quantity -= 1;
      state.total -= action.payload.totalPrice;
    },
    updateProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  addProduct,
  reset,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
} = cartSlice.actions;
export default cartSlice.reducer;
