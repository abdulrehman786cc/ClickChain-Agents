"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface FormData {
    firstName: string
    lastName: string
    email: string
    flowType: string
}

interface FormErrors {
    firstName?: string
    lastName?: string
    email?: string
}

interface SignupFormProps {
    flowType: string
    title: string
    description: string
    buttonText: string
    redirectUrl: string
}

// Helper function to get flow name for display
const getFlowDisplayName = (flowType: string): string => {
    switch (flowType) {
        case "talentflow":
            return "TalentFlow"
        case "payflow":
            return "PayFlow"
        default:
            return "ClickChain"
    }
}

export default function SignupForm({ flowType, title, description, buttonText, redirectUrl }: SignupFormProps) {
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        flowType,
    })
    const [errors, setErrors] = useState<FormErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [hasSubmittedBefore, setHasSubmittedBefore] = useState(false)
    const { toast } = useToast()

    // Check if user has submitted this flow before
    React.useEffect(() => {
        try {
            const storageKey = `signup_${flowType}_submitted`
            const hasSubmitted = localStorage.getItem(storageKey)
            if (hasSubmitted) {
                setHasSubmittedBefore(true)
            }
        } catch (error) {
            console.log('Could not access localStorage:', error)
        }
    }, [flowType])

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}

        // First name validation
        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required"
        } else if (formData.firstName.trim().length < 2) {
            newErrors.firstName = "First name must be at least 2 characters"
        }

        // Last name validation
        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required"
        } else if (formData.lastName.trim().length < 2) {
            newErrors.lastName = "Last name must be at least 2 characters"
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            toast({
                title: "Validation Error",
                description: "Please fix the errors below",
                variant: "destructive",
            })
            return
        }

        setIsSubmitting(true)

        try {
            const response = await fetch("/api/submit-signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                // Save to localStorage that user has submitted this flow
                try {
                    const storageKey = `signup_${flowType}_submitted`
                    localStorage.setItem(storageKey, 'true')
                } catch (error) {
                    console.log('Could not save to localStorage:', error)
                }

                toast({
                    title: "Success!",
                    description: "Your information has been submitted successfully",
                })

                // Add a small delay before redirect to show the loading state
                setTimeout(() => {
                    window.location.href = redirectUrl
                }, 1500)
            } else {
                throw new Error("Failed to submit form")
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to submit your information. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleSkip = () => {
        // Save to localStorage that user has skipped this flow
        try {
            const storageKey = `signup_${flowType}_submitted`
            localStorage.setItem(storageKey, 'true')
        } catch (error) {
            console.log('Could not save to localStorage:', error)
        }

        // Redirect immediately
        window.location.href = redirectUrl
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#111A26" }}>
            <Card className="w-full max-w-2xl" style={{ backgroundColor: "#1F2937" }}>
                <CardHeader className="text-center">
                    <CardTitle className="text-white">{title}</CardTitle>
                    <CardDescription className="text-gray-300">{description}</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Character at top for mobile/tablet */}
                    <div className="flex lg:hidden justify-center mb-6">
                        <img
                            src={flowType === "talentflow" ? "/Noah.svg" : "/Emma.svg"}
                            alt={flowType === "talentflow" ? "Noah - TalentFlow Character" : "Emma - PayFlow Character"}
                            className="w-32 h-44 sm:w-36 sm:h-48 object-contain"
                        />
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Form Section */}
                        <div className="flex-1">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName" className="text-white">
                                        First Name
                                    </Label>
                                    <Input
                                        id="firstName"
                                        type="text"
                                        value={formData.firstName}
                                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
                                        placeholder="Enter your first name"
                                    />
                                    {errors.firstName && <p className="text-sm text-red-400">{errors.firstName}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="lastName" className="text-white">
                                        Last Name
                                    </Label>
                                    <Input
                                        id="lastName"
                                        type="text"
                                        value={formData.lastName}
                                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
                                        placeholder="Enter your last name"
                                    />
                                    {errors.lastName && <p className="text-sm text-red-400">{errors.lastName}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-white">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500"
                                        placeholder="Enter your email address"
                                    />
                                    {errors.email && <p className="text-sm text-red-400">{errors.email}</p>}
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Submitting..." : buttonText}
                                </Button>
                            </form>

                            {/* Skip option for returning users */}
                            {hasSubmittedBefore && (
                                <div className="mt-4 text-center">
                                    <button
                                        type="button"
                                        className="text-slate-400 text-xs hover:text-blue-300 underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                        onClick={handleSkip}
                                        disabled={isSubmitting}
                                    >
                                        Skip
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Character Section - Desktop only */}
                        <div className="hidden lg:flex items-center justify-center">
                            <img
                                src={flowType === "talentflow" ? "/Noah.svg" : "/Emma.svg"}
                                alt={flowType === "talentflow" ? "Noah - TalentFlow Character" : "Emma - PayFlow Character"}
                                className="w-40 h-56 xl:w-48 xl:h-64 2xl:w-56 2xl:h-72 object-contain"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
} 