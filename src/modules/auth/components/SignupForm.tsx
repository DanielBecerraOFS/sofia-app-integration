
// SignupForm.tsx
import React from "react"
import { Button } from "@/shared/components/ui/button" 
import { Input } from "@/shared/components/ui/Input"
import { Label } from "@/shared/components/ui/label"
import { PasswordInput } from "./PasswordInput"

interface SignupFormProps {
  name: string
  setName: (name: string) => void
  email: string
  setEmail: (email: string) => void
  password: string
  setPassword: (password: string) => void
  confirmPassword: string
  setConfirmPassword: (confirmPassword: string) => void
  handleSubmit: (e: React.FormEvent) => void
  disabled: boolean
}

export function SignupForm({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  handleSubmit,
  disabled
}: SignupFormProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium text-on-primary">
          Full Name
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={disabled}
          className="text-on-primary rounded-md border border-on-primary focus:border-primary focus:border-2 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="signup-email" className="text-sm font-medium text-on-primary">
          Email
        </Label>
        <Input
          id="signup-email"
          type="email"
          placeholder="name@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={disabled}
          className="text-on-primary rounded-md border border-on-primary focus:border-primary focus:border-2 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
      
      <PasswordInput
        id="signup-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={disabled}
        showConfirmation={true}
        confirmValue={confirmPassword}
        onConfirmChange={(e) => setConfirmPassword(e.target.value)}
      />
      
      <Button
        type="submit"
        className="w-full rounded-md bg-[#FEEAA0] text-gray-700 border-primary border-2 font-medium py-2 shadow-md transition-all duration-300 hover:bg-[#FDDC70] hover:shadow-lg focus:ring-2 focus:ring-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={disabled}
      >
        Create Account
      </Button>
    </form>
  )
}