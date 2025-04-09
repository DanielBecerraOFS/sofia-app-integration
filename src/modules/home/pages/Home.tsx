import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { FreeTextOverview } from "../components/FreeTextOverview";
import { DuplicatedInvoiceOverview } from "../components/DuplicatedInvoiceOverview";
import { ProcessMiningOverview } from "../components/ProcessMiningOverview";
import { DashboardMetrics } from "../components/DashboardMetrics";
import { Insights } from "../components/Insights";
import { EmptyState } from "../components/EmptyState";
import { ChevronDown, Filter } from "lucide-react";

const Page: React.FC = () => {
  const [hasProducts, setHasProducts] = useState<boolean>(false);

  return (
    <main className="flex-1 flex flex-col w-full bg-surface">
      <div className="flex flex-row justify-start items-center gap-2 px-4 py-3 w-full">
        <h3 className="text-semibold">Filters</h3>
        <Button
          variant="secondaryOutline"
          className="gap-2 bg-secondary/10  whitespace-nowrap"
        >
          Last 7 days
          <ChevronDown className="h-4 w-4" />
        </Button>
        <Button
          variant="secondaryOutline"
          className="gap-2 bg-secondary/10 whitespace-nowrap"
        >
          All Departments
          <ChevronDown className="h-4 w-4" />
        </Button>
        <Button
          variant="secondaryOutline"
          className="gap-2  bg-secondary/10 whitespace-nowrap"
          onClick={() => {
            setHasProducts(!hasProducts);
          }}
        >
          <Filter className="h-4 w-4" />
          More Filters
        </Button>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="p-4 sm:p-6 space-y-6">
          <DashboardMetrics />

          {hasProducts ? (
            <div>
              <div className="space-y-4 mb-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-on-surface">
                    Your Services
                  </h2>
                  <Button variant="ghost" className="text-secondary">
                    View All
                  </Button>
                </div>

                <div className="flex flex-col gap-4">
                  <FreeTextOverview />
                  <DuplicatedInvoiceOverview />
                  <ProcessMiningOverview />
                </div>
              </div>
              <Insights />
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </main>
  );
};

export default Page;
