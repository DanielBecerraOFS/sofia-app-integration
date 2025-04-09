
import React from "react";
import { HelpCircle, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/index";

/**
 * Component displaying all key performance metrics in a grid
 */
export const KeyMetricsCards: React.FC = () => {
  // This data could come from an API or props in a real app
  const metrics: MetricCardProps[] = [
    {
      title: "On-Time Rate",
      value: "82.3%",
      change: "+1.4%",
      isPositive: true,
      tooltip: "Percentage of orders delivered on time",
      colorClass: "text-chart-1"
    },
    {
      title: "In-Full Rate",
      value: "91.7%",
      change: "-0.8%",
      isPositive: false,
      tooltip: "Percentage of orders delivered with complete quantity",
      colorClass: "text-chart-2"
    },
    {
      title: "Perfect Order Rate",
      value: "76.5%",
      change: "+2.1%",
      isPositive: true,
      tooltip: "Orders delivered On-Time, In-Full and without issues",
      colorClass: "text-chart-3"
    },
    {
      title: "Avg. Delivery Delay",
      value: "2.4 days",
      change: "-0.3 days",
      isPositive: true,
      tooltip: "Average delay across all late deliveries",
      colorClass: "text-chart-4"
    },
    {
      title: "Backorder Rate",
      value: "8.3%",
      change: "+1.1%",
      isPositive: false,
      tooltip: "Percentage of orders that cannot be fulfilled immediately",
      colorClass: "text-chart-5"
    },
    {
      title: "Order Cycle Time",
      value: "4.7 days",
      change: "-0.2 days",
      isPositive: true,
      tooltip: "Average time from order placement to delivery",
      colorClass: "text-chart-6"
    }
  ];

  return (
    <Card className="bg-surface">
      <CardHeader>
        <CardTitle className="text-on-surface">Key Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  tooltip: string;
  colorClass: string;
}

/**
 * Individual metric card component showing a KPI with its trend
 */
export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  isPositive,
  colorClass
}) => {
  return (
    <div className="rounded-lg bg-surface-container p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm font-medium text-on-surface-variant">
          {title}
          <HelpCircle className="h-3 w-3 cursor-help" />
        </div>
      </div>
      <div className={`mt-1 text-xl font-bold ${colorClass}`}>{value}</div>
      <div className={`flex items-center text-xs ${isPositive ? 'text-tertiary' : 'text-error'}`}>
        {isPositive ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
        <span>{change} vs. prev. period</span>
      </div>
    </div>
  );
};