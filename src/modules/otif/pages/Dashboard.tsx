import React from "react";
import { DashboardShell } from "../components/DashboardShell";
import { DashboardHeader } from "../components/DashboardHeader";
import { KeyMetricsCards } from "../components/KeyMetricsCards";
import { PerformanceTrend } from "../components/PerformanceTrend";
import { WorkflowSteps } from "../components/WorkflowSteps";
import { OTIFChart } from "../components/OTIFChart";
import { OrdersChart } from "../components/OrdersChart";
import { OrdersTable } from "../components/OrdersTable";

/**
 * Main dashboard page component for the OTIF dashboard
 */
const OTIFDashboardPage: React.FC = () => {
  return (
    <DashboardShell>
      <DashboardHeader />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <KeyMetricsCards />
        </div>
        <div className="md:col-span-1">
          <PerformanceTrend />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <WorkflowSteps />
        </div>
        <div className="md:col-span-2">
          <OTIFChart />
        </div>
      </div>
      <OrdersChart />
      <OrdersTable />
    </DashboardShell>
  );
};

export default OTIFDashboardPage;