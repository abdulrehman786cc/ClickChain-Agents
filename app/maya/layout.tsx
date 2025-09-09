import type React from "react"
import type { Metadata } from "next"
import "./maya.css"

export const metadata: Metadata = {
    title: 'LocalFlow - ClickChain.AI',
    description: 'Intelligent talent acquisition and candidate management system',
    generator: 'ClickChain.AI',
}

export default function MayaLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return <>{children}</>
}
