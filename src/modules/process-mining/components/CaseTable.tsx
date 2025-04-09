import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronDown,
  MoreHorizontal,
  CalendarIcon,
  SearchIcon,
  X,
  Filter,
  Check,
} from "lucide-react";
import * as React from "react";
import { format } from "date-fns";

import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/shared/components/ui/DropDownMenu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/Table";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/Popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Calendar } from "@/shared/components/ui/calendar";
import { Separator } from "@/shared/components/ui/separator";
import { cn } from "@/shared/lib/utils";
import { Input } from "@/shared/components/ui/Input";
import { Badge } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/components/ui/Command";

/**
 * Supported filter operators.
 * @typedef {"contains" | "equals" | "startsWith" | "greaterThan" | "lessThan" | "between" | "isEmpty" | "isNotEmpty"} FilterOperator
 */
type FilterOperator =
  | "contains"
  | "equals"
  | "startsWith"
  | "greaterThan"
  | "lessThan"
  | "between"
  | "isEmpty"
  | "isNotEmpty";

/**
 * Supported column types.
 * @typedef {"text" | "number" | "date"} ColumnType
 */
type ColumnType = "text" | "number" | "date";

/**
 * Interface for project metadata.
 * @interface ProjectMetadataState
 * @property {string[]} [distinct_names] - Array of distinct names.
 * @property {string[]} [distinct_cases] - Array of distinct cases.
 * @property {{ name: string; type?: string }[]} [attributes] - Array of attribute definitions.
 */
interface ProjectMetadataState {
  distinct_names?: string[];
  distinct_cases?: string[];
  attributes?: { name: string; type?: string }[];
}

/**
 * Props for the EnhancedCaseTable component.
 * @interface CaseTableProps
 * @property {ProjectMetadataState} metadata - Project metadata.
 * @property {Record<string, any>[]} data - Array of data rows.
 */
interface CaseTableProps {
  metadata: ProjectMetadataState;
  data: Record<string, any>[];
}

/**
 * Human-readable labels for filter operators.
 * @constant {Record<FilterOperator, string>}
 */
const operatorLabels: Record<FilterOperator, string> = {
  contains: "Contains",
  equals: "Equals",
  startsWith: "Starts with",
  greaterThan: "Greater than",
  lessThan: "Less than",
  between: "Between",
  isEmpty: "Is empty",
  isNotEmpty: "Is not empty",
};

/**
 * Mapping from column types to available filter operators.
 * @constant {Record<ColumnType, FilterOperator[]>}
 */
const operatorsByType: Record<ColumnType, FilterOperator[]> = {
  text: ["contains", "equals", "startsWith", "isEmpty", "isNotEmpty"],
  number: ["equals", "greaterThan", "lessThan", "between", "isEmpty", "isNotEmpty"],
  date: ["equals", "greaterThan", "lessThan", "between", "isEmpty", "isNotEmpty"],
};

/**
 * Interface representing the value of a filter.
 * @interface FilterValue
 * @property {string} column - Column identifier.
 * @property {ColumnType} columnType - Type of the column.
 * @property {FilterOperator} operator - The operator to apply.
 * @property {string} [value] - Primary value for the filter.
 * @property {string} [secondValue] - Secondary value (used in "between" operator).
 */
export interface FilterValue {
  column: string;
  columnType: ColumnType;
  operator: FilterOperator;
  value?: string;
  secondValue?: string;
}

/**
 * Props for the FilterEditor component.
 * @interface FilterEditorProps
 * @property {{ id: string; label: string; type: ColumnType }} column - The column information.
 * @property {FilterValue} [value] - Current filter value.
 * @property {(filter: FilterValue) => void} onApply - Callback when the filter is applied.
 * @property {() => void} onCancel - Callback when the editing is cancelled.
 */
interface FilterEditorProps {
  column: { id: string; label: string; type: ColumnType };
  value?: FilterValue;
  onApply: (filter: FilterValue) => void;
  onCancel: () => void;
}

/**
 * Props for the TableFilter component.
 * @interface TableFilterProps
 * @property {Array<{ id: string; label: string; type: ColumnType }>} columns - List of columns available for filtering.
 * @property {FilterValue[]} activeFilters - Currently active filters.
 * @property {(filters: FilterValue[]) => void} onFilterChange - Callback when filters change.
 */
