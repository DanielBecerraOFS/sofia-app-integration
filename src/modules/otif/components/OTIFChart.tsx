
import React from "react";
import { BarChart3 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/index"

/**
 * Component displaying OTIF analysis by business unit
 */
export const OTIFChart: React.FC = () => {
  // In a real implementation, this would use a charting library like recharts
  return (
    <Card className="bg-surface">
      <CardHeader>
        <CardTitle className="text-on-surface">OTIF Analysis by Business Unit</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-64 flex-col items-center justify-center p-4">
          <div className="h-full w-full rounded-md bg-surface-container p-3">
            {/* This would be a real chart in implementation */}
            <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-on-surface-variant">
              <BarChart3 className="h-8 w-8" />
              <p>Bar chart showing OTIF performance by business unit would appear here</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};