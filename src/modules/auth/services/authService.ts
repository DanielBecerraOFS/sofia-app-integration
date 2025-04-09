// src/services/authService.ts
import { apiService } from './apliClient';

// Definición de tipos
export interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
}

export interface AuthTokens {
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthResponse {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  token_type: string;
}

/**
 * Servicio de autenticación que gestiona las operaciones relacionadas con login y registro
 */
class AuthService {
  private readonly endpoints = {
    login: '/auth/login',
    register: '/auth/register',
  };

  /**
   * Inicia sesión con las credenciales proporcionadas
   * @param credentials Credenciales de inicio de sesión
   * @returns Respuesta con datos del usuario y tokens
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>(this.endpoints.login, credentials);
    return response.data;
  }

  /**
   * Registra un nuevo usuario
   * @param userData Datos del nuevo usuario
   * @returns Respuesta con datos del usuario y tokens
   */
  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>(this.endpoints.register, userData);
    return response.data;
  }

  /**
   * Verifica si hay un token de autenticación almacenado
   * @returns true si existe un token, false en caso contrario
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}

export const authService = new AuthService();