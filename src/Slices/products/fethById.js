import { createAsyncThunk } from '@reduxjs/toolkit'
export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id) => {
  const response = await fetch(`https://dummyjson.com/products/${id}`)
  if (!response.ok) throw new Error('Could not load this product. Please try again.')
  return response.json()
})
