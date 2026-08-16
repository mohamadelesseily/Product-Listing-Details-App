import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Alert, Box, CircularProgress, Container, Grid, TextField, Typography, Card, CardContent, CardMedia, Button, Paper, Stack, Chip } from '@mui/material'
import { fetchProducts } from '../../store'
import Header from '../../Components/Header/Header'
import { filterProductsByTitle } from '../../filter/filterProducts'

export default function ProductsPage() {
  const dispatch = useDispatch()
  const { items, status, error } = useSelector((state) => state.products)
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts())
  }, [dispatch, status])

  const visibleProducts = filterProductsByTitle(items, searchText)

  return (
    <>
      <Header />
      <Container className="page" maxWidth="lg">
        <Paper className="page-intro">
          <Stack spacing={1}>
            <Typography variant="h4" component="h1">Products</Typography>
            <Typography color="text.secondary">
              Browse curated products with cleaner cards, clearer pricing, and fast search.
            </Typography>
          </Stack>
          <TextField
            label="Search products"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            fullWidth
            className="search-field"
          />
        </Paper>

        {status === 'loading' && <Box className="center"><CircularProgress /></Box>}
        {status === 'failed' && <Alert severity="error">{error}</Alert>}
        {status === 'succeeded' && (
          <>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Showing {visibleProducts.length} of {items.length} products
            </Typography>
            <Grid container spacing={3}>
              {visibleProducts.map((product) => (
                <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card className="product-card">
                    <Box className="product-media-wrap">
                      <CardMedia component="img" image={product.thumbnail} alt={product.title} className="product-media" />
                    </Box>
                    <CardContent>
                      <Chip label={product.category} size="small" color="primary" variant="outlined" className="category-chip" />
                      <Typography variant="h6" component="h2" className="product-title">{product.title}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {product.description}
                      </Typography>
                      <Box className="card-footer">
                        <Typography variant="h6">${product.price}</Typography>
                        <Button component={RouterLink} to={`/products/${product.id}`} variant="contained">
                          View details
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </>
  )
}
