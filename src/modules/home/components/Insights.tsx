import React from "react"
import { Lightbulb, TrendingUp, AlertTriangle, ArrowRight } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"

interface InsightCardProps {
  title: string
  description: string
  icon: React.ReactNode
  color: string
  actionUrl: string
}

export const Insights: React.FC = () => {
  return (
    <Card className="w-full border-none rounded-none">
      <CardHeader className="p-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-on-surface">SOFIA RECOMENDATIONS</CardTitle>
          <Button variant="link" className="text-secondary">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 overflow-auto">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <InsightCard 
            title="Process Optimization" 
            description="Order processing time could be reduced by 23% by optimizing approval workflows."
            icon={<Lightbulb className="h-5 w-5" />}
            color="primary"
            actionUrl="/insights/process-optimization"
          />
          
          <InsightCard 
            title="Efficiency Gain" 
            description="Automated document verification could save 12 hours per week."
            icon={<TrendingUp className="h-5 w-5" />}
            color="tertiary-container"
            actionUrl="/insights/efficiency-gain"
          />
          
          <InsightCard 
            title="Risk Alert" 
            description="Potential compliance risk detected in invoice approval process."
            icon={<AlertTriangle className="h-5 w-5" />}
            color="secondary"
            actionUrl="/insights/risk-alert"
          />
        </div>
      </CardContent>
    </Card>
  )
}

const InsightCard: React.FC<InsightCardProps> = ({ 
  title, 
  description, 
  icon, 
  color, 
  actionUrl 
}) => {
  return (
    <div className={`rounded-md border border-primary bg-${color}/10 p-4 hover:shadow-sm transition-shadow text-start`}>
      <div className="flex items-start space-x-2 mb-2">
        <span className={`mt-0.5 text-${color}`}>{icon}</span>
        <h3 className={`font-semibold text-${color}`}>{title}</h3>
      </div>
      <p className="mt-2 text-sm text-on-surface-variant mb-4">{description}</p>
      <Button 
        variant="link" 
        className={`text-${color} p-0 h-auto flex items-center text-sm`}
        asChild
        size="sm"
      >
        <a href={actionUrl}>
          Learn more
          <ArrowRight className="ml-1 h-3 w-3" />
        </a>
      </Button>
    </div>
  )
}