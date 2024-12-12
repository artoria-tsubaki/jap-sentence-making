import { Separator } from '@/components/ui/separator'
import { SidebarNav } from './components/sidebar-nav'
import { MainForm } from './components/main-form'
import { useEffect, useState } from 'react'

import { getGrammarApi, getExampleApi } from '@/api/modules/form'
import { Grammar, Example, ExampleParams } from '@/api/modules/form'

const Form = () => {
  const [activeId, setActiveId] = useState<number>(0)
  const [sidebarNavItems, setSidebarNavItems] = useState<Grammar[]>([])
  const [formListCache, setformListCache] = useState<{ [key: number]: Example[] }>({})

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getGrammarApi({ level_id: '6', limit: 5 })
      if(data) {
        setSidebarNavItems(data)
        setActiveId(data[0].id)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    // 刷新 formList
    const fetchData = async () => {
      if(!formListCache[activeId]) {
        const { data } = await getExampleApi({ grammar_id: activeId })
        if(data) {
          setformListCache((prevCache) => ({ ...prevCache, [activeId]: data}))
        }
      }
    }

    fetchData()
  }, [activeId])

  return (
    <>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Sentence Making</h2>
          <p className="text-muted-foreground">
            sentence making practise.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav activeId={activeId} items={sidebarNavItems} onNavClick={ (id) => setActiveId(id) } />
          </aside>
          <div className="flex-1 lg:max-w-2xl">
            <MainForm activeItem={ sidebarNavItems.find(item => item.id === activeId) } formList={formListCache[activeId]} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Form