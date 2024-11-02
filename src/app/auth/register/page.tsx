'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Github, Waves } from "lucide-react"
import Image from 'next/image'
import Link from 'next/link'
import {baseUrl} from '../../../../config'

// Defining a type for form data to ensure type safety
interface RegistrationData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  // State management with type safety
  const [formData, setFormData] = useState<RegistrationData>({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  })

  // State for handling form submission errors
  const [error, setError] = useState<string | null>(null)

  // Using Next.js router for programmatic navigation
  const router = useRouter()

  // Centralized change handler with improved type safety
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Comprehensive form validation
  const validateForm = (): boolean => {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address')
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      return false
    }

    return true
  }

  // Async form submission handler
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    // Validate form before submission
    if (!validateForm()) return

    try {
      // Using async/await for cleaner promise handling
      const response = await axios.post(`${baseUrl}/register`, {
        email: formData.email,
        username: formData.username,
        password: formData.password
      })

      // Proper navigation after successful registration
      if (response.status === 201) {
        router.push('/auth/login')
      }
    } catch (err) {
      // Improved error handling
      setError(err instanceof Error 
        ? err.message 
        : 'Registration failed. Please try again.'
      )
    }
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="flex w-full lg:w-1/2 flex-col justify-center p-8">
        <div className="mx-auto w-full max-w-sm">
          <Waves className="h-12 w-12 text-primary mb-8" />
          <h2 className="text-3xl font-bold mb-2">Create Your Account</h2>
          
          {/* Error message display */}
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email"
                  placeholder="Enter your email" 
                  type="email" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Username Input */}
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  name="username"
                  placeholder="Choose a username" 
                  type="text" 
                  required 
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  name="password"
                  type="password" 
                  required 
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  name="confirmPassword"
                  type="password" 
                  required 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              {/* Checkbox and Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <label htmlFor="remember" className="text-sm text-muted-foreground">
                    Remember me
                  </label>
                </div>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button 
                className="w-full" 
                type="submit"
                disabled={!formData.email || !formData.password}
              >
                Sign Up
              </Button>
            </div>
          </form>

          {/* Social Login Options */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <Button variant="outline">
                <svg 
                  className="mr-2 h-4 w-4" 
                  fill="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" />
                </svg>
                Google
              </Button>
              <Button variant="outline">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Background Image */}
      <div className="hidden lg:block lg:w-1/2">
        <Image
          alt="Office desk with laptop and accessories"
          className="h-full w-full object-cover"
          height={1080}
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          style={{
            aspectRatio: "16/9",
            objectFit: "cover",
          }}
          width={1920}
        />
      </div>
    </div>
  )
}