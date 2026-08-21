import { Link as RouterLink } from 'react-router-dom'
import { Box, Button, Card, CardContent, CardMedia, Chip, Typography } from '@mui/material'

export default function ProductCard({ product }) {
  return (
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
  )
}
