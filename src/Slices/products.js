import { createSlice } from '@reduxjs/toolkit'
import { fetchProducts } from './products/fetch'
import { fetchProductById } from './products/fethById'

export const productsSlice = createSlice({
  name: 'products',
  initialState: { items: [], selectedProduct: null, status: 'idle', detailsStatus: 'idle', error: '' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.status = 'loading'; state.error = '' })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.status = 'succeeded'; state.items = action.payload })
      .addCase(fetchProducts.rejected, (state, action) => { state.status = 'failed'; state.error = action.error.message })
      .addCase(fetchProductById.pending, (state) => { state.detailsStatus = 'loading'; state.error = '' })
      .addCase(fetchProductById.fulfilled, (state, action) => { state.detailsStatus = 'succeeded'; state.selectedProduct = action.payload })
      .addCase(fetchProductById.rejected, (state, action) => { state.detailsStatus = 'failed'; state.error = action.error.message })
  },
})