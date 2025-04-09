import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/Table"
import { Badge } from "@/shared/components/ui/badge"
import { Input } from "@/shared/components/ui/Input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/components/ui/DropDownMenu"
import { Button } from "@/shared/components/ui/button"
import { ChevronDown, Search, ArrowUpDown, Clock, DollarSign, Building, User, Truck } from "lucide-react"

// Define the type for a delivery item
interface DeliveryItem {
  id: string
  avg_time: number
  branch: string
  employee: string
  state: string
  supplier: string
  value: number
  estimated_delivery: string
  delivery: string
}

// Define the type for the data structure
interface DeliveryData {
  count: number
  next: string | null
  previous: string | null
  results: DeliveryItem[]
}

export default function DeliveryTable() {
  // Sample data based on the provided structure
  const [data, ] = useState<DeliveryData>({
    count: 1000,
    next: null,
    previous: null,
    results: [
      {
        id: "1274",
        avg_time: 1267689.354562,
        branch: "Branch 7",
        employee: "Megan",
        state: "Distribute Materials",
        supplier: "Horizon Supply Partners",
        value: 4900,
        estimated_delivery: "2025-02-14T20:53:21Z",
        delivery: "2025-02-14T20:53:21Z",
      },
      {
        id: "5623",
        avg_time: 844536.465805,
        branch: "Branch 6",
        employee: "Andrea",
        state: "Distribute Materials",
        supplier: "Summit Chain Partners",
        value: 8600,
        estimated_delivery: "2025-03-10T23:27:38Z",
        delivery: "2025-03-12T10:15:38Z",
      },
      {
        id: "8386",
        avg_time: 1414368.413254,
        branch: "Branch 7",
        employee: "Taylor",
        state: "Distribute Materials",
        supplier: "Vertex Trade Solutions",
        value: 1700,
        estimated_delivery: "2025-02-10T09:16:36Z",
        delivery: "2025-02-09T14:30:22Z",
      },
      {
        id: "5202",
        avg_time: 1338165.787342,
        branch: "Branch 5",
        employee: "Melissa",
        state: "Distribute Materials",
        supplier: "Kappa Distribution Network",
        value: 6800,
        estimated_delivery: "2025-03-26T06:57:11Z",
        delivery: "2025-03-26T06:57:11Z",
      },
      {
        id: "9295",
        avg_time: 2549985.177849,
        branch: "Branch 4",
        employee: "Christian",
        state: "Distribute Materials",
        supplier: "Omicron Industrial Co.",
        value: 8800,
        estimated_delivery: "2025-02-19T20:20:57Z",
        delivery: "2025-02-22T08:45:30Z",
      },
      {
        id: "1275",
        avg_time: 1456789.123456,
        branch: "Branch 3",
        employee: "Luis",
        state: "Distribute Materials",
        supplier: "Global Resources Inc.",
        value: 3200,
        estimated_delivery: "2025-03-10T14:23:11Z",
        delivery: "2025-03-10T14:23:11Z"
      },
      {
        id: "1276",
        avg_time: 1365432.987654,
        branch: "Branch 5",
        employee: "Sofia",
        state: "Distribute Materials",
        supplier: "Prime Logistics",
        value: 5500,
        estimated_delivery: "2025-04-01T18:00:00Z",
        delivery: "2025-04-01T18:00:00Z"
      },
      {
        id: "1277",
        avg_time: 1223456.456789,
        branch: "Branch 1",
        employee: "Carlos",
        state: "Distribute Materials",
        supplier: "Supply Chain Solutions",
        value: 4100,
        estimated_delivery: "2025-05-22T09:15:45Z",
        delivery: "2025-05-22T09:15:45Z"
      },
      {
        id: "1278",
        avg_time: 1102324.765432,
        branch: "Branch 4",
        employee: "Ana",
        state: "Distribute Materials",
        supplier: "Tech Supplies",
        value: 4300,
        estimated_delivery: "2025-06-11T16:35:30Z",
        delivery: "2025-06-11T16:35:30Z"
      },
      {
        id: "1279",
        avg_time: 1405678.334567,
        branch: "Branch 2",
        employee: "Roberto",
        state: "Distribute Materials",
        supplier: "Green Earth Suppliers",
        value: 3800,
        estimated_delivery: "2025-07-04T12:45:00Z",
        delivery: "2025-07-04T12:45:00Z"
      },
      {
        id: "1280",
        avg_time: 1184235.678901,
        branch: "Branch 6",
        employee: "Laura",
        state: "Distribute Materials",
        supplier: "Rapid Supply Co.",
        value: 5000,
        estimated_delivery: "2025-08-15T11:23:09Z",
        delivery: "2025-08-15T11:23:09Z"
      },
      {
        id: "1281",
        avg_time: 1056789.432101,
        branch: "Branch 8",
        employee: "David",
        state: "Distribute Materials",
        supplier: "Northern Supply Group",
        value: 4200,
        estimated_delivery: "2025-09-30T17:10:00Z",
        delivery: "2025-09-30T17:10:00Z"
      },
      {
        id: "1282",
        avg_time: 1502345.876543,
        branch: "Branch 9",
        employee: "Veronica",
        state: "Distribute Materials",
        supplier: "Silver Supply Co.",
        value: 4600,
        estimated_delivery: "2025-10-01T20:00:00Z",
        delivery: "2025-10-01T20:00:00Z"
      },
      {
        id: "1283",
        avg_time: 1134567.987654,
        branch: "Branch 10",
        employee: "Felipe",
        state: "Distribute Materials",
        supplier: "Peak Logistics",
        value: 5100,
        estimated_delivery: "2025-11-12T13:50:00Z",
        delivery: "2025-11-12T13:50:00Z"
      },
      {
        id: "1284",
        avg_time: 1324567.123456,
        branch: "Branch 11",
        employee: "Jessica",
        state: "Distribute Materials",
        supplier: "Oceanic Traders",
        value: 4900,
        estimated_delivery: "2025-12-24T15:30:00Z",
        delivery: "2025-12-24T15:30:00Z"
      }
    ],
  })

  const [searchTerm, setSearchTerm] = useState("")

  // Function to format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Function to determine if a delivery is on time or late
  const getDeliveryStatus = (estimatedDelivery: string, actualDelivery: string) => {
    const estimated = new Date(estimatedDelivery).getTime()
    const actual = new Date(actualDelivery).getTime()

    if (actual <= estimated) {
      return { status: "On Time", variant: "success" }
    } else {
      return { status: "Late", variant: "destructive" }
    }
  }

  // Filter results based on search term
  const filteredResults = data.results.filter(
    (item) =>
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4 px-4 py-6 grid-container w-full h-full flex flex-col justify-center">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Delivery Status</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search deliveries..."
              className="pl-8 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Show All</DropdownMenuItem>
              <DropdownMenuItem>Hide Avg Time</DropdownMenuItem>
              <DropdownMenuItem>Hide State</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  <Building className="h-4 w-4" />
                  Branch
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  Employee
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  <Truck className="h-4 w-4" />
                  Supplier
                </div>
              </TableHead>
              <TableHead className="hidden md:table-cell">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  Value
                </div>
              </TableHead>
              <TableHead className="hidden lg:table-cell">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  RDD
                </div>
              </TableHead>
              <TableHead className="hidden lg:table-cell">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  SOFIA Delivery date prediction
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  <ArrowUpDown className="h-4 w-4" />
                  SOFIA Delivery prediction
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResults.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              filteredResults.map((item) => {
                const status = getDeliveryStatus(item.estimated_delivery, item.delivery)
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.branch}</TableCell>
                    <TableCell>{item.employee}</TableCell>
                    <TableCell className="max-w-[150px] truncate" title={item.supplier}>
                      {item.supplier}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">${item.value.toLocaleString()}</TableCell>
                    <TableCell className="hidden lg:table-cell">{formatDate(item.estimated_delivery)}</TableCell>
                    <TableCell className="hidden lg:table-cell">{formatDate(item.delivery)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={status.variant === "success" ? "outline" : "destructive"}
                        className={`${status.variant === "success" ? "bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700" : "bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700"}`}
                      >
                        {status.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredResults.length} of {data.count} deliveries
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}