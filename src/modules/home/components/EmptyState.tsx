import React from "react";
import { Box, PlusCircle, Zap } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import OverviewIcon from "@/assets/icons/overview-icon";

interface ProductCardProps {
  icon: React.ReactNode;
  title: string;
  color: string;
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const EmptyState: React.FC = () => {
  return (
    <div className="py-8 px-4 sm:px-6">
      <Card className="max-w-3xl mx-auto p-6 sm:p-8 rounded-none border-none">
        <div className="flex flex-col items-center text-center">
          {/* SVG Illustration */}
          <div className="mb-6 w-48 h-48 relative">
            <OverviewIcon />
          </div>

          <h2 className="text-5xl font-bold mb-2 font-title">
            Start to grow your business with a workflow optimization
          </h2>
          <p className="text-on-surface-variant max-w-md mb-8">
            Add your first product to begin optimizing workflows, reducing
            costs, and gaining insights through AI-powered process analysis.
          </p>

          <div className="grid gap-6 w-full max-w-lg">
            <Button className="bg-primary text-on-primary-container border-1 border-dashed border-on-primary-container w-full h-12 hover:bg-primary/50">
              <PlusCircle className="mr-2 h-5 w-5" />
              Integrate a uses case
            </Button>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <ProductCard
                icon={<FileTextIcon />}
                title="Free Text Analysis"
                color="primary"
              />
              <ProductCard
                icon={<DocumentScanIcon />}
                title="Duplicated Invoice"
                color="secondary"
              />
              <ProductCard
                icon={<ProcessIcon />}
                title="Process Mining"
                color="tertiary-container"
              />
            </div>

            <Button
              variant="link"
              className="text-primary hover:text-primary-container"
            >
              Learn more about our products
            </Button>
          </div>
        </div>
      </Card>

      <div className="mt-10 max-w-3xl mx-auto">
        <h3 className="text-on-surface font-semibold mb-4">
          Why choose SOFIA?
        </h3>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          <FeatureCard
            icon={<Zap className="h-5 w-5" />}
            title="Increase Efficiency"
            description="Identify and eliminate bottlenecks in your processes"
          />
          <FeatureCard
            icon={<Box className="h-5 w-5" />}
            title="Reduce Costs"
            description="Save money by detecting duplicated invoices and inefficiencies"
          />
          <FeatureCard
            icon={<LightbulbIcon />}
            title="AI-Powered Insights"
            description="Get actionable recommendations to optimize operations"
          />
        </div>
      </div>
    </div>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({ icon, title, color }) => {
  return (
    <div
      className={`flex flex-col items-center p-4 rounded-lg border border-outline-variant bg-surface-container hover:bg-${color}/10 hover:border-${color} transition-colors cursor-pointer`}
    >
      <div className={`text-${color} mb-2`}>{icon}</div>
      <span className="text-sm font-medium text-on-surface text-center">
        {title}
      </span>
    </div>
  );
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="p-4 rounded-lg bg-surface-container border border-outline-variant">
      <div className="text-primary mb-2">{icon}</div>
      <h4 className="text-sm font-medium text-on-surface mb-1">{title}</h4>
      <p className="text-xs text-on-surface-variant">{description}</p>
    </div>
  );
};

// Custom SVG icons
const FileTextIcon: React.FC = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 2V8H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 13H8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 17H8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 9H9H8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const DocumentScanIcon: React.FC = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 3V7C14 7.26522 14.1054 7.51957 14.2929 7.70711C14.4804 7.89464 14.7348 8 15 8H19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 8V3C5 2.73478 5.10536 2.48043 5.29289 2.29289C5.48043 2.10536 5.73478 2 6 2H14L19 7V16C19 16.2652 18.8946 16.5196 18.7071 16.7071C18.5196 16.8946 18.2652 17 18 17H15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 21H5C4.73478 21 4.48043 20.8946 4.29289 20.7071C4.10536 20.5196 4 20.2652 4 20V9C4 8.73478 4.10536 8.48043 4.29289 8.29289C4.48043 8.10536 4.73478 8 5 8H6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="9"
        y="13"
        width="6"
        height="8"
        rx="1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="10"
        y1="17"
        x2="14"
        y2="17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const ProcessIcon: React.FC = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 12H18L15 21L9 3L6 12H2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const LightbulbIcon: React.FC = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 18H15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 22H14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 2V3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15C8.68629 15 6 12.3137 6 9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9C18 10.3834 17.5892 11.6612 16.8907 12.6923C16.5479 13.1898 16.2329 13.7162 16.0507 14.2776C15.9476 14.603 15.8553 15.0276 15 15H12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
