import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Box, Button, Container, Paper, Stack, TextField, Typography } from '@mui/material'
import { logIn } from '../../store'

export default function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const { register, handleSubmit, formState: { errors } } = useForm()

  function onSubmit(formData) {
    dispatch(logIn(formData.email))
    navigate('/products')
  }

  if (isLoggedIn) return <Navigate to="/products" replace />

  return (
    <Container maxWidth="sm" className="login-page">
      <Paper elevation={3} className="login-card">
        <Typography variant="h4" component="h1" gutterBottom>Welcome back</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Sign in to browse our products.
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2}>
            <TextField
              label="Email"
              type="email"
              {...register('email', { required: 'Email is required' })}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
            <TextField
              label="Password"
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />
            <Button type="submit" variant="contained" size="large">Log in</Button>
          </Stack>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Use Valid Email Format.
        </Typography>
      </Paper>
    </Container>
  )
}