import { ChevronDown, Filter} from "lucide-react"
import { useState } from "react"
import { Button } from "@/shared/components/ui/button"
import { FreeTextOverview } from "./components/FreeTextOverview"
import { DuplicatedInvoiceOverview } from "./components/DuplicatedInvoiceOverview"
import { ProcessMiningOverview } from "./components/ProcessMiningOverview"
import { DashboardMetrics } from "./components/DashboardMetrics"
import { Insights } from "./components/Insights"
import { EmptyState } from "./components/EmptyState"

const Page: React.FC = () => {
  const [hasProducts, setHasProducts] = useState<boolean>(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <main className="flex-1 flex flex-col w-full overflow-hidden">
        <header className="border-b border-outline-variant">
          <div className="border-t flex items-center gap-2 px-4 py-3 bg-background overflow-x-auto scrollbar-hide">
            <Button variant="secondary" className="gap-2 text-on-secondary whitespace-nowrap">
              Last 7 days
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button variant="secondary" className="gap-2 text-on-secondary whitespace-nowrap">
              All Departments
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button 
              variant="secondary" 
              className="gap-2 text-on-secondary whitespace-nowrap"
              onClick={() => {setHasProducts(!hasProducts)}}
              >
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-auto bg-surface">
          <div className="p-4 sm:p-6 space-y-6">
            <DashboardMetrics />
            
            {hasProducts ? (
              <>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-on-surface">Your Services</h2>
                    <Button variant="ghost" className="text-primary">View All</Button>
                  </div>
                  
                  <div className="custom-scrollbar overflow-auto pb-2 -mx-4 px-4 space-y-4 max-h-[500px]">
                    <FreeTextOverview />
                    <DuplicatedInvoiceOverview />
                    <ProcessMiningOverview />
                  </div>
                </div>
                
                <Insights />
              </>
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Page
