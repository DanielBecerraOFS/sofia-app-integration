import axios, { AxiosResponse } from "axios";
import { apiClient } from "@/core/api/apiClient";
import { PROCESS_MINING_ENDPOINTS, buildDynamicQueryString } from "@/core/api/endpoints";
import {
  APIResult,
  VariantAPIResult,
  ProjectMetadataState,
  VariantAPIResultRow,
  APIResultRow,
  KPIResult
} from "../store/processMiningSlice";

// Update to use dynamic filter type
export type DynamicFilter = {
  [key: string]: string[];
};

export async function getProjectMetadata(): Promise<ProjectMetadataState> {
  try {
    const { data } = await apiClient.get<ProjectMetadataState>(PROCESS_MINING_ENDPOINTS.METADATA);
    
    // Validar atributos obligatorios
    const hasRequiredAttributes = data.attributes?.some(attr => 
      attr.name === "case" || attr.name === "name"
    );
    
    if (!hasRequiredAttributes) {
      throw new Error('Missing required attributes in metadata');
    }
    console.log(data);
    
    return {
      attributes: data.attributes?.map(attr => ({
        name: attr.name,
        type: attr.type,
        distincts: attr.distincts || []
      })) || []
    };
  } catch (error) {
    throw new Error('Error fetching project metadata');
  }
}

// Update to use dynamic filter
export async function getDataByFilter(filter: DynamicFilter): Promise<APIResult> {
  const initialUrl = `${PROCESS_MINING_ENDPOINTS.ACTIVITY_LIST}${buildDynamicQueryString(filter)}`;
  return fetchPaginatedData<APIResultRow>(initialUrl);
}

// For variants using the new var parameter
export async function getVariantsByActivities(filter: DynamicFilter): Promise<VariantAPIResult> {
  let queryParams = new URLSearchParams();
  
  // Add var parameter if we have selected variants
  if (filter.var && filter.var.length > 0) {
    filter.var.forEach(id => {
      queryParams.append('var', id);
    });
  } 
  // Otherwise use activities (name) for backward compatibility
  else if (filter.name && filter.name.length > 0) {
    filter.name.forEach(activity => {
      queryParams.append('activities', activity);
    });
  }
  
  const initialUrl = `${PROCESS_MINING_ENDPOINTS.VARIANTS}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  return fetchPaginatedData<VariantAPIResultRow>(initialUrl);
}

export async function getKPIData(): Promise<KPIResult[]> {
  try {
    const { data } = await apiClient.get<KPIResult[]>('api/KPI/');
    
    if (!Array.isArray(data)) {
      throw new Error('Invalid KPI response format');
    }
    
    return data.map(item => ({
      name: String(item.name),
      avg_time: Number(item.avg_time) || 0
    }));
  } catch (error) {
    throw handleApiError(error);
  }
}

async function fetchPaginatedData<T>(initialUrl: string): Promise<{
  count: number;
  next: null;
  previous: null;
  results: T[];
}> {
  try {
    let allResults: T[] = [];
    let nextUrl: string | null = initialUrl;
    let totalCount = 0;

    while (nextUrl) {
      const response: AxiosResponse<{
        count: number;
        next: string | null;
        previous: string | null;
        results: T[];
      }> = await apiClient.get(nextUrl);

      const data = response.data;

      if (!totalCount) totalCount = data.count;
      allResults = [...allResults, ...data.results];
      nextUrl = data.next ? new URL(data.next).pathname + new URL(data.next).search : null;
    }

    return {
      count: totalCount,
      next: null,
      previous: null,
      results: allResults
    };
  } catch (error: any) {
    throw handleApiError(error);
  }
}


function handleApiError(error: unknown): Error {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || error.message;
    return new Error(`API Error: ${message}`);
  }
  return new Error('Unknown API error occurred');
}