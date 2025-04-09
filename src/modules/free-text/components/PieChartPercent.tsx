import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/components/index";
import React from "react";

import { ChartConfig } from "@/shared/components/ui/chart";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  freeText: {
    label: "Free Text",
    color: "var(--chart-1)",
  },
  wFreeText: {
    label: "No Free Text",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;


interface PieChartProps{
  total_oc: number;
  total_oc_ft: number;
}

const PieChartPercent: React.FC<PieChartProps> = ({ 
  total_oc,
  total_oc_ft
}) =>  {
  const chartData = [
    { type: "freeText", visitors: total_oc_ft, fill: "var(--color-secondary)" },
    { type: "wFreeText", visitors: (total_oc-total_oc_ft), fill: "var(--color-secondary-container)" },
  ];
  return (
    <Card className="border-0">
      <CardHeader className="items-start pb-0">
        <CardTitle className="text-2xl">PO Analysis</CardTitle>
        <CardDescription>
          <div className="flex flex-col">
            <h3 className="text-muted-foreground">May, 2025</h3>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="visitors" label nameKey="type" />
            <ChartLegend
              content={<ChartLegendContent nameKey="type" />}
              className="-translate-y-2 flex-col justify-start items-start gap-2 w-full"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default PieChartPercent;
