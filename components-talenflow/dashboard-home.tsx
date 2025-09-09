"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, TrendingUp, Clock, CheckCircle, AlertTriangle, FileText, Cpu, GraduationCap } from "lucide-react"

export function DashboardHome() {
  const stats = [
    {
      title: "Active Candidates",
      value: "47",
      icon: Users,
      color: "text-blue-400",
    },
    {
      title: "Pending Reviews",
      value: "12",
      icon: Clock,
      color: "text-yellow-400",
    },
    {
      title: "Approved Today",
      value: "8",
      icon: CheckCircle,
      color: "text-green-400",
    },
    {
      title: "Flagged Items",
      value: "3",
      icon: AlertTriangle,
      color: "text-red-400",
    },
  ]

  const recentActivity = [
    {
      candidate: "Sarah Chen",
      agent: "Intake Agent",
      action: "Resume processed and skills extracted with 95% confidence",
      time: "2 min ago",
      status: "success",
    },
    {
      candidate: "Marcus Johnson",
      agent: "Insight Agent",
      action: "Pattern analysis completed - flagged for human review",
      time: "5 min ago",
      status: "warning",
    },
    {
      candidate: "Elena Rodriguez",
      agent: "Recommender Agent",
      action: "Final recommendation generated with 94% confidence score",
      time: "8 min ago",
      status: "success",
    },
    {
      candidate: "David Kim",
      agent: "Interviewer Agent",
      action: "Technical interview scheduled for tomorrow 2PM",
      time: "12 min ago",
      status: "success",
    },
  ]

  const agentStatus = [
    {
      name: "Intake Agent",
      status: "active",
      tasks: 8,
      efficiency: 95,
      icon: FileText,
    },
    {
      name: "Insight Agent",
      status: "active",
      tasks: 3,
      efficiency: 87,
      icon: Cpu,
    },
    {
      name: "Interviewer Agent",
      status: "idle",
      tasks: 0,
      efficiency: 92,
      icon: Users,
    },
    {
      name: "Human-in-Loop",
      status: "active",
      tasks: 5,
      efficiency: 78,
      icon: GraduationCap,
    },
    {
      name: "Learning Insights",
      status: "active",
      tasks: 2,
      efficiency: 89,
      icon: TrendingUp,
    },
    {
      name: "Recommender Agent",
      status: "error",
      tasks: 1,
      efficiency: 45,
      icon: AlertTriangle,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-400"
      case "idle":
        return "bg-gray-400"
      case "error":
        return "bg-red-400"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0"><h1 className="text-xl sm:text-2xl font-bold text-gray-100">Dashboard Overview</h1><div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-talent-accent text-talent-accent bg-talent-accent/10 text-xs sm:text-sm w-fit">All Systems Active</div></div>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="bg-gray-800 border-gray-700 !py-0 !gap-0">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-400 font-medium">{stat.title}</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-100 mt-1">{stat.value}</p>
                  </div>
                  <div className="p-2 sm:p-3 bg-gray-700 rounded-lg w-fit">
                    <Icon className={`w-4 h-4 sm:w-6 sm:h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Activity */}
        <Card className="bg-gray-800 border-gray-700 !py-0 !gap-0">
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-gray-100 text-base sm:text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="space-y-3 sm:space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-start space-y-2 sm:space-y-0 sm:space-x-3 p-3 bg-gray-900 rounded-lg border border-gray-700"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mb-1">
                      <p className="text-gray-100 font-medium text-sm sm:text-base">{activity.candidate}</p>
                      <Badge variant="outline" className="border-talent-accent text-talent-accent text-xs w-fit">
                        {activity.agent}
                      </Badge>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{activity.action}</p>
                  </div>
                  <div className="flex flex-row sm:flex-col items-center sm:items-end space-x-2 sm:space-x-0 sm:space-y-1">
                    <span className="text-xs text-gray-500">{activity.time}</span>
                    <Badge
                      variant={activity.status === "success" ? "default" : "secondary"}
                      className={`text-xs ${activity.status === "success"
                        ? "bg-green-600 text-white"
                        : activity.status === "warning"
                          ? "bg-yellow-600 text-white"
                          : "bg-blue-600 text-white"
                        }`}
                    >
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Agent Status */}
        <Card className="bg-gray-800 border-gray-700 !py-0 !gap-0">
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-gray-100 text-base sm:text-lg">Agent Status</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="space-y-3 sm:space-y-4">
              {agentStatus.map((agent) => {
                const Icon = agent.icon
                return (
                  <div
                    key={agent.name}
                    className="flex items-center space-x-3 p-3 bg-gray-900 rounded-lg border border-gray-700"
                  >
                    <div className="p-1.5 sm:p-2 bg-talent-accent/20 rounded flex-shrink-0">
                      <Icon className="w-3 h-3 sm:w-4 sm:h-4 text-talent-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 space-y-1 sm:space-y-0">
                        <h4 className="text-gray-100 font-medium text-xs sm:text-sm">{agent.name}</h4>
                        <div className="flex items-center space-x-2">
                          <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${getStatusColor(agent.status)}`} />
                          <span className="text-xs text-gray-400 capitalize">{agent.status}</span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0">
                        <span className="text-xs text-gray-400">{agent.tasks} active tasks</span>
                        <div className="flex items-center space-x-2">
                          <div className="relative w-12 sm:w-16 h-1 sm:h-1 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-talent-accent transition-all duration-300"
                              style={{ width: `${agent.efficiency}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-400">{agent.efficiency}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
