"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"
import {
  FileText,
  Brain,
  MessageSquare,
  User,
  TrendingUp,
  Target,
  Upload,
  Calendar,
  Flag,
  ThumbsUp,
  ThumbsDown,
  BarChart3,
  Lightbulb,
} from "lucide-react"

// Custom TalenFlow Slider Component
const TalenFlowSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-700">
      <SliderPrimitive.Range className="absolute h-full bg-talent-accent" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-talent-accent bg-gray-800 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-talent-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
TalenFlowSlider.displayName = SliderPrimitive.Root.displayName

export function AgentWidgets() {
  const [confidenceThreshold, setConfidenceThreshold] = useState([75])
  const [interviewType, setInterviewType] = useState("technical")
  const [recommendationWeights, setRecommendationWeights] = useState({
    technical: [40],
    cultural: [35],
    experience: [25],
  })

  const widgets = [
    {
      id: "intake-agent",
      title: "Intake Agent",
      icon: FileText,
      description: "Processes applications and performs initial candidate screening",
      content: (
        <div className="space-y-3 sm:space-y-4">
          <div className="bg-gray-900 p-3 sm:p-4 rounded-lg border border-gray-700">
            <h4 className="font-medium mb-2 sm:mb-3 text-white text-sm sm:text-base">Current Processing</h4>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-1 sm:space-y-0">
                <span className="text-xs sm:text-sm text-gray-300">Resume Parsing</span>
                <div className="flex items-center space-x-2">
                  <div className="relative w-16 sm:w-20 h-1.5 sm:h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-talent-accent transition-all duration-300"
                      style={{ width: "85%" }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-8">85%</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-1 sm:space-y-0">
                <span className="text-xs sm:text-sm text-gray-300">Skills Extraction</span>
                <div className="flex items-center space-x-2">
                  <div className="relative w-16 sm:w-20 h-1.5 sm:h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-talent-accent transition-all duration-300"
                      style={{ width: "92%" }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-8">92%</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-1 sm:space-y-0">
                <span className="text-xs sm:text-sm text-gray-300">Initial Screening</span>
                <div className="flex items-center space-x-2">
                  <div className="relative w-16 sm:w-20 h-1.5 sm:h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-talent-accent transition-all duration-300"
                      style={{ width: "67%" }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-8">67%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <div>
              <label className="text-xs sm:text-sm text-gray-300 font-medium">Confidence Threshold</label>
              <div className="mt-2">
                <TalenFlowSlider
                  value={confidenceThreshold}
                  onValueChange={setConfidenceThreshold}
                  max={100}
                  step={1}
                  className="w-full touch-pan-x"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0%</span>
                  <span className="text-talent-accent font-medium">{confidenceThreshold[0]}% minimum</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-2">
            <Button className="bg-talent-accent hover:bg-blue-600 text-white flex-1 h-9 sm:h-10 text-sm">
              <Upload className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Process Batch
            </Button>
            <Button
              variant="outline"
              className="border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white h-9 sm:h-10 sm:w-10"
            >
              <Flag className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: "insight-agent",
      title: "Insight Agent",
      icon: Brain,
      description: "Analyzes patterns and generates actionable insights from candidate data",
      content: (
        <div className="space-y-3 sm:space-y-4">
          <div className="bg-gray-900 p-3 sm:p-4 rounded-lg border border-gray-700">
            <h4 className="font-medium mb-2 sm:mb-3 text-white text-sm sm:text-base">Latest Insights</h4>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <div className="flex items-start space-x-2 sm:space-x-3 p-2 bg-gray-800 rounded">
                <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 leading-relaxed">React developers show 23% higher retention</span>
              </div>
              <div className="flex items-start space-x-2 sm:space-x-3 p-2 bg-gray-800 rounded">
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 leading-relaxed">Remote candidates perform equally well</span>
              </div>
              <div className="flex items-start space-x-2 sm:space-x-3 p-2 bg-gray-800 rounded">
                <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 leading-relaxed">Culture fit scores predict success by 78%</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-3 rounded-lg border border-gray-700">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 space-y-1 sm:space-y-0">
              <span className="text-xs sm:text-sm text-gray-300 font-medium">Analysis Progress</span>
              <span className="text-xs sm:text-sm text-talent-accent font-medium">Running...</span>
            </div>
            <div className="relative h-1.5 sm:h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-talent-accent transition-all duration-300"
                style={{ width: "34%" }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Processing data patterns</span>
              <span>34%</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white h-9 sm:h-10 text-sm"
          >
            <Brain className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Generate New Insights
          </Button>
        </div>
      ),
    },
    {
      id: "interviewer-agent",
      title: "Interviewer Agent",
      icon: MessageSquare,
      description: "Manages interview scheduling and provides interview assistance",
      content: (
        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className="text-xs sm:text-sm text-gray-300 font-medium mb-2 block">Interview Type</label>
            <Select value={interviewType} onValueChange={setInterviewType}>
              <SelectTrigger className="bg-gray-900 border-gray-600 text-white hover:bg-gray-800 h-9 sm:h-10 text-sm">
                <SelectValue placeholder="Select interview type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="technical" className="text-gray-100 hover:bg-gray-700 focus:bg-gray-700 text-sm">
                  Technical Interview
                </SelectItem>
                <SelectItem value="behavioral" className="text-gray-100 hover:bg-gray-700 focus:bg-gray-700 text-sm">
                  Behavioral Interview
                </SelectItem>
                <SelectItem value="cultural" className="text-gray-100 hover:bg-gray-700 focus:bg-gray-700 text-sm">
                  Cultural Fit
                </SelectItem>
                <SelectItem value="final" className="text-gray-100 hover:bg-gray-700 focus:bg-gray-700 text-sm">
                  Final Round
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-gray-900 p-3 sm:p-4 rounded-lg border border-gray-700">
            <h4 className="font-medium mb-2 sm:mb-3 text-white text-sm sm:text-base">Suggested Questions</h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="p-2 bg-gray-800 rounded text-gray-300 leading-relaxed">
                • "Describe your experience with React hooks and state management"
              </div>
              <div className="p-2 bg-gray-800 rounded text-gray-300 leading-relaxed">
                • "How do you approach debugging complex frontend issues?"
              </div>
              <div className="p-2 bg-gray-800 rounded text-gray-300 leading-relaxed">
                • "Tell me about a time you had to optimize application performance"
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-2">
            <Button className="bg-talent-accent hover:bg-blue-600 text-white flex-1 h-9 sm:h-10 text-sm">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Schedule
            </Button>
            <Button
              variant="outline"
              className="border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white h-9 sm:h-10 sm:w-10"
            >
              <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: "human-in-loop",
      title: "Human-in-Loop",
      icon: User,
      description: "Handles escalations and cases requiring human intervention",
      content: (
        <div className="space-y-3 sm:space-y-4">
          <div className="bg-gray-900 p-3 sm:p-4 rounded-lg border border-gray-700">
            <h4 className="font-medium mb-2 sm:mb-3 text-white text-sm sm:text-base">Pending Reviews</h4>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between items-center p-2 bg-gray-800 rounded">
                <span className="text-xs sm:text-sm text-gray-300">Edge Case Decisions</span>
                <Badge className="bg-red-600 text-white text-xs">3</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-800 rounded">
                <span className="text-xs sm:text-sm text-gray-300">Bias Flags</span>
                <Badge className="bg-yellow-600 text-white text-xs">2</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-800 rounded">
                <span className="text-xs sm:text-sm text-gray-300">Appeal Requests</span>
                <Badge className="bg-blue-600 text-white text-xs">1</Badge>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs sm:text-sm text-gray-300 font-medium mb-2 block">Human Oversight Notes</label>
            <Textarea
              placeholder="Add human oversight notes..."
              className="bg-gray-900 border-gray-600 text-white placeholder-gray-400 min-h-[60px] sm:min-h-[80px] resize-none text-sm"
            />
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-2">
            <Button className="bg-green-600 hover:bg-green-700 text-white flex-1 h-9 sm:h-10 text-sm">
              <ThumbsUp className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Approve
            </Button>
            <Button variant="destructive" className="flex-1 h-9 sm:h-10 text-sm">
              <ThumbsDown className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Reject
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: "learning-insights",
      title: "Learning Insights",
      icon: TrendingUp,
      description: "Learns from decisions to improve future recommendations",
      content: (
        <div className="space-y-3 sm:space-y-4">
          <div className="bg-gray-900 p-3 sm:p-4 rounded-lg border border-gray-700">
            <h4 className="font-medium mb-2 sm:mb-3 text-white text-sm sm:text-base">Learning Progress</h4>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <div className="flex justify-between text-xs sm:text-sm mb-2">
                  <span className="text-gray-300 font-medium">Pattern Recognition</span>
                  <span className="text-talent-accent font-medium">87%</span>
                </div>
                <div className="relative h-1.5 sm:h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-talent-accent transition-all duration-300"
                    style={{ width: "87%" }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs sm:text-sm mb-2">
                  <span className="text-gray-300 font-medium">Bias Detection</span>
                  <span className="text-talent-accent font-medium">92%</span>
                </div>
                <div className="relative h-1.5 sm:h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-talent-accent transition-all duration-300"
                    style={{ width: "92%" }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs sm:text-sm mb-2">
                  <span className="text-gray-300 font-medium">Outcome Prediction</span>
                  <span className="text-talent-accent font-medium">78%</span>
                </div>
                <div className="relative h-1.5 sm:h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-talent-accent transition-all duration-300"
                    style={{ width: "78%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-3 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-gray-300 font-medium">Training Data Points</span>
              <span className="text-xs sm:text-sm text-talent-accent font-bold">2,847</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-gray-400">Last Updated</span>
              <span className="text-xs text-gray-400">2 hours ago</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white h-9 sm:h-10 text-sm"
          >
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            View Learning Report
          </Button>
        </div>
      ),
    },
    {
      id: "recommender-agent",
      title: "Recommender Agent",
      icon: Target,
      description: "Provides final hiring recommendations based on all data points",
      content: (
        <div className="space-y-3 sm:space-y-4">
          <div className="bg-gray-900 p-3 sm:p-4 rounded-lg border border-gray-700">
            <h4 className="font-medium mb-2 sm:mb-3 text-white text-sm sm:text-base">Recommendation Weights</h4>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs sm:text-sm text-gray-300 font-medium">Technical Skills</label>
                  <span className="text-xs text-talent-accent font-medium">{recommendationWeights.technical[0]}%</span>
                </div>
                <TalenFlowSlider
                  value={recommendationWeights.technical}
                  onValueChange={(value) => setRecommendationWeights((prev) => ({ ...prev, technical: value }))}
                  max={100}
                  step={1}
                  className="w-full touch-pan-x"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs sm:text-sm text-gray-300 font-medium">Cultural Fit</label>
                  <span className="text-xs text-talent-accent font-medium">{recommendationWeights.cultural[0]}%</span>
                </div>
                <TalenFlowSlider
                  value={recommendationWeights.cultural}
                  onValueChange={(value) => setRecommendationWeights((prev) => ({ ...prev, cultural: value }))}
                  max={100}
                  step={1}
                  className="w-full touch-pan-x"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs sm:text-sm text-gray-300 font-medium">Experience</label>
                  <span className="text-xs text-talent-accent font-medium">{recommendationWeights.experience[0]}%</span>
                </div>
                <TalenFlowSlider
                  value={recommendationWeights.experience}
                  onValueChange={(value) => setRecommendationWeights((prev) => ({ ...prev, experience: value }))}
                  max={100}
                  step={1}
                  className="w-full touch-pan-x"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-3 rounded-lg border border-gray-700">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
              <span className="text-xs sm:text-sm text-gray-300 font-medium">Overall Confidence</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 sm:w-16 h-1.5 sm:h-2 bg-gray-600 rounded-full">
                  <div className="w-full h-full bg-green-500 rounded-full" style={{ width: "94%" }} />
                </div>
                <span className="text-xs sm:text-sm text-green-400 font-bold">94%</span>
              </div>
            </div>
          </div>

          <Button className="bg-talent-accent hover:bg-blue-600 text-white w-full h-9 sm:h-10 text-sm">
            <Target className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Generate Recommendation
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="p-3 sm:p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
        <h1 className="text-xl sm:text-2xl font-bold text-white">Agent Widgets</h1>
        <Badge
          variant="outline"
          className="border-talent-accent text-talent-accent bg-talent-accent/10 text-xs sm:text-sm w-fit"
        >
          6 Active Agents
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {widgets.map((widget) => {
          const Icon = widget.icon
          return (
            <Card
              key={widget.id}
              className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors h-full !py-0 !gap-0"
            >
              <CardHeader className="pb-3 sm:pb-4 p-3 sm:p-6">
                <CardTitle className="flex items-start space-x-3 text-white">
                  <div className="p-1.5 sm:p-2 bg-talent-accent/20 rounded-lg flex-shrink-0">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-talent-accent" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-base sm:text-lg font-semibold leading-tight">{widget.title}</div>
                    <p className="text-xs sm:text-sm text-gray-400 font-normal mt-1 leading-relaxed">
                      {widget.description}
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 p-3 sm:p-6 flex-1">{widget.content}</CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