interface TableFilterProps {
  columns: Array<{ id: string; label: string; type: ColumnType }>;
  activeFilters: FilterValue[];
  onFilterChange: (filters: FilterValue[]) => void;
}

/**
 * FilterEditor component renders a UI for editing a filter for a specific column.
 *
 * @component
 * @param {FilterEditorProps} props - The properties for the FilterEditor.
 * @returns {JSX.Element} The rendered filter editor.
 */
const FilterEditor: React.FC<FilterEditorProps> = ({
  column,
  value,
  onApply,
  onCancel,
}) => {
  // Ensure that column.type always has a valid value (defaulting to "text").
  const columnType = column?.type || "text";
  
  const [operator, setOperator] = React.useState<FilterOperator>(
    value?.operator || (columnType === "text" ? "contains" : "equals")
  );
  const [filterValue, setFilterValue] = React.useState(value?.value || "");
  const [secondValue, setSecondValue] = React.useState(value?.secondValue || "");

  // Get available operators based on the column type.
  const availableOperators = operatorsByType[columnType] || operatorsByType.text;
  const needsValue = !["isEmpty", "isNotEmpty"].includes(operator);
  const needsSecondValue = operator === "between";

  /**
   * Handler to apply the current filter settings.
   * Validates that required values are provided before calling onApply.
   */
  const handleApply = () => {
    if (needsValue && !filterValue) {
      return; // Do not apply incomplete filters.
    }
    if (needsSecondValue && !secondValue) {
      return; // Both values needed for "between".
    }

    onApply({
      column: column.id,
      columnType,
      operator,
      value: needsValue ? filterValue : undefined,
      secondValue: needsSecondValue ? secondValue : undefined,
    });
  };

  return (
    <div className="space-y-4 p-4 min-w-[320px] bg-surface text-on-surface">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Filter: {column.label}</h4>
      </div>
      <Separator />

      <div className="space-y-3">
        {/* Operator selector */}
        <div>
          <label className="text-sm font-medium mb-1 block">Condition</label>
          <Select
            value={operator}
            onValueChange={(value) => {
              setOperator(value as FilterOperator);
              if (!needsValue) {
                setFilterValue("");
                setSecondValue("");
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select condition" />
            </SelectTrigger>
            <SelectContent className="bg-surface text-on-surface">
              {availableOperators.map((op) => (
                <SelectItem key={op} value={op} className="text-on-background">
                  {operatorLabels[op]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Value input(s) */}
        {needsValue && (
          <>
            {columnType === "date" ? (
              <div className="space-y-2">
                <label className="text-sm font-medium mb-1 block">
                  {needsSecondValue ? "Start Date" : "Date"}
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filterValue
                        ? format(new Date(filterValue), "PPP")
                        : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-surface text-on-surface relative" sideOffset={5}>
                    <Calendar
                      mode="single"
                      selected={filterValue ? new Date(filterValue) : undefined}
                      onSelect={(date) =>
                        setFilterValue(date?.toISOString() || "")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                {/* Second date for "between" operator */}
                {needsSecondValue && (
                  <>
                    <label className="text-sm font-medium mb-1 block">
                      End Date
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {secondValue
                            ? format(new Date(secondValue), "PPP")
                            : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-surface text-on-surface relative" sideOffset={5}>
                        <Calendar
                          mode="single"
                          selected={secondValue ? new Date(secondValue) : undefined}
                          onSelect={(date) =>
                            setSecondValue(date?.toISOString() || "")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-sm font-medium mb-1 block">
                  {needsSecondValue ? "Minimum Value" : "Value"}
                </label>
                <Input
                  type={columnType === "number" ? "number" : "text"}
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  placeholder={`Enter${needsSecondValue ? " minimum" : ""} value...`}
                />

                {/* Second input for "between" operator */}
                {needsSecondValue && (
                  <>
                    <label className="text-sm font-medium mb-1 block">
                      Maximum Value
                    </label>
                    <Input
                      type={columnType === "number" ? "number" : "text"}
                      value={secondValue}
                      onChange={(e) => setSecondValue(e.target.value)}
                      placeholder="Enter maximum value..."
                    />
                  </>
                )}
              </div>
            )}
          </>
        )}
      </div>

      <Separator />

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="secondary" onClick={onCancel} className="min-w-[80px]">
          Cancel
        </Button>
        <Button onClick={handleApply} className="min-w-[120px]">
          Apply Filter
        </Button>
      </div>
    </div>
  );
};

/**
 * FilterBadge component displays an active filter as a badge with a remove icon.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {FilterValue} props.filter - The filter information.
 * @param {string} props.columnLabel - The label for the column.
 * @param {() => void} props.onRemove - Callback to remove the filter.
 * @returns {JSX.Element} A badge element showing the filter.
 */
const FilterBadge: React.FC<{
  filter: FilterValue;
  columnLabel: string;
  onRemove: () => void;
}> = ({ filter, columnLabel, onRemove }) => {
  /**
   * Constructs a human-readable description for the filter.
   *
   * @returns {string} The formatted filter description.
   */
  const getDisplayValue = () => {
    const { operator, value, secondValue } = filter;
    
    if (operator === "isEmpty") return `${columnLabel} is empty`;
    if (operator === "isNotEmpty") return `${columnLabel} is not empty`;
    
    const opLabel = operatorLabels[operator].toLowerCase();
    
    if (filter.columnType === "date" && value) {
      const formattedDate = format(new Date(value), "PP");
      if (operator === "between" && secondValue) {
        const formattedEndDate = format(new Date(secondValue), "PP");
        return `${columnLabel} ${opLabel} ${formattedDate} and ${formattedEndDate}`;
      }
      return `${columnLabel} ${opLabel} ${formattedDate}`;
    }
    
    if (operator === "between" && secondValue) {
      return `${columnLabel} ${opLabel} ${value} and ${secondValue}`;
    }
    
    return `${columnLabel} ${opLabel} ${value}`;
  };

  return (
    <Badge className="flex items-center gap-1 px-3 py-1">
      <span className="text-xs">{getDisplayValue()}</span>
      <X
        className="h-3 w-3 cursor-pointer opacity-70 hover:opacity-100"
        onClick={onRemove}
      />
    </Badge>
  );
};

/**
 * TableFilter component provides UI controls to add, view, and remove column filters.
 *
 * @param {TableFilterProps} props - The properties for the TableFilter.
 * @returns {JSX.Element} The rendered table filter component.
 */
export const TableFilter: React.FC<TableFilterProps> = ({
  columns,
  activeFilters,
  onFilterChange,
}) => {
  const [open, setOpen] = React.useState(false);
  const [selectedColumn, setSelectedColumn] = React.useState<{
    id: string;
    label: string;
    type: ColumnType;
  } | null>(null);
  
  // Create a map of column IDs to labels for active filters display.
  const columnMap = columns.reduce((acc, col) => {
    acc[col.id] = col.label;
    return acc;
  }, {} as Record<string, string>);

  /**
   * Adds a new filter or updates an existing filter for a column.
   *
   * @param {FilterValue} filter - The filter to add or update.
   */
  const handleAddFilter = (filter: FilterValue) => {
    const newFilters = [...activeFilters];
    const existingIndex = newFilters.findIndex(f => f.column === filter.column);
    
    if (existingIndex >= 0) {
      newFilters[existingIndex] = filter;
    } else {
      newFilters.push(filter);
    }
    
    onFilterChange(newFilters);
    setSelectedColumn(null);
  };

  /**
   * Removes a filter at the specified index.
   *
   * @param {number} index - Index of the filter to remove.
   */
  const handleRemoveFilter = (index: number) => {
    const newFilters = [...activeFilters];
    newFilters.splice(index, 1);
    onFilterChange(newFilters);
  };

  /**
   * Clears all active filters.
   */
  const handleClearAllFilters = () => {
    onFilterChange([]);
  };

  return (
    <div className="flex flex-col gap-2 mb-4">
      <div className="flex items-center gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="secondary" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-[200px] p-0 bg-surface text-on-surface relative" sideOffset={5}>
            <Command>
              <CommandInput placeholder="Search columns..." />
              <CommandList>
                <CommandEmpty>No columns found.</CommandEmpty>
                <CommandGroup heading="Select column to filter">
                  {columns.map((column) => (
                    <CommandItem
                      key={column.id}
                      value={column.id}
                      onSelect={() => {
                        setSelectedColumn(column);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          activeFilters.some((f) => f.column === column.id)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {column.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {activeFilters.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAllFilters}
            className="h-8 px-2 text-xs"
          >
            Clear all
          </Button>
        )}

        {activeFilters.length > 0 && (
          <div className="flex items-center text-sm text-muted-foreground">
            <SearchIcon className="mr-1 h-3 w-3" />
            <span>{activeFilters.length} active filter(s)</span>
          </div>
        )}
      </div>

      {/* Display active filters as badges */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {activeFilters.map((filter, index) => (
            <FilterBadge
              key={`${filter.column}-${index}`}
              filter={filter}
              columnLabel={columnMap[filter.column] || filter.column}
              onRemove={() => handleRemoveFilter(index)}
            />
          ))}
        </div>
      )}

      {/* Filter editor popover */}
      {selectedColumn && (
        <Popover
          open={!!selectedColumn}
          onOpenChange={(open) => {
            if (!open) setSelectedColumn(null);
          }}
        >
          <PopoverTrigger asChild>
            <div className="hidden">Trigger</div>
          </PopoverTrigger>
          <PopoverContent 
            className="border border-border bg-surface text-on-surface shadow-md z-50 ml-12" 
            align="start" 
            sideOffset={500}
            avoidCollisions={true}
            collisionPadding={10}
            style={{ position: 'absolute', width: '400px' }}
          >
            <FilterEditor
              column={selectedColumn}
              value={activeFilters.find((f) => f.column === selectedColumn.id)}
              onApply={handleAddFilter}
              onCancel={() => setSelectedColumn(null)}
            />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

/**
 * EnhancedCaseTable component displays a table of cases with advanced filtering, sorting,
 * pagination, and row selection capabilities.
 *
 * The component dynamically creates columns based on provided metadata or the keys of the data.
 * It also converts metadata attributes to a format suitable for the TableFilter component.
 * @param {CaseTableProps} props - The properties for the EnhancedCaseTable.
 * @returns {JSX.Element} The rendered enhanced table.
 */
export function EnhancedCaseTable({ metadata, data }: CaseTableProps) {
  const [activeFilters, setActiveFilters] = React.useState<FilterValue[]>([]);
  
  // Dynamically create columns based on metadata attributes or keys from the data.
  const dynamicColumns = React.useMemo<ColumnDef<Record<string, any>>[]>(() => {
    if (!data?.length) return [];

    /**
     * Normalizes the raw column type to a valid ColumnType.
     *
     * @param {string | undefined} type - The raw type.
     * @returns {ColumnType} The normalized column type.
     */
    const normalizeColumnType = (type: string | undefined): ColumnType => {
      switch (type) {
        case 'number': return 'number';
        case 'date': return 'date';
        default: return 'text';
      }
    };

    /**
     * Creates a column definition for the table.
     *
     * @param {string} key - The key of the column.
     * @param {string} name - The display name of the column.
     * @param {string | undefined} rawType - The raw type of the column.
     * @returns {ColumnDef<Record<string, any>>} The column definition.
     */
    const createColumn = (key: string, name: string, rawType: string | undefined) => {
      // Normalize the type to one of the valid ColumnType values.
      const type = normalizeColumnType(rawType);
      
      return {
        accessorKey: key,
        header: () => <span className="capitalize">{name}</span>,
        cell: ({ row }: any) => <div>{row.getValue(key)}</div>,
        meta: { type },
        // Custom filter function for the column.
        filterFn: (row: any, columnId: string, filterValue: any) => {
          const rowValue = row.getValue(columnId);
          if (!filterValue) return true;

          const { operator, value, secondValue } = filterValue;
          const isNumeric = ["number", "date"].includes(type);

          switch (operator) {
            case "contains":
              return String(rowValue).toLowerCase().includes(value.toLowerCase());
            case "equals":
              return isNumeric ? Number(rowValue) === Number(value) : String(rowValue) === value;
            case "startsWith":
              return String(rowValue).toLowerCase().startsWith(value.toLowerCase());
            case "greaterThan":
              return isNumeric && Number(rowValue) > Number(value);
            case "lessThan":
              return isNumeric && Number(rowValue) < Number(value);
            case "between":
              return (
                isNumeric &&
                Number(rowValue) >= Number(value) &&
                Number(rowValue) <= Number(secondValue)
              );
            default:
              return true;
          }
        },
      };
    };

    return metadata?.attributes?.length
      ? metadata.attributes.map((attr) =>
          createColumn(attr.name.toLowerCase(), attr.name, attr.type)
        )
      : Object.keys(data[0]).map((key) =>
          createColumn(key, key, typeof data[0][key] === "number" ? "number" : "text")
        );
  }, [data, metadata]);

  // Convert metadata attributes to a format needed by the TableFilter component.
  const filterColumns = React.useMemo(() => {
    /**
     * Converts a raw type string to a valid ColumnType.
     *
     * @param {string} type - The raw type.
     * @returns {ColumnType} The normalized column type.
     */
    const normalizeColumnType = (type: string): ColumnType => {
      if (type === 'text' || type === 'number' || type === 'date') {
        return type as ColumnType;
      }
      return 'text';
    };
    
    if (metadata?.attributes?.length) {
      return metadata.attributes.map((attr) => ({
        id: attr.name.toLowerCase(),
        label: attr.name,
        type: normalizeColumnType(attr.type || 'text'),
      }));
    }
    
    if (data?.length > 0) {
      return Object.keys(data[0]).map((key) => ({
        id: key,
        label: key,
        type: typeof data[0][key] === "number" ? "number" as const : "text" as const,
      }));
    }
    
    return [];
  }, [metadata, data]);

  // Apply active filters to the data.
  const filteredData = React.useMemo(() => {
    if (!activeFilters.length || !data?.length) return data || [];
    
    return data.filter((row) => {
      if (!row) return false;
      
      return activeFilters.every((filter) => {
        const { column, operator, value, secondValue } = filter;
        
        // Protect against undefined values.
        if (!column || !operator) return true;
        
        const rowValue = row[column];
        
        // Handle empty values.
        if (operator === "isEmpty") return rowValue == null || rowValue === "";
        if (operator === "isNotEmpty") return rowValue != null && rowValue !== "";
        
        // If no value for comparison or rowValue is null, do not filter out.
        if (value == null || value === "" || rowValue == null) return true;
        
        try {
          if (filter.columnType === "number") {
            const numValue = parseFloat(value);
            const numRowValue = parseFloat(rowValue);
            
            if (isNaN(numValue) || isNaN(numRowValue)) return true;
            
            switch (operator) {
              case "equals": return numRowValue === numValue;
              case "greaterThan": return numRowValue > numValue;
              case "lessThan": return numRowValue < numValue;
              case "between": 
                { if (!secondValue) return true;
                const numSecondValue = parseFloat(secondValue);
                if (isNaN(numSecondValue)) return true;
                return numRowValue >= numValue && numRowValue <= numSecondValue; }
              default: return true;
            }
          } else if (filter.columnType === "date") {
            try {
              const dateValue = new Date(value);
              const rowDate = new Date(rowValue);
              
              if (isNaN(dateValue.getTime()) || isNaN(rowDate.getTime())) 
                return true;
              
              switch (operator) {
                case "equals": return rowDate.getTime() === dateValue.getTime();
                case "greaterThan": return rowDate.getTime() > dateValue.getTime();
                case "lessThan": return rowDate.getTime() < dateValue.getTime();
                case "between": 
                  { if (!secondValue) return true;
                  const secondDate = new Date(secondValue);
                  if (isNaN(secondDate.getTime())) return true;
                  return rowDate >= dateValue && rowDate <= secondDate; }
                default: return true;
              }
            } catch (e) {
              console.error("Error comparing dates:", e);
              return true;
            }
          } else {
            // Text comparison with case-insensitive matching.
            const strValue = String(value || "").toLowerCase();
            const strRowValue = String(rowValue || "").toLowerCase();
            
            switch (operator) {
              case "contains": return strRowValue.includes(strValue);
              case "equals": return strRowValue === strValue;
              case "startsWith": return strRowValue.startsWith(strValue);
              default: return true;
            }
          }
        } catch (error) {
          console.error("Error applying filter:", error);
          return true; // On error, do not filter out the row.
        }
      });
    });
  }, [data, activeFilters]);

  // Base columns: selection and actions.
  const columns = React.useMemo(() => [
    {
      id: "select",
      header: ({ table }: any) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }: any) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...dynamicColumns,
    {
      id: "actions",
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-surface text-on-surface">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Export Data</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ], [dynamicColumns]);

  // Table state hooks.
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Initialize the table instance with filtering, sorting, pagination, and row selection.
  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="space-y-4">
      {/* Enhanced filter component */}
      {filterColumns.length > 0 && (
        <TableFilter
          columns={filterColumns}
          activeFilters={activeFilters}
          onFilterChange={setActiveFilters}
        />
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} rows selected
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
