# Plug-and-Play Signup System

This document explains how the plug-and-play signup system works and how to configure it for different agents.

## Overview

The signup system is designed to be easily applied to any agent page. It automatically shows a signup form before users can access the agent dashboard, and can be easily disabled when no longer needed.

## How It Works

1. **SignupWrapper Component**: Wraps any agent page and checks if the user has completed signup
2. **SignupForm Component**: Displays the signup form with validation and submission
3. **Configuration System**: Centralized configuration for all agents
4. **Local Storage**: Remembers completed signups to avoid repetition

## Current Implementation

### Emma (PayFlow)
- Agent Type: `emma`
- Character: Emma (PayFlow Character)
- Signup enabled by default

### Noah (TalentFlow)
- Agent Type: `noah`
- Character: Noah (TalentFlow Character)
- Signup enabled by default

## Configuration

### Signup Configuration File
Located at `lib/signup-config.ts`, this file contains:

```typescript
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
```

### Adding a New Agent

1. **Add configuration** to `lib/signup-config.ts`:
```typescript
newAgent: {
  enabled: true,
  title: "Welcome to NewAgent",
  description: "Get started with NewAgent",
  buttonText: "Start NewAgent",
  characterImage: "/NewAgent.svg",
  characterAlt: "NewAgent Character"
}
```

2. **Wrap the agent page** with SignupWrapper:
```typescript
import SignupWrapper from "@/components/signup-wrapper"

export default function NewAgentPage() {
  return (
    <SignupWrapper agentType="newAgent">
      {/* Your agent content */}
    </SignupWrapper>
  )
}
```

3. **Add character image** to `public/` directory

## Disabling Signup

### For a Specific Agent
```typescript
import { disableSignupForAgent } from "@/lib/signup-config"

// Disable signup for Emma
disableSignupForAgent("emma")
```

### For All Agents
Update the configuration file to set `enabled: false` for all agents.

### Per-Page Override
```typescript
<SignupWrapper agentType="emma" signupEnabled={false}>
  {/* Content will show without signup */}
</SignupWrapper>
```

## Environment Variables

The signup API requires these environment variables:
- `GOOGLE_CLIENT_EMAIL`
- `GOOGLE_PRIVATE_KEY`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_SHEET_ID`

## API Endpoint

- **POST** `/api/submit-signup`
- Accepts: `firstName`, `lastName`, `email`, `flowType`
- Stores data in Google Sheets

## User Experience

1. **First Visit**: User sees signup form with agent-specific branding
2. **Form Validation**: Real-time validation with error messages
3. **Submission**: Data sent to Google Sheets with success/error feedback
4. **Local Storage**: Remembers completed signups to avoid repetition
5. **Skip Option**: Returning users can skip the form
6. **Redirect**: After signup, user is redirected to the agent dashboard

## Files Structure

```
unified-agents-app/
├── components/
│   ├── signup-form.tsx          # Main signup form component
│   └── signup-wrapper.tsx       # Wrapper for agent pages
├── app/
│   ├── api/submit-signup/
│   │   └── route.ts             # API endpoint
│   ├── emma/
│   │   └── page.tsx             # Emma page with signup
│   └── noah/
│       └── page.tsx             # Noah page with signup
├── lib/
│   └── signup-config.ts         # Configuration management
└── public/
    ├── Emma.svg                 # Emma character image
    └── Noah.svg                 # Noah character image
```

## Future Enhancements

- **A/B Testing**: Different signup flows for different users
- **Analytics**: Track signup completion rates
- **Custom Fields**: Add more form fields per agent
- **Multi-step Forms**: Complex signup flows
- **Social Login**: OAuth integration
- **Email Verification**: Email confirmation step 