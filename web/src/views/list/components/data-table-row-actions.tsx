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
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
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
  const [noteType, setNoteType] = useState<"Grammar" | "Sentence">("Sentence")

  const onShowDetail = () => {
    console.log(rowData)
    setIsDetailModalOpen(true)
  }
  const onShowNote = (type: "Grammar" | "Sentence") => {
    setNoteType(type);
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
          <DropdownMenuItem onClick={onShowDetail}>View Detail</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onShowEdit}>Edit</DropdownMenuItem>
          <DropdownMenuSeparator />
          {/* <DropdownMenuItem onClick={onShowNote}>Note</DropdownMenuItem> */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Note</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup>
                  <DropdownMenuRadioItem value={""} onClick={() => onShowNote("Grammar")}>Grammar</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={""} onClick={() => onShowNote("Sentence")}>Sentence</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
      <RowDetail isModalOpen={isDetailModalOpen} handleCancel={() => setIsDetailModalOpen(false)} row={row}></RowDetail>
      <RowEdit isModalOpen={isEditModalOpen} handleCancel={() => setIsEditModalOpen(false)} row={row} table={table}></RowEdit>
      <RowNote isModalOpen={isNoteModalOpen} handleCancel={() => setIsNoteModalOpen(false)} row={row} noteType={noteType}></RowNote>
    </>
  )
}
