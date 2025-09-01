import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Noah - ClickChain.AI',
  description: 'Intelligent talent acquisition and candidate management system',
  generator: 'ClickChain.AI',
}

export default function NoahLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
} 