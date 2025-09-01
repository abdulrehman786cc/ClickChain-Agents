"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Home, Users, FileText, Cpu, GraduationCap, Bell, ChevronLeft, ChevronRight, List } from "lucide-react"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  isMobile?: boolean
}

export function Sidebar({ activeTab, setActiveTab, collapsed, setCollapsed, isMobile = false }: SidebarProps) {
  const navItems = [
    { id: "dashboard", label: "Dashboard Home", icon: Home },
    { id: "candidate-flow", label: "Candidate Flow", icon: Users, badge: 12 },
    { id: "agent-logs", label: "Agent Logs", icon: List },
    { id: "agent-widgets", label: "Agent Widgets", icon: Cpu },
    { id: "training-console", label: "Training Console", icon: GraduationCap },
  ]

  // Handle mobile sidebar behavior
  const handleTabClick = (tabId: string, external?: string) => {
  if (external) {
    if (window.top) {
      window.top.location.href = external; // ensures top-level navigation
    }
    return;
  }
  setActiveTab(tabId);
  if (isMobile) setCollapsed(true);
};


  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobile && !collapsed) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobile, collapsed])

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && !collapsed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setCollapsed(true)} />
      )}

      {/* Sidebar */}
      <div
        className={`${
          isMobile
            ? `fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ${
                collapsed ? "-translate-x-full" : "translate-x-0"
              }`
            : `${collapsed ? "w-16" : "w-64"} transition-all duration-300 relative`
        } bg-gray-900 border-r border-gray-700 flex flex-col`}
      >
        {/* Desktop Collapse Toggle Button */}
        {!isMobile && (
          <Button
            onClick={() => setCollapsed(!collapsed)}
            variant="ghost"
            size="sm"
            className="absolute -right-3 top-6 z-10 bg-gray-800 border border-gray-600 hover:bg-gray-700 text-gray-300 hover:text-white w-6 h-6 p-0 rounded-full"
          >
            {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
          </Button>
        )}

        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-talent-accent rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            {(!collapsed || isMobile) && (
              <div>
                <h1 className="text-lg font-semibold text-gray-100">TalentFlow</h1>
                <p className="text-xs text-gray-400">
                  Powered by{" "}
                  <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (window.top) {
                      window.top.location.href = "https://clickchain.ai/";
                    }
                  }}
                  className="hover:text-talent-accent transition-colors text-[#0583E5]"
                >
                  ClickChain.ai
                </a>

                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
         <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center ${
                    collapsed && !isMobile ? "justify-center" : "space-x-3"
                  } px-3 py-2 rounded-lg text-left transition-colors group relative ${
                    activeTab === item.id
                      ? "bg-talent-accent text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-gray-100"
                  }`}
                  title={collapsed && !isMobile ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {(!collapsed || isMobile) && (
                    <span className="flex-1 text-sm font-medium">{item.label}</span>
                  )}
                </button>
              </li>
            );
          })}

          {/* NEW Resume Analyzer Button */}
          <li>
            <button
              onClick={() => window.top.location.href = "https://clickchain.ai/talentacquisition/talentflow/insights-agent/"}
              className={`w-full flex items-center ${
                collapsed && !isMobile ? "justify-center" : "space-x-3"
              } px-3 py-2 rounded-lg text-left transition-colors group relative text-gray-300 hover:bg-gray-800 hover:text-gray-100`}
              title={collapsed && !isMobile ? "Resume Analyzer" : undefined}
            >
              <FileText className="w-5 h-5 flex-shrink-0" />
              {(!collapsed || isMobile) && (
                <span className="flex-1 text-sm font-medium">Resume Analyzer</span>
              )}
            </button>
          </li>
        </ul>

        </nav>

        {/* Notification Area */}
        <div className="p-4 border-t border-gray-700">
          <div
            className={`flex items-center ${
              collapsed && !isMobile ? "justify-center" : "space-x-2"
            } text-sm text-gray-400 group relative`}
          >
            <Bell className="w-4 h-4 flex-shrink-0" />
            {(!collapsed || isMobile) && <span>12 pending actions</span>}

            {/* Tooltip for collapsed desktop state */}
            {collapsed && !isMobile && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-gray-100 text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                12 pending actions
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
