"use client"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { useState } from "react"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  activeId: number
  onNavClick: (id: number) => void
  items: {
    id: number
    title: string
  }[]
}

export function SidebarNav({ className, activeId, onNavClick, items, ...props }: SidebarNavProps) {
  
  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 cursor-pointer",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            activeId === item.id
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
          onClick={() => onNavClick(item.id)}
        >
          {item.title}
        </div>
      ))}
    </nav>
  )
}
