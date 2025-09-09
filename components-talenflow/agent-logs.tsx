"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AgentLogDetailModal } from "@/components-talenflow/agent-log-detail-modal"
import { Search, Filter, Download, Clock, CheckCircle, AlertTriangle, XCircle } from "lucide-react"

interface LogEntry {
  id: string
  timestamp: string
  agent: string
  candidate: string
  action: string
  status: "success" | "warning" | "error" | "processing"
  details: string
  duration: string
}

export function AgentLogs() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAgent, setSelectedAgent] = useState("all")
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  const logs: LogEntry[] = [
    {
      id: "1",
      timestamp: "2024-01-15 14:32:15",
      agent: "Intake Agent",
      candidate: "Sarah Chen",
      action: "Resume processed and skills extracted",
      status: "success",
      details: "Successfully parsed resume with 95% confidence, extracted 12 technical skills",
      duration: "2.3s",
    },
    {
      id: "2",
      timestamp: "2024-01-15 14:28:42",
      agent: "Insight Agent",
      candidate: "Marcus Johnson",
      action: "Pattern analysis completed",
      status: "warning",
      details: "Detected potential bias in evaluation - flagged for human review",
      duration: "1.8s",
    },
    {
      id: "3",
      timestamp: "2024-01-15 14:25:18",
      agent: "Recommender Agent",
      candidate: "Elena Rodriguez",
      action: "Final recommendation generated",
      status: "success",
      details: "Strong hire recommendation with 94% confidence score",
      duration: "3.1s",
    },
    {
      id: "4",
      timestamp: "2024-01-15 14:22:05",
      agent: "Interviewer Agent",
      candidate: "David Kim",
      action: "Interview scheduled and questions prepared",
      status: "success",
      details: "Technical interview scheduled for tomorrow 2PM, 8 questions prepared",
      duration: "0.9s",
    },
    {
      id: "5",
      timestamp: "2024-01-15 14:18:33",
      agent: "Human-in-Loop",
      candidate: "Lisa Wang",
      action: "Edge case escalation",
      status: "error",
      details: "Conflicting assessment scores - requires human intervention",
      duration: "1.2s",
    },
    {
      id: "6",
      timestamp: "2024-01-15 14:15:47",
      agent: "Learning Insights",
      candidate: "Alex Thompson",
      action: "Model updated with feedback",
      status: "success",
      details: "Incorporated hiring outcome to improve future predictions",
      duration: "4.2s",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      case "error":
        return <XCircle className="w-4 h-4 text-red-400" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-600 text-white text-xs sm:text-sm">Success</Badge>
      case "warning":
        return <Badge className="bg-yellow-600 text-white text-xs sm:text-sm">Warning</Badge>
      case "error":
        return <Badge className="bg-red-600 text-white text-xs sm:text-sm">Error</Badge>
      default:
        return (
          <Badge variant="secondary" className="bg-gray-600 text-white text-xs sm:text-sm">
            Processing
          </Badge>
        )
    }
  }

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.candidate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesAgent = selectedAgent === "all" || log.agent === selectedAgent
    return matchesSearch && matchesAgent
  })

  const handleViewDetails = (log: LogEntry) => {
    setSelectedLog(log)
    setIsDetailModalOpen(true)
  }

  return (
    <div className="p-3 sm:p-4 lg:p-6">
      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-100">Agent Logs</h1>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="border-gray-600 text-gray-300 bg-transparent hover:text-gray-100 hover:bg-gray-700"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button
            variant="outline"
            className="border-gray-600 text-gray-300 bg-transparent hover:text-gray-100 hover:bg-gray-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Mobile Action Buttons */}
      <div className="flex md:hidden space-x-2 mb-4">
        <Button
          variant="outline"
          className="border-gray-600 text-gray-300 bg-transparent hover:text-gray-100 hover:bg-gray-700 flex-1 h-10 text-sm"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
        <Button
          variant="outline"
          className="border-gray-600 text-gray-300 bg-transparent hover:text-gray-100 hover:bg-gray-700 flex-1 h-10 text-sm"
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Search and Filter Controls */}
      <Card className="bg-gray-800 border-gray-700 mb-4 sm:mb-6 !py-0 !gap-0">
        <CardContent className="p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search logs by candidate or action..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-600 text-gray-100 placeholder-gray-400 h-9 sm:h-10 text-sm"
              />
            </div>
            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
              <SelectTrigger className="w-full sm:w-48 bg-gray-900 border-gray-600 text-gray-100 h-9 sm:h-10 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="all" className="text-gray-100 text-sm">
                  All Agents
                </SelectItem>
                <SelectItem value="Intake Agent" className="text-gray-100 text-sm">
                  Intake Agent
                </SelectItem>
                <SelectItem value="Insight Agent" className="text-gray-100 text-sm">
                  Insight Agent
                </SelectItem>
                <SelectItem value="Interviewer Agent" className="text-gray-100 text-sm">
                  Interviewer Agent
                </SelectItem>
                <SelectItem value="Human-in-Loop" className="text-gray-100 text-sm">
                  Human-in-Loop
                </SelectItem>
                <SelectItem value="Learning Insights" className="text-gray-100 text-sm">
                  Learning Insights
                </SelectItem>
                <SelectItem value="Recommender Agent" className="text-gray-100 text-sm">
                  Recommender Agent
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Logs Timeline */}
      <Card className="bg-gray-800 border-gray-700 !py-0 !gap-0">
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="text-gray-100 text-base sm:text-lg">Activity Timeline</CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0">
          <div className="space-y-3 sm:space-y-4">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-900 rounded-lg hover:bg-gray-850 transition-colors"
              >
                <div className="flex-shrink-0 mt-1">{getStatusIcon(log.status)}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 space-y-2 sm:space-y-0">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                      <h4 className="text-gray-100 font-medium text-sm sm:text-base">{log.candidate}</h4>
                      <Badge variant="outline" className="border-talent-accent text-talent-accent text-xs w-fit">
                        {log.agent}
                      </Badge>
                      {getStatusBadge(log.status)}
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{log.duration}</span>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-2 text-sm sm:text-base">{log.action}</p>
                  <p className="text-xs sm:text-sm text-gray-400 mb-2">{log.details}</p>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                    <span className="text-xs text-gray-500">{log.timestamp}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-600 text-xs bg-transparent text-gray-300 hover:text-gray-100 hover:bg-gray-700 h-8 w-fit"
                      onClick={() => handleViewDetails(log)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredLogs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">No logs found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active Agents Status */}
      <Card className="bg-gray-800 border-gray-700 mt-4 sm:mt-6 !py-0 !gap-0">
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="text-gray-100 text-base sm:text-lg">Active Agent Status</CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {[
              { name: "Intake Agent", status: "active", tasks: 8 },
              { name: "Insight Agent", status: "active", tasks: 3 },
              { name: "Interviewer Agent", status: "idle", tasks: 0 },
              { name: "Human-in-Loop", status: "active", tasks: 5 },
              { name: "Learning Insights", status: "active", tasks: 2 },
              { name: "Recommender Agent", status: "error", tasks: 1 },
            ].map((agent) => (
              <div key={agent.name} className="bg-gray-900 p-3 sm:p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-gray-100 font-medium text-sm sm:text-base">{agent.name}</h4>
                  <div
                    className={`w-2 h-2 rounded-full ${agent.status === "active"
                      ? "bg-green-400"
                      : agent.status === "error"
                        ? "bg-red-400"
                        : "bg-gray-400"
                      }`}
                  />
                </div>
                <p className="text-xs sm:text-sm text-gray-300">{agent.tasks} active tasks</p>
                <p className="text-xs text-gray-500 capitalize">Status: {agent.status}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <AgentLogDetailModal log={selectedLog} isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} />
    </div>
  )
}
