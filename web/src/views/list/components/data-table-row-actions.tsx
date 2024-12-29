"use client"

import { Row, Table } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { RowDetail } from "./row-detail"
import { RowNote } from "./row-note"
import { RowEdit } from "./row-edit"
import { useState } from "react"


interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  table: Table<TData>
}

export function DataTableRowActions<TData>({
  row,
  table
}: DataTableRowActionsProps<TData>) {
  const rowData = row.original

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const onShowDetail = () => {
    console.log(rowData)
    setIsDetailModalOpen(true)
  }
  const onShowNote = () => {
    setIsNoteModalOpen(true)
  }
  const onShowEdit = () => {
    setIsEditModalOpen(true)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          {/* <DropdownMenuSub>
            <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={task.label}>
                {labels.map((label) => (
                  <DropdownMenuRadioItem key={label.value} value={label.value}>
                    {label.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub> */}
          <DropdownMenuItem onClick={onShowDetail}>View Detail</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onShowEdit}>Edit</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onShowNote}>Note</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <RowDetail isModalOpen={isDetailModalOpen} handleCancel={() => setIsDetailModalOpen(false)} row={row}></RowDetail>
      <RowEdit isModalOpen={isEditModalOpen} handleCancel={() => setIsEditModalOpen(false)} row={row} table={table}></RowEdit>
      <RowNote isModalOpen={isNoteModalOpen} handleCancel={() => setIsNoteModalOpen(false)} row={row}></RowNote>
    </>
  )
}
