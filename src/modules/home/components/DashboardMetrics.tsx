import React from "react"
import { TrendingUp, Activity, AlertTriangle, DollarSign } from "lucide-react"
import { Card, CardContent } from "@/shared/components/ui/card"

export const DashboardMetrics: React.FC = () => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard 
        title="Process Efficiency" 
        value="87%" 
        change="+12%" 
        description="Improved by 5% this week" 
        icon={<TrendingUp className="h-5 w-5" />}
        color="tertiary-container"
      />
      
      <MetricCard 
        title="Active Processes" 
        value="1,284" 
        status="Live" 
        description="23 new processes today" 
        icon={<Activity className="h-5 w-5" />}
        color="primary"
      />
      
      <MetricCard 
        title="Bottlenecks Identified" 
        value="7" 
        status="Alert" 
        description="3 critical issues found" 
        icon={<AlertTriangle className="h-5 w-5" />}
        color="secondary"
      />
      
      <MetricCard 
        title="Cost Savings" 
        value="$42.5K" 
        change="+8%" 
        description="Monthly projection" 
        icon={<DollarSign className="h-5 w-5" />}
        color="tertiary-container"
      />
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  color: string
  change?: string
  status?: string
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  status, 
  description, 
  icon, 
  color 
}) => {
  return (
    <Card className="rounded-md border-1 bg-on-primary border-primary hover:shadow-sm transition-shadow">
      <CardContent className="py-4 px-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center min-h-[50px]">
              <span className={`text-${color} mr-2`}>{icon}</span>
              <span className="text-sm font-medium text-on-surface-variant">{title}</span>
            </div>
            <div className="text-2xl font-bold text-on-surface">{value}</div>
            <p className="text-xs text-on-surface-variant">{description}</p>
          </div>
          {change && (
            <span className={`px-2 py-1 text-xs font-medium bg-${color}/10 text-${color} rounded-full`}>
              {change}
            </span>
          )}
          {status && (
            <span className={`px-2 py-1 text-xs font-medium bg-${color}/10 text-${color} rounded-full`}>
              {status}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}