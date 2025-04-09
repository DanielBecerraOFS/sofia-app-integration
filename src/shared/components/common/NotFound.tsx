
import React from "react"
import { Search, ArrowLeft, Home, HelpCircle } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/Input"

interface NotFoundProps {
  title?: string
  message?: string
  showSearch?: boolean
}

export const NotFound: React.FC<NotFoundProps> = ({
  title = "Page not found",
  message = "The page or resource you're looking for doesn't exist or has been moved.",
  showSearch = true
}) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-xl flex flex-col items-center">
        {/* Illustration */}
        <div className="mb-8 relative w-64 h-64">
          <NotFoundIllustration />
        </div>
        
        <h1 className="text-3xl font-bold text-on-surface mb-2 text-center">{title}</h1>
        <p className="text-on-surface-variant text-center mb-8 max-w-md">{message}</p>
        
        {showSearch && (
          <div className="w-full mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant" />
              <Input 
                type="search" 
                placeholder="Search for resources or pages..." 
                className="w-full pl-10 bg-surface-container border-outline-variant" 
              />
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
          <SuggestionCard
            icon={<Home className="h-5 w-5" />}
            title="Return to Dashboard"
            description="Go back to the main dashboard"
            link="/"
            color="primary"
          />
          <SuggestionCard
            icon={<HelpCircle className="h-5 w-5" />}
            title="Need Help?"
            description="Contact our support team"
            link="/support"
            color="tertiary-container"
          />
        </div>
        
        <Button 
          variant="ghost" 
          className="text-on-surface-variant flex items-center"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go back to previous page
        </Button>
      </div>
    </div>
  )
}

interface SuggestionCardProps {
  icon: React.ReactNode
  title: string
  description: string
  link: string
  color: 'primary' | 'secondary' | 'tertiary-container'
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({ 
  icon, 
  title, 
  description, 
  color
}) => {
  return (
    <div className="w-full">
      <div className={`bg-surface-container hover:bg-${color}/10 border border-outline-variant hover:border-${color} rounded-lg p-4 transition-colors duration-200 h-full`}>
        <div className="flex items-start">
          <div className={`mr-3 text-${color}`}>
            {icon}
          </div>
          <div>
            <h3 className="font-medium text-on-surface mb-1">{title}</h3>
            <p className="text-sm text-on-surface-variant">{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const NotFoundIllustration: React.FC = () => {
  return (
    <svg
      viewBox="0 0 500 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Background elements */}
      <circle cx="250" cy="200" r="120" fill="var(--surface-container-low)" opacity="0.6" />
      <circle cx="250" cy="200" r="80" fill="var(--surface-container)" opacity="0.8" />
      
      {/* 404 text */}
      <path d="M155 210L155 140L215 140L215 160L185 160L185 170L205 170L205 190L185 190L185 210L155 210Z" fill="var(--primary)" />
      <circle cx="250" cy="175" r="40" fill="var(--primary)" />
      <path d="M250 140C231.775 140 217 154.775 217 173C217 191.225 231.775 206 250 206C268.225 206 283 191.225 283 173C283 154.775 268.225 140 250 140ZM250 180C247.791 180 246 178.209 246 176C246 173.791 247.791 172 250 172C252.209 172 254 173.791 254 176C254 178.209 252.209 180 250 180Z" fill="var(--surface-container-highest)" />
      <path d="M345 210L345 140L315 140L315 170L335 170L335 190L315 190L315 210L285 210L285 140L345 140L345 160L315 160L315 140L345 140Z" fill="var(--primary)" />

      {/* Confused document character */}
      <rect x="220" y="250" width="60" height="80" rx="3" fill="var(--surface-container-high)" />
      <rect x="230" y="260" width="40" height="4" rx="2" fill="var(--outline-variant)" />
      <rect x="230" y="270" width="40" height="4" rx="2" fill="var(--outline-variant)" />
      <rect x="230" y="280" width="20" height="4" rx="2" fill="var(--outline-variant)" />
      
      {/* Confused expression */}
      <circle cx="240" cy="300" r="5" fill="var(--on-surface)" />
      <circle cx="260" cy="300" r="5" fill="var(--on-surface)" />
      <path d="M240 320C240 320 245 310 260 320" stroke="var(--on-surface)" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Question marks */}
      <path d="M190 260C190 254.477 194.477 250 200 250C205.523 250 210 254.477 210 260C210 265.523 205.523 270 200 270V278" stroke="var(--secondary)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="200" cy="290" r="4" fill="var(--secondary)" />
      
      <path d="M290 260C290 254.477 294.477 250 300 250C305.523 250 310 254.477 310 260C310 265.523 305.523 270 300 270V278" stroke="var(--tertiary-container)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="300" cy="290" r="4" fill="var(--tertiary-container)" />
      
      {/* Bottom decorative elements */}
      <path d="M150 340H350" stroke="var(--outline-variant)" strokeWidth="2" strokeDasharray="6 6" />
      <circle cx="150" cy="340" r="6" fill="var(--primary)" />
      <circle cx="350" cy="340" r="6" fill="var(--primary)" />
    </svg>
  )
}

export default NotFound