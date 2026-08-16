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
        main: mode === 'light' ? '#2563eb' : '#7dd3fc',
      },
      secondary: {
        main: mode === 'light' ? '#f97316' : '#fb923c',
      },
      background: {
        default: mode === 'light' ? '#f4f7fb' : '#0f172a',
        paper: mode === 'light' ? '#ffffff' : '#162033',
      },
    },
    shape: {
      borderRadius: 8,
    },
    typography: {
      fontFamily: '"Inter", "Segoe UI", Roboto, Arial, sans-serif',
      h4: {
        fontWeight: 800,
      },
      h5: {
        fontWeight: 800,
      },
      h6: {
        fontWeight: 750,
      },
      button: {
        fontWeight: 700,
        textTransform: 'none',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
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
