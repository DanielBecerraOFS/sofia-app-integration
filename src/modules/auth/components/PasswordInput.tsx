
import React, { useState } from "react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/Input"
import { Label } from "@/shared/components/ui/label"
import { EyeIcon, EyeOffIcon } from "lucide-react"

interface PasswordInputProps {
  id: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  showForgotPassword?: boolean
  label?: string
  disabled?: boolean
  required?: boolean
  showConfirmation?: boolean
  confirmValue?: string
  onConfirmChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function PasswordInput({
  id,
  value,
  onChange,
  showForgotPassword = false,
  label = "Password",
  disabled = false,
  required = true,
  showConfirmation = false,
  confirmValue = "",
  onConfirmChange
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor={id} className="text-sm font-medium text-on-primary">
            {label}
          </Label>
          {showForgotPassword && (
            <a href="#" className="text-xs font-medium text-primary hover:text-gray-300 transition-colors">
              Forgot password?
            </a>
          )}
        </div>
        <div className="relative">
          <Input
            id={id}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            className="text-on-primary rounded-md border border-on-primary focus:border-primary focus:border-2 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 text-primary hover:text-gray-300 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            disabled={disabled}
          >
            {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
          </Button>
        </div>
      </div>

      {showConfirmation && onConfirmChange && (
        <div className="space-y-2">
          <Label htmlFor="confirm-password" className="text-sm font-medium text-on-primary">
            Confirm Password
          </Label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="••••••••"
            value={confirmValue}
            onChange={onConfirmChange}
            required={required}
            disabled={disabled}
            className="text-on-primary rounded-md border border-on-primary focus:border-primary focus:border-2 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      )}
    </>
  )
}