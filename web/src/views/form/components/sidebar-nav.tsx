"use client"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { useState } from "react"
import { Grammar } from "@/api/modules/form"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  activeId: number
  onNavClick: (id: number) => void
  items: Grammar[]
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
              ? "bg-neutral-300 hover:bg-neutral-300"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
          onClick={() => onNavClick(item.id)}
        >
          {item.grammar_point}
        </div>
      ))}
    </nav>
  )
}
