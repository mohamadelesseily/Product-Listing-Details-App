import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './Slices/authentication'
import { productsSlice } from './Slices/products'
export { fetchProducts, fetchProductById } from './Slices/thunks'

export const { logIn, logOut } = authSlice.actions

export const store = configureStore({
  reducer: { auth: authSlice.reducer, products: productsSlice.reducer },
})
