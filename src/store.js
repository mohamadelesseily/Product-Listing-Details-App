import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './Slices/authentication'
import { productsSlice } from './Slices/products'

export { fetchProducts } from './Slices/products/fetch'
export { fetchProductById } from './Slices/products/fethById'

export const { logIn, logOut } = authSlice.actions

export const store = configureStore({
  reducer: { auth: authSlice.reducer, products: productsSlice.reducer },
})
