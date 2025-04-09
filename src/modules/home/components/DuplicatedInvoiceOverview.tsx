import React from "react";
import {
  ArrowRight,
  ChevronRight,
  FileSearch,
  Banknote,
  TicketCheck,
  ScanQrCode,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components";
import { Link } from "react-router-dom";

interface MetricBoxProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

interface AlertItemProps {
  invoice: string;
  amount: string;
  similarity: string;
}

export const DuplicatedInvoiceOverview: React.FC = () => {
  // Sample data for donut chart representation
  const duplicatePercentage: number = 3.4;
  const safePercentage: number = 96.6;

  return (
    <Card className="bg-surface-container-lowest border-1 border-primary w-full py-2 md:py-4 px-4 md:px-6">
      <CardHeader className="flex flex-row items-center justify-start pb-2 gap-2">
        <CardTitle className="flex items-center gap-2 text-on-surface">
          <TicketCheck />
          Duplicated Invoice Detection
        </CardTitle>
        <Badge className="bg-error text-on-error">5 Alerts</Badge>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-on-surface-variant">
                AI-powered system that identifies potentially duplicated
                invoices, preventing double payments and improving financial
                accuracy.
              </p>

              {/* <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-on-surface-variant">Potential duplicate rate</p>
                  <p className="text-2xl font-bold text-secondary">{duplicatePercentage}%</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-3 h-3 rounded-full bg-secondary"></span>
                  <span className="text-xs text-on-surface-variant">Potential duplicates</span>
                </div>
              </div> */}
            </div>

            {/* Simple donut chart representation */}
            <div className="flex-shrink-0 relative w-24 h-24">
              <svg width="96" height="96" viewBox="0 0 96 96">
                <circle
                  cx="48"
                  cy="48"
                  r="36"
                  fill="none"
                  stroke="#E0E0E0"
                  strokeWidth="12"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="36"
                  fill="none"
                  stroke="var(--secondary)"
                  strokeWidth="12"
                  strokeDasharray={`${duplicatePercentage * 2.26} ${
                    safePercentage * 2.26
                  }`}
                  strokeDashoffset="56.5"
                />
                <text
                  x="48"
                  y="48"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="14"
                  fontWeight="bold"
                  fill="var(--on-surface)"
                >
                  {duplicatePercentage}%
                </text>
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4">
            <MetricBox
              title="Potencial Duplicate Rate"
              value="3.4%"
              icon={<FileSearch className="h-4 w-4 text-secondary" />}
            />
            <MetricBox
              title="Invoices Processed"
              value="1,432"
              icon={<FileSearch className="h-4 w-4 text-secondary" />}
            />
            <MetricBox
              title="Duplicates Found"
              value="49"
              icon={<FileSearch className="h-4 w-4 text-secondary" />}
            />
            <MetricBox
              title="Cost Savings"
              value="$18.6K"
              icon={<Banknote className="h-4 w-4 text-secondary" />}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-medium text-on-surface-variant">
                Recent alerts
              </h4>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-xs text-secondary"
              >
                View all
              </Button>
            </div>
            <div className="space-y-1">
              <AlertItem
                invoice="INV-28491"
                amount="$2,450.00"
                similarity="92%"
              />
              <AlertItem
                invoice="INV-63512"
                amount="$875.50"
                similarity="89%"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 max-w-[30%]">
            <Button className="w-full justify-center bg-primary text-on-primary flex-1">
              <ScanQrCode size={16} strokeWidth={2} />
              New Inovice Scanner
            </Button>
            <Link to={"/app/duplicated-invoice"} className="flex-1">
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

const AlertItem: React.FC<AlertItemProps> = ({
  invoice,
  amount,
  similarity,
}) => {
  return (
    <div className="flex items-center justify-between px-3 py-2 rounded-md border border-outline-variant hover:bg-surface-container-low">
      <div className="flex flex-col">
        <span className="text-xs font-medium text-on-surface">{invoice}</span>
        <span className="text-xs text-on-surface-variant">{amount}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="px-1.5 py-0.5 text-xs bg-secondary/10 text-secondary rounded">
          {similarity}
        </span>
        <ChevronRight className="h-4 w-4 text-on-surface-variant" />
      </div>
    </div>
  );
};
