export function filterProductsByTitle(products = [], searchText = '') {
  const normalizedSearch = searchText.trim().toLowerCase()

  if (!normalizedSearch) return products

  return products.filter((product) => {
    const title = product?.title ?? ''
    return title.toLowerCase().includes(normalizedSearch)
  })
}
