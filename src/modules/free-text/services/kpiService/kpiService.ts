
import axios, { AxiosResponse } from 'axios';
import { KPI } from './types'; 
// Definición de los tipos basados en la respuesta JSON de la API


const API_BASE_URL = 'http://52.201.138.164:5000/';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getKPIs = async (): Promise<KPI> => {
    try {
      const response: AxiosResponse<KPI> = await apiClient.get('api/kpis/');
      return response.data;
    } catch (error) {
      console.error('Error fetching KPIs:', error);
      throw error;
    }
  };
  
  