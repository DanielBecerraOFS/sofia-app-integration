import { Orders } from "../../types/freetext.types";

interface Material {
    material_name: string;
    material_code: string;
    predicciones: string;
    order: Orders
    quantity: number,
    unit_price: number,
    is_free_text: boolean,
    suggestion: {
      product_code: string,
      product_name: string,
      current_stock: number,
      unit_price: number
    },
    confidence: number
  }
  
  interface MaterialsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Material[];
  }
  
  interface MaterialsParams {
    new?: boolean;
    name?: string;
    code?: string;
    page?: number;
  }
  

export type { Material, MaterialsResponse, MaterialsParams };
  