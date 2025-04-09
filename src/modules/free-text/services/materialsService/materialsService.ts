import axios from 'axios';
import { MaterialsResponse, MaterialsParams } from './types';

// Definición de los tipos basados en la respuesta JSON de la API


const API_BASE_URL = 'http://52.201.138.164:5000';

/**
 * Servicio para manejar las llamadas a la API de materiales
 */
export const MaterialsService = {
  /**
   * Obtiene una lista de materiales con opciones de filtrado
   * 
   * @param params - Parámetros opcionales para filtrar la búsqueda
   * @returns Promise con la respuesta de materiales
   */
  getMaterials: async (params?: MaterialsParams): Promise<MaterialsResponse> => {
    try {
      const response = await axios.get<MaterialsResponse>(`${API_BASE_URL}/api/materials/`, {
        params: {
          ...(params?.new !== undefined && { new: params.new }),
          ...(params?.name && { name: params.name }),
          ...(params?.code && { code: params.code }),
          ...(params?.page && { page: params.page })
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error fetching materials:', error);
      throw error;
    }
  },

  /**
   * Obtiene la siguiente página de resultados si está disponible
   * 
   * @param nextPageUrl - URL de la siguiente página
   * @returns Promise con la respuesta de materiales
   */
  getNextPage: async (nextPageUrl: string): Promise<MaterialsResponse> => {
    try {
      const response = await axios.get<MaterialsResponse>(nextPageUrl);
      return response.data;
    } catch (error) {
      console.error('Error fetching next page:', error);
      throw error;
    }
  },

  /**
   * Busca materiales por nombre
   * 
   * @param name - Nombre del material a buscar
   * @returns Promise con la respuesta de materiales
   */
  searchByName: async (name: string): Promise<MaterialsResponse> => {
    return MaterialsService.getMaterials({ name });
  },

  /**
   * Busca materiales por código
   * 
   * @param code - Código del material a buscar
   * @returns Promise con la respuesta de materiales
   */
  searchByCode: async (code: string): Promise<MaterialsResponse> => {
    return MaterialsService.getMaterials({ code });
  },

  /**
   * Filtra materiales por estado (nuevo o no)
   * 
   * @param isNew - True para mostrar solo materiales nuevos, False para viejos
   * @returns Promise con la respuesta de materiales
   */
  filterByNewStatus: async (isNew: boolean): Promise<MaterialsResponse> => {
    return MaterialsService.getMaterials({ new: isNew });
  }
};
