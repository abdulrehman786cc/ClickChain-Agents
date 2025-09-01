"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Clock, CheckCircle, AlertTriangle, XCircle, User, Cpu, FileText, Copy } from "lucide-react"

interface LogEntry {
  id: string
  timestamp: string
  agent: string
  candidate: string
  action: string
  status: "success" | "warning" | "error" | "processing"
  details: string
  duration: string
  fullDetails?: {
    input: string
    output: string
    reasoning: string
    confidence: number
    metadata: Record<string, any>
  }
}

interface AgentLogDetailModalProps {
  log: LogEntry | null
  isOpen: boolean
  onClose: () => void
}

export function AgentLogDetailModal({ log, isOpen, onClose }: AgentLogDetailModalProps) {
  if (!log) return null

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />
      case "error":
        return <XCircle className="w-5 h-5 text-red-400" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-600 text-white">Success</Badge>
      case "warning":
        return <Badge className="bg-yellow-600 text-white">Warning</Badge>
      case "error":
        return <Badge className="bg-red-600 text-white">Error</Badge>
      default:
        return (
          <Badge variant="secondary" className="bg-gray-600 text-white">
            Processing
          </Badge>
        )
    }
  }

  const mockFullDetails = {
    input: `Candidate: ${log.candidate}\nJob Position: Senior Frontend Developer\nResume: [Resume content would be here...]`,
    output: log.details,
    reasoning:
      "Based on the candidate's 5+ years of React experience and previous work at similar companies, there's a strong technical and cultural alignment. The semantic analysis of their portfolio shows expertise in modern frontend practices.",
    confidence: 0.92,
    metadata: {
      processingTime: log.duration,
      modelVersion: "v2.1.3",
      tokensUsed: 1247,
      apiCalls: 3,
      cacheHit: false,
    },
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3 text-xl">
            {getStatusIcon(log.status)}
            <span>Agent Log Details</span>
          </DialogTitle>
          <DialogDescription className="text-gray-400">Detailed information about this agent action</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Header Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-talent-accent" />
                <span className="text-sm text-gray-400">Candidate:</span>
                <span className="font-medium text-gray-100">{log.candidate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-talent-accent" />
                <span className="text-sm text-gray-400">Agent:</span>
                <Badge variant="outline" className="border-talent-accent text-talent-accent">
                  {log.agent}
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-talent-accent" />
                <span className="text-sm text-gray-400">Timestamp:</span>
                <span className="text-gray-100">{log.timestamp}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Status:</span>
                {getStatusBadge(log.status)}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Duration:</span>
                <span className="text-gray-100">{log.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Confidence:</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-gray-600 rounded-full">
                    <div
                      className="h-2 bg-talent-accent rounded-full"
                      style={{ width: `${mockFullDetails.confidence * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-100">{Math.round(mockFullDetails.confidence * 100)}%</span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-gray-700" />

          {/* Action & Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-100 mb-3">Action Performed</h3>
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-gray-300">{log.action}</p>
            </div>
          </div>

          {/* Agent Reasoning */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-100">Agent Reasoning</h3>
              <Button
                size="sm"
                variant="outline"
                className="border-gray-600 bg-transparent text-gray-300 hover:text-white"
                onClick={() => copyToClipboard(mockFullDetails.reasoning)}
              >
                <Copy className="w-3 h-3 mr-1" />
                Copy
              </Button>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-gray-300 leading-relaxed">{mockFullDetails.reasoning}</p>
            </div>
          </div>

          {/* Input/Output */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-100">Input</h3>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-600 bg-transparent text-gray-300 hover:text-white"
                  onClick={() => copyToClipboard(mockFullDetails.input)}
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </Button>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg max-h-40 overflow-y-auto">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap">{mockFullDetails.input}</pre>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-100">Output</h3>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-600 bg-transparent text-gray-300 hover:text-white"
                  onClick={() => copyToClipboard(mockFullDetails.output)}
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </Button>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg max-h-40 overflow-y-auto">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap">{mockFullDetails.output}</pre>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div>
            <h3 className="text-lg font-semibold text-gray-100 mb-3">Technical Metadata</h3>
            <div className="bg-gray-900 p-4 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Model Version:</span>
                  <p className="text-gray-100 font-mono">{mockFullDetails.metadata.modelVersion}</p>
                </div>
                <div>
                  <span className="text-gray-400">Tokens Used:</span>
                  <p className="text-gray-100 font-mono">{mockFullDetails.metadata.tokensUsed.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-400">API Calls:</span>
                  <p className="text-gray-100 font-mono">{mockFullDetails.metadata.apiCalls}</p>
                </div>
                <div>
                  <span className="text-gray-400">Processing Time:</span>
                  <p className="text-gray-100 font-mono">{mockFullDetails.metadata.processingTime}</p>
                </div>
                <div>
                  <span className="text-gray-400">Cache Hit:</span>
                  <p className="text-gray-100 font-mono">{mockFullDetails.metadata.cacheHit ? "Yes" : "No"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
            <Button variant="outline" className="border-gray-600 bg-transparent text-gray-300 hover:text-white">
              <FileText className="w-4 h-4 mr-2" />
              Export Log
            </Button>
            <Button onClick={onClose} className="bg-talent-accent hover:bg-blue-600">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
