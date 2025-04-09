import React from "react";
import { ArrowRight, ChevronRight, FileText, Plus } from "lucide-react";
import {
  Button,
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/index";
import { Link } from "react-router-dom";

interface ActivityItemProps {
  text: string;
  time: string;
}

interface MetricBoxProps {
  title: string;
  value: string;
}

export const FreeTextOverview: React.FC = () => {
  return (
    <Card className="bg-surface-container-lowest border-1 border-primary w-full py-2 md:py-4 px-4 md:px-6">
      <CardHeader className="flex flex-row items-center justify-start gap-2 pb-2">
        <CardTitle className="flex flex-row justify-start items-center gap-1 text-on-surface">
          <FileText className="h-5 w-5" />
          Free Text Analysis
        </CardTitle>
        <Badge className="px-2 py-1 text-xs font-medium bg-green-700 text-green-50 rounded-full">
          Active
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-on-surface-variant">
                Write or upload text to be automatically analyzed and converted
                into structured insights and product recommendations.
              </p>

              {/* <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-on-surface-variant">Accuracy Rate</span>
                  <span className="text-xs font-medium text-primary">94%</span>
                </div>
                <Progress value={94} className="h-1.5 bg-surface-variant" indicatorClassName="bg-primary" /> 
              </div> */}
            </div>

            {/* <div className="sm:w-32 h-20 flex items-end justify-between border-b border-outline-variant">
              {weeklyData.map((dataPoint, index) => (
                <div 
                  key={index} 
                  className="w-2 bg-primary-container" 
                  style={{ height: `${dataPoint.value}%` }}
                  title={`Day ${dataPoint.day}: ${dataPoint.value} analyses`}
                />
              ))}
            </div> */}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4">
            <MetricBox title="Acurrency Rate" value="94%" />
            <MetricBox title="Recent Analyses" value="24" />
            <MetricBox title="Documents Processed" value="152" />
            <MetricBox title="Tokens Saved" value="8.4K" />
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-medium text-on-surface-variant">
              Latest activities
            </h4>
            <div className="space-y-1">
              <ActivityItem text="Invoice #3829 analyzed" time="2h ago" />
              <ActivityItem text="Batch process completed" time="Yesterday" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 max-w-[30%]">
            <Button className="w-full justify-center bg-primary text-on-primary flex-1">
              <Plus size={16} strokeWidth={2} />
              New Analysis
            </Button>
            <Link to={"/app/free-text"} className="flex-1">
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

const ActivityItem: React.FC<ActivityItemProps> = ({ text, time }) => {
  return (
    <div className="flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-surface-container-low">
      <div className="flex items-center gap-2">
        <span className="flex h-1.5 w-1.5 rounded-full bg-primary"></span>
        <span className="text-xs text-on-surface">{text}</span>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-xs text-on-surface-variant">{time}</span>
        <ChevronRight className="h-3 w-3 text-on-surface-variant" />
      </div>
    </div>
  );
};
