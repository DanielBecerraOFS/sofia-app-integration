// services/apiService.ts
import axios, { AxiosResponse } from "axios";

// Definición de interfaces
interface Invoice {
  id: string | number;
  reference: string;
  vendor: string;
  pattern: string;
  open: boolean;
  group_id: string;
  date: string;
  pay_date: string;
  value: number;
  confidence: string;
  region: string;
  payment_method: string;
  description: string;
  special_instructions: string;
  accuracy: number;
  quantity: number;
  unit_price: number;
}
interface InvoiceFilters {
  page?: number;
  reference?: string;
  vendor?: string;
  pattern?: string;
  open?: boolean;
  group_id?: string;
  start_date?: string;
  end_date?: string;
  value?: string;
  confidence?: string;
}

interface InvoicesMetadata {
  reference_values: string[];
  vendor_values: string[];
  pattern_values: string[];
  date_values: string[];
}
interface InvoiceResponse {
  results: Invoice[];
  count: number;
}

interface GroupedInvoices {
  [key: string]: {
    items: Invoice[];
    region: string;
    pattern: string;
    open: string;
    date: string;
    confidence: string;
    amount_overpaid: string,
    itemsCount:number,
    group_id: string;
  };
}

interface FlattenedInvoiceGroup {
  group_id: string;
  region: string;
  pattern: string;
  open: string;
  date: string;
  confidence: string;
  amount_overpaid: number;
  items: Invoice[];
  itemsCount: number;
}


interface FlattenedResponse {
  results: FlattenedInvoiceGroup[];
  count: number;
}

interface KPI {
  [key: string]: number | string;
}

interface Agent {
  response: string;
}

interface AgentAlerts {
  Alert: {
    type: string;
    message: string;
    UUID: string;
    content: {
      new_invoices: number,
      new_duplicate_invoices: number;
    };
  };
}

const API_URL = "http://52.201.138.164:5001/"

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getInvoices = async (
  filters: InvoiceFilters = {}
): Promise<InvoiceResponse> => {
  try {
    const response: AxiosResponse<InvoiceResponse> = await apiClient.get(
      "/api/invoices/?pagination=false/",
      { params: filters }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching invoices:", error);
    throw error;
  }
};

export const getGroupedInvoices = async (): Promise<FlattenedResponse> => {
  try {
    const response: AxiosResponse<FlattenedResponse> = await apiClient.get(
      "/api/groups/",
    );    
    return response.data;
  } catch (error) {
    console.error("Error fetching invoices:", error);
    throw error;
  }
};

export const getInvoicesMetadata = async (): Promise<InvoicesMetadata> => {
  try {
    const response: AxiosResponse<InvoicesMetadata> = await apiClient.get(
      "/api/metadata/"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching KPIs:", error);
    throw error;
  }
};

export const getAgentResponse = async (message: string): Promise<Agent> => {
  try {
    const response: AxiosResponse<Agent> = await apiClient.post(
      "/ai/ai_assistant/",
      { message: message }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching agent response:", error);
    throw error;
  }
};

export const getAgentAlerts = async (): Promise<AgentAlerts> => {
  try {
    const response: AxiosResponse<AgentAlerts> = await apiClient.get(
      "/ai/alerts/"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching agent response:", error);
    throw error;
  }
};

export const getKPIs = async (): Promise<KPI> => {
  try {
    const response: AxiosResponse<KPI> = await apiClient.get("/api/kpis/");
    return response.data;
  } catch (error) {
    console.error("Error fetching KPIs:", error);
    throw error;
  }
};
export type {
  Invoice,
  KPI,
  InvoiceFilters,
  InvoiceResponse,
  InvoicesMetadata,
  Agent,
  AgentAlerts,
  FlattenedInvoiceGroup,
  GroupedInvoices,
  FlattenedResponse
};
