import { Separator } from '@/components/ui/separator'
import { SidebarNav } from './components/sidebar-nav'
import { MainForm } from './components/main-form'
import { useState } from 'react'

const sidebarNavItems = [
  {
    id: 4201,
    title: '～あぐねる'
  },
  {
    id: 4202,
    title: '～ありき'
  },
]

const Form = () => {
  const [activeId, setActiveId] = useState<number>(sidebarNavItems[0].id)

  return (
    <>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Sentence Making</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav activeId={activeId} items={sidebarNavItems} onNavClick={ (id) => setActiveId(id) } />
          </aside>
          <div className="flex-1 lg:max-w-2xl">
            <MainForm activeItem={ sidebarNavItems.find(item => item.id === activeId) } />
          </div>
        </div>
      </div>
    </>
  )
}

export default Form