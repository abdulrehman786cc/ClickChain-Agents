"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function SignUpPage() {
  const handleCardClick = (flowType: string) => {
    if (flowType === "talentflow") {
      window.location.href = "/noah"
    } else if (flowType === "payflow") {
      window.location.href = "/emma"
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#111A26" }}>
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Choose Your Journey</h1>
          <p className="text-gray-300">Select the flow that best fits your needs</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* TalentFlow Card */}
          <Card
            className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: "#1F2937" }}
            onClick={() => handleCardClick("talentflow")}
          >
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <CardTitle className="text-white text-xl">TalentFlow</CardTitle>
              <CardDescription className="text-gray-300">
                Hire with confidence, aligned to your culture
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pt-0">
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  handleCardClick("talentflow")
                }}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* PayFlow Card */}
          <Card
            className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: "#1F2937" }}
            onClick={() => handleCardClick("payflow")}
          >
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <CardTitle className="text-white text-xl">PayFlow</CardTitle>
              <CardDescription className="text-gray-300">
                Take the pain out of payroll and invoices
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pt-0">
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  handleCardClick("payflow")
                }}
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
