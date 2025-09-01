// Signup configuration for different agents
export interface AgentSignupConfig {
    enabled: boolean
    title: string
    description: string
    buttonText: string
    characterImage?: string
    characterAlt?: string
}

export interface SignupConfig {
    [agentType: string]: AgentSignupConfig
}

// Default signup configuration for all agents
export const defaultSignupConfig: SignupConfig = {
    emma: {
        enabled: true,
        title: "Welcome to PayFlow",
        description: "Get started with intelligent payroll management",
        buttonText: "Start PayFlow",
        characterImage: "/Emma.svg",
        characterAlt: "Emma - PayFlow Character"
    },
    noah: {
        enabled: true,
        title: "Welcome to TalentFlow",
        description: "Begin your talent acquisition journey",
        buttonText: "Start TalentFlow",
        characterImage: "/Noah.svg",
        characterAlt: "Noah - TalentFlow Character"
    }
}

// Function to get signup config for a specific agent
export function getSignupConfig(agentType: string): AgentSignupConfig {
    return defaultSignupConfig[agentType] || {
        enabled: false,
        title: "Welcome",
        description: "Get started",
        buttonText: "Get Started"
    }
}

// Function to update signup config for an agent
export function updateSignupConfig(agentType: string, config: Partial<AgentSignupConfig>) {
    if (defaultSignupConfig[agentType]) {
        defaultSignupConfig[agentType] = { ...defaultSignupConfig[agentType], ...config }
    } else {
        defaultSignupConfig[agentType] = {
            enabled: true,
            title: "Welcome",
            description: "Get started",
            buttonText: "Get Started",
            ...config
        }
    }
}

// Function to disable signup for an agent
export function disableSignupForAgent(agentType: string) {
    if (defaultSignupConfig[agentType]) {
        defaultSignupConfig[agentType].enabled = false
    }
}

// Function to enable signup for an agent
export function enableSignupForAgent(agentType: string) {
    if (defaultSignupConfig[agentType]) {
        defaultSignupConfig[agentType].enabled = true
    }
} 