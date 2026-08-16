import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
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