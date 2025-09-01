"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Plus, Edit, Trash2, FileText } from "lucide-react"

export function TrainingConsole() {
  const [selectedAgent, setSelectedAgent] = useState("intake-agent")

  const agents = [
    { id: "intake-agent", name: "Intake Agent" },
    { id: "insight-agent", name: "Insight Agent" },
    { id: "interviewer-agent", name: "Interviewer Agent" },
    { id: "human-in-loop", name: "Human-in-Loop" },
    { id: "learning-insights", name: "Learning Insights" },
    { id: "recommender-agent", name: "Recommender Agent" },
  ]

  const prompts = [
    {
      id: "1",
      title: "Resume Processing",
      agent: "intake-agent",
      content: "Extract technical skills, experience level, and education from resume for {position}...",
      tags: ["Skills Extraction", "Bias Risk"],
      lastModified: "2 hours ago",
    },
    {
      id: "2",
      title: "Pattern Analysis",
      agent: "insight-agent",
      content: "Analyze hiring patterns and identify potential biases in candidate evaluation...",
      tags: ["Bias Risk", "Pattern Recognition"],
      lastModified: "1 day ago",
    },
    {
      id: "3",
      title: "Interview Question Generation",
      agent: "interviewer-agent",
      content: "Generate relevant technical and behavioral questions based on job requirements...",
      tags: ["Interview Prep", "Technical Assessment"],
      lastModified: "3 days ago",
    },
    {
      id: "4",
      title: "Human Escalation Rules",
      agent: "human-in-loop",
      content: "Define criteria for when decisions should be escalated to human reviewers...",
      tags: ["Escalation", "Quality Control"],
      lastModified: "5 days ago",
    },
    {
      id: "5",
      title: "Learning Feedback Loop",
      agent: "learning-insights",
      content: "Incorporate hiring outcomes to improve future candidate assessments...",
      tags: ["Machine Learning", "Continuous Improvement"],
      lastModified: "1 week ago",
    },
    {
      id: "6",
      title: "Final Recommendation Logic",
      agent: "recommender-agent",
      content: "Synthesize all assessment data to generate final hiring recommendations...",
      tags: ["Decision Making", "Confidence Scoring"],
      lastModified: "4 days ago",
    },
  ]

  const policies = [
    { name: "Hiring_Policy_2024.pdf", size: "2.3 MB", uploaded: "1 week ago" },
    { name: "Diversity_Guidelines.md", size: "156 KB", uploaded: "3 days ago" },
    { name: "Interview_Standards.pdf", size: "1.8 MB", uploaded: "5 days ago" },
  ]

  const tagColors = {
    "Culture Fit": "bg-blue-600 text-white",
    "Bias Risk": "bg-red-600 text-white",
    "Growth Mindset": "bg-green-600 text-white",
    "Team Synergy": "bg-purple-600 text-white",
    "Skills Extraction": "bg-orange-600 text-white",
    "Pattern Recognition": "bg-cyan-600 text-white",
    "Interview Prep": "bg-pink-600 text-white",
    "Technical Assessment": "bg-indigo-600 text-white",
    Escalation: "bg-yellow-600 text-white",
    "Quality Control": "bg-teal-600 text-white",
    "Machine Learning": "bg-violet-600 text-white",
    "Continuous Improvement": "bg-emerald-600 text-white",
    "Decision Making": "bg-rose-600 text-white",
    "Confidence Scoring": "bg-amber-600 text-white",
  }

  return (
    <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h1 className="text-xl sm:text-2xl font-bold text-white">Training Console</h1>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Button
            variant="outline"
            className="border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-700 hover:text-white h-9 sm:h-10 text-sm"
          >
            <Upload className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Upload Policy
          </Button>
          <Button className="bg-talent-accent hover:bg-blue-600 text-white h-9 sm:h-10 text-sm">
            <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            New Prompt
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Policies Section */}
        <Card className="bg-gray-800 border-gray-700 lg:col-span-1">
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-white text-base sm:text-lg">Hiring Policies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 p-3 sm:p-6 pt-0">
            {policies.map((policy, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-900 rounded-lg border border-gray-700"
              >
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className="p-1.5 sm:p-2 bg-talent-accent/20 rounded flex-shrink-0">
                    <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-talent-accent" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium text-white truncate">{policy.name}</p>
                    <p className="text-xs text-gray-400">
                      {policy.size} • {policy.uploaded}
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white ml-2 h-8 w-8 p-0"
                >
                  <Edit className="w-3 h-3" />
                </Button>
              </div>
            ))}

            <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 sm:p-6 text-center hover:border-gray-500 transition-colors">
              <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-xs sm:text-sm text-gray-300 font-medium">Drop files here or click to upload</p>
              <p className="text-xs text-gray-500 mt-1">PDF, MD files supported</p>
            </div>
          </CardContent>
        </Card>

        {/* Prompt Management */}
        <Card className="bg-gray-800 border-gray-700 lg:col-span-2">
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-white mb-3 sm:mb-4 text-base sm:text-lg">Prompt Management</CardTitle>
            <div>
              <label className="text-xs sm:text-sm text-gray-300 font-medium mb-2 block">Select Agent</label>
              <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                <SelectTrigger className="bg-gray-900 border-gray-600 text-white hover:bg-gray-800 w-full sm:w-64 h-9 sm:h-10 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {agents.map((agent) => (
                    <SelectItem
                      key={agent.id}
                      value={agent.id}
                      className="text-gray-100 hover:bg-gray-700 focus:bg-gray-700 text-sm"
                    >
                      {agent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 p-3 sm:p-6 pt-0">
            {prompts
              .filter((prompt) => prompt.agent === selectedAgent)
              .map((prompt) => (
                <div key={prompt.id} className="bg-gray-900 p-3 sm:p-4 rounded-lg border border-gray-700">
                  <div className="flex items-start justify-between mb-3">
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-white text-sm sm:text-base">{prompt.title}</h4>
                      <p className="text-xs text-gray-400">Modified {prompt.lastModified}</p>
                    </div>
                    <div className="flex space-x-1 ml-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white h-8 w-8 p-0"
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white h-8 w-8 p-0"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 mb-3 leading-relaxed">{prompt.content}</p>

                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {prompt.tags.map((tag) => (
                      <Badge
                        key={tag}
                        className={`${tagColors[tag as keyof typeof tagColors] || "bg-gray-600 text-white"} text-xs`}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}

            {/* New Prompt Form */}
            <div className="bg-gray-900 p-3 sm:p-4 rounded-lg border-2 border-dashed border-gray-600 hover:border-gray-500 transition-colors">
              <Input
                placeholder="Prompt title..."
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 mb-3 focus:border-talent-accent h-9 sm:h-10 text-sm"
              />
              <Textarea
                placeholder="Enter your prompt here..."
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 mb-3 min-h-[80px] sm:min-h-[100px] resize-none focus:border-talent-accent text-sm"
              />
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {Object.keys(tagColors)
                    .slice(0, 4)
                    .map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-gray-600 text-gray-300 cursor-pointer hover:bg-gray-700 hover:text-white transition-colors text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                </div>
                <Button size="sm" className="bg-talent-accent hover:bg-blue-600 text-white h-9 text-sm">
                  Save Prompt
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Prompt History */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="text-white text-base sm:text-lg">Prompt History</CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6 pt-0">
          <div className="space-y-3">
            {[
              { agent: "Intake Agent", action: "Updated resume parsing rules", time: "2 hours ago" },
              { agent: "Insight Agent", action: "Enhanced bias detection algorithms", time: "1 day ago" },
              { agent: "Recommender Agent", action: "Adjusted confidence thresholds", time: "2 days ago" },
              { agent: "Human-in-Loop", action: "Modified escalation criteria", time: "3 days ago" },
            ].map((entry, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 px-3 sm:px-4 bg-gray-900 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors space-y-2 sm:space-y-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-white font-medium text-sm sm:text-base">{entry.agent}</p>
                  <p className="text-xs sm:text-sm text-gray-300">{entry.action}</p>
                </div>
                <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded w-fit">{entry.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
