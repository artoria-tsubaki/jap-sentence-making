import { useEffect, useState } from "react"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"

import { Example, getExampleApi, Grammar, Sentence } from "@/api/modules/form"

const List = () => {
  const [data, setData] = useState<(Example & Sentence & Grammar)[]>([])
  const fetchData = async () => {
    const { data } = await getExampleApi({})
    if(data) {
      setData(data)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 pt-6 px-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your data for this month!
            </p>
          </div>
        </div>
        <DataTable setData={setData} data={data} columns={columns} />
      </div>
    </>
  )
}

export default List