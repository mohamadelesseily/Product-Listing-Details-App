import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// createAsyncThunk keeps the loading, success, and error states in one clear place.
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

const authSlice = createSlice({
  name: 'auth',
  initialState: { isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' },
  reducers: {
    logIn: (state, action) => {
      state.isLoggedIn = true
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userEmail', action.payload)
    },
    logOut: (state) => {
      state.isLoggedIn = false
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('userEmail')
    },
  },
})

const productsSlice = createSlice({
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

export const { logIn, logOut } = authSlice.actions

export const store = configureStore({
  reducer: { auth: authSlice.reducer, products: productsSlice.reducer },
})
