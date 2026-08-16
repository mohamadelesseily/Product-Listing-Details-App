export default function Header() {
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