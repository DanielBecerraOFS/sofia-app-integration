// src/routes/ProtectedRoute.tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectAuthLoading } from '@/modules/auth/store/authSlice';

interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute = ({ 
  redirectPath = '/auth'
}: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectAuthLoading);
  
  // Mientras se verifica la autenticación, podríamos mostrar un spinner o similar
  if (isLoading) {
    return <div className="loading-container">Verificando autenticación...</div>;
  }
  
  if (!isAuthenticated) {
    // Guardamos la ruta a la que el usuario intentaba acceder para redirigirlo después del login
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;