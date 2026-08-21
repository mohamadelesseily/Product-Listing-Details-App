import { useEffect, useMemo, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { ColorModeContext } from './colorModeContext'
import LoginPage from './Pages/Login/Login.jsx'
import ProtectedRoute from './Pages/protectedRoutes/protectedRoute.jsx'
import ProductsPage from './Pages/products/products.jsx'
import ProductDetailsPage from './Pages/products/productDetails.jsx'

function App() {
  const [mode, setMode] = useState(() => localStorage.getItem('color-mode') || 'light')

  useEffect(() => {
    document.body.dataset.theme = mode
  }, [mode])

  const colorMode = useMemo(() => ({
    mode,
    toggleColorMode: () => {
      setMode((currentMode) => {
        const nextMode = currentMode === 'light' ? 'dark' : 'light'
        localStorage.setItem('color-mode', nextMode)
        return nextMode
      })
    },
  }), [mode])

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#101010' : '#f5f5f5',
      },
      secondary: {
        main: mode === 'light' ? '#393939' : '#d4d4d4',
        contrastText: mode === 'light' ? '#ffffff' : '#111111',
      },
      background: {
        default: mode === 'light' ? '#fafafa' : '#101010',
        paper: mode === 'light' ? '#ffffff' : '#181818',
      },
      text: {
        primary: mode === 'light' ? '#101010' : '#f5f5f5',
        secondary: mode === 'light' ? '#6f6f6f' : '#a3a3a3',
      },
    },
    shape: {
      borderRadius: 8,
    },
    typography: {
      fontFamily: '"Nunito", "Avenir Next", "Trebuchet MS", "Segoe UI", Arial, sans-serif',
      h4: {
        fontSize: '1.85rem',
        fontWeight: 760,
        letterSpacing: 0,
      },
      h5: {
        fontSize: '1.35rem',
        fontWeight: 760,
        letterSpacing: 0,
      },
      h6: {
        fontSize: '1.02rem',
        fontWeight: 730,
        letterSpacing: 0,
      },
      body1: {
        fontSize: '0.92rem',
        lineHeight: 1.55,
        letterSpacing: 0,
      },
      body2: {
        fontSize: '0.82rem',
        lineHeight: 1.55,
        letterSpacing: 0,
      },
      button: {
        fontSize: '0.82rem',
        fontWeight: 700,
        letterSpacing: 0,
        textTransform: 'none',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 700,
          },
        },
      },
    },
  }), [mode])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProtectedRoute><ProductsPage /></ProtectedRoute>} />
        <Route path="/products/:id" element={<ProtectedRoute><ProductDetailsPage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/products" replace />} />
      </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
