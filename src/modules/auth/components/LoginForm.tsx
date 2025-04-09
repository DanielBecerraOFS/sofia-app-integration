
// LoginForm.tsx
import React from "react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/Input"
import { Label } from "@/shared/components/ui/label"
import { Checkbox } from "@/shared/components/ui/checkbox"
import { PasswordInput } from "./PasswordInput"

interface LoginFormProps {
  email: string
  setEmail: (email: string) => void
  password: string
  setPassword: (password: string) => void
  rememberMe: boolean
  setRememberMe: (remember: boolean) => void
  handleSubmit: (e: React.FormEvent) => void
  disabled: boolean
}

export function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  rememberMe,
  setRememberMe,
  handleSubmit,
  disabled
}: LoginFormProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-on-primary">
          Email
        </Label>
        <Input
          id="email"
          placeholder="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={disabled}
          className="text-on-primary rounded-md border border-on-primary focus:border-primary focus:border-2 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
      
      <PasswordInput
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        showForgotPassword={true}
        disabled={disabled}
      />
      
      <div className="flex items-center space-x-2">
        <Checkbox
          id="remember"
          checked={rememberMe}
          onCheckedChange={(checked) => setRememberMe(checked as boolean)}
          disabled={disabled}
          className=""
        />
        <Label
          htmlFor="remember"
          className="text-sm font-medium text-gray-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Remember me
        </Label>
      </div>
      
      <Button
        type="submit"
        className="w-full rounded-md bg-[#FEEAA0] text-gray-700 border-primary border-2 font-medium py-2 shadow-md transition-all duration-300 hover:bg-[#FDDC70] hover:shadow-lg focus:ring-2 focus:ring-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={disabled}
      >
        Sign in
      </Button>
    </form>
  )
}