"use client"

import { useState, useEffect } from "react"
import SignupForm from "./signup-form"
import { getSignupConfig } from "@/lib/signup-config"

interface SignupWrapperProps {
    agentType: string
    children: React.ReactNode
    signupEnabled?: boolean
    signupConfig?: {
        title: string
        description: string
        buttonText: string
        characterImage?: string
        characterAlt?: string
    }
}

export default function SignupWrapper({
    agentType,
    children,
    signupEnabled,
    signupConfig
}: SignupWrapperProps) {
    const [hasCompletedSignup, setHasCompletedSignup] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // Get signup configuration from the config file
    const defaultConfig = getSignupConfig(agentType)
    const isSignupEnabled = signupEnabled !== undefined ? signupEnabled : defaultConfig.enabled

    useEffect(() => {
        // Check if signup is enabled
        if (!isSignupEnabled) {
            setHasCompletedSignup(true)
            setIsLoading(false)
            return
        }

        // Add a small delay to ensure localStorage is available after redirect
        const checkSignupStatus = () => {
            // Check if user has already completed signup for this agent
            try {
                // Use the same storage key format as the SignupForm
                const storageKey = `signup_${agentType}_submitted`
                const hasSubmitted = localStorage.getItem(storageKey)
                if (hasSubmitted) {
                    setHasCompletedSignup(true)
                }
            } catch (error) {
                console.log('Could not access localStorage:', error)
            }
            setIsLoading(false)
        }

        // Check immediately and also after a small delay to handle redirect timing
        checkSignupStatus()
        const timeoutId = setTimeout(checkSignupStatus, 100)

        return () => clearTimeout(timeoutId)
    }, [agentType, isSignupEnabled])

    // Use provided config or default config
    const config = signupConfig || {
        title: defaultConfig.title,
        description: defaultConfig.description,
        buttonText: defaultConfig.buttonText,
        characterImage: defaultConfig.characterImage,
        characterAlt: defaultConfig.characterAlt
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#111A26" }}>
                <div className="text-white">Loading...</div>
            </div>
        )
    }

    if (!hasCompletedSignup && isSignupEnabled) {
        return (
            <SignupForm
                flowType={agentType}
                title={config.title}
                description={config.description}
                buttonText={config.buttonText}
                redirectUrl={`/${agentType}`}
                characterImage={config.characterImage}
                characterAlt={config.characterAlt}
            />
        )
    }

    return <>{children}</>
} 