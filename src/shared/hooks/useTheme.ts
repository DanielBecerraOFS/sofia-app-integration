
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/core/store/store'; // Ajusta la ruta según tu alias o relativa
import { setTheme, updateSystemTheme } from '@/core/store/themeSlice';
import { ThemeType } from '../types/global';

export const useTheme = () => {
  const dispatch = useDispatch();
  const { currentTheme, systemTheme } = useSelector((state: RootState) => state.theme);

  // Determinar el tema activo (considerando el tema del sistema)
  const activeTheme = currentTheme === 'system' ? systemTheme : currentTheme;

  // Escuchar cambios en el tema del sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      dispatch(updateSystemTheme(e.matches ? 'dark' : 'light'));
    };
    
    // Agregar listener para cambios en el tema del sistema
    mediaQuery.addEventListener('change', handleChange);
    
    // Limpiar al desmontar
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [dispatch]);

  // Actualizar el atributo data-theme en el documento HTML
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', activeTheme);
  }, [activeTheme]);

  // Retornar información y funciones útiles
  return {
    currentTheme,
    activeTheme,
    setTheme: (theme: ThemeType) => dispatch(setTheme(theme)),
    isLight: activeTheme === 'light',
    isDark: activeTheme === 'dark',
  };
};
