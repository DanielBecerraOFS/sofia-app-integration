import React, { useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/index";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/index";

/**
 * Component for displaying orders by creator/customer
 */
export const OrdersChart: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions with proper scaling
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Chart data
    const data = [
      { label: "DSCHEIN", openOrders: 168, openTasks: 34 },
      { label: "DCLSPEC", openOrders: 148, openTasks: 120 },
      { label: "HAETT", openOrders: 90, openTasks: 50 },
      { label: "MPONZYOU", openOrders: 24, openTasks: 8 },
      { label: "STAN", openOrders: 17, openTasks: 6 },
    ];

    // Chart configuration
    const barWidth = 30;
    const gap = 10;
    const groupWidth = barWidth * 2 + gap;
    const padding = { top: 20, right: 20, bottom: 40, left: 60 };
    const chartWidth = rect.width - padding.left - padding.right;
    const chartHeight = rect.height - padding.top - padding.bottom;

    // Find max value for scaling
    const maxValue = Math.max(...data.flatMap((d) => [d.openOrders, d.openTasks]));
    const yScale = chartHeight / maxValue;

    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = "#e2e8f0";
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, chartHeight + padding.top);
    ctx.lineTo(chartWidth + padding.left, chartHeight + padding.top);
    ctx.stroke();

    // Draw y-axis labels
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#64748b";
    ctx.font = "12px Inter, sans-serif";

    const yTickCount = 5;
    for (let i = 0; i <= yTickCount; i++) {
      const value = Math.round((maxValue / yTickCount) * i);
      const y = chartHeight + padding.top - value * yScale;

      ctx.fillText(value.toString(), padding.left - 10, y);

      // Draw grid line
      ctx.beginPath();
      ctx.strokeStyle = "#e2e8f0";
      ctx.setLineDash([2, 2]);
      ctx.moveTo(padding.left, y);
      ctx.lineTo(chartWidth + padding.left, y);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw bars and x-axis labels
    data.forEach((item, index) => {
      const x = padding.left + index * (groupWidth + 20) + 20;

      // Draw open orders bar with theme colors instead of hardcoded colors
      ctx.fillStyle = "var(--color-chart-1)"; // Use theme chart colors
      const openOrdersHeight = item.openOrders * yScale;
      ctx.fillRect(x, chartHeight + padding.top - openOrdersHeight, barWidth, openOrdersHeight);

      // Draw open tasks bar with theme colors
      ctx.fillStyle = "var(--color-chart-2)"; // Use theme chart colors
      const openTasksHeight = item.openTasks * yScale;
      ctx.fillRect(x + barWidth + gap, chartHeight + padding.top - openTasksHeight, barWidth, openTasksHeight);

      // Draw x-axis label
      ctx.fillStyle = "var(--color-on-surface-variant)"; // Use theme colors
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText(item.label, x + barWidth + gap / 2, chartHeight + padding.top + 10);
    });

    // Draw legend
    const legendX = padding.left;
    const legendY = padding.top - 10;

    // Open Orders legend
    ctx.fillStyle = "var(--color-chart-1)"; // Use theme colors
    ctx.fillRect(legendX, legendY, 15, 15);
    ctx.fillStyle = "var(--color-on-surface)"; // Use theme colors
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText("Open Orders", legendX + 20, legendY + 7.5);

    // Open Tasks legend
    ctx.fillStyle = "var(--color-chart-2)"; // Use theme colors
    ctx.fillRect(legendX + 120, legendY, 15, 15);
    ctx.fillStyle = "var(--color-on-surface)"; // Use theme colors
    ctx.fillText("Open Tasks", legendX + 140, legendY + 7.5);
  }, []);

  return (
    <Card className="bg-surface">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium text-on-surface">Orders by Creator</CardTitle>
          <Tabs defaultValue="creator">
            <TabsList>
              <TabsTrigger value="creator">Creator</TabsTrigger>
              <TabsTrigger value="customer">Customer</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <canvas ref={canvasRef} className="h-full w-full"></canvas>
        </div>
      </CardContent>
    </Card>
  );
};