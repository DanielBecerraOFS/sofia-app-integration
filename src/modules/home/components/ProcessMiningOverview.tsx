import React from "react";
import { Activity, ArrowRight, Clock, Search, Zap } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components";
import { Link } from "react-router-dom";

interface ProcessStep {
  name: string;
  status: "complete" | "active" | "pending";
  time: string;
}

interface MetricBoxProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

export const ProcessMiningOverview: React.FC = () => {
  // Sample data for the process flow visualization
  const processSteps: ProcessStep[] = [
    { name: "Receive", status: "complete", time: "2h" },
    { name: "Review", status: "complete", time: "4h" },
    { name: "Approve", status: "active", time: "8h" },
    { name: "Process", status: "pending", time: "3h" },
    { name: "Close", status: "pending", time: "1h" },
  ];

  return (
    <Card className="bg-surface-container-lowest border-1 border-primary w-full py-2 md:py-4 px-4 md:px-6">
      <CardHeader className="flex flex-row items-center justify-start pb-2 gap-2">
        <CardTitle className="flex items-center gap-2 text-on-surface">
          <Activity className="h-5 w-5" />
          Process Mining
        </CardTitle>
        <Badge className="px-2 py-1 text-xs font-medium bg-tertiary text-on-tertiary rounded-full">
          Optimizing
        </Badge>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:items-start gap-4">
            <div className="flex-1">
              <p className="text-sm text-on-surface-variant">
                Analyze and visualize your business processes to identify
                bottlenecks, inefficiencies, and opportunities for automation.
              </p>

              {/*               <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-on-surface-variant">
                    Overall Efficiency
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="flex h-2 w-2 rounded-full bg-tertiary-container"></span>
                    <span className="text-xs font-medium text-tertiary-container">
                      72%
                    </span>
                  </div>
                </div>
                <Progress value={72} className="h-1.5 bg-surface-variant" indicatorClassName="bg-tertiary-container" />
              </div> */}
            </div>
            <div className="flex-1 w-full">
              <div className="flex flex-row">
                <div className="flex items-center w-full py-2">
                  {processSteps.map((step, index) => (
                    <div
                      key={index}
                      className="flex flex-1 items-center relative"
                    >
                      <div
                        className={`
                      flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center z-10
                      ${
                        step.status === "complete"
                          ? "bg-primary-container text-on-primary-container"
                          : step.status === "active"
                          ? "bg-primary text-on-primary"
                          : "bg-surface-container-high text-on-surface-variant"
                      }
                    `}
                      >
                        {step.status === "complete" ? (
                          <span className="text-xs">✓</span>
                        ) : (
                          <span className="text-xs">{index + 1}</span>
                        )}
                      </div>

                      {index < processSteps.length - 1 && (
                        <div
                          className={`h-0.5 flex-1 
                        ${
                          step.status === "complete"
                            ? "bg-primary-container"
                            : step.status === "active"
                            ? "bg-primary"
                            : "bg-surface-variant"
                        }`}
                        ></div>
                      )}

                      <div className="absolute -bottom-5 left-0 text-xs whitespace-nowrap">
                        <span
                          className={
                            step.status === "active"
                              ? "font-medium text-primary"
                              : "text-on-surface-variant"
                          }
                        >
                          {step.name}
                        </span>
                      </div>

                      <div className="absolute -top-5 left-0 text-xs whitespace-nowrap text-on-surface-variant">
                        {step.time}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 sm:mt-0 sm:w-44 bg-surface-container-low rounded-md p-3">
                  <div className="text-xs font-medium text-on-surface-variant mb-2">
                    Process Time Allocation
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-on-surface">
                        Value-adding
                      </span>
                      <span className="text-xs font-medium text-tertiary-container">
                        68%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-on-surface">Waiting</span>
                      <span className="text-xs font-medium text-tertiary-container">
                        22%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-on-surface">Rework</span>
                      <span className="text-xs font-medium text-tertiary-container">
                        10%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-medium text-on-surface-variant">
                Process Flow Example
              </h4>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-on-surface-variant" />
                <span className="text-xs text-on-surface-variant">
                  Avg. cycle time: 18h
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 mt-4">
            <MetricBox
              title="Overall Efficiency"
              value="72%"
              icon={<Activity className="h-4 w-4 text-tertiary-container" />}
            />
            <MetricBox
              title="Processes Mapped"
              value="36"
              icon={<Activity className="h-4 w-4 text-tertiary-container" />}
            />
            <MetricBox
              title="Automation Potential"
              value="42%"
              icon={<Zap className="h-4 w-4 text-tertiary-container" />}
            />
            <MetricBox
              title="Efficiency Gain"
              value="23%"
              icon={<Zap className="h-4 w-4 text-tertiary-container" />}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 max-w-[30%]">
            <Button className="w-full justify-center bg-primary text-on-primary flex-1">
              <Search size={16} strokeWidth={2} />
              New Porcess Analyze
            </Button>
            <Link to={"/app/process-mining"} className="flex-1">
              <Button
                variant="ghost"
                className="w-full text-on-primary-container border hover:bg-primary-container"
              >
                Go to Use Case
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const MetricBox: React.FC<MetricBoxProps> = ({ title, value }) => {
  return (
    <div className="rounded-none border-x border-x-outline text-center">
      <p className="text-xs font-semibold text-on-surface-variant mb-1">
        {title}
      </p>
      <p className="text-4xl font-bold">{value}</p>
    </div>
  );
};
