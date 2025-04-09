
// FormToggle.tsx
import { cn } from "@/shared/lib/utils"

interface FormToggleProps {
  isLogin: boolean
  setIsLogin: (isLogin: boolean) => void
  isAnimating: boolean
}

export function FormToggle({ isLogin, setIsLogin, isAnimating }: FormToggleProps) {
  return (
    <div className="flex border-b border-primary">
      <button
        type="button"
        onClick={() => !isAnimating && setIsLogin(true)}
        className={cn(
          "cursor-pointer flex-1 py-2 text-sm font-medium transition-all duration-200",
          isLogin ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-gray-700",
        )}
      >
        Sign In
      </button>
      <button
        type="button"
        onClick={() => !isAnimating && setIsLogin(false)}
        className={cn(
          "cursor-pointer flex-1 py-2 text-sm font-medium transition-all duration-200",
          !isLogin ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-gray-700",
        )}
      >
        Sign Up
      </button>
    </div>
  )
}