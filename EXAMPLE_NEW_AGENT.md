# Example: Adding a New Agent with Signup

This example shows how to add a new agent called "Alex" with signup functionality.

## Step 1: Add Configuration

Update `lib/signup-config.ts`:

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
  },
  // Add new agent configuration
  alex: {
    enabled: true,
    title: "Welcome to DataFlow",
    description: "Get started with intelligent data analytics",
    buttonText: "Start DataFlow",
    characterImage: "/Alex.svg",
    characterAlt: "Alex - DataFlow Character"
  }
}
```

## Step 2: Create Agent Page

Create `app/alex/page.tsx`:

```typescript
"use client"

import { useState } from "react"
import SignupWrapper from "@/components/signup-wrapper"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DataFlowDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard")

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>DataFlow Analytics Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Welcome to DataFlow! Your intelligent data analytics assistant.</p>
              </CardContent>
            </Card>
          </div>
        )
      default:
        return <div>Dashboard</div>
    }
  }

  return (
    <SignupWrapper agentType="alex">
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 text-white">
        <div className="container mx-auto p-6">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">DataFlow</h1>
            <p className="text-gray-300">Intelligent data analytics platform</p>
          </header>
          
          <main>
            {renderContent()}
          </main>
        </div>
      </div>
    </SignupWrapper>
  )
}
```

## Step 3: Add Character Image

Add `public/Alex.svg` (your character image file).

## Step 4: Update Main Dashboard (Optional)

Update `app/page.tsx` to include the new agent:

```typescript
// Add to the grid of application cards
<Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group"
  onClick={() => handleAppSelect('alex')}>
  <CardHeader className="text-center">
    <div className="mx-auto mb-4 p-3 bg-purple-500/20 rounded-full w-16 h-16 flex items-center justify-center">
      <BarChart3 className="h-8 w-8 text-purple-400" />
    </div>
    <CardTitle className="text-2xl font-bold text-white">DataFlow</CardTitle>
    <CardDescription className="text-gray-300">
      Intelligent data analytics and insights platform
    </CardDescription>
  </CardHeader>
  <CardContent className="text-center">
    <Button
      className="w-full bg-purple-600 hover:bg-purple-700 text-white group-hover:bg-purple-700 transition-colors"
      onClick={() => handleAppSelect('alex')}
    >
      Access DataFlow
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  </CardContent>
</Card>
```

## Step 5: Test the Implementation

1. Navigate to `/alex` in your browser
2. You should see the signup form with Alex's branding
3. After completing signup, you'll be redirected to the DataFlow dashboard
4. Subsequent visits will skip the signup form

## Step 6: Disable Signup (When Needed)

To disable signup for Alex:

```typescript
import { disableSignupForAgent } from "@/lib/signup-config"

// Disable signup for Alex
disableSignupForAgent("alex")
```

Or override per-page:

```typescript
<SignupWrapper agentType="alex" signupEnabled={false}>
  {/* Content will show without signup */}
</SignupWrapper>
```

## Result

Now when users visit `/alex`, they will:
1. See a signup form with DataFlow branding
2. Complete the form with validation
3. Be redirected to the DataFlow dashboard
4. Skip signup on future visits

The signup data will be stored in Google Sheets with the flowType "alex". 