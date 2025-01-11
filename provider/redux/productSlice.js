import { createSlice } from '@reduxjs/toolkit';

const storedProdData =
  typeof localStorage !== 'undefined'
    ? localStorage.getItem('instaProductData')
    : null;

const storedProds =
  typeof localStorage !== 'undefined'
    ? localStorage.getItem('instaProducts')
    : null;

const initialState = {
  productData: storedProdData ? JSON.parse(storedProdData) : null,
  products: storedProds ? JSON.parse(storedProds) : [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    saveProductData: (state, action) => {
      state.productData = action.payload;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...action.payload };
      }
    },
  },
});

export const { saveProductData, addProduct, updateProduct } =
  productSlice.actions;

export default productSlice.reducer;
