import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { Alert, Box, Button, CircularProgress, Container, Paper, Stack, Typography } from '@mui/material'
import Header from '../../Components/Header/Header'
import { fetchProductById } from '../../store'

export default function ProductDetailsPage() {
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
        <Button component={RouterLink} to="/products" sx={{ mb: 3 }}>Back to products</Button>
        {detailsStatus === 'loading' && <Box className="center"><CircularProgress /></Box>}
        {detailsStatus === 'failed' && <Alert severity="error">{error}</Alert>}
        {detailsStatus === 'succeeded' && selectedProduct && (
          <Paper className="details-card">
            <Box className="details-image-wrap">
              <Box component="img" src={selectedProduct.thumbnail} alt={selectedProduct.title} className="details-image" />
            </Box>
            <Stack spacing={2}>
              <Typography color="primary" textTransform="capitalize">{selectedProduct.category}</Typography>
              <Typography variant="h4" component="h1">{selectedProduct.title}</Typography>
              <Typography variant="h5">${selectedProduct.price}</Typography>
              <Typography color="text.secondary">{selectedProduct.description}</Typography>
              <Box className="details-stats">
                <Typography><strong>Rating:</strong> {selectedProduct.rating} / 5</Typography>
                <Typography><strong>In stock:</strong> {selectedProduct.stock}</Typography>
              </Box>
            </Stack>
          </Paper>
        )}
      </Container>
    </>
  )
}
