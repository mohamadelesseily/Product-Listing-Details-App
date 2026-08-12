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

// This component is used around pages that should only be visible after login.
function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  return isLoggedIn ? children : <Navigate to="/login" replace />
}

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleLogout() {
    dispatch(logOut())
    navigate('/login')
  }

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography component={RouterLink} to="/products" variant="h6" className="brand">
          Simple Shop
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button color="inherit" onClick={handleLogout}>Log out</Button>
      </Toolbar>
    </AppBar>
  )
}

function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const { register, handleSubmit, formState: { errors } } = useForm()

  function onSubmit(formData) {
    dispatch(logIn(formData.email))
    navigate('/products')
  }

  if (isLoggedIn) return <Navigate to="/products" replace />

  return (
    <Container maxWidth="sm" className="login-page">
      <Paper elevation={3} className="login-card">
        <Typography variant="h4" component="h1" gutterBottom>Welcome back</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Sign in to browse our products.
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              {...register('email', { required: 'Email is required' })}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
            <TextField
              label="Password"
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />
            <Button type="submit" variant="contained" size="large">Log in</Button>
          </Stack>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Use Valid Email Format.
        </Typography>
      </Paper>
    </Container>
  )
}

function ProductsPage() {
  const dispatch = useDispatch()
  const { items, status, error } = useSelector((state) => state.products)
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts())
  }, [dispatch, status])

  const visibleProducts = items.filter((product) =>
    product.title.toLowerCase().includes(searchText.toLowerCase()),
  )

  return (
    <>
      <Header />
      <Container className="page" maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>Products</Typography>
        <TextField
          label="Search products"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          fullWidth
          sx={{ mb: 4 }}
        />

        {status === 'loading' && <Box className="center"><CircularProgress /></Box>}
        {status === 'failed' && <Alert severity="error">{error}</Alert>}
        {status === 'succeeded' && (
          <Grid container spacing={3}>
            {visibleProducts.map((product) => (
              <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card className="product-card">
                  <CardMedia component="img" height="210" image={product.thumbnail} alt={product.title} />
                  <CardContent>
                    <Typography color="primary" variant="body2">{product.category}</Typography>
                    <Typography variant="h6" component="h2" className="product-title">{product.title}</Typography>
                    <Typography variant="h6" sx={{ mb: 2 }}>${product.price}</Typography>
                    <Button component={RouterLink} to={`/products/${product.id}`} variant="outlined">
                      View details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  )
}

function ProductDetailsPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { selectedProduct, detailsStatus, error } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchProductById(id))
  }, [dispatch, id])

  return (
    <>
      <Header />
      <Container className="page" maxWidth="md">
        <Button component={RouterLink} to="/products" sx={{ mb: 3 }}>← Back to products</Button>
        {detailsStatus === 'loading' && <Box className="center"><CircularProgress /></Box>}
        {detailsStatus === 'failed' && <Alert severity="error">{error}</Alert>}
        {detailsStatus === 'succeeded' && selectedProduct && (
          <Paper className="details-card">
            <Box component="img" src={selectedProduct.thumbnail} alt={selectedProduct.title} className="details-image" />
            <Box>
              <Typography color="primary" textTransform="capitalize">{selectedProduct.category}</Typography>
              <Typography variant="h4" component="h1" gutterBottom>{selectedProduct.title}</Typography>
              <Typography variant="h5" sx={{ mb: 2 }}>${selectedProduct.price}</Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>{selectedProduct.description}</Typography>
              <Typography><strong>Rating:</strong> {selectedProduct.rating} / 5</Typography>
              <Typography><strong>In stock:</strong> {selectedProduct.stock}</Typography>
            </Box>
          </Paper>
        )}
      </Container>
    </>
  )
}

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
