import React from "react";
import { Clock, Layers, BarChart3 } from "lucide-react";
import { Button, Card} from "@/shared/components/index"
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/index"

/**
 * Header component for the dashboard including top metrics and controls
 */
export const DashboardHeader: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-on-surface">Supply Chain Performance</h1>
            <span className="rounded-full bg-primary-container px-2 py-1 text-xs font-medium text-on-primary-container">Team Lead View</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-on-surface-variant">
            <Clock className="h-4 w-4" />
            <span>Last refresh: 5 minutes ago</span>
            <span className="flex items-center gap-1 rounded-full bg-tertiary-container px-2 py-0.5 text-xs font-medium text-on-tertiary-container">
              <span className="h-2 w-2 rounded-full bg-tertiary"></span>
              Live
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" >
            Filters
          </Button>
          <Button variant="outline" size="sm" >
            Date Range
          </Button>
          <Button variant="outline" size="sm" >
            Export
          </Button>
          <Button variant="outline" size="sm" >
            Refresh
          </Button>
          <Button size="sm" className="bg-primary text-on-primary">
            Take Action
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <HeaderMetricCard
          title="Total Orders"
          value="498"
          icon={<Layers className="h-5 w-5 text-primary" />}
        />
        <HeaderMetricCard
          title="Active Tasks"
          value="557"
          icon={<Clock className="h-5 w-5 text-secondary" />}
        />
        <HeaderMetricCard
          title="Total Value"
          value="19.1M"
          subValue="EUR"
          icon={<BarChart3 className="h-5 w-5 text-tertiary" />}
        />
        <HeaderMetricCard
          title="OTIF Score"
          value="78.2%"
          change="-2.1%"
          isPositive={false}
          icon={<PackageCheck className="h-5 w-5 text-primary" />}
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs defaultValue="due-this-month">
          <TabsList>
            <TabsTrigger value="due-this-month">Due This Month</TabsTrigger>
            <TabsTrigger value="last-30">Last 30 Days</TabsTrigger>
            <TabsTrigger value="last-quarter">Last Quarter</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" >
            Customize
          </Button>
        </div>
      </div>
    </div>
  );
};

// Import these at the top
import { PackageCheck, TrendingDown, TrendingUp } from "lucide-react";

interface HeaderMetricCardProps {
  title: string;
  value: string;
  subValue?: string;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
}

/**
 * Metric card component for the header section
 */
const HeaderMetricCard: React.FC<HeaderMetricCardProps> = ({
  title,
  value,
  subValue,
  change,
  isPositive,
  icon,
}) => {
  return (
    <Card className="bg-surface">
      <div className="p-4">
        <div className="flex justify-between">
          <div>
            <div className="text-sm font-medium text-on-surface-variant">{title}</div>
            <div className="text-3xl font-bold text-on-surface">{value}</div>
            {subValue && <div className="text-xs text-on-surface-variant">{subValue}</div>}
            {change && (
              <div className={`flex items-center text-xs ${isPositive ? 'text-tertiary' : 'text-error'}`}>
                {isPositive ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
                <span>{change}</span>
              </div>
            )}
          </div>
          <div className="rounded-full bg-surface-container p-2">
            {icon}
          </div>
        </div>
      </div>
    </Card>
  );
};