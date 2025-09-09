"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Progress } from '@/components/ui/progress'
import { Home, List, Bot, FileText, Settings, GraduationCap, Search, Filter, Play, Share, Save, Upload, ChevronRight, Clock, Users, TrendingUp, AlertCircle, CheckCircle, Eye, MessageSquare, BarChart3, MapPin, Building, DollarSign, Target, Zap, RefreshCw, ExternalLink, ChevronDown, ChevronUp, Plus, X, Lock, Trash2, Copy, Move, EyeIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

// Mock data - now used as initial state
const initialMockOpportunities = [
  {
    id: 1,
    title: "Tribal Cultural Tourism Expansion",
    status: "In Progress",
    stage: "Feasibility Review",
    dueDate: "2024-02-20",
    activeAgent: "Feasibility Reviewer Agent",
    owner: "Tribal Economic Development",
    priority: "High",
    issues: 3,
    summary: "Feasibility study for expanding a tribal cultural tourism facility, lodging, and performance space to increase economic impact.",
    type: "Tourism",
    zipCode: "86045",
    planningVariables: {
      annualVisitors: 240000,
      averageSpend: 150,
      seasonalityIndex: 0.75,
      infraCost: 8200000,
    },
    financials: {
      roi: "78%",
      irr: "15%",
      breakevenYear: 7,
      npv: "$2.1M"
    },
    auditLog: [
      { who: "User", when: "2024-01-15 16:00", what: "Initial setup" },
      { who: "Scenario Planner Agent", when: "2024-01-15 12:45", what: "Generated optimal ROI scenario" },
      { who: "User", when: "2024-01-14 09:00", what: "Adjusted visitor capacity" },
    ]
  },
  {
    id: 2,
    title: "Tech Hub Development",
    status: "Planning",
    stage: "Market Analysis",
    dueDate: "2024-02-15",
    activeAgent: "Industry Intelligence Agent",
    owner: "City Planning Dept",
    priority: "Medium",
    issues: 0,
    summary: "Mixed-use development with tech incubator and affordable housing",
    type: "Industry",
    zipCode: "62901",
    planningVariables: {
      sqftDemand: 50000,
      fitOutCost: 50,
      equipmentCAPEX: 5000000,
      workforceAvailabilityIndex: 0.8,
      logisticsDistance: 10,
      incentiveAssumptions: 0.1,
    },
    financials: {
      roi: "65%",
      irr: "12%",
      breakevenYear: 8,
      npv: "$1.5M"
    },
    auditLog: [
      { who: "User", when: "2024-01-10 10:00", what: "Initial setup" },
      { who: "Industry Intelligence Agent", when: "2024-01-12 14:00", what: "Analyzed tech workforce" },
    ]
  },
  {
    id: 3,
    title: "Green Energy Initiative",
    status: "Review",
    stage: "Stakeholder Engagement Agent",
    dueDate: "2024-02-28",
    activeAgent: "Stakeholder Engagement Agent",
    owner: "Economic Development",
    priority: "Medium",
    issues: 0,
    summary: "Solar farm development with community ownership model",
    type: "Energy",
    zipCode: "76704",
    planningVariables: {
      mwCapacity: 10,
      ppaPrice: 0.08,
      interconnectCost: 1500000,
      capacityFactor: 0.25,
      incentives: 0.15,
    },
    financials: {
      roi: "90%",
      irr: "18%",
      breakevenYear: 6,
      npv: "$3.5M"
    },
    auditLog: [
      { who: "User", when: "2024-01-05 11:00", what: "Initial setup" },
      { who: "Scenario Planner Agent", when: "2024-01-07 15:00", what: "Assessed environmental impact" },
    ]
  },
  {
    id: 4,
    title: "Carbondale Industrial Zoning",
    status: "Planning",
    stage: "Housing Impact",
    dueDate: "2024-03-10",
    activeAgent: "Housing Demand Agent",
    owner: "City Planning",
    priority: "High",
    issues: 1,
    summary: "Rezoning proposal for new industrial park, assessing housing impact.",
    type: "Housing",
    zipCode: "62901",
    planningVariables: {
      unitsByMix: { studio: 50, oneBed: 100, twoBed: 150 },
      averageRent: 1200,
      vacancy: 0.05,
      absorption: 0.7,
      constructionCostPerSqFt: 180,
      softCostsPct: 0.15,
      operatingReserveMonths: 6,
    },
    financials: {
      roi: "55%",
      irr: "10%",
      breakevenYear: 9,
      npv: "$1.0M"
    },
    auditLog: [
      { who: "User", when: "2024-01-01 09:00", what: "Initial setup" },
      { who: "Housing Demand Agent", when: "2024-01-03 14:00", what: "Adjusted housing mix" },
    ]
  },
  {
    id: 5,
    title: "Waco Downtown Revitalization",
    status: "Discovery",
    stage: "Initial Assessment",
    dueDate: "2024-04-01",
    activeAgent: "Industry Intelligence Agent",
    owner: "Downtown Alliance",
    priority: "Low",
    issues: 0,
    summary: "Preliminary study for revitalizing downtown Waco with mixed-use developments.",
    type: "Education",
    zipCode: "76704",
    planningVariables: {
      studentCapacity: 500,
      staffingRatios: 15,
      operatingCostPerStudent: 8000,
      grants: 0.6,
    },
    financials: {
      roi: "40%",
      irr: "8%",
      breakevenYear: 12,
      npv: "$0.5M"
    },
    auditLog: [
      { who: "User", when: "2023-12-20 10:00", what: "Initial setup" },
      { who: "Industry Intelligence Agent", when: "2023-12-22 16:00", what: "Began economic data collection" },
    ]
  },
  {
    id: 6,
    title: "Pine Bluff Broadband Expansion",
    status: "Planning",
    stage: "Feasibility Study",
    dueDate: "2024-05-15",
    activeAgent: "Feasibility Reviewer Agent",
    owner: "City IT Department",
    priority: "High",
    issues: 0,
    summary: "Project to expand high-speed broadband access to underserved areas of Pine Bluff.",
    type: "Infrastructure",
    zipCode: "71601",
    planningVariables: {},
    financials: { roi: "N/A", irr: "N/A", breakevenYear: "N/A", npv: "N/A" },
    auditLog: [{ who: "User", when: "2024-01-20 09:00", what: "Initial setup" }]
  },
  {
    id: 7,
    title: "Hoopa Valley Tourism Development",
    status: "Discovery",
    stage: "Community Engagement",
    dueDate: "2024-06-01",
    activeAgent: "Stakeholder Engagement Agent",
    owner: "Hoopa Valley Tribal Council",
    priority: "Medium",
    issues: 0,
    summary: "Exploring opportunities for sustainable tourism development within the Hoopa Valley.",
    type: "Tourism",
    zipCode: "95546",
    planningVariables: {},
    financials: { roi: "N/A", irr: "N/A", breakevenYear: "N/A", npv: "N/A" },
    auditLog: [{ who: "User", when: "2024-01-25 10:00", what: "Initial setup" }]
  }
]

const initialMockAgents = [
  {
    name: "Industry Intelligence Agent",
    avatar: "🔍",
    opportunities: [
      {
        id: 1,
        opportunityName: "Tribal Cultural Tourism Expansion",
        zipCode: "86045",
        stage: "Market Analysis",
        progress: 90,
        statusUpdate: "Tourism sector demand +12% annually; high cultural experience interest.",
        priority: "Medium",
        reasoningSummary: "Market demand projections updated based on recent visitor surveys and regional economic forecasts. Data indicates strong potential for cultural tourism growth, supporting expansion.",
        interventionPoints: [
          { label: "Adjust Growth Projections", impacts: ["Scenario Planner Agent"] },
          { label: "Request Competitor Analysis", impacts: [] }
        ],
        lastAction: "1 hour ago",
        statusBadges: ["RAG Used", "Policy Check Passed"],
      },
      {
        id: 5,
        opportunityName: "Waco Downtown Revitalization",
        zipCode: "76704",
        stage: "Initial Assessment",
        progress: 50,
        statusUpdate: "Gathering initial economic data and demographic trends for revitalization.",
        priority: "Low",
        reasoningSummary: "Initial data collection for downtown revitalization viability. Focusing on local business ecosystem and consumer spending patterns.",
        interventionPoints: [
          { label: "Provide Local Business Data", impacts: [] }
        ],
        lastAction: "2 days ago",
        statusBadges: ["RAG Used"],
      },
      {
        id: 2,
        opportunityName: "Tech Hub Development",
        zipCode: "62901",
        stage: "Initial Assessment",
        progress: 70,
        statusUpdate: "Analyzing tech workforce availability and infrastructure needs.",
        priority: "Low",
        reasoningSummary: "Initial data collection for tech sector viability. Focusing on local university talent pipeline.",
        interventionPoints: [
          { label: "Provide Local Data", impacts: [] }
        ],
        lastAction: "3 days ago",
        statusBadges: ["RAG Used"],
      },
    ],
  },
  {
    name: "Housing Demand Agent",
    avatar: "🏠",
    opportunities: [
      {
        id: 1,
        opportunityName: "Tribal Cultural Tourism Expansion",
        zipCode: "86045",
        stage: "Lodging Gap Analysis",
        progress: 80,
        statusUpdate: "Projected 85-room shortfall during peak season; current supply meets 60% of demand.",
        priority: "High",
        reasoningSummary: "Lodging shortfall projection based on updated visitor forecasts from Industry Intelligence Agent and current regional hotel occupancy rates. Existing infrastructure cannot support peak demand.",
        interventionPoints: [
          { label: "Adjust Seasonal Workforce", impacts: ["Scenario Planner Agent"] },
          { label: "Recalculate for 10% migration increase", impacts: ["Industry Intelligence Agent", "Scenario Planner Agent"] }
        ],
        lastAction: "2 hours ago",
        statusBadges: ["RAG Used", "Human-in-Loop"],
      },
      {
        id: 4,
        opportunityName: "Carbondale Industrial Zoning",
        zipCode: "62901",
        stage: "Housing Impact",
        progress: 60,
        statusUpdate: "Assessing impact of new industrial park on local housing supply and affordability.",
        priority: "High",
        reasoningSummary: "Initial assessment indicates potential strain on affordable housing due to projected workforce influx. Model needs adjustment for specific housing mix.",
        interventionPoints: [
          { label: "Adjust Housing Mix", impacts: ["Scenario Planner Agent"] },
          { label: "Review Affordability Model", impacts: [] }
        ],
        lastAction: "1 day ago",
        statusBadges: ["RAG Used"],
      },
    ],
  },
  {
    name: "Scenario Planner Agent",
    avatar: "📊",
    opportunities: [
      {
        id: 1,
        opportunityName: "Tribal Cultural Tourism Expansion",
        zipCode: "86045",
        stage: "ROI Projection",
        progress: 75,
        statusUpdate: "Optimal scenario projects $6.4M ROI over 5 years; balancing lodge size and venue capacity.",
        priority: "Medium",
        reasoningSummary: "Scenario optimized to maximize ROI while addressing lodging gaps and cultural programming needs. Model incorporates construction costs, projected visitor revenue, and operational expenses.",
        interventionPoints: [
          { label: "Request Alternate Scenario", impacts: ["Housing Demand Agent", "Feasibility Reviewer Agent"] },
          { label: "Adjust Investment Cap", impacts: ["Feasibility Reviewer Agent"] }
        ],
        lastAction: "3 hours ago",
        statusBadges: ["RAG Used"],
      },
      {
        id: 3,
        opportunityName: "Green Energy Initiative",
        zipCode: "76704",
        stage: "Impact Assessment",
        progress: 60,
        statusUpdate: "Assessing economic and environmental impact of proposed solar farm.",
        priority: "Medium",
        reasoningSummary: "Initial impact assessment based on energy production models and local economic multipliers. Further refinement needed for community benefit analysis.",
        interventionPoints: [
          { label: "Refine Economic Model", impacts: ["Stakeholder Engagement Agent"] }
        ],
        lastAction: "2 days ago",
        statusBadges: ["RAG Used"],
      },
    ],
  },
  {
    name: "Stakeholder Engagement Agent",
    avatar: "👥",
    opportunities: [
      {
        id: 1,
        opportunityName: "Tribal Cultural Tourism Expansion",
        zipCode: "86045",
        stage: "Sentiment Analysis",
        progress: 85,
        statusUpdate: "Positive sentiment from 3 of 4 council members; addressing Elder Johnson's concerns.",
        priority: "Medium",
        reasoningSummary: "Sentiment analysis conducted via interviews and community forums. Identified key concerns regarding cultural impact and resource allocation, which are being addressed by Cultural Alignment Agent.",
        interventionPoints: [
          { label: "Schedule Follow-up Meeting", impacts: ["Cultural Alignment Agent"] },
          { label: "Draft Public Statement", impacts: [] }
        ],
        lastAction: "4 hours ago",
        statusBadges: ["Human-in-Loop"],
      },
      {
        id: 3,
        opportunityName: "Green Energy Initiative",
        zipCode: "76704",
        stage: "Community Outreach Plan",
        progress: 95,
        statusUpdate: "Community outreach plan finalized; preparing for public hearings.",
        priority: "Low",
        reasoningSummary: "Outreach plan developed based on local demographics and previous successful community engagement strategies. Focus on transparent communication and addressing local concerns.",
        interventionPoints: [
          { label: "Approve Outreach Plan", impacts: [] }
        ],
        lastAction: "1 day ago",
        statusBadges: ["Human-in-Loop"],
      },
    ],
  },
  {
    name: "Cultural Alignment Agent",
    avatar: "🎭",
    opportunities: [
      {
        id: 1,
        opportunityName: "Tribal Cultural Tourism Expansion",
        zipCode: "86045",
        stage: "Cultural Impact Review",
        progress: 70,
        statusUpdate: "Alignment score: 80% — minor location concern near sacred site identified.",
        priority: "High",
        reasoningSummary: "Cultural impact assessment based on Tribal Cultural Guidelines and sacred site registry. Proximity to ceremonial grounds requires mitigation strategies to ensure respect and preservation.",
        interventionPoints: [
          { label: "Propose Site Adjustment", impacts: ["Feasibility Reviewer Agent", "Scenario Planner Agent"] },
          { label: "Consult Elder Council", impacts: ["Stakeholder Engagement Agent"] }
        ],
        lastAction: "5 hours ago",
        statusBadges: ["RAG Used", "Policy Check Passed"],
      },
      {
        id: 2,
        opportunityName: "Tech Hub Development",
        zipCode: "62901",
        stage: "Cultural Sensitivity Review",
        progress: 60,
        statusUpdate: "Reviewing cultural sensitivity of proposed tech hub design and naming conventions.",
        priority: "Low",
        reasoningSummary: "Initial review of architectural plans and proposed branding for cultural appropriateness. Identified potential areas for local cultural integration.",
        interventionPoints: [
          { label: "Suggest Design Revisions", impacts: [] }
        ],
        lastAction: "4 days ago",
        statusBadges: ["Policy Check Passed"],
      },
    ],
  },
  {
    name: "Feasibility Reviewer Agent",
    avatar: "✅",
    opportunities: [
      {
        id: 1,
        opportunityName: "Tribal Cultural Tourism Expansion",
        zipCode: "86045",
        stage: "Final Feasibility Report",
        progress: 95,
        statusUpdate: "Feasibility rating: HIGH — minor supply chain risk for specialized cultural materials.",
        priority: "Medium",
        reasoningSummary: "Overall feasibility is high, considering financial projections and infrastructure. Identified a minor supply chain risk for specific cultural building materials, requiring early procurement planning.",
        interventionPoints: [
          { label: "Approve Final Report", impacts: ["All Agents"] },
          { label: "Review Supply Chain Risk", impacts: ["Scenario Planner Agent"] }
        ],
        lastAction: "30 minutes ago",
        statusBadges: ["RAG Used", "Human-in-Loop"],
      },
      {
        id: 4,
        opportunityName: "Carbondale Industrial Zoning",
        zipCode: "62901",
        stage: "Environmental Impact",
        progress: 70,
        statusUpdate: "Assessing environmental impact of industrial park expansion.",
        priority: "Medium",
        reasoningSummary: "Environmental impact assessment based on local regulations and ecological surveys. Identified potential water runoff concerns requiring mitigation.",
        interventionPoints: [
          { label: "Request Mitigation Plan", impacts: [] }
        ],
        lastAction: "2 days ago",
        statusBadges: ["Policy Check Passed"],
      },
    ],
  }
]

const initialMockActivity = [
  {
    id: 1,
    agent: "Feasibility Reviewer Agent",
    action: "Completed final feasibility assessment for Tribal Cultural Tourism Expansion",
    opportunity: "Tribal Cultural Tourism Expansion",
    timestamp: "30 minutes ago",
    type: "completion"
  },
  {
    id: 2,
    agent: "Cultural Alignment Agent",
    action: "Flagged minor location concern for sacred site proximity in Tribal Cultural Tourism Expansion",
    opportunity: "Tribal Cultural Tourism Expansion",
    timestamp: "5 hours ago",
    type: "issue"
  },
  {
    id: 3,
    agent: "Stakeholder Engagement Agent",
    action: "Completed sentiment analysis of tribal council for Tribal Cultural Tourism Expansion",
    opportunity: "Tribal Cultural Tourism Expansion",
    timestamp: "4 hours ago",
    type: "completion"
  },
  {
    id: 4,
    agent: "Scenario Planner Agent",
    action: "Generated optimal ROI scenario for Tribal Cultural Tourism Expansion",
    opportunity: "Tribal Cultural Tourism Expansion",
    timestamp: "3 hours ago",
    type: "completion"
  },
  {
    id: 5,
    agent: "Housing Demand Agent",
    action: "Adjusting housing mix for Carbondale Industrial Zoning",
    opportunity: "Carbondale Industrial Zoning",
    timestamp: "1 day ago",
    type: "action"
  },
  {
    id: 6,
    agent: "Industry Intelligence Agent",
    action: "Gathering initial economic data for Waco Downtown Revitalization",
    opportunity: "Waco Downtown Revitalization",
    timestamp: "2 days ago",
    type: "action"
  }
]

const mockLogs = [
  {
    id: 1,
    agent: "Feasibility Reviewer Agent",
    timestamp: "2024-01-15 15:30",
    message: "Final feasibility assessment complete. Project rated HIGH feasibility with minor supply chain considerations for specialized cultural materials.",
    type: "success",
    opportunity: "Tribal Cultural Tourism Expansion"
  },
  {
    id: 2,
    agent: "Cultural Alignment Agent",
    timestamp: "2024-01-15 10:15",
    message: "Cultural alignment analysis shows 80% compatibility. Minor concern: proposed location within 0.5 miles of sacred ceremonial grounds. Recommend site adjustment.",
    type: "warning",
    opportunity: "Tribal Cultural Tourism Expansion"
  },
  {
    id: 3,
    agent: "Stakeholder Engagement Agent",
    timestamp: "2024-01-15 11:20",
    message: "Stakeholder sentiment analysis complete. 3 of 4 council members express positive support. Elder Johnson has concerns about visitor impact on traditional practices.",
    type: "info",
    opportunity: "Tribal Cultural Tourism Expansion"
  },
  {
    id: 4,
    agent: "Scenario Planner Agent",
    timestamp: "2024-01-15 12:45",
    message: "Optimal scenario identified: 45-room lodge + 200-seat performance venue + cultural center expansion. Projected 5-year ROI: $6.4M with 85 permanent jobs created.",
    type: "success",
    opportunity: "Tribal Cultural Tourism Expansion"
  },
  {
    id: 5,
    agent: "Housing Demand Agent",
    timestamp: "2024-01-15 13:10",
    message: "Lodging gap analysis reveals 85-room shortage during peak cultural event seasons (June-September). Current regional capacity insufficient for projected visitor increase.",
    type: "info",
    opportunity: "Tribal Cultural Tourism Expansion"
  },
  {
    id: 6,
    agent: "Industry Intelligence Agent",
    timestamp: "2024-01-15 09:30",
    message: "Market demand analysis complete. Regional cultural tourism growing 12% annually. Native American cultural experiences show highest visitor satisfaction (4.7/5 rating).",
    type: "success",
    opportunity: "Tribal Cultural Tourism Expansion"
  },
  {
    id: 7,
    agent: "Housing Demand Agent",
    timestamp: "2024-01-14 16:00",
    message: "Initiated housing mix adjustment for Carbondale Industrial Zoning based on preliminary workforce projections.",
    type: "info",
    opportunity: "Carbondale Industrial Zoning"
  },
  {
    id: 8,
    agent: "Industry Intelligence Agent",
    timestamp: "2024-01-13 11:00",
    message: "Began initial economic data collection for Waco Downtown Revitalization. Focusing on retail and service sector trends.",
    type: "info",
    opportunity: "Waco Downtown Revitalization"
  }
]

interface Opportunity {
  id: number;
  title: string;
  status: string;
  stage: string;
  dueDate: string;
  activeAgent: string;
  owner: string;
  priority: string;
  issues: number;
  summary: string;
  type: string;
  zipCode: string;
  planningVariables: any;
  financials: {
    roi: string;
    irr: string;
    breakevenYear: number | string;
    npv: string;
  };
  auditLog: { who: string; when: string; what: string; }[];
}

interface AgentOpportunity {
  id: number;
  opportunityName: string;
  zipCode: string;
  stage: string;
  progress: number;
  statusUpdate: string;
  priority: string;
  reasoningSummary: string;
  interventionPoints: { label: string; impacts: string[]; }[];
  lastAction: string;
  statusBadges: string[];
}

interface Agent {
  name: string;
  avatar: string;
  opportunities: AgentOpportunity[];
}

interface Document {
  id: string;
  title: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  parseStatus: 'Pending' | 'Complete' | 'Failed';
  embeddingProgress: number;
  source: string;
  confidentiality: 'Public' | 'Internal' | 'Restricted';
  expirationDate?: string;
  tiedOpportunities: number[]; // Array of opportunity IDs
  tags: string[];
  uploadedBy: string;
  uploadedWhen: string;
  consumedByAgents: string[]; // Array of agent names
  excerpt?: string[]; // For "View Excerpt"
  isRetired?: boolean;
}

interface PromptProfile {
  agentName: string;
  opportunityId?: number; // Optional, if profile is specific to an opportunity
  isDefault: boolean;
  tone: 'Neutral' | 'Civic-Professional' | 'Community-Friendly';
  brandingHints: string;
  requiredTerms: string[];
  avoidTerms: string[];
  readingLevel: number; // e.g., 8-12, 16 (Professional)
  outputStyle: 'Executive Brief' | 'Community Summary' | 'Technical Appendix';
  language: 'English' | 'Spanish';
}

const initialMockDocuments: Document[] = [
  {
    id: 'doc-1',
    title: '2025 NTIA Broadband Equity Guidelines',
    fileName: 'NTIA_Broadband_Guidelines.pdf',
    fileType: 'PDF',
    fileSize: '2.5MB',
    parseStatus: 'Complete',
    embeddingProgress: 100,
    source: 'HUD',
    confidentiality: 'Public',
    tiedOpportunities: [6], // Pine Bluff
    tags: ['Grant Guidelines', 'Infrastructure'],
    uploadedBy: 'Admin',
    uploadedWhen: '2024-01-28 10:00',
    consumedByAgents: ['Feasibility Reviewer Agent'],
    excerpt: ["The 2025 NTIA Broadband Equity Guidelines emphasize equitable access.", "Funding will prioritize projects demonstrating community impact.", "Compliance with federal regulations is mandatory for all applicants."]
  },
  {
    id: 'doc-2',
    title: 'Navajo Nation Cultural Overlay Handbook',
    fileName: 'Navajo_Cultural_Handbook.pdf',
    fileType: 'PDF',
    fileSize: '1.8MB',
    parseStatus: 'Complete',
    embeddingProgress: 100,
    source: 'Tribal Protocol',
    confidentiality: 'Restricted',
    tiedOpportunities: [1], // Tuba City
    tags: ['Tribal Protocols', 'Cultural Considerations'],
    uploadedBy: 'Admin',
    uploadedWhen: '2024-01-27 14:30',
    consumedByAgents: ['Cultural Alignment Agent'],
    excerpt: ["This handbook outlines sacred sites and cultural practices.", "Development near ceremonial grounds requires specific consultation.", "Respect for traditional knowledge is paramount in all projects."]
  },
  {
    id: 'doc-3',
    title: 'Carbondale Traffic Count CSV',
    fileName: 'Carbondale_Traffic_Count.csv',
    fileType: 'XLSX/CSV',
    fileSize: '0.5MB',
    parseStatus: 'Complete',
    embeddingProgress: 100,
    source: 'Utility',
    confidentiality: 'Internal',
    tiedOpportunities: [4], // Carbondale
    tags: ['Traffic Data', 'Infrastructure'],
    uploadedBy: 'Admin',
    uploadedWhen: '2024-01-26 09:00',
    consumedByAgents: ['Housing Demand Agent'],
    excerpt: ["Peak hour traffic counts show congestion at Main St. intersection.", "Average daily vehicle miles traveled increased by 5% last quarter.", "New industrial park will add an estimated 1,200 daily vehicle trips."]
  },
  {
    id: 'doc-4',
    title: 'Hoopa Valley Tourism Survey 2024',
    fileName: 'Hoopa_Tourism_Survey.pdf',
    fileType: 'PDF',
    fileSize: '3.1MB',
    parseStatus: 'Complete',
    embeddingProgress: 100,
    source: 'Community',
    confidentiality: 'Public',
    tiedOpportunities: [7], // Hoopa Valley
    tags: ['Tourism', 'Community Feedback'],
    uploadedBy: 'Admin',
    uploadedWhen: '2024-01-25 11:45',
    consumedByAgents: ['Industry Intelligence Agent', 'Stakeholder Engagement Agent'],
    excerpt: ["90% of residents support sustainable tourism initiatives.", "Key attractions identified include river access and cultural events.", "Concerns raised about infrastructure strain and environmental impact."]
  },
  {
    id: 'doc-5',
    title: 'Waco Industrial Land Use Map',
    fileName: 'Waco_Industrial_Map.kmz',
    fileType: 'GIS/KMZ',
    fileSize: '1.2MB',
    parseStatus: 'Complete',
    embeddingProgress: 100,
    source: 'City Planning',
    confidentiality: 'Public',
    tiedOpportunities: [5], // Waco
    tags: ['Zoning Ordinance', 'Land Use'],
    uploadedBy: 'Admin',
    uploadedWhen: '2024-01-24 16:00',
    consumedByAgents: ['Industry Intelligence Agent'],
    excerpt: ["Map highlights available industrial parcels for development.", "Zoning regulations permit light manufacturing and logistics.", "Proximity to rail lines and highway access points are key features."]
  }
];

const initialMockPromptProfiles: PromptProfile[] = [
  {
    agentName: "Industry Intelligence Agent",
    isDefault: true,
    tone: "Civic-Professional",
    brandingHints: "Use LocalFlow brand voice, focus on data-driven insights.",
    requiredTerms: ["market analysis", "economic indicators"],
    avoidTerms: ["fluffy", "speculative"],
    readingLevel: 12, // High School
    outputStyle: "Executive Brief",
    language: "English",
  },
  {
    agentName: "Stakeholder Engagement Agent",
    isDefault: false,
    tone: "Community-Friendly",
    brandingHints: "Avoid jargon, use empathetic language.",
    requiredTerms: ["community benefit", "collaboration"],
    avoidTerms: ["synergy", "leverage"],
    readingLevel: 8, // Grade 8
    outputStyle: "Community Summary",
    language: "English",
  },
];


export default function MayaFlowDashboard() {
  const { toast } = useToast();
  const [activeView, setActiveView] = useState('dashboard')
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const [opportunities, setOpportunities] = useState<Opportunity[]>(initialMockOpportunities);
  const [agents, setAgents] = useState<Agent[]>(initialMockAgents);
  const [activity, setActivity] = useState(initialMockActivity);

  const [agentSelectedOpportunity, setAgentSelectedOpportunity] = useState<Record<string, number>>(() => {
    const initialSelections: Record<string, number> = {};
    initialMockAgents.forEach(agent => {
      if (agent.opportunities.length > 0) {
        initialSelections[agent.name] = agent.opportunities[0].id;
      }
    });
    return initialSelections;
  });

  const [selectedPlanningOpportunityId, setSelectedPlanningOpportunityId] = useState<number | null>(null);
  const [globalInterestRate, setGlobalInterestRate] = useState(0);
  const [globalMaterialCost, setGlobalMaterialCost] = useState(0);
  const [globalLaborCost, setGlobalLaborCost] = useState(0);
  const [newOpportunityModalOpen, setNewOpportunityModalOpen] = useState(false);
  const [newOpportunityData, setNewOpportunityData] = useState({
    title: '',
    zipCode: '',
    region: '',
    type: 'Tourism',
    leadAgency: '',
    primaryContactName: '',
    primaryContactEmail: '',
    primaryContactPhone: '',
    parcelIds: '',
    siteAddress: '',
    zoningDesignation: '',
    siteSize: '',
    currentUse: '',
    environmentalConstraints: '',
    utilitiesStatus: '',
    trafficNotes: '',
    targetIndustries: '',
    incentivesAvailable: '',
    estimatedCAPEX: '',
    estimatedOPEX: '',
    fundingSources: '',
    expectedStartDate: '',
    expectedOperationalDate: '',
    workforcePartners: '',
    requiredSkills: '',
    housingSupportAssumptions: '',
    stakeholderPlan: '',
    culturalConsiderations: '',
    timeHorizon: '10',
    discountRate: '8',
    cashFlowPattern: 'linear',
    uploads: null,
  });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isRecalculating, setIsRecalculating] = useState(false);

  const [activeTrainingTab, setActiveTrainingTab] = useState<'document-memory' | 'prompt-training'>('document-memory');
  const [selectedOpportunityForTraining, setSelectedOpportunityForTraining] = useState<number | null>(null);
  const [selectedAgentForTraining, setSelectedAgentForTraining] = useState<string | null>(null);
  const [documents, setDocuments] = useState<Document[]>(initialMockDocuments);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [documentFilters, setDocumentFilters] = useState<{
    opportunity: string[];
    agent: string[];
    fileType: string[];
    tag: string[];
  }>({
    opportunity: [],
    agent: [],
    fileType: [],
    tag: [],
  });
  const [promptProfiles, setPromptProfiles] = useState<PromptProfile[]>(initialMockPromptProfiles);
  const [currentPromptProfile, setCurrentPromptProfile] = useState<PromptProfile | null>(null);
  const [promptSandboxInput, setPromptSandboxInput] = useState('');
  const [promptSandboxOutput, setPromptSandboxOutput] = useState('');
  const [promptSandboxOutputA, setPromptSandboxOutputA] = useState('');
  const [promptSandboxOutputB, setPromptSandboxOutputB] = useState('');
  const [promptSandboxMode, setPromptSandboxMode] = useState<'quick-test' | 'a-b-compare'>('quick-test');
  const [promptProfileA, setPromptProfileA] = useState<PromptProfile | null>(null);
  const [promptProfileB, setPromptProfileB] = useState<PromptProfile | null>(null);
  const [isMobileTrainingPanelOpen, setIsMobileTrainingPanelOpen] = useState(false);
  const [excerptModalOpen, setExcerptModalOpen] = useState(false);
  const [currentExcerpt, setCurrentExcerpt] = useState<string[]>([]);

  const [isFeasibilityRejectModalOpen, setIsFeasibilityRejectModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [recommendedActionsInput, setRecommendedActionsInput] = useState('');
  const [selectedFeasibilityOpportunity, setSelectedFeasibilityOpportunity] = useState<Opportunity | null>(null);


  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768)
      }
    }
    checkMobile()
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkMobile)
      return () => window.removeEventListener('resize', checkMobile)
    }
  }, [])

  useEffect(() => {
    if (selectedAgentForTraining) {
      const defaultProfile = promptProfiles.find(p => p.agentName === selectedAgentForTraining && p.isDefault);
      setCurrentPromptProfile(defaultProfile || {
        agentName: selectedAgentForTraining,
        isDefault: true,
        tone: "Neutral",
        brandingHints: "",
        requiredTerms: [],
        avoidTerms: [],
        readingLevel: 10,
        outputStyle: "Executive Brief",
        language: "English",
      });
    } else {
      setCurrentPromptProfile(null);
    }
  }, [selectedAgentForTraining, promptProfiles]);

  const handleFileUpload = useCallback((event: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>) => {
    const files = (event as React.DragEvent<HTMLDivElement>).dataTransfer ? (event as React.DragEvent<HTMLDivElement>).dataTransfer.files : (event as React.ChangeEvent<HTMLInputElement>).target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      const newDoc: Document = {
        id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: file.name.split('.').slice(0, -1).join('.'),
        fileName: file.name,
        fileType: file.name.split('.').pop()?.toUpperCase() || 'UNKNOWN',
        fileSize: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
        parseStatus: 'Pending',
        embeddingProgress: 0,
        source: 'User Upload',
        confidentiality: 'Internal',
        tiedOpportunities: [],
        tags: [],
        uploadedBy: 'Current User',
        uploadedWhen: new Date().toLocaleString(),
        consumedByAgents: [],
      };

      setDocuments(prev => [...prev, newDoc]);
      toast({
        title: "File Uploaded",
        description: `${file.name} is being processed.`,
      });

      setTimeout(() => {
        setDocuments(prev => prev.map(doc =>
          doc.id === newDoc.id ? { ...doc, parseStatus: 'Complete', embeddingProgress: 100 } : doc
        ));
        toast({
          title: "Processing Complete",
          description: `${file.name} has been processed and embedded.`,
        });
        setOpportunities(prevOpportunities => prevOpportunities.map(opp => {
          if (newDoc.tiedOpportunities.includes(opp.id)) {
            return {
              ...opp,
              auditLog: [{
                who: "System",
                when: new Date().toLocaleString(),
                what: `New memory available from document "${newDoc.title}"`
              }, ...opp.auditLog]
            };
          }
          return opp;
        }));
      }, 2000);
    });
  }, [toast, setDocuments, setOpportunities]);

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);


  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'opportunities', label: 'Opportunities', icon: List },
    { id: 'agents', label: 'Agents', icon: Bot },
    { id: 'logs', label: 'Logs', icon: FileText },
    { id: 'planning', label: 'Planning', icon: BarChart3 },
    { id: 'training', label: 'Training', icon: GraduationCap }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-500'
      case 'Planning': return 'bg-yellow-500'
      case 'Review': return 'bg-purple-500'
      case 'Completed': return 'bg-green-500'
      case 'Discovery': return 'bg-gray-500'
      case 'Rejected - Re-evaluating': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500'
      case 'Medium': return 'bg-yellow-500'
      case 'Low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const renderHeader = () => (
    <div className="bg-[#111a26] border-b border-gray-800 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl md:text-2xl font-bold text-white">
            LocalFlow
          </h1>
          <span className="text-gray-400">—</span>
          <a
            href="https://www.aLocal.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0583f2] hover:text-blue-400 transition-colors flex items-center space-x-1"
          >
            <span className="text-sm md:text-base">powered by aLocal.ai</span>
            <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
          </a>
        </div>
        <div className="flex items-center space-x-2">
          {!isMobile && (
            <Badge variant="outline" className="text-green-400 border-green-400">
              Live Demo
            </Badge>
          )}
          <Button
            onClick={() => setNewOpportunityModalOpen(true)}
            className="bg-[#0583f2] text-white hover:bg-blue-600 focus-visible:ring-2 focus-visible:ring-[#0583f2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111a26] h-9 px-4 py-2 rounded-md text-sm font-medium active:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" /> New Opportunity
          </Button>
        </div>
      </div>
    </div>
  )

  const renderNavigation = () => {
    if (isMobile) {
      return (
        <div className="fixed bottom-0 left-0 right-0 bg-[#111a26] border-t border-gray-800 p-2 z-50">
          <div className="flex justify-around">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`flex flex-col items-center p-2 rounded-lg transition-colors ${activeView === item.id
                    ? 'text-white bg-[#0583f2] font-bold'
                    : 'text-gray-400 hover:text-white'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs mt-1">{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      )
    }

    return (
      <div className="w-64 bg-[#111a26] border-r border-gray-800 p-4">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${activeView === item.id
                  ? 'text-white bg-[#0583f2] font-bold'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>
    )
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-[#0583f2]" />
              <div>
                <p className="text-2xl font-bold text-white">{opportunities.length}</p>
                <p className="text-sm text-gray-400">Active Opportunities</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold text-white">{opportunities.filter(o => o.issues > 0).length}</p>
                <p className="text-sm text-gray-400">Issues</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-white">{agents.length}</p>
                <p className="text-sm text-gray-400">Agents Active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold text-white">4</p>
                <p className="text-sm text-gray-400">Council Members Engaged</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span>Recent Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activity.map((activityItem) => (
              <div key={activityItem.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-700/50">
                <div className={`w-2 h-2 rounded-full mt-2 ${activityItem.type === 'completion' ? 'bg-green-500' :
                  activityItem.type === 'issue' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                <div className="flex-1">
                  <p className="text-white font-medium">{activityItem.action}</p>
                  <p className="text-sm text-gray-400">
                    {activityItem.agent} • {activityItem.opportunity}
                  </p>
                  <p className="text-xs text-gray-500">{activityItem.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderOpportunities = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1">
          <Input
            placeholder="Search opportunities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
        >
          <option value="all">All Status</option>
          <option value="In Progress">In Progress</option>
          <option value="Planning">Planning</option>
          <option value="Review">Review</option>
          <option value="Discovery">Discovery</option>
          <option value="Rejected - Re-evaluating">Rejected - Re-evaluating</option>
        </select>
      </div>

      {/* Opportunity Cards */}
      <div className="grid gap-4">
        {opportunities
          .filter(opp =>
            (filterStatus === 'all' || opp.status === filterStatus) &&
            opp.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((opportunity) => (
            <Card
              key={opportunity.id}
              className="bg-gray-800 border-gray-700 cursor-pointer hover:bg-gray-700/50 transition-colors"
              onClick={() => setSelectedOpportunity(opportunity)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-white">{opportunity.title}</h3>
                      <Badge className={`${getStatusColor(opportunity.status)} text-white`}>
                        {opportunity.status}
                      </Badge>
                      <Badge className={`${getPriorityColor(opportunity.priority)} text-white`}>
                        {opportunity.priority}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{opportunity.summary}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Stage: {opportunity.stage}</span>
                      <span>Due: {opportunity.dueDate}</span>
                      <span>Owner: {opportunity.owner}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="outline" className="text-[#0583f2] border-[#0583f2]">
                        {opportunity.activeAgent}
                      </Badge>
                      {opportunity.issues > 0 && (
                        <Badge variant="outline" className="text-yellow-500 border-yellow-500">
                          {opportunity.issues} Issues
                        </Badge>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )

  const agentDisplayOrder = [
    "Industry Intelligence Agent",
    "Stakeholder Engagement Agent",
    "Cultural Alignment Agent",
    "Housing Demand Agent",
    "Scenario Planner Agent",
    "Feasibility Reviewer Agent",
  ];

  const renderAgents = () => (
    <div className="grid gap-4">
      {agentDisplayOrder.map(agentName => {
        const agent = agents.find(a => a.name === agentName);
        if (!agent) return null;

        const currentOpportunityData = agent.opportunities.find(
          (opp) => opp.id === agentSelectedOpportunity[agent.name]
        );
        const taskQueuePreview = agent.opportunities.filter(
          (opp) => opp.id !== agentSelectedOpportunity[agent.name]
        );

        if (!currentOpportunityData) return null;

        return (
          <Card key={agent.name} className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4 mb-4">
                <div className="text-2xl">{agent.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                    <div className="flex space-x-1">
                      {currentOpportunityData.statusBadges.map((badge, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className={`text-xs ${badge === 'RAG Used' ? 'text-blue-400 border-blue-400' :
                            badge === 'Human-in-Loop' ? 'text-yellow-400 border-yellow-400' :
                              'text-green-400 border-green-400'
                            }`}
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Opportunity Switcher */}
                  {agent.opportunities.length > 1 && (
                    <div className="mb-3">
                      <label htmlFor={`agent-opp-switcher-${agent.name}`} className="sr-only">Select Opportunity for {agent.name}</label>
                      <select
                        id={`agent-opp-switcher-${agent.name}`}
                        value={agentSelectedOpportunity[agent.name]}
                        onChange={(e) =>
                          setAgentSelectedOpportunity((prev) => ({
                            ...prev,
                            [agent.name]: parseInt(e.target.value),
                          }))
                        }
                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white text-sm"
                      >
                        {agent.opportunities.map((opp) => (
                          <option key={opp.id} value={opp.id}>
                            {opp.zipCode} – {opp.opportunityName}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Active Task */}
                  <div className="mb-3">
                    <h4 className="text-sm text-gray-400 mb-1">Active Task:</h4>
                    <div className="flex items-center justify-between">
                      <button
                        className="text-[#0583f2] hover:text-blue-400 font-medium text-base text-left"
                        onClick={() => setSelectedOpportunity(opportunities.find(o => o.id === currentOpportunityData.id) || null)}
                      >
                        {currentOpportunityData.opportunityName}
                      </button>
                      <Badge className={`${getPriorityColor(currentOpportunityData.priority)} text-white`}>
                        {currentOpportunityData.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-300 mt-1">
                      {currentOpportunityData.zipCode} – {currentOpportunityData.stage}, {currentOpportunityData.progress}% complete. {currentOpportunityData.statusUpdate}
                    </p>
                    <Progress value={currentOpportunityData.progress} className="h-1 mt-2 bg-gray-700 [&>*]:bg-[#0583f2]" />
                  </div>

                  {/* Task Queue Preview */}
                  {taskQueuePreview.length > 0 && (
                    <div className="mb-3">
                      <h4 className="text-sm text-gray-400 mb-1">Task Queue Preview:</h4>
                      <ul className="space-y-1">
                        {taskQueuePreview.slice(0, 2).map((task, i) => (
                          <li key={i} className="flex items-center justify-between text-sm text-gray-300">
                            <span>{task.zipCode} – {task.opportunityName}</span>
                            <div className="flex items-center space-x-2">
                              <Progress value={task.progress} className="h-1 w-16 bg-gray-700 [&>*]:bg-gray-500" />
                              <Badge className={`${getPriorityColor(task.priority)} text-white text-[10px] px-1 py-0.5`}>
                                {task.priority}
                              </Badge>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Reasoning Summary */}
                  <Collapsible className="mb-3">
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-sm text-gray-400 hover:text-white">
                      Reasoning Summary
                      <ChevronDown className="w-4 h-4 collapsible-icon" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="text-sm text-gray-300 mt-2">
                      {currentOpportunityData.reasoningSummary}
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Intervention Points */}
                  {currentOpportunityData.interventionPoints && currentOpportunityData.interventionPoints.length > 0 && (
                    <div>
                      <h4 className="text-sm text-gray-400 mb-2">Intervention Points:</h4>
                      <div className="flex flex-wrap gap-2">
                        {currentOpportunityData.interventionPoints.map((point, i) => (
                          <Button
                            key={i}
                            variant="outline"
                            size="sm"
                            className="text-xs h-auto py-1 px-2 border-[#0583f2] text-[#0583f2] hover:bg-gray-700 hover:text-white active:bg-[#0583f2] active:text-white focus-visible:ring-2 focus-visible:ring-[#0583f2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111a26] bg-transparent"
                          >
                            {point.label}
                            {point.impacts && point.impacts.length > 0 && (
                              <Badge variant="secondary" className="ml-2 text-[10px] bg-gray-700 text-gray-300">
                                Impact: {point.impacts.join(', ')}
                              </Badge>
                            )}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Feasibility Reviewer Agent specific actions */}
                  {agent.name === "Feasibility Reviewer Agent" && (
                    <div className="mt-4 flex gap-2">
                      <Button
                        onClick={() => handleApproveFeasibility(currentOpportunityData.id)}
                        className="bg-green-600 text-white hover:bg-green-700 active:bg-green-800"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" /> Approve Feasibility
                      </Button>
                      <Button
                        onClick={() => {
                          setSelectedFeasibilityOpportunity(opportunities.find(o => o.id === currentOpportunityData.id) || null);
                          setIsFeasibilityRejectModalOpen(true);
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white border-red-600"
                      >
                        <X className="w-4 h-4 mr-2" /> Reject Feasibility
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  )

  const handleApproveFeasibility = (opportunityId: number) => {
    setOpportunities(prevOpportunities => prevOpportunities.map(opp => {
      if (opp.id === opportunityId) {
        return {
          ...opp,
          status: "Completed",
          stage: "Approved",
          auditLog: [{ who: "Economic Developer", when: new Date().toLocaleString(), what: "Feasibility approved." }, ...opp.auditLog]
        };
      }
      return opp;
    }));

    setAgents(prevAgents => prevAgents.map(agent => {
      if (agent.name === "Feasibility Reviewer Agent") {
        return {
          ...agent,
          opportunities: agent.opportunities.map(opp => {
            if (opp.id === opportunityId) {
              return {
                ...opp,
                progress: 100,
                statusUpdate: "Feasibility approved. Moving to next stage.",
                statusBadges: [...opp.statusBadges, "Approved"]
              };
            }
            return opp;
          })
        };
      }
      return agent;
    }));

    toast({
      title: "Feasibility Approved",
      description: `Feasibility for opportunity ID ${opportunityId} has been approved.`,
      variant: "default"
    });
  };

  const handleSubmitFeasibilityRejection = () => {
    if (!selectedFeasibilityOpportunity) return;

    const opportunityId = selectedFeasibilityOpportunity.id;

    setOpportunities(prevOpportunities => prevOpportunities.map(opp => {
      if (opp.id === opportunityId) {
        return {
          ...opp,
          status: "Rejected - Re-evaluating",
          stage: "Feasibility Re-evaluation",
          issues: (opp.issues || 0) + 1,
          auditLog: [{
            who: "Economic Developer",
            when: new Date().toLocaleString(),
            what: `Feasibility rejected for reasons: "${rejectionReason}". Recommended actions: "${recommendedActionsInput}". Re-evaluation initiated.`
          }, ...opp.auditLog]
        };
      }
      return opp;
    }));

    setAgents(prevAgents => prevAgents.map(agent => {
      if (agent.name === "Feasibility Reviewer Agent") {
        return {
          ...agent,
          opportunities: agent.opportunities.map(opp => {
            if (opp.id === opportunityId) {
              return {
                ...opp,
                progress: 10, // Reset progress for re-evaluation
                statusUpdate: `Feasibility rejected. Re-evaluating based on feedback.`,
                reasoningSummary: `Previous feasibility rejected due to: "${rejectionReason}". Focusing on recommended actions: "${recommendedActionsInput}" for re-generation.`,
                priority: "High", // Elevate priority for re-evaluation
                statusBadges: [...opp.statusBadges, "Re-evaluation Needed"].filter((value, index, self) => self.indexOf(value) === index), // Ensure unique badges
              };
            }
            return opp;
          })
        };
      }
      return agent;
    }));

    toast({
      title: "Feasibility Rejected",
      description: `Feasibility for opportunity ID ${opportunityId} has been rejected. Re-evaluation initiated.`,
      variant: "destructive"
    });

    setIsFeasibilityRejectModalOpen(false);
    setRejectionReason('');
    setRecommendedActionsInput('');
    setSelectedFeasibilityOpportunity(null);
  };


  const renderLogs = () => (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <Input
          placeholder="Search logs..."
          className="bg-gray-800 border-gray-700 text-white"
        />
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="space-y-3">
        {mockLogs.map((log) => (
          <Card key={log.id} className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${log.type === 'success' ? 'bg-green-500' :
                  log.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-white">{log.agent}</span>
                    <Badge variant="outline" className="text-xs">
                      {log.opportunity}
                    </Badge>
                  </div>
                  <p className="text-gray-300 text-sm mb-1">{log.message}</p>
                  <p className="text-xs text-gray-500">{log.timestamp}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderPlanning = () => {
    const selectedOpportunityData = opportunities.find(opp => opp.id === selectedPlanningOpportunityId);

    const getPlanningVariablesUI = (opportunity: Opportunity) => {
      if (!opportunity || !opportunity.planningVariables) return null;
      const variables = opportunity.planningVariables;
      const type = opportunity.type;

      const handleSliderChange = (key: string, value: any) => {
        setHasUnsavedChanges(true);
        setIsRecalculating(true);
        setTimeout(() => setIsRecalculating(false), 500);
      };

      switch (type) {
        case "Housing":
          return (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Units (Studio/1Bed/2Bed)</label>
                <div className="flex items-center gap-2">
                  <Input type="number" defaultValue={variables.unitsByMix.studio} onChange={(e) => handleSliderChange('unitsByMix.studio', parseInt(e.target.value))} className="bg-gray-700 border-gray-600 text-white w-1/3" placeholder="Studio" />
                  <Input type="number" defaultValue={variables.unitsByMix.oneBed} onChange={(e) => handleSliderChange('unitsByMix.oneBed', parseInt(e.target.value))} className="bg-gray-700 border-gray-600 text-white w-1/3" placeholder="1 Bed" />
                  <Input type="number" defaultValue={variables.unitsByMix.twoBed} onChange={(e) => handleSliderChange('unitsByMix.twoBed', parseInt(e.target.value))} className="bg-gray-700 border-gray-600 text-white w-1/3" placeholder="2 Bed" />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Average Rent ($)</label>
                <Slider defaultValue={[variables.averageRent]} max={3000} step={50} onValueChange={(val) => handleSliderChange('averageRent', val[0])} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$500</span>
                  <span>Current: ${variables.averageRent}</span>
                  <span>$3000</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Vacancy Rate (%)</label>
                <Slider defaultValue={[variables.vacancy * 100]} max={20} step={1} onValueChange={(val) => handleSliderChange('vacancy', val[0] / 100)} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>Current: {variables.vacancy * 100}%</span>
                  <span>20%</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Absorption Rate (%)</label>
                <Slider defaultValue={[variables.absorption * 100]} max={100} step={5} onValueChange={(val) => handleSliderChange('absorption', val[0] / 100)} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>Current: {variables.absorption * 100}%</span>
                  <span>100%</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Construction Cost per Sq. Ft. ($)</label>
                <Slider defaultValue={[variables.constructionCostPerSqFt]} max={500} step={10} onValueChange={(val) => handleSliderChange('constructionCostPerSqFt', val[0])} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$100</span>
                  <span>Current: ${variables.constructionCostPerSqFt}</span>
                  <span>$500</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Soft Costs (%)</label>
                <Slider defaultValue={[variables.softCostsPct * 100]} max={30} step={1} onValueChange={(val) => handleSliderChange('softCostsPct', val[0] / 100)} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>Current: {variables.softCostsPct * 100}%</span>
                  <span>30%</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Operating Reserve (Months)</label>
                <Slider defaultValue={[variables.operatingReserveMonths]} max={24} step={1} onValueChange={(val) => handleSliderChange('operatingReserveMonths', val[0])} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1</span>
                  <span>Current: {variables.operatingReserveMonths}</span>
                  <span>24</span>
                </div>
              </div>
            </div>
          );
        case "Industry":
          return (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Industrial Space Demand (sq ft)</label>
                <Slider defaultValue={[variables.sqftDemand]} max={200000} step={5000} onValueChange={(val) => handleSliderChange('sqftDemand', val[0])} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>10,000</span>
                  <span>Current: {variables.sqftDemand}</span>
                  <span>200,000</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Fit-out Cost ($/sq ft)</label>
                <Slider defaultValue={[variables.fitOutCost]} max={200} step={5} onValueChange={(val) => handleSliderChange('fitOutCost', val[0])} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$10</span>
                  <span>Current: ${variables.fitOutCost}</span>
                  <span>$200</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Equipment CAPEX ($)</label>
                <Slider defaultValue={[variables.equipmentCAPEX / 1000000]} max={50} step={1} onValueChange={(val) => handleSliderChange('equipmentCAPEX', val[0] * 1000000)} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$1M</span>
                  <span>Current: ${variables.equipmentCAPEX / 1000000}M</span>
                  <span>$50M</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Workforce Availability Index (0-1)</label>
                <Slider defaultValue={[variables.workforceAvailabilityIndex * 100]} max={100} step={5} onValueChange={(val) => handleSliderChange('workforceAvailabilityIndex', val[0] / 100)} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0</span>
                  <span>Current: {variables.workforceAvailabilityIndex}</span>
                  <span>1</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Logistics Distance (miles)</label>
                <Slider defaultValue={[variables.logisticsDistance]} max={100} step={5} onValueChange={(val) => handleSliderChange('logisticsDistance', val[0])} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0</span>
                  <span>Current: {variables.logisticsDistance} miles</span>
                  <span>100</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Incentive Assumptions (%)</label>
                <Slider defaultValue={[variables.incentiveAssumptions * 100]} max={30} step={1} onValueChange={(val) => handleSliderChange('incentiveAssumptions', val[0] / 100)} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>Current: {variables.incentiveAssumptions * 100}%</span>
                  <span>30%</span>
                </div>
              </div>
            </div>
          );
        case "Energy":
          return (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">MW Capacity</label>
                <Slider defaultValue={[variables.mwCapacity]} max={50} step={1} onValueChange={(val) => handleSliderChange('mwCapacity', val[0])} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1</span>
                  <span>Current: {variables.mwCapacity} MW</span>
                  <span>50</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">PPA Price ($/kWh)</label>
                <Slider defaultValue={[variables.ppaPrice * 1000]} max={200} step={1} onValueChange={(val) => handleSliderChange('ppaPrice', val[0] / 1000)} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$0.01</span>
                  <span>Current: ${variables.ppaPrice}</span>
                  <span>$0.20</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Interconnect Cost ($)</label>
                <Slider defaultValue={[variables.interconnectCost / 1000000]} max={10} step={0.5} onValueChange={(val) => handleSliderChange('interconnectCost', val[0] * 1000000)} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$0.5M</span>
                  <span>Current: ${variables.interconnectCost / 1000000}M</span>
                  <span>$10M</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Capacity Factor (%)</label>
                <Slider defaultValue={[variables.capacityFactor * 100]} max={100} step={5} onValueChange={(val) => handleSliderChange('capacityFactor', val[0] / 100)} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>Current: {variables.capacityFactor * 100}%</span>
                  <span>100%</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Incentives (%)</label>
                <Slider defaultValue={[variables.incentives * 100]} max={50} step={1} onValueChange={(val) => handleSliderChange('incentives', val[0] / 100)} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>Current: {variables.incentives * 100}%</span>
                  <span>50%</span>
                </div>
              </div>
            </div>
          );
        case "Education":
          return (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Student Capacity</label>
                <Slider defaultValue={[variables.studentCapacity]} max={2000} step={50} onValueChange={(val) => handleSliderChange('studentCapacity', val[0])} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>100</span>
                  <span>Current: {variables.studentCapacity}</span>
                  <span>2000</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Staffing Ratios (students/staff)</label>
                <Slider defaultValue={[variables.staffingRatios]} max={30} step={1} onValueChange={(val) => handleSliderChange('staffingRatios', val[0])} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>5</span>
                  <span>Current: {variables.staffingRatios}</span>
                  <span>30</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Operating Cost per Student ($)</label>
                <Slider defaultValue={[variables.operatingCostPerStudent / 100]} max={200} step={1} onValueChange={(val) => handleSliderChange('operatingCostPerStudent', val[0] * 100)} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$1000</span>
                  <span>Current: ${variables.operatingCostPerStudent}</span>
                  <span>$20000</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Grants (%)</label>
                <Slider defaultValue={[variables.grants * 100]} max={100} step={5} onValueChange={(val) => handleSliderChange('grants', val[0] / 100)} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>Current: {variables.grants * 100}%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          );
        case "Tourism":
        default:
          return (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Annual Visitors</label>
                <Slider defaultValue={[variables.annualVisitors / 1000]} max={500} step={10} onValueChange={(val) => handleSliderChange('annualVisitors', val[0] * 1000)} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>100K</span>
                  <span>Current: {variables.annualVisitors / 1000}K</span>
                  <span>500K</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Average Spend per Visitor ($)</label>
                <Slider defaultValue={[variables.averageSpend]} max={500} step={10} onValueChange={(val) => handleSliderChange('averageSpend', val[0])} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$50</span>
                  <span>Current: ${variables.averageSpend}</span>
                  <span>$500</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Seasonality Index (%)</label>
                <Slider defaultValue={[variables.seasonalityIndex * 100]} max={100} step={5} onValueChange={(val) => handleSliderChange('seasonalityIndex', val[0] / 100)} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>Current: {variables.seasonalityIndex * 100}%</span>
                  <span>100%</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Infrastructure Cost ($)</label>
                <Slider defaultValue={[variables.infraCost / 1000000]} max={20} step={0.5} onValueChange={(val) => handleSliderChange('infraCost', val[0] * 1000000)} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>$1M</span>
                  <span>Current: ${variables.infraCost / 1000000}M</span>
                  <span>$20M</span>
                </div>
              </div>
            </div>
          );
      }
    };

    const handleApplyToAgents = () => {
      if (selectedOpportunityData) {
        const newActivityItem = {
          id: activity.length + 1,
          agent: "Feasibility Reviewer Agent",
          action: `Applied new planning assumptions for ${selectedOpportunityData.title}`,
          opportunity: selectedOpportunityData.title,
          timestamp: "just now",
          type: "action"
        };
        setActivity(prev => [newActivityItem, ...prev]);
        setHasUnsavedChanges(false);
        toast({
          title: "Assumptions Applied",
          description: `New planning assumptions for "${selectedOpportunityData.title}" applied to agents.`,
        });
      }
    };

    const handleDiscardChanges = () => {
      setHasUnsavedChanges(false);
      toast({
        title: "Changes Discarded",
        description: "All unsaved changes have been discarded.",
      });
    };

    const handleSaveScenario = () => {
      setHasUnsavedChanges(false);
      toast({
        title: "Scenario Saved",
        description: "Current planning scenario has been saved.",
      });
    };

    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Select Opportunity</CardTitle>
            </CardHeader>
            <CardContent>
              <select
                value={selectedPlanningOpportunityId || ''}
                onChange={(e) => {
                  setSelectedPlanningOpportunityId(parseInt(e.target.value) || null);
                  setHasUnsavedChanges(false);
                }}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
              >
                <option value="">-- Select an Opportunity --</option>
                {opportunities.map(opp => (
                  <option key={opp.id} value={opp.id}>
                    {opp.title}
                  </option>
                ))}
              </select>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Global Scenario Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm text-gray-400 mb-2 block">Interest Rate Change (%)</Label>
                <Slider defaultValue={[globalInterestRate]} max={10} min={-10} step={0.5} onValueChange={(val) => { setGlobalInterestRate(val[0]); setHasUnsavedChanges(true); setIsRecalculating(true); setTimeout(() => setIsRecalculating(false), 500); }} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>-10%</span>
                  <span>Current: {globalInterestRate}%</span>
                  <span>+10%</span>
                </div>
              </div>
              <div>
                <Label className="text-sm text-gray-400 mb-2 block">Material Cost Change (%)</Label>
                <Slider defaultValue={[globalMaterialCost]} max={20} min={-10} step={1} onValueChange={(val) => { setGlobalMaterialCost(val[0]); setHasUnsavedChanges(true); setIsRecalculating(true); setTimeout(() => setIsRecalculating(false), 500); }} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>-10%</span>
                  <span>Current: {globalMaterialCost}%</span>
                  <span>+20%</span>
                </div>
              </div>
              <div>
                <Label className="text-sm text-gray-400 mb-2 block">Labor Cost Increase (%)</Label>
                <Slider defaultValue={[globalLaborCost]} max={15} min={0} step={0.5} onValueChange={(val) => { setGlobalLaborCost(val[0]); setHasUnsavedChanges(true); setIsRecalculating(true); setTimeout(() => setIsRecalculating(false), 500); }} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>Current: {globalLaborCost}%</span>
                  <span>+15%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Capital Structure Inputs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm text-gray-400 mb-2 block">Cost of Debt (%)</Label>
                <Slider defaultValue={[5]} max={20} min={0} step={1} onValueChange={(val) => { setHasUnsavedChanges(true); setIsRecalculating(true); setTimeout(() => setIsRecalculating(false), 500); }} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>Current: 5%</span>
                  <span>20%</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Debt is typically cheaper than equity capital and can improve ROE if used responsibly.</p>
              </div>
              <div>
                <Label className="text-sm text-gray-400 mb-2 block">Cost of Equity (%)</Label>
                <Slider defaultValue={[10]} max={30} min={0} step={1} onValueChange={(val) => { setHasUnsavedChanges(true); setIsRecalculating(true); setTimeout(() => setIsRecalculating(false), 500); }} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>Current: 10%</span>
                  <span>30%</span>
                </div>
              </div>
              <div>
                <Label className="text-sm text-gray-400 mb-2 block">Loan-to-Value Ratio (LTV) (%)</Label>
                <Slider defaultValue={[50]} max={100} min={0} step={5} onValueChange={(val) => { setHasUnsavedChanges(true); setIsRecalculating(true); setTimeout(() => setIsRecalculating(false), 500); }} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>Current: 50%</span>
                  <span>100%</span>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Main Planning Area */}
        <div className="lg:col-span-2 space-y-6">
          {selectedOpportunityData ? (
            <>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <span className="text-white">Opportunities</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">{selectedOpportunityData.title}</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-[#0583f2]">Planning</span>
              </div>
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <span>{selectedOpportunityData.title} Variables ({selectedOpportunityData.type})</span>
                    {isRecalculating && (
                      <Badge variant="outline" className="text-blue-400 border-blue-400 animate-pulse">
                        <RefreshCw className="w-3 h-3 mr-1" /> Recalculating...
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {getPlanningVariablesUI(selectedOpportunityData)}
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Financial Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm text-gray-400 mb-2 block">Discount Rate (%)</Label>
                    <Input type="number" defaultValue={selectedOpportunityData.financials.irr.replace('%', '')} onChange={(e) => { setHasUnsavedChanges(true); setIsRecalculating(true); setTimeout(() => setIsRecalculating(false), 500); }} className="bg-gray-700 border-gray-600 text-white" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-900/20 rounded-lg">
                      <p className="text-2xl font-bold text-green-400">{selectedOpportunityData.financials.roi}</p>
                      <p className="text-sm text-gray-400">ROI</p>
                    </div>
                    <div className="text-center p-3 bg-blue-900/20 rounded-lg">
                      <p className="text-2xl font-bold text-blue-400">{selectedOpportunityData.financials.irr}</p>
                      <p className="text-sm text-gray-400">IRR</p>
                    </div>
                    <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                      <p className="text-2xl font-bold text-white">{selectedOpportunityData.financials.breakevenYear}</p>
                      <p className="text-sm text-gray-400">Breakeven Year</p>
                    </div>
                    <div className="text-center p-3 bg-gray-700/50 rounded-lg">
                      <p className="text-2xl font-bold text-white">{selectedOpportunityData.financials.npv}</p>
                      <p className="text-sm text-gray-400">NPV</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Audit Log</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-40">
                    <div className="space-y-2">
                      {selectedOpportunityData.auditLog.map((log, index) => (
                        <p key={index} className="text-xs text-gray-400">
                          <span className="font-medium text-white">{log.who}</span> on {log.when}: {log.what}
                        </p>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <div className="flex flex-wrap gap-4">
                <Button onClick={handleSaveScenario} disabled={!hasUnsavedChanges} className="bg-[#0583f2] text-white hover:bg-blue-600 focus-visible:ring-2 focus-visible:ring-[#0583f2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111a26] h-9 px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed active:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Scenario
                </Button>
                <Button onClick={handleDiscardChanges} disabled={!hasUnsavedChanges} variant="outline" className="border-[#0583f2] text-[#0583f2] hover:bg-gray-700 hover:text-white focus-visible:ring-2 focus-visible:ring-[#0583f2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111a26] h-9 px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed active:bg-[#0583f2] active:text-white bg-transparent">
                  <X className="w-4 h-4 mr-2" />
                  Discard Changes
                </Button>
                <Button onClick={handleApplyToAgents} className="bg-[#0583f2] text-white hover:bg-blue-600 focus-visible:ring-2 focus-visible:ring-[#0583f2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111a26] h-9 px-4 py-2 rounded-md text-sm font-medium active:bg-blue-700">
                  <Play className="w-4 h-4 mr-2" />
                  Apply to Agents
                </Button>
              </div>
            </>
          ) : (
            <Card className="bg-gray-800 border-gray-700 p-8 text-center">
              <p className="text-gray-400">Select an opportunity to plan. The console adjusts variables to its type.</p>
            </Card>
          )}
        </div>

        {/* KPI Sidebar (remains as is, but could be dynamic based on selected opp) */}
        <Card className="bg-gray-800 border-gray-700 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-white">Projected Outcomes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-3 bg-green-900/20 rounded-lg">
              <p className="text-2xl font-bold text-green-400">85</p>
              <p className="text-sm text-gray-400">Permanent Jobs</p>
            </div>
            <div className="text-center p-3 bg-blue-900/20 rounded-lg">
              <p className="text-2xl font-bold text-blue-400">$6.4M</p>
              <p className="text-sm text-gray-400">5-Year ROI</p>
            </div>
            <div className="text-center p-3 bg-green-900/20 rounded-lg">
              <p className="text-2xl font-bold text-green-400">+2,400</p>
              <p className="text-sm text-gray-400">Annual Visitors</p>
            </div>
            <div className="text-center p-3 bg-yellow-900/20 rounded-lg">
              <p className="text-2xl font-bold text-yellow-400">80%</p>
              <p className="text-sm text-gray-400">Cultural Alignment</p>
            </div>
            <div className="text-center p-3 bg-green-900/20 rounded-lg">
              <p className="text-2xl font-bold text-green-400">HIGH</p>
              <p className="text-sm text-gray-400">Feasibility Rating</p>
            </div>
            <div className="text-center p-3 bg-purple-900/20 rounded-lg">
              <p className="text-2xl font-bold text-purple-400">78%</p>
              <p className="text-sm text-gray-400">ROI Percentage</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderTraining = () => {
    const allOpportunitiesForTraining = opportunities.map(opp => ({ id: opp.id, title: opp.title, zipCode: opp.zipCode }));
    const allAgentsForTraining = agents.map(agent => agent.name);

    const filteredDocuments = documents.filter(doc => {
      if (doc.isRetired) return false;

      const matchesOpportunity = documentFilters.opportunity.length === 0 ||
        documentFilters.opportunity.some(oppId => doc.tiedOpportunities.includes(parseInt(oppId)));
      const matchesAgent = documentFilters.agent.length === 0 ||
        documentFilters.agent.some(agentName => doc.consumedByAgents.includes(agentName));
      const matchesFileType = documentFilters.fileType.length === 0 ||
        documentFilters.fileType.includes(doc.fileType);
      const matchesTag = documentFilters.tag.length === 0 ||
        documentFilters.tag.some(tag => doc.tags.includes(tag));

      return matchesOpportunity && matchesAgent && matchesFileType && matchesTag;
    });

    const handleDocumentFieldChange = (id: string, field: string, value: any) => {
      setDocuments(prev => prev.map(doc =>
        doc.id === id ? { ...doc, [field]: value } : doc
      ));
    };

    const handleToggleSelectDocument = (id: string) => {
      setSelectedDocuments(prev =>
        prev.includes(id) ? prev.filter(docId => docId !== id) : [...prev, id]
      );
    };

    const handleSelectAllDocuments = () => {
      if (selectedDocuments.length === filteredDocuments.length) {
        setSelectedDocuments([]);
      } else {
        setSelectedDocuments(filteredDocuments.map(doc => doc.id));
      }
    };

    const handleBulkAction = (action: 're-embed' | 'retire' | 'move') => {
      if (selectedDocuments.length === 0) {
        toast({ title: "No documents selected", description: "Please select documents to perform this action." });
        return;
      }

      if (action === 're-embed') {
        setDocuments(prev => prev.map(doc =>
          selectedDocuments.includes(doc.id) ? { ...doc, embeddingProgress: 0, parseStatus: 'Pending' } : doc
        ));
        toast({ title: "Re-embedding", description: `${selectedDocuments.length} documents queued for re-embedding.` });
        setTimeout(() => {
          setDocuments(prev => prev.map(doc =>
            selectedDocuments.includes(doc.id) ? { ...doc, embeddingProgress: 100, parseStatus: 'Complete' } : doc
          ));
          toast({ title: "Re-embedding Complete", description: `${selectedDocuments.length} documents re-embedded.` });
        }, 2000);
      } else if (action === 'retire') {
        setDocuments(prev => prev.map(doc =>
          selectedDocuments.includes(doc.id) ? { ...doc, isRetired: true } : doc
        ));
        toast({
          title: "Documents Retired",
          description: `${selectedDocuments.length} documents moved to retired.`,
          action: <Button variant="outline" onClick={() => {
            setDocuments(prev => prev.map(doc =>
              selectedDocuments.includes(doc.id) ? { ...doc, isRetired: false } : doc
            ));
            setSelectedDocuments([]);
            toast({ title: "Undo Complete", description: "Documents restored." });
          }} className="border-[#0583f2] text-[#0583f2] hover:bg-gray-700 hover:text-white active:bg-[#0583f2] active:text-white">Undo</Button>
        });
        setSelectedDocuments([]);
      } else if (action === 'move') {
        toast({ title: "Move Documents", description: "Feature to move documents to another opportunity is not yet implemented." });
      }
    };

    const handlePromptProfileChange = (field: string, value: any) => {
      setCurrentPromptProfile(prev => ({ ...prev, [field]: value } as PromptProfile));
    };

    const handleSavePromptProfile = () => {
      if (!currentPromptProfile || !selectedAgentForTraining) {
        toast({ title: "Error", description: "Please select an agent to save a profile." });
        return;
      }

      setPromptProfiles(prev => {
        const existingIndex = prev.findIndex(p =>
          p.agentName === currentPromptProfile.agentName &&
          p.opportunityId === currentPromptProfile.opportunityId
        );

        if (existingIndex > -1) {
          const updatedProfiles = [...prev];
          updatedProfiles[existingIndex] = currentPromptProfile;
          return updatedProfiles;
        } else {
          return [...prev, currentPromptProfile];
        }
      });

      toast({ title: "Profile Saved", description: "Prompt profile saved successfully." });

      setOpportunities(prevOpportunities => prevOpportunities.map(opp => {
        if (opp.id === selectedOpportunityForTraining) {
          return {
            ...opp,
            auditLog: [{
              who: "System",
              when: new Date().toLocaleString(),
              what: `Agent ${selectedAgentForTraining}: Prompt profile updated for opportunity "${opp.title}"`
            }, ...opp.auditLog]
          };
        }
        return opp;
      }));
    };

    const handleSetDefaultProfile = () => {
      if (!currentPromptProfile || !selectedAgentForTraining) return;

      setPromptProfiles(prev => prev.map(p => {
        if (p.agentName === selectedAgentForTraining) {
          return { ...p, isDefault: (p.opportunityId === currentPromptProfile.opportunityId) };
        }
        return p;
      }));
      setCurrentPromptProfile(prev => ({ ...prev, isDefault: true } as PromptProfile));
      toast({ title: "Default Set", description: "Profile set as default for this agent." });
    };

    const handleQuickTest = () => {
      if (!promptSandboxInput || !currentPromptProfile) {
        setPromptSandboxOutput("Please enter a prompt and select an agent/profile.");
        return;
      }
      setPromptSandboxOutput("Generating response...");
      setTimeout(() => {
        setPromptSandboxOutput(`Agent (${currentPromptProfile.agentName}) response with ${currentPromptProfile.tone} tone, ${currentPromptProfile.readingLevel} grade level, and ${currentPromptProfile.outputStyle} style: "${promptSandboxInput}" processed.`);
      }, 1500);
    };

    const handleABCompare = () => {
      if (!promptSandboxInput || !promptProfileA || !promptProfileB) {
        setPromptSandboxOutputA("Select Profile A and enter a prompt.");
        setPromptSandboxOutputB("Select Profile B and enter a prompt.");
        return;
      }
      setPromptSandboxOutputA("Generating response A...");
      setPromptSandboxOutputB("Generating response B...");
      setTimeout(() => {
        setPromptSandboxOutputA(`Profile A (${promptProfileA.tone}, ${promptProfileA.readingLevel}): "${promptSandboxInput}" processed.`);
        setPromptSandboxOutputB(`Profile B (${promptProfileB.tone}, ${promptProfileB.readingLevel}): "${promptSandboxInput}" processed.`);
      }, 1500);
    };

    const getReadingLevelLabel = (level: number) => {
      if (level <= 8) return "Grade 8";
      if (level <= 12) return "High School";
      if (level <= 15) return "College";
      return "Professional";
    };

    const getFileIcon = (fileType: string) => {
      switch (fileType.toLowerCase()) {
        case 'pdf': return <FileText className="w-5 h-5 text-red-500" />;
        case 'docx': return <FileText className="w-5 h-5 text-blue-500" />;
        case 'xlsx':
        case 'csv': return <FileText className="w-5 h-5 text-green-500" />;
        case 'jpg':
        case 'png':
        case 'jpeg': return <FileText className="w-5 h-5 text-purple-500" />;
        case 'kmz':
        case 'gis': return <MapPin className="w-5 h-5 text-orange-500" />;
        default: return <FileText className="w-5 h-5 text-gray-400" />;
      }
    };

    const allTags = Array.from(new Set(documents.flatMap(doc => doc.tags)));
    const allFileTypes = Array.from(new Set(documents.map(doc => doc.fileType)));

    return (
      <div className="flex flex-col lg:flex-row gap-6 h-full">
        <div className="flex-1">
          <Tabs defaultValue="document-memory" value={activeTrainingTab} onValueChange={(value) => setActiveTrainingTab(value as "document-memory" | "prompt-training")} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800">
              <TabsTrigger
                value="document-memory"
                className="text-gray-300 data-[state=inactive]:hover:border-b-2 data-[state=inactive]:hover:border-[#0583f2] data-[state=active]:bg-[#0583f2] data-[state=active]:text-white data-[state=active]:font-bold data-[state=active]:border-b-2 data-[state=active]:border-white"
              >
                Document Memory
              </TabsTrigger>
              <TabsTrigger
                value="prompt-training"
                className="text-gray-300 data-[state=inactive]:hover:border-b-2 data-[state=inactive]:hover:border-[#0583f2] data-[state=active]:bg-[#0583f2] data-[state=active]:text-white data-[state=active]:font-bold data-[state=active]:border-b-2 data-[state=active]:border-white"
              >
                Prompt Training
              </TabsTrigger>
            </TabsList>
            <TabsContent value="document-memory" className="mt-6">
              {isMobile && (
                <Collapsible open={isMobileTrainingPanelOpen} onOpenChange={setIsMobileTrainingPanelOpen} className="mb-4">
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full justify-between border-[#0583f2] text-[#0583f2] hover:bg-gray-700 hover:text-white active:bg-[#0583f2] active:text-white bg-transparent">
                      Selected Context
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4">
                    {renderTrainingRightPanel()}
                  </CollapsibleContent>
                </Collapsible>
              )}

              <div
                onDrop={handleFileUpload}
                onDragOver={handleDragOver}
                className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center text-gray-400 hover:border-[#0583f2] transition-colors cursor-pointer"
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                <p className="text-lg font-medium">Upload documents to train agents</p>
                <p className="text-sm">Drag and drop files here, or click to browse.</p>
                <Input type="file" multiple className="hidden" onChange={handleFileUpload} />
                <p className="text-xs mt-2">Accepted formats: PDFs, DOCX, XLSX/CSV, images (for OCR), GIS/KMZ files.</p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 items-center py-4">
                <span className="text-gray-400 text-sm mr-2">Filters:</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-[#0583f2] text-[#0583f2] hover:bg-gray-700 hover:text-white active:bg-[#0583f2] active:text-white bg-transparent">
                      Opportunity ({documentFilters.opportunity.length})
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-800 border-gray-700 text-white">
                    {allOpportunitiesForTraining.map(opp => (
                      <DropdownMenuItem key={opp.id} onSelect={(e) => e.preventDefault()}>
                        <Checkbox
                          checked={documentFilters.opportunity.includes(String(opp.id))}
                          onCheckedChange={(checked) => {
                            setDocumentFilters(prev => ({
                              ...prev,
                              opportunity: checked
                                ? [...prev.opportunity, String(opp.id)]
                                : prev.opportunity.filter(id => id !== String(opp.id))
                            }));
                          }}
                          className="mr-2 border-gray-500 data-[state=checked]:bg-[#0583f2] data-[state=checked]:text-white"
                        />
                        {opp.title}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-[#0583f2] text-[#0583f2] hover:bg-gray-700 hover:text-white active:bg-[#0583f2] active:text-white bg-transparent">
                      Agent ({documentFilters.agent.length})
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-800 border-gray-700 text-white">
                    {allAgentsForTraining.map(agentName => (
                      <DropdownMenuItem key={agentName} onSelect={(e) => e.preventDefault()}>
                        <Checkbox
                          checked={documentFilters.agent.includes(agentName)}
                          onCheckedChange={(checked) => {
                            setDocumentFilters(prev => ({
                              ...prev,
                              agent: checked
                                ? [...prev.agent, agentName]
                                : prev.agent.filter(name => name !== agentName)
                            }));
                          }}
                          className="mr-2 border-gray-500 data-[state=checked]:bg-[#0583f2] data-[state=checked]:text-white"
                        />
                        {agentName}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-[#0583f2] text-[#0583f2] hover:bg-gray-700 hover:text-white active:bg-[#0583f2] active:text-white bg-transparent">
                      File Type ({documentFilters.fileType.length})
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-800 border-gray-700 text-white">
                    {allFileTypes.map(fileType => (
                      <DropdownMenuItem key={fileType} onSelect={(e) => e.preventDefault()}>
                        <Checkbox
                          checked={documentFilters.fileType.includes(fileType)}
                          onCheckedChange={(checked) => {
                            setDocumentFilters(prev => ({
                              ...prev,
                              fileType: checked
                                ? [...prev.fileType, fileType]
                                : prev.fileType.filter(type => type !== fileType)
                            }));
                          }}
                          className="mr-2 border-gray-500 data-[state=checked]:bg-[#0583f2] data-[state=checked]:text-white"
                        />
                        {fileType}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-[#0583f2] text-[#0583f2] hover:bg-gray-700 hover:text-white active:bg-[#0583f2] active:text-white bg-transparent">
                      Tag ({documentFilters.tag.length})
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-800 border-gray-700 text-white">
                    {allTags.map(tag => (
                      <DropdownMenuItem key={tag} onSelect={(e) => e.preventDefault()}>
                        <Checkbox
                          checked={documentFilters.tag.includes(tag)}
                          onCheckedChange={(checked) => {
                            setDocumentFilters(prev => ({
                              ...prev,
                              tag: checked
                                ? [...prev.tag, tag]
                                : prev.tag.filter(t => t !== tag)
                            }));
                          }}
                          className="mr-2 border-gray-500 data-[state=checked]:bg-[#0583f2] data-[state=checked]:text-white"
                        />
                        {tag}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Bulk Actions */}
              <div className="flex flex-wrap gap-2 items-center pb-4">
                <Checkbox
                  checked={selectedDocuments.length === filteredDocuments.length && filteredDocuments.length > 0}
                  onCheckedChange={handleSelectAllDocuments}
                  className="mr-2 border-gray-500 data-[state=checked]:bg-[#0583f2] data-[state=checked]:text-white"
                />
                <span className="text-gray-400 text-sm">{selectedDocuments.length} selected</span>
                <Button onClick={() => handleBulkAction('re-embed')} disabled={selectedDocuments.length === 0} variant="outline" size="sm" className="border-[#0583f2] text-[#0583f2] hover:bg-gray-700 hover:text-white active:bg-[#0583f2] active:text-white">
                  <RefreshCw className="w-4 h-4 mr-2" /> Re-Embed
                </Button>
                <Button onClick={() => handleBulkAction('retire')} disabled={selectedDocuments.length === 0} variant="outline" size="sm" className="border-red-500 text-red-500 hover:bg-red-900/20 hover:text-white active:bg-red-500 active:text-white">
                  <Trash2 className="w-4 h-4 mr-2" /> Retire
                </Button>
                <Button onClick={() => handleBulkAction('move')} disabled={selectedDocuments.length === 0} variant="outline" size="sm" className="border-[#0583f2] text-[#0583f2] hover:bg-gray-700 hover:text-white active:bg-[#0583f2] active:text-white">
                  <Move className="w-4 h-4 mr-2" /> Move to Opportunity
                </Button>
              </div>

              {/* Document List */}
              <div className="grid gap-4">
                {filteredDocuments.map(doc => (
                  <Card key={doc.id} className={`bg-gray-800 border-gray-700 ${isMobile ? 'w-full' : ''}`}>
                    <CardContent className="p-4">
                      <div className={`flex ${isMobile ? 'flex-col' : 'items-center'} justify-between`}>
                        <div className={`flex items-center ${isMobile ? 'mb-2' : ''}`}>
                          <Checkbox
                            checked={selectedDocuments.includes(doc.id)}
                            onCheckedChange={() => handleToggleSelectDocument(doc.id)}
                            className="mr-3 border-gray-500 data-[state=checked]:bg-[#0583f2] data-[state=checked]:text-white"
                          />
                          {getFileIcon(doc.fileType)}
                          <div className="ml-3">
                            <h4 className="font-medium text-white flex items-center">
                              {doc.title} ({doc.fileType})
                              {doc.confidentiality === 'Restricted' && <span title="Restricted Document"><Lock className="w-4 h-4 ml-2 text-yellow-500" /></span>}
                            </h4>
                            <p className="text-sm text-gray-400">{doc.fileSize}</p>
                          </div>
                        </div>
                        <div className={`flex items-center ${isMobile ? 'w-full mt-2' : ''}`}>
                          <div className="flex-1 mr-4">
                            <p className="text-sm text-gray-400 mb-1">Parse Status: <span className="text-white">{doc.parseStatus}</span></p>
                            <Progress value={doc.embeddingProgress} className="h-2 bg-gray-700 [&>*]:bg-[#0583f2]" />
                            <p className="text-xs text-gray-500 mt-1">Embeddings: {doc.embeddingProgress}%</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="ml-auto border-[#0583f2] text-[#0583f2] hover:bg-gray-700 hover:text-white active:bg-[#0583f2] active:text-white bg-transparent"
                            onClick={() => { setCurrentExcerpt(doc.excerpt || []); setExcerptModalOpen(true); }}
                            disabled={!doc.excerpt || doc.excerpt.length === 0}
                          >
                            <EyeIcon className="w-4 h-4 mr-2" /> View Excerpt
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <Label htmlFor={`doc-title-${doc.id}`} className="text-gray-300 text-xs">Title</Label>
                          <Input id={`doc-title-${doc.id}`} value={doc.title} onChange={(e) => handleDocumentFieldChange(doc.id, 'title', e.target.value)} className="mt-1 w-full bg-gray-700 border-gray-600 text-white text-sm" />
                        </div>
                        <div>
                          <Label htmlFor={`doc-source-${doc.id}`} className="text-gray-300 text-xs">Source</Label>
                          <Input id={`doc-source-${doc.id}`} value={doc.source} onChange={(e) => handleDocumentFieldChange(doc.id, 'source', e.target.value)} className="mt-1 w-full bg-gray-700 border-gray-600 text-white text-sm" />
                        </div>
                        <div>
                          <Label htmlFor={`doc-confidentiality-${doc.id}`} className="text-gray-300 text-xs">Confidentiality</Label>
                          <select id={`doc-confidentiality-${doc.id}`} value={doc.confidentiality} onChange={(e) => handleDocumentFieldChange(doc.id, 'confidentiality', e.target.value)} className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded text-white text-sm">
                            <option value="Public">Public</option>
                            <option value="Internal">Internal</option>
                            <option value="Restricted">Restricted</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor={`doc-expiration-${doc.id}`} className="text-gray-300 text-xs">Expiration/Review Date</Label>
                          <Input id={`doc-expiration-${doc.id}`} type="date" value={doc.expirationDate || ''} onChange={(e) => handleDocumentFieldChange(doc.id, 'expirationDate', e.target.value)} className="mt-1 w-full bg-gray-700 border-gray-600 text-white text-sm" />
                        </div>
                        <div className="col-span-full">
                          <Label htmlFor={`doc-opportunities-${doc.id}`} className="text-gray-300 text-xs">Tie to Opportunity (Required)</Label>
                          <select
                            id={`doc-opportunities-${doc.id}`}
                            multiple
                            value={doc.tiedOpportunities.map(String)}
                            onChange={(e) => {
                              const selectedOptions = Array.from(e.target.selectedOptions, option => parseInt(option.value));
                              if (selectedOptions.length === 0) {
                                toast({ title: "Error", description: "Document must be tied to at least one opportunity." });
                                return;
                              }
                              if (doc.confidentiality === 'Restricted' && selectedOptions.length > 1) {
                                if (typeof window !== 'undefined' && !window.confirm("This is a Restricted document. Binding it to multiple opportunities may expose sensitive information. Are you sure?")) {
                                  return;
                                }
                              }
                              handleDocumentFieldChange(doc.id, 'tiedOpportunities', selectedOptions);
                            }}
                            className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded text-white text-sm h-24"
                            required
                          >
                            {allOpportunitiesForTraining.map(opp => (
                              <option key={opp.id} value={opp.id}>
                                {opp.title} ({opp.zipCode})
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-span-full">
                          <Label htmlFor={`doc-tags-${doc.id}`} className="text-gray-300 text-xs">Tags</Label>
                          <Input
                            id={`doc-tags-${doc.id}`}
                            value={doc.tags.join(', ')}
                            onChange={(e) => handleDocumentFieldChange(doc.id, 'tags', e.target.value.split(',').map(tag => tag.trim()).filter(Boolean))}
                            className="mt-1 w-full bg-gray-700 border-gray-600 text-white text-sm"
                            placeholder="e.g., Housing Market Survey, Grant Guidelines"
                          />
                          <div className="flex flex-wrap gap-2 mt-2">
                            {doc.tags.map((tag, i) => (
                              <Badge key={i} variant="secondary" className="bg-gray-700 text-gray-300">
                                {tag}
                                <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => handleDocumentFieldChange(doc.id, 'tags', doc.tags.filter(t => t !== tag))} />
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" size="sm" className="border-[#0583f2] text-[#0583f2] hover:bg-gray-700 hover:text-white active:bg-[#0583f2] active:text-white bg-transparent">
                          Queue for Later
                        </Button>
                        <Button size="sm" className="bg-[#0583f2] text-white hover:bg-blue-600 active:bg-blue-700">
                          Train Now
                        </Button>
                      </div>
                      <div className="mt-4 text-xs text-gray-500 border-t border-gray-700 pt-2">
                        Uploaded by <span className="font-medium text-white">{doc.uploadedBy}</span> on {doc.uploadedWhen}. Consumed by: {doc.consumedByAgents.length > 0 ? doc.consumedByAgents.join(', ') : 'None'}.
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {filteredDocuments.length === 0 && (
                  <Card className="bg-gray-800 border-gray-700 p-8 text-center">
                    <p className="text-gray-400">No documents match your filters.</p>
                  </Card>
                )}
              </div>
            </TabsContent>
            <TabsContent value="prompt-training" className="mt-6">
              {isMobile && (
                <Collapsible open={isMobileTrainingPanelOpen} onOpenChange={setIsMobileTrainingPanelOpen} className="mb-4">
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full justify-between border-[#0583f2] text-[#0583f2] hover:bg-gray-700 hover:text-white active:bg-[#0583f2] active:text-white bg-transparent">
                      Selected Context
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-4">
                    {renderTrainingRightPanel()}
                  </CollapsibleContent>
                </Collapsible>
              )}

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Agent Prompt Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="select-agent" className="text-gray-300">Select Agent</Label>
                    <select
                      id="select-agent"
                      value={selectedAgentForTraining || ''}
                      onChange={(e) => setSelectedAgentForTraining(e.target.value)}
                      className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                    >
                      <option value="">-- Select an Agent --</option>
                      {allAgentsForTraining.map(agentName => (
                        <option key={agentName} value={agentName}>{agentName}</option>
                      ))}
                    </select>
                  </div>

                  {currentPromptProfile && (
                    <>
                      <div>
                        <Label className="text-gray-300">Tone</Label>
                        <div className="flex gap-2 mt-1">
                          {['Neutral', 'Civic-Professional', 'Community-Friendly'].map(tone => (
                            <Button
                              key={tone}
                              variant={currentPromptProfile.tone === tone ? 'default' : 'outline'}
                              onClick={() => handlePromptProfileChange('tone', tone)}
                              className={`${currentPromptProfile.tone === tone ? 'bg-[#0583f2] text-white hover:bg-blue-600 active:bg-blue-700' : 'border-[#0583f2] text-[#0583f2] hover:bg-gray-700 hover:text-white active:bg-[#0583f2] active:text-white'}`}
                            >
                              {tone}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="branding-hints" className="text-gray-300">Branding Voice Hints</Label>
                        <Input id="branding-hints" value={currentPromptProfile.brandingHints} onChange={(e) => handlePromptProfileChange('brandingHints', e.target.value)} className="mt-1 w-full bg-gray-700 border-gray-600 text-white" placeholder="e.g., use LocalFlow brand voice, avoid jargon" />
                      </div>
                      <div>
                        <Label htmlFor="required-terms" className="text-gray-300">Vocabulary Guidance: Required Terms (comma-separated)</Label>
                        <Input id="required-terms" value={currentPromptProfile.requiredTerms.join(', ')} onChange={(e) => handlePromptProfileChange('requiredTerms', e.target.value.split(',').map(t => t.trim()).filter(Boolean))} className="mt-1 w-full bg-gray-700 border-gray-600 text-white" placeholder="e.g., economic impact, community benefit" />
                      </div>
                      <div>
                        <Label htmlFor="avoid-terms" className="text-gray-300">Vocabulary Guidance: Avoid Terms (comma-separated)</Label>
                        <Input id="avoid-terms" value={currentPromptProfile.avoidTerms.join(', ')} onChange={(e) => handlePromptProfileChange('avoidTerms', e.target.value.split(',').map(t => t.trim()).filter(Boolean))} className="mt-1 w-full bg-gray-700 border-gray-600 text-white" placeholder="e.g., synergy, paradigm" />
                      </div>
                      <div>
                        <Label className="text-gray-300">Reading Level</Label>
                        <Slider
                          defaultValue={[currentPromptProfile.readingLevel]}
                          min={8}
                          max={16}
                          step={1}
                          onValueChange={(val) => handlePromptProfileChange('readingLevel', val[0])}
                          className="w-full mt-2"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Grade 8</span>
                          <span>Current: {getReadingLevelLabel(currentPromptProfile.readingLevel)}</span>
                          <span>Professional</span>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="output-style" className="text-gray-300">Output Style Presets</Label>
                        <select id="output-style" value={currentPromptProfile.outputStyle} onChange={(e) => handlePromptProfileChange('outputStyle', e.target.value)} className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded text-white">
                          <option value="Executive Brief">Executive Brief</option>
                          <option value="Community Summary">Community Summary</option>
                          <option value="Technical Appendix">Technical Appendix</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="language" className="text-gray-300">Language/Localization</Label>
                        <select id="language" value={currentPromptProfile.language} onChange={(e) => handlePromptProfileChange('language', e.target.value)} className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded text-white">
                          <option value="English">English</option>
                          <option value="Spanish">Spanish</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-4 mt-4">
                        <Button onClick={handleSavePromptProfile} className="bg-[#0583f2] text-white hover:bg-blue-600 active:bg-blue-700">
                          Save Profile
                        </Button>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="set-as-default"
                            checked={currentPromptProfile.isDefault}
                            onCheckedChange={handleSetDefaultProfile}
                            className="data-[state=checked]:bg-[#0583f2]"
                          />
                          <Label htmlFor="set-as-default" className="text-gray-300">Set as Default</Label>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Prompt Sandbox</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Button
                      variant={promptSandboxMode === 'quick-test' ? 'default' : 'outline'}
                      onClick={() => setPromptSandboxMode('quick-test')}
                      className={`${promptSandboxMode === 'quick-test' ? 'bg-[#0583f2] text-white hover:bg-blue-600 active:bg-blue-700' : 'border-[#0583f2] text-[#0583f2] hover:bg-gray-700 hover:text-white active:bg-[#0583f2] active:text-white'}`}
                    >
                      Quick Test
                    </Button>
                    <Button
                      variant={promptSandboxMode === 'a-b-compare' ? 'default' : 'outline'}
                      onClick={() => setPromptSandboxMode('a-b-compare')}
                      className={`${promptSandboxMode === 'a-b-compare' ? 'bg-[#0583f2] text-white hover:bg-blue-600 active:bg-blue-700' : 'border-[#0583f2] text-[#0583f2] hover:bg-gray-700 hover:text-white active:bg-[#0583f2] active:text-white'}`}
                    >
                      A/B Compare
                    </Button>
                  </div>

                  {promptSandboxMode === 'quick-test' && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="quick-test-prompt" className="text-gray-300">Your Prompt</Label>
                        <Textarea id="quick-test-prompt" value={promptSandboxInput} onChange={(e) => setPromptSandboxInput(e.target.value)} className="mt-1 w-full bg-gray-700 border-gray-600 text-white" placeholder="Type your question here..." rows={3} />
                      </div>
                      <Button onClick={handleQuickTest} disabled={!currentPromptProfile} className="bg-[#0583f2] text-white hover:bg-blue-600 active:bg-blue-700">
                        Run Quick Test
                      </Button>
                      <div>
                        <Label className="text-gray-300">Agent Response</Label>
                        <div className="mt-1 p-3 bg-gray-700 border border-gray-600 rounded text-gray-300 min-h-[80px]">
                          {promptSandboxOutput}
                        </div>
                      </div>
                    </div>
                  )}

                  {promptSandboxMode === 'a-b-compare' && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="ab-compare-prompt" className="text-gray-300">Common Prompt</Label>
                        <Textarea id="ab-compare-prompt" value={promptSandboxInput} onChange={(e) => setPromptSandboxInput(e.target.value)} className="mt-1 w-full bg-gray-700 border-gray-600 text-white" placeholder="Type your common question here..." rows={3} />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="profile-a" className="text-gray-300">Profile A</Label>
                          <select
                            id="profile-a"
                            value={promptProfileA?.agentName || ''}
                            onChange={(e) => setPromptProfileA(promptProfiles.find(p => p.agentName === e.target.value) || null)}
                            className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                          >
                            <option value="">-- Select Profile A --</option>
                            {promptProfiles.map(profile => (
                              <option key={profile.agentName + profile.opportunityId} value={profile.agentName}>
                                {profile.agentName} {profile.opportunityId ? `(Opp: ${opportunities.find(o => o.id === profile.opportunityId)?.title})` : '(Default)'}
                              </option>
                            ))}
                          </select>
                          <div className="mt-2 p-3 bg-gray-700 border border-gray-600 rounded text-gray-300 min-h-[80px]">
                            {promptSandboxOutputA}
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="profile-b" className="text-gray-300">Profile B</Label>
                          <select
                            id="profile-b"
                            value={promptProfileB?.agentName || ''}
                            onChange={(e) => setPromptProfileB(promptProfiles.find(p => p.agentName === e.target.value) || null)}
                            className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                          >
                            <option value="">-- Select Profile B --</option>
                            {promptProfiles.map(profile => (
                              <option key={profile.agentName + profile.opportunityId} value={profile.agentName}>
                                {profile.agentName} {profile.opportunityId ? `(Opp: ${opportunities.find(o => o.id === profile.opportunityId)?.title})` : '(Default)'}
                              </option>
                            ))}
                          </select>
                          <div className="mt-2 p-3 bg-gray-700 border border-gray-600 rounded text-gray-300 min-h-[80px]">
                            {promptSandboxOutputB}
                          </div>
                        </div>
                      </div>
                      <Button onClick={handleABCompare} disabled={!promptProfileA || !promptProfileB} className="bg-[#0583f2] text-white hover:bg-blue-600 active:bg-blue-700">
                        Run A/B Compare
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        {!isMobile && (
          <div className="w-full lg:w-1/4">
            {renderTrainingRightPanel()}
          </div>
        )}

        {/* Excerpt Modal */}
        <Dialog open={excerptModalOpen} onOpenChange={setExcerptModalOpen}>
          <DialogContent className="sm:max-w-[600px] bg-gray-800 text-white border-gray-700 p-6">
            <DialogHeader>
              <DialogTitle className="text-white text-2xl">Document Excerpt</DialogTitle>
              <DialogDescription className="text-gray-400">
                First few extracted snippets from the document.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {currentExcerpt.length > 0 ? (
                currentExcerpt.map((snippet, index) => (
                  <p key={index} className="text-gray-300 text-sm">
                    &quot;{snippet}&quot;
                  </p>
                ))
              ) : (
                <p className="text-gray-400">No excerpts available for this document.</p>
              )}
            </div>
            <DialogFooter>
              <Button onClick={() => setExcerptModalOpen(false)} className="bg-[#0583f2] text-white hover:bg-blue-600 active:bg-blue-700">Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  const renderTrainingRightPanel = () => (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Selected Context</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="training-opportunity-select" className="text-gray-300">Opportunity</Label>
          <select
            id="training-opportunity-select"
            value={selectedOpportunityForTraining || ''}
            onChange={(e) => setSelectedOpportunityForTraining(parseInt(e.target.value) || null)}
            className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
          >
            <option value="">-- Select Opportunity --</option>
            {opportunities.map(opp => (
              <option key={opp.id} value={opp.id}>{opp.title} ({opp.zipCode})</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="training-agent-select" className="text-gray-300">Agent</Label>
          <select
            id="training-agent-select"
            value={selectedAgentForTraining || ''}
            onChange={(e) => setSelectedAgentForTraining(e.target.value)}
            className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
          >
            <option value="">-- Select Agent --</option>
            {agents.map(agent => (
              <option key={agent.name} value={agent.name}>{agent.name}</option>
            ))}
          </select>
        </div>
      </CardContent>
    </Card>
  );


  const renderOpportunityDetails = () => {
    if (!selectedOpportunity) return null

    const tourismTimeline = [
      {
        agent: "Industry Intelligence Agent",
        action: "Market Demand Report",
        outcome: "Tourism sector demand +12% annually, cultural experiences highest rated",
        timestamp: "6 hours ago",
        badges: ["RAG Used", "Policy Check Passed"],
        nextAgent: "Housing Demand Agent"
      },
      {
        agent: "Housing Demand Agent",
        action: "Lodging Gap Analysis",
        outcome: "85-room shortage identified during peak cultural event seasons",
        timestamp: "5 hours ago",
        badges: ["RAG Used", "Human-in-Loop"],
        nextAgent: "Scenario Planner Agent"
      },
      {
        agent: "Scenario Planner Agent",
        action: "Best-fit Scenario + ROI",
        outcome: "45-room lodge + performance venue, $6.4M ROI over 5 years",
        timestamp: "3 hours ago",
        badges: ["RAG Used"],
        nextAgent: "Stakeholder Engagement Agent"
      },
      {
        agent: "Stakeholder Engagement Agent",
        action: "Sentiment Analysis",
        outcome: "3 of 4 council members positive, Elder Johnson has concerns",
        timestamp: "4 hours ago",
        badges: ["Human-in-Loop"],
        nextAgent: "Cultural Alignment Agent"
      },
      {
        agent: "Cultural Alignment Agent",
        action: "Alignment Statement",
        outcome: "80% alignment score, minor location concern near sacred site",
        timestamp: "5 hours ago",
        badges: ["RAG Used", "Policy Check Passed"],
        nextAgent: "Feasibility Reviewer Agent"
      },
      {
        agent: "Feasibility Reviewer Agent",
        action: "Final Feasibility Report",
        outcome: "HIGH feasibility rating, minor supply chain risk for cultural materials",
        timestamp: "30 minutes ago",
        badges: ["RAG Used", "Human-in-Loop"],
        nextAgent: "Human Review"
      }
    ]

    const tourismPrompts = [
      {
        agent: "Industry Intelligence Agent",
        type: "prompt",
        content: "Analyze market demand for cultural tourism in the Pacific Northwest region, focusing on Native American cultural experiences and visitor trends over the past 5 years.",
        timestamp: "09:30"
      },
      {
        agent: "Industry Intelligence Agent",
        type: "response",
        content: "Market analysis reveals strong growth in cultural tourism sector. Key findings: 12% annual growth, Native American cultural experiences rated 4.7/5 by visitors, peak demand June-September aligns with traditional cultural calendar. Regional competition limited with only 2 comparable facilities within 200 miles.",
        timestamp: "09:45"
      },
      {
        agent: "Housing Demand Agent",
        type: "prompt",
        content: "Based on projected visitor increase from cultural tourism expansion, assess current lodging capacity and identify gaps during peak cultural event seasons.",
        timestamp: "13:00"
      },
      {
        agent: "Housing Demand Agent",
        type: "response",
        content: "Current regional lodging capacity: 340 rooms within 25-mile radius. Projected visitor increase: 2,400 additional visitors during peak season. Gap analysis shows 85-room shortage during cultural events. Recommend on-site lodging to capture revenue and provide authentic cultural immersion experience.",
        timestamp: "13:15"
      },
      {
        agent: "Scenario Planner Agent",
        type: "prompt",
        content: "Generate optimal development scenario incorporating market demand data and lodging requirements. Include ROI projections and job creation estimates.",
        timestamp: "12:30"
      },
      {
        agent: "Scenario Planner Agent",
        type: "response",
        content: "Optimal scenario: 45-room cultural lodge + 200-seat performance venue + expanded cultural center. Investment: $8.2M. 5-year ROI: $6.4M (78% return). Job creation: 85 permanent positions, 120 seasonal. Revenue streams: lodging (40%), performances (25%), cultural experiences (20%), retail (15%).",
        timestamp: "12:50"
      }
    ]

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setSelectedOpportunity(null)}
            className="text-gray-400 hover:text-white focus-visible:ring-2 focus-visible:ring-[#0583f2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111a26] h-9 px-4 py-2 rounded-md text-sm font-medium"
          >
            ← Back to Opportunities
          </Button>
        </div>

        <div className="flex items-center space-x-2 text-gray-400 text-sm">
          <span className="text-white">Opportunities</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#0583f2]">{selectedOpportunity.title}</span>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white text-xl">{selectedOpportunity.title}</CardTitle>
                <p className="text-gray-400 mt-1">{selectedOpportunity.summary}</p>
              </div>
              <div className="flex space-x-2">
                <Badge className={`${getStatusColor(selectedOpportunity.status)} text-white`}>
                  {selectedOpportunity.status}
                </Badge>
                <Badge className={`${getPriorityColor(selectedOpportunity.priority)} text-white`}>
                  {selectedOpportunity.priority}
                </Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="flex w-full bg-gray-800 overflow-x-auto">
            <TabsTrigger
              value="summary"
              className="text-gray-300 data-[state=inactive]:hover:border-b-2 data-[state=inactive]:hover:border-[#0583f2] data-[state=active]:bg-[#0583f2] data-[state=active]:text-white data-[state=active]:font-bold data-[state=active]:border-b-2 data-[state=active]:border-white whitespace-nowrap px-4 py-2"
            >
              Summary
            </TabsTrigger>
            <TabsTrigger
              value="timeline"
              className="text-gray-300 data-[state=inactive]:hover:border-b-2 data-[state=inactive]:hover:border-[#0583f2] data-[state=active]:bg-[#0583f2] data-[state=active]:text-white data-[state=active]:font-bold data-[state=active]:border-b-2 data-[state=active]:border-white whitespace-nowrap px-4 py-2"
            >
              Agentic Timeline
            </TabsTrigger>
            <TabsTrigger
              value="prompts"
              className="text-gray-300 data-[state=inactive]:hover:border-b-2 data-[state=inactive]:hover:border-[#0583f2] data-[state=active]:bg-[#0583f2] data-[state=active]:text-white data-[state=active]:font-bold data-[state=active]:border-b-2 data-[state=active]:border-white whitespace-nowrap px-4 py-2"
            >
              Prompt Relay
            </TabsTrigger>
            <TabsTrigger
              value="issues"
              className="text-gray-300 data-[state=inactive]:hover:border-b-2 data-[state=inactive]:hover:border-[#0583f2] data-[state=active]:bg-[#0583f2] data-[state=active]:text-white data-[state=active]:font-bold data-[state=active]:border-b-2 data-[state=active]:border-white whitespace-nowrap px-4 py-2"
            >
              Issues
            </TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Stage:</span>
                    <span className="text-white">{selectedOpportunity.stage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Owner:</span>
                    <span className="text-white">{selectedOpportunity.owner}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Due Date:</span>
                    <span className="text-white">{selectedOpportunity.dueDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Investment:</span>
                    <span className="text-white">$8.2M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Timeline:</span>
                    <span className="text-white">18 months</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Projected Outcomes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">5-Year ROI:</span>
                    <span className="text-green-400">$6.4M (78%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Jobs Created:</span>
                    <span className="text-green-400">85 permanent</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cultural Alignment:</span>
                    <span className="text-yellow-400">80%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Feasibility Rating:</span>
                    <span className="text-green-400">HIGH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Annual Visitors:</span>
                    <span className="text-green-400">+2,400</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-4">
            <div className="space-y-4">
              {(selectedOpportunity.title === "Tribal Cultural Tourism Expansion" ? tourismTimeline : [
                {
                  agent: "Industry Intelligence Agent",
                  action: "Market analysis completed",
                  outcome: "Strong demand identified",
                  timestamp: "2 hours ago",
                  badges: ["RAG Used", "Policy Check"]
                },
                {
                  agent: "Housing Demand Agent",
                  action: "Housing gap assessment",
                  outcome: "340 unit shortage flagged",
                  timestamp: "45 minutes ago",
                  badges: ["Human-in-Loop", "RAG Used"]
                },
                {
                  agent: "Feasibility Reviewer Agent",
                  action: "Infrastructure review",
                  outcome: "Power grid capacity confirmed",
                  timestamp: "1 hour ago",
                  badges: ["RAG Used"]
                }
              ]).map((item, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-[#0583f2] rounded-full mt-2" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-white">{item.agent}</h4>
                          <span className="text-xs text-gray-500">{item.timestamp}</span>
                        </div>
                        <p className="text-gray-300 text-sm mb-1 font-medium">{item.action}</p>
                        <p className="text-green-400 text-sm mb-2">{item.outcome}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-1">
                            {item.badges.map((badge, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {badge}
                              </Badge>
                            ))}
                          </div>
                          {(item as any).nextAgent && (
                            <div className="flex items-center text-xs text-gray-400">
                              <ChevronRight className="w-3 h-3 mr-1" />
                              <span>{(item as any).nextAgent}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="prompts" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-medium">Agent Conversations</h3>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="border-[#0583f2] text-[#0583f2] hover:bg-gray-700 hover:text-white focus-visible:ring-2 focus-visible:ring-[#0583f2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111a26] active:bg-[#0583f2] active:text-white bg-transparent">Raw View</Button>
                <Button size="sm" variant="outline" className="border-[#0583f2] text-[#0583f2] hover:bg-gray-700 hover:text-white focus-visible:ring-2 focus-visible:ring-[#0583f2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111a26] active:bg-[#0583f2] active:text-white bg-transparent">Redacted View</Button>
              </div>
            </div>
            <div className="space-y-4">
              {(selectedOpportunity.title === "Tribal Cultural Tourism Expansion" ? tourismPrompts : [
                {
                  agent: "Industry Intelligence Agent",
                  type: "prompt",
                  content: "Analyze the tech sector demand for the proposed hub location...",
                  timestamp: "14:30"
                },
                {
                  agent: "Industry Intelligence Agent",
                  type: "response",
                  content: "Based on regional employment data and growth trends, there is strong demand for tech workspace. Key findings: 87% market favorability, 340 new positions projected...",
                  timestamp: "14:32"
                },
                {
                  agent: "Housing Demand Agent",
                  type: "prompt",
                  content: "Assess housing capacity for projected workforce increase...",
                  timestamp: "14:35"
                }
              ]).map((item, index) => (
                <div key={index} className={`flex ${item.type === 'response' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${item.type === 'response'
                    ? 'bg-[#0583f2] text-white'
                    : 'bg-gray-700 text-gray-300'
                    }`}>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs font-medium">{item.agent}</span>
                      <span className="text-xs opacity-70">{item.timestamp}</span>
                      {item.type === 'response' && (
                        <div className="flex space-x-1">
                          <Badge variant="outline" className="text-xs bg-blue-800 border-blue-600">
                            RAG Used
                          </Badge>
                        </div>
                      )}
                    </div>
                    <p className="text-sm">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="issues" className="space-y-4">
            {selectedOpportunity.title === "Tribal Cultural Tourism Expansion" ? (
              <div className="space-y-4">
                <Card className="bg-yellow-900/20 border-yellow-500/50">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-400 mb-1">Sacred Site Proximity Concern</h4>
                        <p className="text-gray-300 text-sm mb-2">
                          Proposed location is within 0.5 miles of sacred ceremonial grounds. Cultural Alignment Agent recommends site adjustment to maintain appropriate distance and respect for traditional practices.
                        </p>
                        <div className="flex space-x-2">
                          <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                            Medium Priority
                          </Badge>
                          <Badge variant="outline" className="text-gray-400">
                            Cultural Alignment Agent
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-orange-900/20 border-orange-500/50">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-orange-400 mb-1">Elder Council Concerns</h4>
                        <p className="text-gray-300 text-sm mb-2">
                          Elder Johnson has expressed concerns about visitor impact on traditional practices. Stakeholder engagement analysis shows 3 of 4 council members support the project, but Elder Johnson's concerns need to be addressed.
                        </p>
                        <div className="flex space-x-2">
                          <Badge variant="outline" className="text-orange-400 border-orange-400">
                            High Priority
                          </Badge>
                          <Badge variant="outline" className="text-gray-400">
                            Stakeholder Engagement Agent
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-red-900/20 border-red-500/50">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-red-400 mb-1">Lodging Capacity Shortage</h4>
                        <p className="text-gray-300 text-sm mb-2">
                          Lodging gap analysis reveals 85-room shortage during peak cultural event seasons (June-September). Current regional capacity insufficient for projected visitor increase.
                        </p>
                        <div className="flex space-x-2">
                          <Badge variant="outline" className="text-red-400 border-red-400">
                            Critical Priority
                          </Badge>
                          <Badge variant="outline" className="text-gray-400">
                            Housing Demand Agent
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : selectedOpportunity.issues > 0 ? (
              <div className="space-y-4">
                <Card className="bg-yellow-900/20 border-yellow-500/50">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-400 mb-1">Housing Capacity Constraint</h4>
                        <p className="text-gray-300 text-sm mb-2">
                          Current housing supply insufficient for projected workforce increase. 340 unit shortage identified.
                        </p>
                        <div className="flex space-x-2">
                          <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                            High Priority
                          </Badge>
                          <Badge variant="outline" className="text-gray-400">
                            Housing Demand Agent
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <p className="text-gray-400">No issues identified for this opportunity</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  const renderContent = () => {
    if (selectedOpportunity && activeView === 'opportunities') {
      return renderOpportunityDetails()
    }

    switch (activeView) {
      case 'dashboard':
        return renderDashboard()
      case 'opportunities':
        return renderOpportunities()
      case 'agents':
        return renderAgents()
      case 'logs':
        return renderLogs()
      case 'planning':
        return renderPlanning()
      case 'training':
        return renderTraining()
      default:
        return renderDashboard()
    }
  }

  const handleNewOpportunityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setNewOpportunityData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleCreateOpportunity = () => {
    const zipCodeRegex = /^\d{5}$/;
    if (!zipCodeRegex.test(newOpportunityData.zipCode)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid 5-digit US ZIP Code.",
        variant: "destructive",
      });
      return;
    }

    console.log("Creating new opportunity:", newOpportunityData);

    const newId = opportunities.length > 0 ? Math.max(...opportunities.map(o => o.id)) + 1 : 1;
    const newOpp: Opportunity = {
      id: newId,
      title: newOpportunityData.title,
      status: "Discovery",
      stage: "Initial Intake",
      dueDate: "N/A",
      activeAgent: "N/A",
      owner: newOpportunityData.leadAgency || "N/A",
      priority: "Low",
      issues: 0,
      summary: `New opportunity for ${newOpportunityData.type} in ${newOpportunityData.region}.`,
      type: newOpportunityData.type,
      zipCode: newOpportunityData.zipCode,
      planningVariables: {},
      financials: { roi: "N/A", irr: "N/A", breakevenYear: "N/A", npv: "N/A" },
      auditLog: [{ who: "User", when: new Date().toLocaleString(), what: "Created new opportunity" }]
    };
    setOpportunities(prev => [...prev, newOpp]);

    setNewOpportunityModalOpen(false);
    setNewOpportunityData({
      title: '', zipCode: '', region: '', type: 'Tourism', leadAgency: '', primaryContactName: '', primaryContactEmail: '', primaryContactPhone: '',
      parcelIds: '', siteAddress: '', zoningDesignation: '', siteSize: '', currentUse: '', environmentalConstraints: '', utilitiesStatus: '', trafficNotes: '',
      targetIndustries: '', incentivesAvailable: '', estimatedCAPEX: '', estimatedOPEX: '', fundingSources: '', expectedStartDate: '', expectedOperationalDate: '',
      workforcePartners: '', requiredSkills: '', housingSupportAssumptions: '', stakeholderPlan: '', culturalConsiderations: '',
      timeHorizon: '10', discountRate: '8', cashFlowPattern: 'linear', uploads: null,
    });
    toast({
      title: "Opportunity Created!",
      description: `"${newOpp.title}" has been added to your opportunities.`,
    });
  };

  return (
    <div className="min-h-screen bg-[#111a26] text-white">
      {renderHeader()}

      <div className="flex">
        {!isMobile && renderNavigation()}

        <main className={`flex-1 p-4 md:p-6 ${isMobile ? 'pb-20' : ''}`}>
          {renderContent()}
        </main>
      </div>

      {isMobile && renderNavigation()}

      {/* Create New Opportunity Modal */}
      <Dialog open={newOpportunityModalOpen} onOpenChange={setNewOpportunityModalOpen}>
        <DialogContent className="sm:max-w-[800px] bg-gray-800 text-white border-gray-700 p-6 !fixed !top-1/2 !left-1/2 !transform !-translate-x-1/2 !-translate-y-1/2 !z-50">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl">Create New Opportunity</DialogTitle>
            <DialogDescription className="text-gray-400">
              Fill in the details for your new economic development opportunity.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[70vh] pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 py-4">
              {/* General Information */}
              <div className="col-span-full text-lg font-semibold text-white mb-2">General Information</div>
              <div>
                <Label htmlFor="title" className="text-gray-300">Title</Label>
                <Input id="title" name="title" value={newOpportunityData.title} onChange={handleNewOpportunityChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-white" placeholder="e.g., Downtown Revitalization Project" required />
              </div>
              <div>
                <Label htmlFor="zipCode" className="text-gray-300">ZIP Code (US)</Label>
                <Input id="zipCode" name="zipCode" value={newOpportunityData.zipCode} onChange={handleNewOpportunityChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-white" placeholder="e.g., 90210" maxLength={5} required />
                <p className="text-xs text-gray-500 mt-1">Enter a 5-digit US ZIP code.</p>
              </div>
              <div>
                <Label htmlFor="region" className="text-gray-300">Region</Label>
                <Input id="region" name="region" value={newOpportunityData.region} onChange={handleNewOpportunityChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-white" placeholder="e.g., Pacific Northwest" required />
              </div>
              <div>
                <Label htmlFor="type" className="text-gray-300">Opportunity Type</Label>
                <select id="type" name="type" value={newOpportunityData.type} onChange={handleNewOpportunityChange} className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded text-white" required>
                  <option value="Tourism">Tourism</option>
                  <option value="Housing">Housing</option>
                  <option value="Industry">Industry</option>
                  <option value="Energy">Energy</option>
                  <option value="Education">Education</option>
                </select>
              </div>
              <div>
                <Label htmlFor="leadAgency" className="text-gray-300">Lead Agency/Owner</Label>
                <Input id="leadAgency" name="leadAgency" value={newOpportunityData.leadAgency} onChange={handleNewOpportunityChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-white" placeholder="e.g., City Planning Department" required />
              </div>
              <div className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="primaryContactName" className="text-gray-300">Primary Contact Name</Label>
                  <Input id="primaryContactName" name="primaryContactName" value={newOpportunityData.primaryContactName} onChange={handleNewOpportunityChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-white" placeholder="e.g., Jane Doe" required />
                </div>
                <div>
                  <Label htmlFor="primaryContactEmail" className="text-gray-300">Primary Contact Email</Label>
                  <Input id="primaryContactEmail" name="primaryContactEmail" type="email" value={newOpportunityData.primaryContactEmail} onChange={handleNewOpportunityChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-white" placeholder="e.g., jane.doe@city.gov" required />
                </div>
                <div>
                  <Label htmlFor="primaryContactPhone" className="text-gray-300">Primary Contact Phone</Label>
                  <Input id="primaryContactPhone" name="primaryContactPhone" value={newOpportunityData.primaryContactPhone} onChange={handleNewOpportunityChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-white" placeholder="e.g., (555) 123-4567" required />
                </div>
              </div>

              {/* Site Information */}
              <div className="col-span-full text-lg font-semibold text-white mb-2 mt-6">Site Information</div>
              <div>
                <Label htmlFor="parcelIds" className="text-gray-300">Parcel IDs</Label>
                <Input id="parcelIds" name="parcelIds" value={newOpportunityData.parcelIds} onChange={handleNewOpportunityChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-white" placeholder="e.g., 123-456-789, 123-456-790" />
              </div>
              <div>
                <Label htmlFor="siteAddress" className="text-gray-300">Site Address</Label>
                <Input id="siteAddress" name="siteAddress" value={newOpportunityData.siteAddress} onChange={handleNewOpportunityChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-white" placeholder="e.g., 123 Main Street" />
              </div>
              <div>
                <Label htmlFor="zoningDesignation" className="text-gray-300">Zoning Designation</Label>
                <Input id="zoningDesignation" name="zoningDesignation" value={newOpportunityData.zoningDesignation} onChange={handleNewOpportunityChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-white" placeholder="e.g., C-2 Commercial" />
              </div>
              <div>
                <Label htmlFor="siteSize" className="text-gray-300">Site Size (acres)</Label>
                <Input id="siteSize" name="siteSize" value={newOpportunityData.siteSize} onChange={handleNewOpportunityChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-white" placeholder="e.g., 25.5" />
              </div>
              <div>
                <Label htmlFor="currentUse" className="text-gray-300">Current Use</Label>
                <Input id="currentUse" name="currentUse" value={newOpportunityData.currentUse} onChange={handleNewOpportunityChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-white" placeholder="e.g., Vacant lot, Industrial facility" />
              </div>
              <div>
                <Label htmlFor="environmentalConstraints" className="text-gray-300">Environmental Constraints</Label>
                <Textarea id="environmentalConstraints" name="environmentalConstraints" value={newOpportunityData.environmentalConstraints} onChange={handleNewOpportunityChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-white" placeholder="e.g., Wetlands, endangered species habitat" rows={2} />
              </div>
              <div>
                <Label htmlFor="utilitiesStatus" className="text-gray-300">Utilities Status</Label>
                <Input id="utilitiesStatus" name="utilitiesStatus" value={newOpportunityData.utilitiesStatus} onChange={handleNewOpportunityChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-white" placeholder="e.g., Water and sewer available, electrical needs upgrade" />
              </div>
              <div>
                <Label htmlFor="trafficNotes" className="text-gray-300">Traffic Notes</Label>
                <Textarea id="trafficNotes" name="trafficNotes" value={newOpportunityData.trafficNotes} onChange={handleNewOpportunityChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-white" placeholder="e.g., High traffic area, intersection improvements needed" rows={2} />
              </div>

              {/* Economic Information */}
              <div className="col-span-full text-lg font-semibold text-white mb-2 mt-6">Economic Information</div>
              <div>
                <Label htmlFor="targetIndustries" className="text-gray-300">Target Industries</Label>
                <Input id="targetIndustries" name="targetIndustries" value={newOpportunityData.targetIndustries} onChange={handleNewOpportunityChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-white" placeholder="e.g., Technology, Manufacturing, Tourism" />
              </div>
              <div>
                <Label htmlFor="incentivesAvailable" className="text-gray-300">Incentives Available</Label>
                <Input id="incentivesAvailable" name="incentivesAvailable" value={newOpportunityData.incentivesAvailable} onChange={handleNewOpportunityChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-white" placeholder="e.g., Tax abatement, grants, low-interest loans" />
              </div>
              <div>
                <Label htmlFor="estimatedCAPEX" className="text-gray-300">Estimated CAPEX</Label>
                <Input id="estimatedCAPEX" name="estimatedCAPEX" value={newOpportunityData.estimatedCAPEX} onChange={handleNewOpportunityChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-white" placeholder="e.g., $5,000,000" />
              </div>
              <div>
                <Label htmlFor="estimatedOPEX" className="text-gray-300">Estimated Annual OPEX</Label>
                <Input id="estimatedOPEX" name="estimatedOPEX" value={newOpportunityData.estimatedOPEX} onChange={handleNewOpportunityChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-white" placeholder="e.g., $500,000" />
              </div>
              <div>
                <Label htmlFor="fundingSources" className="text-gray-300">Funding Sources</Label>
                <Input id="fundingSources" name="fundingSources" value={newOpportunityData.fundingSources} onChange={handleNewOpportunityChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-white" placeholder="e.g., Private investment, federal grants, municipal bonds" />
              </div>
              <div>
                <Label htmlFor="expectedStartDate" className="text-gray-300">Expected Start Date</Label>
                <Input id="expectedStartDate" name="expectedStartDate" value={newOpportunityData.expectedStartDate} onChange={handleNewOpportunityChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-white" placeholder="e.g., Q2 2024" />
              </div>
              <div>
                <Label htmlFor="expectedOperationalDate" className="text-gray-300">Expected Operational Date</Label>
                <Input id="expectedOperationalDate" name="expectedOperationalDate" value={newOpportunityData.expectedOperationalDate} onChange={handleNewOpportunityChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-white" placeholder="e.g., Q4 2025" />
              </div>

              {/* Workforce Information */}
              <div className="col-span-full text-lg font-semibold text-white mb-2 mt-6">Workforce Information</div>
              <div>
                <Label htmlFor="workforcePartners" className="text-gray-300">Workforce Partners</Label>
                <Input id="workforcePartners" name="workforcePartners" value={newOpportunityData.workforcePartners} onChange={handleNewOpportunityChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-white" placeholder="e.g., Community College, Workforce Development Board" />
              </div>
              <div>
                <Label htmlFor="requiredSkills" className="text-gray-300">Required Skills</Label>
                <Input id="requiredSkills" name="requiredSkills" value={newOpportunityData.requiredSkills} onChange={handleNewOpportunityChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-white" placeholder="e.g., Technical skills, customer service, management" />
              </div>
              <div>
                <Label htmlFor="housingSupportAssumptions" className="text-gray-300">Housing Support Assumptions</Label>
                <Textarea id="housingSupportAssumptions" name="housingSupportAssumptions" value={newOpportunityData.housingSupportAssumptions} onChange={handleNewOpportunityChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-white" placeholder="e.g., Affordable housing available, commuting options" rows={2} />
              </div>

              {/* Stakeholder Information */}
              <div className="col-span-full text-lg font-semibold text-white mb-2 mt-6">Stakeholder Information</div>
              <div>
                <Label htmlFor="stakeholderPlan" className="text-gray-300">Stakeholder Engagement Plan</Label>
                <Textarea id="stakeholderPlan" name="stakeholderPlan" value={newOpportunityData.stakeholderPlan} onChange={handleNewOpportunityChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-white" placeholder="e.g., Community meetings, business roundtables, public hearings" rows={3} />
              </div>
              <div>
                <Label htmlFor="culturalConsiderations" className="text-gray-300">Cultural Considerations</Label>
                <Textarea id="culturalConsiderations" name="culturalConsiderations" value={newOpportunityData.culturalConsiderations} onChange={handleNewOpportunityChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-white" placeholder="e.g., Indigenous consultation, cultural heritage preservation" rows={3} />
              </div>

              {/* Financial Modeling */}
              <div className="col-span-full text-lg font-semibold text-white mb-2 mt-6">Financial Modeling Parameters</div>
              <div>
                <Label htmlFor="timeHorizon" className="text-gray-300">Time Horizon (years)</Label>
                <Input id="timeHorizon" name="timeHorizon" type="number" value={newOpportunityData.timeHorizon} onChange={handleNewOpportunityChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-white" placeholder="e.g., 10" min="1" max="50" />
              </div>
              <div>
                <Label htmlFor="discountRate" className="text-gray-300">Discount Rate (%)</Label>
                <Input id="discountRate" name="discountRate" type="number" value={newOpportunityData.discountRate} onChange={handleNewOpportunityChange} className="mt-1 w-full bg-gray-700 border-gray-600 text-white" placeholder="e.g., 8" min="0" max="50" step="0.1" />
              </div>
              <div>
                <Label htmlFor="cashFlowPattern" className="text-gray-300">Cash Flow Pattern</Label>
                <select id="cashFlowPattern" name="cashFlowPattern" value={newOpportunityData.cashFlowPattern} onChange={handleNewOpportunityChange} className="mt-1 w-full p-2 bg-gray-700 border border-gray-600 rounded text-white">
                  <option value="linear">Linear</option>
                  <option value="exponential">Exponential</option>
                  <option value="s-curve">S-Curve</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter className="flex gap-2 pt-4">
            <Button variant="outline" onClick={() => setNewOpportunityModalOpen(false)} className="border-gray-600 text-gray-300 hover:bg-gray-700">
              Cancel
            </Button>
            <Button onClick={handleCreateOpportunity} className="bg-[#0583f2] hover:bg-[#0583f2]/90">
              Create Opportunity
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Feasibility Rejection Modal */}
      <Dialog open={isFeasibilityRejectModalOpen} onOpenChange={setIsFeasibilityRejectModalOpen}>
        <DialogContent className="sm:max-w-[600px] bg-gray-800 text-white border-gray-700 p-6 !fixed !top-1/2 !left-1/2 !transform !-translate-x-1/2 !-translate-y-1/2 !z-50">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">Reject Feasibility</DialogTitle>
            <DialogDescription className="text-gray-400">
              Provide a reason for rejecting the feasibility and recommend actions for re-evaluation.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="rejectionReason" className="text-gray-300">Rejection Reason</Label>
              <Textarea
                id="rejectionReason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="mt-1 w-full bg-gray-700 border-gray-600 text-white"
                placeholder="e.g., Insufficient market analysis, concerns about environmental impact, etc."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="recommendedActions" className="text-gray-300">Recommended Actions</Label>
              <Textarea
                id="recommendedActions"
                value={recommendedActionsInput}
                onChange={(e) => setRecommendedActionsInput(e.target.value)}
                className="mt-1 w-full bg-gray-700 border-gray-600 text-white"
                placeholder="e.g., Conduct additional market research, address environmental concerns, etc."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter className="flex gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsFeasibilityRejectModalOpen(false)} className="border-gray-600 text-gray-300 hover:bg-gray-700">
              Cancel
            </Button>
            <Button onClick={handleSubmitFeasibilityRejection} className="bg-red-600 hover:bg-red-700 text-white border-red-600">
              Reject Feasibility
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
