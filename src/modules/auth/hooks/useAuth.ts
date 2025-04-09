// src/hooks/useAuth.ts
import { useDispatch, useSelector } from "react-redux";
import { 
  loginUser, 
  registerUser, 
  logout,
  clearError,
  selectCurrentUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError
} from "../store/authSlice";
import { LoginCredentials, RegisterData } from "../services/authService";
import { AppDispatch } from "@/core/store/store";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  // Selectores para obtener datos del estado
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const handleLogin = async (credentials: LoginCredentials) => {
    return await dispatch(loginUser(credentials)).unwrap();
  };

  const handleRegister = async (userData: RegisterData) => {
    return await dispatch(registerUser(userData)).unwrap();
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return { 
    user,
    isAuthenticated,
    isLoading,
    error,
    handleLogin, 
    handleRegister,
    handleLogout,
    handleClearError
  };
};