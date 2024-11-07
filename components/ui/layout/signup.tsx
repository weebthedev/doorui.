'use client'

import { useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { toast, Toaster } from 'sonner'
import { Check, Eye, EyeOff, X } from "lucide-react"

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type SignupFormData = z.infer<typeof signupSchema>

export default function SignupForm() {
  const [error, setError] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const router = useRouter()
  const { register, handleSubmit, formState: { errors }, watch } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  const password = watch('password', '')

  const toggleVisibility = () => setIsVisible((prevState) => !prevState)

  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[0-9]/, text: "At least 1 number" },
      { regex: /[a-z]/, text: "At least 1 lowercase letter" },
      { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
    ]

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }))
  }

  const strength = checkStrength(password)

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length
  }, [strength])

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-border"
    if (score <= 1) return "bg-red-500"
    if (score <= 2) return "bg-orange-500"
    if (score === 3) return "bg-amber-500"
    return "bg-emerald-500"
  }

  const getStrengthText = (score: number) => {
    if (score === 0) return "Enter a password"
    if (score <= 2) return "Weak password"
    if (score === 3) return "Medium password"
    return "Strong password"
  }

  const onSubmit = async (data: SignupFormData) => {
    const missingRequirements = strength.filter(req => !req.met).map(req => req.text);

    if (missingRequirements.length > 0) {
      toast.error(`Failed: Missing requirements`, {
        description: (
          <ul className="list-disc pl-4">
            {missingRequirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        ),
        duration: 5000,
      });
      return;
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Account created successfully! Redirecting in 3 seconds...');
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'An error occurred during signup');
      }
    } catch (err) {
      setError('An error occurred during signup');
    }
  }

  return (
    <div className="min-h-screen p-4">
      <Toaster />
      <div className="w-full sm:w-96 mt-[5rem]">
        <div className="mb-4">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-sm text-muted-foreground">
            Create an account to get started
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              {...register('name')}
            />
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register('email')}
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                className="pe-9"
                placeholder="Password"
                type={isVisible ? "text" : "password"}
                {...register('password')}
                aria-invalid={strengthScore < 4}
                aria-describedby="password-strength"
              />
              <button
                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 transition-shadow hover:text-foreground focus-visible:border focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                type="button"
                onClick={toggleVisibility}
                aria-label={isVisible ? "Hide password" : "Show password"}
                aria-pressed={isVisible}
                aria-controls="password"
              >
                {isVisible ? (
                  <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
                ) : (
                  <Eye size={16} strokeWidth={2} aria-hidden="true" />
                )}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
          </div>
          
          {/* Password strength indicator */}
          <div
            className="mb-4 mt-3 h-1 w-full overflow-hidden rounded-full bg-border"
            role="progressbar"
            aria-valuenow={strengthScore}
            aria-valuemin={0}
            aria-valuemax={4}
            aria-label="Password strength"
          >
            <div
              className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
              style={{ width: `${(strengthScore / 4) * 100}%` }}
            ></div>
          </div>

          {/* Password strength description */}
          <p id="password-strength" className="mb-2 text-sm font-medium text-foreground">
            {getStrengthText(strengthScore)}. Must contain:
          </p>

          {/* Password requirements list */}
          <ul className="space-y-1.5" aria-label="Password requirements">
            {strength.map((req, index) => (
              <li key={index} className="flex items-center gap-2">
                {req.met ? (
                  <Check size={16} className="text-emerald-500" aria-hidden="true" />
                ) : (
                  <X size={16} className="text-muted-foreground/80" aria-hidden="true" />
                )}
                <span className={`text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"}`}>
                  {req.text}
                  <span className="sr-only">
                    {req.met ? " - Requirement met" : " - Requirement not met"}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}