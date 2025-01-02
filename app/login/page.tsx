'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SocialLoginButtons } from "@/components/social-login-buttons"
import { Separator } from "@/components/ui/separator"
import { Keyboard } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (data.success) {
      localStorage.setItem('isLoggedIn', 'true')
      router.push('/dashboard')
    } else {
      setError(data.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/10 via-background to-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <Keyboard className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Login to Type It!</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-destructive mt-2">{error}</p>}
            <Button type="submit" className="w-full">Login</Button>
          </form>
          <div className="mt-6">
            <Separator className="my-4" />
            <SocialLoginButtons />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button variant="link" asChild className="w-full">
            <Link href="/signup">Don&apos;t have an account? Sign up</Link>
          </Button>
          <Button variant="link" asChild className="w-full">
            <Link href="/forgot-password">Forgot your password?</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

