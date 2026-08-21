import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

export default function ProductControls({
  categories,
  category,
  onCategoryChange,
  onSearchChange,
  onSortChange,
  searchText,
  sortBy,
}) {
  return (
    <Paper className="page-intro">
      <Stack spacing={1}>
        <Typography variant="h4" component="h1">Products</Typography>
        <Typography color="text.secondary">
          Search, sort, and browse by category.
        </Typography>
      </Stack>
      <Stack spacing={2} className="product-controls">
        <TextField
          label="Search products"
          value={searchText}
          onChange={(event) => onSearchChange(event.target.value)}
          fullWidth
          className="search-field"
        />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <FormControl fullWidth>
            <InputLabel id="category-filter-label">Category</InputLabel>
            <Select
              labelId="category-filter-label"
              label="Category"
              value={category}
              onChange={(event) => onCategoryChange(event.target.value)}
            >
              <MenuItem value="all">All categories</MenuItem>
              {categories.map((categoryName) => (
                <MenuItem key={categoryName} value={categoryName}>
                  {categoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="sort-products-label">Sort by</InputLabel>
            <Select
              labelId="sort-products-label"
              label="Sort by"
              value={sortBy}
              onChange={(event) => onSortChange(event.target.value)}
            >
              <MenuItem value="name-asc">Name: A to Z</MenuItem>
              <MenuItem value="name-desc">Name: Z to A</MenuItem>
              <MenuItem value="price-asc">Price: Low to high</MenuItem>
              <MenuItem value="price-desc">Price: High to low</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>
    </Paper>
  )
}
