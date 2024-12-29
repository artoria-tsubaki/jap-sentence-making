"use client"

import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DataTableViewOptions } from "./data-table-view-options"

import { priorities, statuses, labels } from "../data/data"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { useState } from "react"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const [filterField, setFilterFied] = useState("japanese_sentence")

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Select
          value={filterField} 
          onValueChange={(value) => 
            setFilterFied(value)
          }>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter Field" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="japanese_sentence">Japanese Sentence</SelectItem>
            <SelectItem value="chinese_translation">Chinese Sentence</SelectItem>
            <SelectItem value="jap_input">Your Sentence</SelectItem>
            <SelectItem value="grammar_point">Grammar</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Filter ..."
          value={(table.getColumn(filterField)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(filterField)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("level_name") && (
          <DataTableFacetedFilter
            column={table.getColumn("level_name")}
            title="Level"
            options={labels}
          />
        )}
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
