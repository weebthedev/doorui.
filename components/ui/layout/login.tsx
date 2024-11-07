'use client'

import { useState } from 'react'
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

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const { token } = await response.json()
        localStorage.setItem('authToken', token)
        toast.success('Logged in successfully! Redirecting in 3 seconds...')
        setTimeout(() => {
          router.push('/dashboard')
        }, 3000)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'An error occurred during login')
      }
    } catch (err) {
      setError('An error occurred during login')
    }
  }

  return (
    <div className="min-h-screen p-4">
      <Toaster />
      <div className="w-full sm:w-96 mt-[7rem]">
        <div className="mb-4">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="text-xs text-muted-foreground underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              {...register('password')}
            />
            {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}