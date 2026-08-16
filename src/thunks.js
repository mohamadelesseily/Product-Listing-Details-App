import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch('https://dummyjson.com/products?limit=30')
  if (!response.ok) throw new Error('Could not load products. Please try again.')
  const data = await response.json()
  return data.products
})

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id) => {
  const response = await fetch(`https://dummyjson.com/products/${id}`)
  if (!response.ok) throw new Error('Could not load this product. Please try again.')
  return response.json()
})
