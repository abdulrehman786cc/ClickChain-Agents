"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { Check, X, Edit, MessageSquare, FileText } from "lucide-react"

interface Candidate {
  id: string
  name: string
  jobMatched: string
  cultureFit: number
  teamFit: string
  agentSuggestion: string
  status: "needs-review" | "approved" | "rejected"
  reasoning: string
  semanticHighlights: string[]
  feedbackHistory: string[]
}

export function CandidateFlow() {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const candidates: Candidate[] = [
    {
      id: "1",
      name: "Sarah Chen",
      jobMatched: "Senior Frontend Developer",
      cultureFit: 92,
      teamFit: "High",
      agentSuggestion: "Recommender Agent: Strong hire with 94% confidence",
      status: "needs-review",
      reasoning:
        "Intake Agent processed resume with 95% confidence. Insight Agent identified strong pattern match with successful hires. Recommender Agent suggests strong hire based on technical skills and cultural alignment.",
      semanticHighlights: ["React expertise", "Team collaboration", "Agile experience"],
      feedbackHistory: [
        "Intake Agent: Resume processed successfully",
        "Interviewer Agent: Technical assessment scheduled",
      ],
    },
    {
      id: "2",
      name: "Marcus Johnson",
      jobMatched: "DevOps Engineer",
      cultureFit: 78,
      teamFit: "Medium",
      agentSuggestion: "Human-in-Loop: Requires manual review for edge case",
      status: "needs-review",
      reasoning:
        "Intake Agent flagged inconsistencies in work history. Insight Agent detected potential bias risk. Human-in-Loop escalated for manual review due to conflicting assessment scores.",
      semanticHighlights: ["AWS expertise", "Kubernetes", "CI/CD pipelines"],
      feedbackHistory: ["Intake Agent: Work gap detected", "Human-in-Loop: Escalated for review"],
    },
    {
      id: "3",
      name: "Elena Rodriguez",
      jobMatched: "Product Manager",
      cultureFit: 88,
      teamFit: "High",
      agentSuggestion: "Recommender Agent: Excellent leadership potential",
      status: "approved",
      reasoning:
        "All agents aligned on strong hire recommendation. Learning Insights model shows 96% success probability based on similar profiles.",
      semanticHighlights: ["Product strategy", "Stakeholder management", "Data-driven decisions"],
      feedbackHistory: ["Interviewer Agent: All interviews passed", "Recommender Agent: Strong hire recommendation"],
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "needs-review":
        return <Badge className="bg-yellow-600 text-xs sm:text-sm">Needs Review</Badge>
      case "approved":
        return <Badge className="bg-green-600 text-xs sm:text-sm">Approved</Badge>
      case "rejected":
        return <Badge className="bg-red-600 text-xs sm:text-sm">Rejected</Badge>
      default:
        return (
          <Badge variant="secondary" className="text-xs sm:text-sm">
            {status}
          </Badge>
        )
    }
  }

  const handleCandidateClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate)
    setIsDrawerOpen(true)
  }

  return (
    <div className="p-3 sm:p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
        <h1 className="text-xl sm:text-2xl font-bold text-white">Candidate Flow</h1>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Button variant="outline" className="border-gray-600 text-gray-300 bg-transparent h-9 sm:h-10 text-sm">
            Filter
          </Button>
          <Button className="bg-talent-accent hover:bg-blue-600 h-9 sm:h-10 text-sm">Export</Button>
        </div>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-0">
          {/* Mobile Card View */}
          <div className="block sm:hidden">
            {candidates.map((candidate) => (
              <div
                key={candidate.id}
                className="p-4 border-b border-gray-700 last:border-b-0 cursor-pointer hover:bg-gray-750"
                onClick={() => handleCandidateClick(candidate)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-white text-sm">{candidate.name}</h3>
                  {getStatusBadge(candidate.status)}
                </div>
                <p className="text-xs text-gray-300 mb-2">{candidate.jobMatched}</p>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-16 h-1.5 bg-gray-600 rounded-full">
                    <div
                      className="h-1.5 bg-talent-accent rounded-full"
                      style={{ width: `${candidate.cultureFit}%` }}
                    />
                  </div>
                  <span className="text-xs text-white">{candidate.cultureFit}%</span>
                </div>
                <p className="text-xs text-gray-400 truncate">{candidate.agentSuggestion}</p>
                <div className="flex space-x-1 mt-3">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 h-8 px-2">
                    <Check className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="destructive" className="h-8 px-2">
                    <X className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-600 bg-transparent h-8 px-2">
                    <Edit className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-300 text-sm">Candidate Name</TableHead>
                  <TableHead className="text-gray-300 text-sm">Job Matched</TableHead>
                  <TableHead className="text-gray-300 text-sm">Culture Fit</TableHead>
                  <TableHead className="text-gray-300 text-sm">Team Fit</TableHead>
                  <TableHead className="text-gray-300 text-sm">Agent Suggestion</TableHead>
                  <TableHead className="text-gray-300 text-sm">Status</TableHead>
                  <TableHead className="text-gray-300 text-sm">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {candidates.map((candidate) => (
                  <TableRow
                    key={candidate.id}
                    className="border-gray-700 hover:bg-gray-750 cursor-pointer"
                    onClick={() => handleCandidateClick(candidate)}
                  >
                    <TableCell className="text-white font-medium text-sm">{candidate.name}</TableCell>
                    <TableCell className="text-gray-300 text-sm">{candidate.jobMatched}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-12 h-2 bg-gray-600 rounded-full">
                          <div
                            className="h-2 bg-talent-accent rounded-full"
                            style={{ width: `${candidate.cultureFit}%` }}
                          />
                        </div>
                        <span className="text-white text-sm">{candidate.cultureFit}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300 text-sm">{candidate.teamFit}</TableCell>
                    <TableCell className="text-gray-300 max-w-xs truncate text-sm">
                      {candidate.agentSuggestion}
                    </TableCell>
                    <TableCell>{getStatusBadge(candidate.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 h-8 w-8 p-0">
                          <Check className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="destructive" className="h-8 w-8 p-0">
                          <X className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600 bg-transparent h-8 w-8 p-0">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600 bg-transparent h-8 w-8 p-0">
                          <MessageSquare className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-600 bg-transparent h-8 w-8 p-0">
                          <FileText className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Candidate Detail Drawer */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent className="bg-gray-800 border-gray-700 text-white w-full sm:w-[600px] p-4 sm:p-6">
          {selectedCandidate && (
            <>
              <SheetHeader className="mb-4 sm:mb-6">
                <SheetTitle className="text-white text-lg sm:text-xl">{selectedCandidate.name}</SheetTitle>
                <SheetDescription className="text-gray-400 text-sm sm:text-base">
                  {selectedCandidate.jobMatched}
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-4 sm:space-y-6 overflow-y-auto max-h-[calc(100vh-200px)]">
                {/* Agent Reasoning */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-white">
                    Agent Reasoning Summary
                  </h3>
                  <div className="bg-gray-900 p-3 sm:p-4 rounded-lg">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{selectedCandidate.reasoning}</p>
                  </div>
                </div>

                {/* Semantic Highlights */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-white">
                    Semantic Match Highlights
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCandidate.semanticHighlights.map((highlight, index) => (
                      <Badge key={index} className="bg-talent-accent text-xs sm:text-sm">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Feedback History */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-white">Feedback History</h3>
                  <div className="space-y-2">
                    {selectedCandidate.feedbackHistory.map((feedback, index) => (
                      <div key={index} className="bg-gray-900 p-3 rounded">
                        <p className="text-gray-300 text-sm sm:text-base">{feedback}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prompt Override */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-white">Prompt Override</h3>
                  <Textarea
                    placeholder="Override agent decision with custom reasoning..."
                    className="bg-gray-900 border-gray-600 text-white placeholder-gray-400 min-h-[80px] sm:min-h-[100px] text-sm sm:text-base"
                  />
                </div>

                {/* Decision Buttons */}
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                  <Button className="bg-green-600 hover:bg-green-700 flex-1 h-10 sm:h-11 text-sm sm:text-base">
                    Approve Candidate
                  </Button>
                  <Button variant="destructive" className="flex-1 h-10 sm:h-11 text-sm sm:text-base">
                    Reject Candidate
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-600 bg-transparent h-10 sm:h-11 text-sm sm:text-base sm:w-auto"
                  >
                    Request More Info
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
