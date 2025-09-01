"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components-talenflow/sidebar"
import { MobileHeader } from "@/components-talenflow/mobile-header"
import { DashboardHome } from "@/components-talenflow/dashboard-home"
import { CandidateFlow } from "@/components-talenflow/candidate-flow"
import { AgentLogs } from "@/components-talenflow/agent-logs"
import { AgentWidgets } from "@/components-talenflow/agent-widgets"
import { TrainingConsole } from "@/components-talenflow/training-console"
import SignupWrapper from "@/components/signup-wrapper"

export default function TalentFlowDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile and set sidebar state accordingly
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 // md breakpoint
      setIsMobile(mobile)
      // Hide sidebar by default on mobile
      if (mobile) {
        setSidebarCollapsed(true)
      }
    }

    // Check on mount
    checkMobile()

    // Add resize listener
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const getPageTitle = () => {
    switch (activeTab) {
      case "dashboard":
        return "Dashboard Home"
      case "candidate-flow":
        return "Candidate Flow"
      case "agent-logs":
        return "Agent Logs"
      case "agent-widgets":
        return "Agent Widgets"
      case "training-console":
        return "Training Console"
      default:
        return "Dashboard Home"
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardHome />
      case "candidate-flow":
        return <CandidateFlow />
      case "agent-logs":
        return <AgentLogs />
      case "agent-widgets":
        return <AgentWidgets />
      case "training-console":
        return <TrainingConsole />
      default:
        return <DashboardHome />
    }
  }

  return (
    <SignupWrapper agentType="noah">
      <div className="flex h-screen bg-talent-bg text-white overflow-hidden">

        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          isMobile={isMobile}
        />
        <main className="flex-1 overflow-auto transition-all duration-300 flex flex-col">
          {/* Mobile Header */}
          {isMobile && (
            <MobileHeader
              title={getPageTitle()}
              onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              isMenuOpen={!sidebarCollapsed}
            />
          )}

          {/* Main Content */}
          <div className={`flex-1 overflow-auto ${isMobile ? "pt-0" : ""}`}>{renderContent()}</div>
        </main>
      </div>
    </SignupWrapper>
  )
}
