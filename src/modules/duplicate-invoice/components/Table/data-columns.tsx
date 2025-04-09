import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/shared/components/index";
import { Checkbox } from "@/shared/components/index";
import {
  confidence,
  status_inv,
} from "../../utils/label-data-table";
import {
  DataTableColumnHeader,
  DataTableRowActions,
  InvoiceDrawerDetails,
} from "../../index";

import { formatDate, formatValues } from "@/shared/utils/formatters";
import { FlattenedInvoiceGroup } from "../../services/apiService";

const getBadgeVariant = (
  confidence: string
): "default" | "high" | "medium" | "low" => {
  const confidenceLevel = confidence.toLowerCase();
  if (confidenceLevel === "high") {
    return "high";
  } else if (confidenceLevel === "medium") {
    return "medium";
  } else if (confidenceLevel === "low") {
    return "low";
  } else {
    return "default"; 
  }
};

export const TableColumns: ColumnDef<FlattenedInvoiceGroup>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "pattern",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pattern" />
    ),
    cell: ({ row }) => (
      console.log("row", row.original.items),
      (
        <div className="w-[150px] cursor-pointer">
          <InvoiceDrawerDetails
            buttonTitle={row.getValue("pattern")}
            group={row.original.items}
            type="link"
          />
        </div>
      )
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "region",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Region" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="truncate">{row.getValue("region")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="font-medium">{formatDate(row.getValue("date"))}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "confidence",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Confidence" />
    ),
    cell: ({ row }) => {
      const confidence_item = confidence.find(
        (confidence) => confidence.label === row.getValue("confidence")
      );

      if (!confidence_item) {
        return null;
      }

      return (
        <div className="flex items-center">
          <Badge variant={getBadgeVariant(confidence_item.value)}>
            {confidence_item.icon && (
              <confidence_item.icon className=" h-4 w-4 text-muted-foreground" />
            )}
            <span>{confidence_item.label}</span>
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const row_original = row.original.open ? "Open" : "Close"
      const status_type = status_inv.find(
        (item) => item.label === row_original
      );

      if (!status_type) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status_type.icon && (
            <status_type.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status_type.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "amount overpaid",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount Overpaid" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center font-medium">
          <span> $ {formatValues(row.original.amount_overpaid)}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
