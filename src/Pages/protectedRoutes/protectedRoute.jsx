export default function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  return isLoggedIn ? children : <Navigate to="/login" replace />
}