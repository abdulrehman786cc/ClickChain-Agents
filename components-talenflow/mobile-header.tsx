"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

interface MobileHeaderProps {
  title: string
  onMenuClick: () => void
  isMenuOpen: boolean
}

export function MobileHeader({ title, onMenuClick, isMenuOpen }: MobileHeaderProps) {
  return (
    <div className="sticky top-0 z-40 bg-gray-900 border-b border-gray-700 px-4 py-3 md:hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button
            onClick={onMenuClick}
            variant="ghost"
            size="sm"
            className="bg-gray-800 border border-gray-600 hover:bg-gray-700 text-gray-300 hover:text-white w-10 h-10 p-0 rounded-lg"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          <h1 className="text-lg font-semibold text-white">{title}</h1>
        </div>

        {/* Optional: Add action buttons here */}
        <div className="flex items-center space-x-2">{/* You can add page-specific action buttons here */}</div>
      </div>
    </div>
  )
}
