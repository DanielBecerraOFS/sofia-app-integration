
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeType } from '@/shared/types/global';
import { RootState } from './rootReducer';

// Interfaz del estado de tema
interface ThemeState {
  currentTheme: ThemeType;
  systemTheme: 'light' | 'dark'; // El tema actual del sistema
}

// Función para detectar el tema del sistema
const getSystemTheme = (): 'light' | 'dark' => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Función para cargar el tema guardado o configurar uno predeterminado
const getSavedTheme = (): ThemeType => {
  const savedTheme = localStorage.getItem('theme') as ThemeType;
  return savedTheme || 'system';
};

const initialState: ThemeState = {
  currentTheme: getSavedTheme(),
  systemTheme: getSystemTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.currentTheme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    updateSystemTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.systemTheme = action.payload;
    },
  },
});

export const { setTheme, updateSystemTheme } = themeSlice.actions;

// Selector opcional para obtener el tema desde el estado
export const selectTheme = (state: RootState) => state.theme;

export default themeSlice.reducer;
