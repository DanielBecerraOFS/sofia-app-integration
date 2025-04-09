import {
  ScrollArea,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/shared/components/index";
import {
  Orders,
} from "../types/freetext.types";
import { formatValues } from "@/shared/utils/formatters";

interface OrdersTableLogProps {
  orders: Orders[];
}

const OrdersTableLog: React.FC<OrdersTableLogProps> = ({ orders }) => {
  const groupOrders = (orders: Orders[]) => {
    const grouped = orders.reduce((acc, order) => {
      if (!acc[order.order_id]) {
        acc[order.order_id] = {
          order_id: order.order_id,
          total_price: 0,
          free_text_count: 0,
          free_text_amount: 0,
          total_orders: 0,
          free_text_percentage: 0,
          regions: "",
        };
      }

      acc[order.order_id].total_price += Number(order.total_price);
      acc[order.order_id].free_text_count += order.ft_items ? 1 : 0;
      acc[order.order_id].free_text_amount += order.ft_items ? Number(order.total_price) : 0;
      acc[order.order_id].total_orders += 1;
      acc[order.order_id].free_text_percentage =
        (acc[order.order_id].free_text_count /
          acc[order.order_id].total_orders) *
        100;
        acc[order.order_id].regions = order.region;

      return acc;
    }, {} as Record<string, { order_id: string; total_price: number; free_text_count: number; free_text_amount: number; total_orders: number; free_text_percentage: number, regions: string }>);

    return Object.values(grouped);
  };
  const ordersByID = groupOrders(orders);

  console.log(ordersByID);
  

  return (
    <div className="scroll-table-container">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Free Text Percentage</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Total Price Free Text</TableHead>
            <TableHead>Regions</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      <ScrollArea className="h-120  w-full">
        <Table>
          <TableBody>
            {orders.map((order) => (
                order.ft_items > 1?
              (<TableRow>
                <TableCell>{order.order_id}</TableCell>
                <TableCell>{((order.ft_items / order.number_of_items)*100).toFixed(2)} %</TableCell>
                <TableCell>$ {formatValues(Number(order.total_price))}</TableCell>
                <TableCell>$ {formatValues(parseFloat((order.ft_items * ((order.ft_items / order.number_of_items) * 100)).toFixed(3)))}</TableCell>
                <TableCell>{order.region}</TableCell>
              </TableRow>): (<div></div>)
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};
export default OrdersTableLog;
