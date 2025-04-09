import React, { useState } from "react";
import { 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight, 
  Search 
} from "lucide-react";
import { Button, Input } from "@/shared/components/index";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/index";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/index";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/index";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/index";

interface Order {
  id: string;
  type: string;
  customer: string;
  status: string;
  createdDate: string;
  deliveryDate: string;
  otif: string;
  otifClass: string;
  value: string;
  currency: string;
}

/**
 * Component for the orders table with filtering and pagination
 */
export const OrdersTable: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);

  // Sample data for the table
  const orders: Order[] = [
    {
      id: "0000010152",
      type: "PO",
      customer: "ALPHA Corporation",
      status: "Consignment Fill-up",
      createdDate: "2017-01-05",
      deliveryDate: "2017-01-15",
      otif: "Yes",
      otifClass: "text-tertiary",
      value: "1,131.00",
      currency: "EUR",
    },
    {
      id: "0000010348",
      type: "TA",
      customer: "Napoli Export",
      status: "Standard Order",
      createdDate: "2017-01-12",
      deliveryDate: "2017-01-17",
      otif: "At Risk",
      otifClass: "text-tertiary-container",
      value: "1,128.00",
      currency: "EUR",
    },
    {
      id: "0000010488",
      type: "TA",
      customer: "Napoli Export",
      status: "Standard Order",
      createdDate: "2017-01-10",
      deliveryDate: "2017-01-12",
      otif: "Partial",
      otifClass: "text-secondary",
      value: "2,400.00",
      currency: "EUR",
    },
    {
      id: "0000010570",
      type: "TA",
      customer: "Napoli Export",
      status: "Standard Order",
      createdDate: "2017-01-10",
      deliveryDate: "2017-01-13",
      otif: "No",
      otifClass: "text-error",
      value: "21,000.00",
      currency: "EUR",
    },
  ];

  // Function to handle pagination
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Calculate pagination values
  const totalItems = orders.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startItem = (page - 1) * pageSize + 1;
  const endItem = Math.min(startItem + pageSize - 1, totalItems);

  return (
    <Card className="bg-surface">
      <CardHeader className="pb-0">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-lg font-medium text-on-surface">Orders</CardTitle>
          <Tabs defaultValue="sales-orders">
            <TabsList>
              <TabsTrigger value="sales-orders">Sales Orders</TabsTrigger>
              <TabsTrigger value="sales-order-items">Sales Order Items</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-6">
              <FilterSelect 
                options={[
                  { value: "order-no", label: "Order No." },
                  { value: "customer", label: "Customer" },
                  { value: "order-type", label: "Order Type" }
                ]} 
                defaultValue="order-no" 
              />

              <FilterSelect 
                options={[
                  { value: "delivery-status", label: "Delivery Status" },
                  { value: "on-time", label: "On Time" },
                  { value: "delayed", label: "Delayed" },
                  { value: "at-risk", label: "At Risk" }
                ]} 
                defaultValue="delivery-status" 
              />

              <FilterSelect 
                options={[
                  { value: "otif-status", label: "OTIF Status" },
                  { value: "fulfilled", label: "Fulfilled" },
                  { value: "partial", label: "Partial" },
                  { value: "failed", label: "Failed" }
                ]} 
                defaultValue="otif-status" 
              />

              <FilterSelect 
                options={[
                  { value: "priority", label: "Priority" },
                  { value: "high", label: "High" },
                  { value: "medium", label: "Medium" },
                  { value: "low", label: "Low" }
                ]} 
                defaultValue="priority" 
              />

              <FilterSelect 
                options={[
                  { value: "overdue", label: "Overdue?" },
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" }
                ]} 
                defaultValue="overdue" 
              />

              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-on-surface-variant" />
                <Input type="search" placeholder="Search..." className="pl-8 bg-surface-container text-on-surface" />
              </div>
            </div>
          </div>

          <div className="rounded-md border border-outline-variant overflow-hidden">
            <Table>
              <TableHeader className="bg-surface-container-high">
                <TableRow>
                  <TableHead className="w-12 text-on-surface">
                    <Input type="checkbox" className="h-4 w-4" />
                  </TableHead>
                  <TableHead className="w-[120px] text-on-surface">
                    <div className="flex items-center space-x-1">
                      <span>Order No.</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="w-[100px] text-on-surface">Type</TableHead>
                  <TableHead className="w-[180px] text-on-surface">Status</TableHead>
                  <TableHead className="text-on-surface">
                    <div className="flex items-center space-x-1">
                      <span>Customer</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="w-[120px] text-on-surface">
                    <div className="flex items-center space-x-1">
                      <span>Created</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="w-[120px] text-on-surface">
                    <div className="flex items-center space-x-1">
                      <span>Delivery</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                  <TableHead className="w-[80px] text-on-surface">OTIF</TableHead>
                  <TableHead className="w-[120px] text-right text-on-surface">
                    <div className="flex items-center justify-end space-x-1">
                      <span>Value</span>
                      <ArrowUpDown className="h-3 w-3" />
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} className="text-on-surface">
                    <TableCell>
                      <Input type="checkbox" className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.type}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.createdDate}</TableCell>
                    <TableCell>{order.deliveryDate}</TableCell>
                    <TableCell className={order.otifClass}>{order.otif}</TableCell>
                    <TableCell className="text-right">
                      {order.value} {order.currency}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-on-surface-variant">
              Showing <strong>{startItem}</strong> to <strong>{endItem}</strong> of <strong>{totalItems}</strong> results
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                disabled={page === 1}
                onClick={() => handlePageChange(1)}
                className="bg-surface-container text-on-surface"
              >
                <ChevronsLeft className="h-4 w-4" />
                <span className="sr-only">First page</span>
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
                className="bg-surface-container text-on-surface"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                disabled={page === totalPages}
                onClick={() => handlePageChange(page + 1)}
                className="bg-surface-container text-on-surface"
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                disabled={page === totalPages}
                onClick={() => handlePageChange(totalPages)}
                className="bg-surface-container text-on-surface"
              >
                <ChevronsRight className="h-4 w-4" />
                <span className="sr-only">Last page</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface FilterOption {
  value: string;
  label: string;
}

interface FilterSelectProps {
  options: FilterOption[];
  defaultValue: string;
}

/**
 * Reusable filter select component
 */
const FilterSelect: React.FC<FilterSelectProps> = ({ options, defaultValue }) => {
  return (
    <Select defaultValue={defaultValue}>
      <SelectTrigger className="bg-surface-container text-on-surface">
        <SelectValue placeholder={options.find(opt => opt.value === defaultValue)?.label} />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};