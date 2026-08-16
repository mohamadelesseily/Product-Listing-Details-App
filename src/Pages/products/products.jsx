import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { Alert, Box, CircularProgress, Container, Grid, TextField, Typography, Card, CardContent, CardMedia, Button } from '@mui/material'
import { fetchProducts } from '../../store'
import Header from '../Header/Header'

export default function ProductsPage() {
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
