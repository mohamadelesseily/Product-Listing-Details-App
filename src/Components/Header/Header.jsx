import { useContext } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Box, Switch, Tooltip, FormControlLabel } from '@mui/material'
import { logOut } from '../../store'
import { ColorModeContext } from '../../colorModeContext'

export default function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { mode, toggleColorMode } = useContext(ColorModeContext)

  function handleLogout() {
    dispatch(logOut())
    navigate('/login')
  }

  return (
    <AppBar position="sticky" elevation={0} className="app-header">
      <Toolbar className="app-toolbar">
        <Typography component={RouterLink} to="/products" variant="h6" className="brand">
          Shop
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box className="header-actions">
          <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
            <FormControlLabel
              className="theme-toggle"
              control={(
                <Switch
                  checked={mode === 'dark'}
                  onChange={toggleColorMode}
                  inputProps={{ 'aria-label': 'Toggle dark mode' }}
                />
              )}
              label={mode === 'dark' ? 'Dark mode' : 'Light mode'}
            />
          </Tooltip>
          <Button variant="contained" color="secondary" onClick={handleLogout} className="logout-button">
            Log out
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
