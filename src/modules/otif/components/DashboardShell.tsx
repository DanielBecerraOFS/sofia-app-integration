import React, { ReactNode } from "react";

interface DashboardShellProps {
  children: ReactNode;
}

/**
 * Container component for the dashboard layout
 */
export const DashboardShell: React.FC<DashboardShellProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-surface-container-lowest">
      <div className="flex-1 space-y-6 p-4 md:p-6">
        <div className="mx-auto max-w-7xl space-y-6">{children}</div>
      </div>
    </div>
  );
};