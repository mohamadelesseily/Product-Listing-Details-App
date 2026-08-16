import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate, Link as RouterLink, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import {
  Alert,
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductById, fetchProducts, logIn, logOut } from './store'
import LoginPage from './Pages/Login/Login.jsx'
import ProtectedRoute from './Pages/protectedRoutes/protectedRoute.jsx'
import Header from './Pages/Header/Header.jsx'
import ProductsPage from './Pages/products/products.jsx'
import ProductDetailsPage from './Pages/products/productDetails.jsx'

function App() {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} />
        <Route path="/products/:id" element={<ProtectedRoute><ProductDetailsPage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/products" replace />} />
      </Routes>
    </>
  )
}

export default App
