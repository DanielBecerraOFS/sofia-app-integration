import axios, { AxiosResponse } from 'axios';
import { OrdersResponse, OrdersParams, MaterialsResponse } from '../../types/freetext.types';
import { MaterialsService } from '../apiService';

const API_BASE_URL = 'http://52.201.138.164:5000/';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


/**
 * Servicio para manejar las llamadas a la API de orders
 */
export const OrdersService = {
  getOrders: async (fitlers: OrdersParams = {}): Promise<OrdersResponse> => {
    try {
      const response:AxiosResponse<OrdersResponse> = await apiClient.get('/api/orders/?pagination=false', {
        params: fitlers
      });                  
      return response.data;
    } catch (error) {
      console.error('Error fetching materials:', error);
      throw error;
    }
  },

  getNextPage: async (nextPageUrl: string): Promise<OrdersResponse> => {
    try {
      const response: AxiosResponse<OrdersResponse> = await apiClient.get(nextPageUrl);
      return response.data;
    } catch (error) {
      console.error('Error fetching next page:', error);
      throw error;
    }
  },

  searchByName: async (name: string): Promise<MaterialsResponse> => {
    return MaterialsService.getMaterials({ name });
  },

  searchByCode: async (code: string): Promise<MaterialsResponse> => {
    return MaterialsService.getMaterials({ code });
  },

  filterByOrderID: async (order_id: string): Promise<OrdersResponse> => {
    return OrdersService.getOrders({ order_id: order_id });
  }
};

