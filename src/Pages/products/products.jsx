import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Box, CircularProgress, Container, Grid, Pagination, Typography } from '@mui/material'
import { fetchProducts } from '../../store'
import Header from '../../Components/Header/Header'
import ProductCard from '../../Components/ProductCard/ProductCard'
import ProductControls from '../../Components/ProductControls/ProductControls'
import { filterProductsByTitle } from '../../filter/filterProducts'

const PRODUCTS_PER_PAGE = 10

export default function ProductsPage() {
  const dispatch = useDispatch()
  const { items, status, error } = useSelector((state) => state.products)
  const [searchText, setSearchText] = useState('')
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name-asc')
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts())
  }, [dispatch, status])

  function resetPageAndSet(setter, value) {
    setter(value)
    setPage(1)
  }

  const categories = [...new Set(items.map((product) => product.category))].sort()
  const searchedProducts = filterProductsByTitle(items, searchText)
  const filteredProducts = category === 'all'
    ? searchedProducts
    : searchedProducts.filter((product) => product.category === category)
  const visibleProducts = [...filteredProducts].sort((firstProduct, secondProduct) => {
    if (sortBy === 'price-asc') return firstProduct.price - secondProduct.price
    if (sortBy === 'price-desc') return secondProduct.price - firstProduct.price
    if (sortBy === 'name-desc') return secondProduct.title.localeCompare(firstProduct.title)
    return firstProduct.title.localeCompare(secondProduct.title)
  })
  const pageCount = Math.ceil(visibleProducts.length / PRODUCTS_PER_PAGE)
  const firstProductIndex = (page - 1) * PRODUCTS_PER_PAGE
  const pagedProducts = visibleProducts.slice(firstProductIndex, firstProductIndex + PRODUCTS_PER_PAGE)

  return (
    <>
      <Header />
      <Container className="page" maxWidth="lg">
        <ProductControls
          categories={categories}
          category={category}
          onCategoryChange={(value) => resetPageAndSet(setCategory, value)}
          onSearchChange={(value) => resetPageAndSet(setSearchText, value)}
          onSortChange={(value) => resetPageAndSet(setSortBy, value)}
          searchText={searchText}
          sortBy={sortBy}
        />

        {status === 'loading' && <Box className="center"><CircularProgress /></Box>}
        {status === 'failed' && <Alert severity="error">{error}</Alert>}
        {status === 'succeeded' && (
          <>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Showing {pagedProducts.length} of {visibleProducts.length} products
            </Typography>
            <Grid container spacing={3}>
              {pagedProducts.map((product) => (
                <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
            {pageCount > 1 && (
              <Box className="pagination-wrap">
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={(event, value) => setPage(value)}
                  color="primary"
                />
              </Box>
            )}
          </>
        )}
      </Container>
    </>
  )
}
