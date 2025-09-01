# Unified Agents Platform

A unified Next.js application that combines two specialized agent systems:

## Applications

### PayFlow (`/emma`)
- **Purpose**: Human-in-the-loop agentic payroll resolution system
- **Features**: 
  - Payroll supervision dashboard
  - Anomaly detection and resolution
  - Issue queue management
  - Agent widgets and monitoring
  - Training console

### TalenFlow (`/noah`)
- **Purpose**: Intelligent talent acquisition and candidate management system
- **Features**:
  - Candidate flow management
  - Agent logs and monitoring
  - Dashboard with analytics
  - Training console
  - Mobile-responsive design

## Getting Started

1. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Navigation

- **Homepage** (`/`): Landing page with application selection
- **PayFlow** (`/emma`): Access the payroll management system
- **TalenFlow** (`/noah`): Access the talent acquisition system

## Project Structure

```
unified-agents-app/
├── app/
│   ├── page.tsx              # Main landing page
│   ├── emma/
│   │   └── page.tsx          # PayFlow application
│   └── noah/
│       └── page.tsx          # TalenFlow application
├── components/               # PayFlow components
├── components-talenflow/     # TalenFlow components
├── lib/                      # PayFlow utilities and agents
├── lib-talenflow/           # TalenFlow utilities
└── public/                  # Static assets
```

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - Component primitives
- **Lucide React** - Icons

## Development

The application uses a unified structure where:
- PayFlow components are in the main `components/` directory
- TalenFlow components are in `components-talenflow/` directory
- Each application maintains its own styling and functionality
- Shared UI components are available to both applications 