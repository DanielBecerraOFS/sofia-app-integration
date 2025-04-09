
import { DateTime } from "luxon";

interface FormatDateProps {
    date: string;
}

export const formatDate = (date: FormatDateProps['date']): string => {    
    return DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED);
}

/**
 * Formatea un valor numérico a formato de dólar abreviado con K para miles.
 * Ejemplos:
 * - 1200 -> $1.2K
 * - 120000 -> $120K
 * - 1200000 -> $1.2M
 * - 25000 -> $25K
 * @param value - El valor numérico a formatear
 * @returns El valor formateado como string
 */
export const formatValues = (value: number): string => {
  if (isNaN(value) || !isFinite(value)) {
    return '0';
  }

  // Valores absolutos para manejar números negativos
  const absValue = Math.abs(value);
  let formattedValue: string;

  if (absValue >= 1000000) {
    formattedValue = `${(absValue / 1000000).toFixed(1)}M`;
  } else if (absValue >= 1000) {
    formattedValue = `${(absValue / 1000).toFixed(1)}K`;
  } else {
    formattedValue = `${absValue}`;
  }

  // Eliminar el decimal si es .0
  formattedValue = formattedValue.replace('.0', '');

  // Restaurar el signo negativo si el valor original era negativo
  if (value < 0) {
    formattedValue = `-${formattedValue}`;
  }

  return formattedValue;
};

export default {formatDate, formatValues};