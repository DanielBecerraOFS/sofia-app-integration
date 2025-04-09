
// endpoints.ts
// Centralized file for all the endpoint routes used throughout the application

/**
 * Process Mining Endpoints
 *
 * Contains the API endpoints for fetching process mining related data.
 */
export const PROCESS_MINING_ENDPOINTS = {
  /** Endpoint to fetch metadata */
  METADATA: 'api/meta-data/',
  /** Endpoint to fetch the list of activities */
  ACTIVITY_LIST: 'api/activity-list/',
  /** Endpoint to fetch process variants */
  VARIANTS: 'api/variants/',
  /** Endpoint to fetch key performance indicators (KPIs) */
  KPI: 'api/KPI/'
};

/**
 * Invoice Management Endpoints
 *
 * Contains the base URL and various endpoints for invoice management.
 */
export const INVOICE_ENDPOINTS = {
  /** Base URL for the invoice management service */
  BASE_URL: 'http://52.201.138.164:5001/',
  /** Endpoint for accessing invoices */
  INVOICES: '/api/invoices/',
  /** Endpoint for fetching invoice metadata */
  METADATA: '/api/metadata/',
  /** Endpoint for accessing KPIs related to invoices */
  KPIS: '/api/kpis/',
  /** Endpoints related to AI functionalities */
  AI: {
    /** Endpoint for the AI assistant service */
    ASSISTANT: '/ai/ai_assistant/',
    /** Endpoint for AI-generated alerts */
    ALERTS: '/ai/alerts/'
  }
};

/**
 * Zurich Process Endpoints
 *
 * Contains the base URL and endpoints specific to Zurich process management.
 */
export const ZURICH_ENDPOINTS = {
  /** Base URL for the Zurich process management service */
  BASE_URL: 'https://ofiservices.pythonanywhere.com/',
  /** Endpoint for accessing case information */
  CASES: '/api/cases/',
  /** Endpoint for managing bills */
  BILLS: '/api/bills/',
  /** Endpoint for handling reworks */
  REWORKS: '/api/reworks/'
};

/**
 * Constructs a URL with query parameters.
 *
 * @param baseUrl - The base URL of the API.
 * @param endpoint - The endpoint path to be appended to the base URL.
 * @param params - An optional record of query parameters where the key is the parameter name and the value can be a string, number, or boolean.
 * @returns A complete URL string with appended query parameters.
 */
export const buildUrl = (
  baseUrl: string,
  endpoint: string,
  params?: Record<string, string | number | boolean>
): string => {
  const url = new URL(`${baseUrl}${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString();
};

/**
 * Builds a dynamic query string from filter parameters.
 *
 * Constructs a query string from a filter object where each key maps to an array of string values.
 * Each non-empty trimmed value is appended as a query parameter.
 *
 * @param filter - An object where keys represent attribute names and values are arrays of strings to filter by.
 * @returns A query string starting with '?' if any parameters exist, otherwise an empty string.
 */
export const buildDynamicQueryString = (filter: { [key: string]: string[] }): string => {
  const params = new URLSearchParams();

  Object.entries(filter).forEach(([attributeName, values]) => {
    values.forEach(value => {
      const trimmedValue = value.trim();
      if (trimmedValue) {
        params.append(attributeName, trimmedValue);
      }
    });
  });

  return params.toString() ? `?${params.toString()}` : '';
};
