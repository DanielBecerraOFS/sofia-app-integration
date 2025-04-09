import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/index";
import { Checkbox } from "@/shared/components/index";
import { formatValues, formatDate } from "@/shared/utils/formatters";
import { Invoice } from "../services/apiService";
import { Button } from "@/shared/components/index";
import { ScrollArea } from "@/shared/components/index";
interface TableDrawerDetailsProps {
  invoices_group: Invoice[];
}

const TableDrawerDetails: React.FC<TableDrawerDetailsProps> = ({
  invoices_group,
}) => {
  return (
    <ScrollArea className="h-72 w-full">
      <Table className="drawer-details-table">
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Invoce Code</TableHead>
            <TableHead>Region</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Payment date</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Unit Price</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Special Instructions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices_group.map((invoice, index) => (
            <TableRow
              className={`${index == 0 ? "bg-amber-100 text-amber-950" : ""}`}
            >
              <TableCell>
                <Checkbox
                  className={`${index == 0 ? " border-amber-950" : ""}`}
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  className="text-blue-400 cursor-pointer p-0 hover:underline decoration-solid"
                >
                  {invoice.reference}
                </Button>
              </TableCell>
              <TableCell>{invoice.region}</TableCell>
              <TableCell>{formatDate(invoice.date)}</TableCell>
              <TableCell>{formatDate(invoice.pay_date)}</TableCell>
              <TableCell>{invoice.vendor}</TableCell>
              <TableCell>{invoice.quantity}</TableCell>
              <TableCell>${formatValues(invoice.unit_price)}</TableCell>
              <TableCell>${formatValues(invoice.value)}</TableCell>
              <TableCell>{invoice.payment_method}</TableCell>
              <TableCell>{invoice.description}</TableCell>
              <TableCell>{invoice.special_instructions}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow></TableRow>
        </TableFooter>
      </Table>
    </ScrollArea>
  );
};

export default TableDrawerDetails;
