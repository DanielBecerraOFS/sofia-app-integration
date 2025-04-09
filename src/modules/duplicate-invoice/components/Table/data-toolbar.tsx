"use client"
import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"
import { Button } from "@/shared/components/index"
import { confidence, status_inv, region, pattern } from "@/modules/duplicate-invoice/utils/label-data-table"
import { DataTableFacetedFilter, DataTableViewOptions } from "@/modules/duplicate-invoice/index"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export default function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
      <h3 className="font-title font-semibold text-3xl mr-4">Filters</h3>
      {table.getColumn("pattern") && (
          <DataTableFacetedFilter
            column={table.getColumn("pattern")}
            title="Pattern"
            options={pattern}
          />
        )}
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={status_inv}
          />
        )}
        {table.getColumn("confidence") && (
          <DataTableFacetedFilter
            column={table.getColumn("confidence")}
            title="Confidence"
            options={confidence}
          />
        )}
        {table.getColumn("region") && (
          <DataTableFacetedFilter
            column={table.getColumn("region")}
            title="Region"
            options={region}
          />
        )}
        {table.getColumn("date") && (
          <DataTableFacetedFilter
            column={table.getColumn("date")}
            title="Date"
            options={confidence}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}