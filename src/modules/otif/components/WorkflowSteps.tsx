import React from "react";
import { Info } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/index";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/index";
import { Button } from "@/shared/components/index";

/**
 * Component for the analysis workflow steps
 */
export const WorkflowSteps: React.FC = () => {
  return (
    <Card className="bg-surface">
      <CardHeader>
        <CardTitle className="text-on-surface">Analysis Workflow</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <WorkflowStep
            step={1}
            title="Select Order Type"
            defaultValue="sales-order"
            options={[
              { value: "sales-order", label: "Sales Order" },
              { value: "purchase-order", label: "Purchase Order" },
              { value: "delivery-order", label: "Delivery Order" }
            ]}
          />

          <WorkflowStep
            step={2}
            title="Select Performance Issue"
            defaultValue="late-delivery"
            options={[
              { value: "late-delivery", label: "Late Delivery" },
              { value: "incomplete-delivery", label: "Incomplete Delivery" },
              { value: "quality-issues", label: "Quality Issues" }
            ]}
          />

          <WorkflowStep
            step={3}
            title="Select Dimension"
            defaultValue="creator"
            options={[
              { value: "creator", label: "Creator" },
              { value: "customer", label: "Customer" },
              { value: "region", label: "Region" },
              { value: "product-group", label: "Product Group" }
            ]}
          />

          <Button className="mt-2 w-full bg-primary text-on-primary">
            Apply Analysis
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface SelectOption {
  value: string;
  label: string;
}

interface WorkflowStepProps {
  step: number;
  title: string;
  defaultValue: string;
  options: SelectOption[];
}

/**
 * Individual workflow step component
 */
const WorkflowStep: React.FC<WorkflowStepProps> = ({
  step,
  title,
  defaultValue,
  options
}) => {
  return (
    <div>
      <div className="flex items-center text-sm font-medium text-on-surface">
        Step {step} | {title}
        <Info className="ml-1 h-4 w-4 text-on-surface-variant" />
      </div>
      <Select defaultValue={defaultValue} >
        <SelectTrigger className="bg-surface-container text-on-surface">
          <SelectValue placeholder={options.find(opt => opt.value === defaultValue)?.label} />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};