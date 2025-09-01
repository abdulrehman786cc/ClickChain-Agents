import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Emma - ClickChain.AI',
  description: 'Human-in-the-loop agentic payroll resolution system',
  generator: 'ClickChain.AI',
}

export default function EmmaLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
} 