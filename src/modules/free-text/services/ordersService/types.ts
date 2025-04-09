
interface Orders {
    order_id: string;
    material_code: string;
    quantity: number;
    unit_price: string;
    total_price: string;
    order_date: number;
    employee_id: string;
    employee_name: number;
    status: string;
    is_free_text: boolean;
    region: string;
    number_of_items: number;
    ft_items: number;
  }
  
  interface OrdersResponse {
    count: number;
    next: string | null;
    previous: string | null;
    total_amount: number,
    ft_count: number,
    ft_amount: number,
    results: Orders[];
  }
  
  interface OrdersParams {
    order_id?: string;
  }

export type { Orders, OrdersResponse, OrdersParams };