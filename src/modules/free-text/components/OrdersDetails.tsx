import {
  ScrollArea,
  Badge,
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
import { formatValues, formatDate } from "@/shared/utils/formatters";

interface OrdersTableLogProps {
  orders: Orders[];
}

const OrdersTableLog: React.FC<OrdersTableLogProps> = ({ orders }) => {
  const getBadgeVariant = (
    status: string
  ): "default" | "high" | "medium" | "low" => {
    const statusCode = status.toLowerCase();
    if (statusCode === "cancelled") {
      return "high";
    } else if (statusCode === "closed") {
      return "medium";
    } else if (statusCode === "open") {
      return "low";
    } else {
      return "default";
    }
  };

  return (
    <div className="scroll-table-container">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[160px]">ID</TableHead>
            <TableHead className="w-[220px]">Date</TableHead>
            <TableHead className="w-[200px]">Status</TableHead>
            <TableHead className="">Quantity</TableHead>
            <TableHead className="w-[140px]">Amount</TableHead>
            <TableHead className="w-[120px]">Region</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      <ScrollArea className="h-75 w-full">
        <Table>
          <TableBody>
            {orders.map((order) => (
              <TableRow>
                <TableCell>{order.order_id}</TableCell>
                <TableCell>{formatDate(order.order_date.toString())}</TableCell>
                <TableCell>
                  <Badge variant={getBadgeVariant(order.status)}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="font-semibold">
                  {order.number_of_items}
                </TableCell>
                <TableCell>
                  $ {formatValues(Number(order.total_price))}
                </TableCell>
                <TableCell>{order.region}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};
export default OrdersTableLog;
