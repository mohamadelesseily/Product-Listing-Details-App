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
