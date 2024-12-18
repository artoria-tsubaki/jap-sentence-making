import { Separator } from '@/components/ui/separator'
import { SidebarNav } from './components/sidebar-nav'
import { MainForm } from './components/main-form'
import { NoteEditor } from './components/note-editor'
import { useEffect, useState } from 'react'

import { getGrammarApi, getExampleApi, postNoteApi, Sentence, Note, NoteParams } from '@/api/modules/form'
import { Grammar, Example } from '@/api/modules/form'
import { cn } from '@/lib/utils'
import { NotePointer } from './interfaces'
import { store } from '@/redux'
import { message } from 'antd'

const Form = () => {
  const [activeId, setActiveId] = useState<number>(0)
  const [sidebarNavItems, setSidebarNavItems] = useState<(Grammar & Note)[]>([])
  const [formListCache, setformListCache] = useState<{ [key: number]: (Example & Sentence & Note)[] }>({})
  const [noteShow, setNoteShow] = useState<boolean>(false)
  const [notePointer, setNotePointer] = useState<NotePointer>({})

  const userId = store.getState().global.userId;

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getGrammarApi({ level_id: '6', limit: 5, user_id: userId })
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
        const { data } = await getExampleApi({ grammar_id: activeId, user_id: userId })
        if(data) {
          setformListCache((prevCache) => ({ ...prevCache, [activeId]: data}))
        }
      }
    }

    fetchData()
  }, [activeId])

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setformListCache((prevCache) => {
      const current = prevCache[activeId]
      current.find(item => item.example_id === Number(id))!.jap_input = value
      return { ...prevCache, [activeId]: current }
    })
  }

  const onPriorityChange = (value: string, id:number) => {
    setformListCache((prevCache) => {
      const current = prevCache[activeId]
      current.find(item => item.example_id === Number(id))!.priority = value
      return { ...prevCache, [activeId]: current }
    })
  }
  const onStatusChange = (value: string, id:number) => {
    setformListCache((prevCache) => {
      const current = prevCache[activeId]
      current.find(item => item.example_id === Number(id))!.status = value
      return { ...prevCache, [activeId]: current }
    })
  }
  const onNoteShowChange = (props: NotePointer) => {
    if(props.id === notePointer.id || notePointer.id === undefined) {
      setNoteShow(!noteShow)
    }
  }
  const onNoteEditorSubmit = async (content: string) => {
    setNotePointer(prev => ({ ...prev, content }))
    const postParams: NoteParams = {
      user_id: userId,
      note_content: content
    }
    if(notePointer.type === 'Sentence') {
      postParams['example_id'] = notePointer.id
    }
    if(notePointer.type === 'Grammar') {
      postParams['grammar_id'] = notePointer.id
    }
    const res = await postNoteApi(postParams);
    if(res.code === 200) {
      message.success('提交笔记成功')
      if(notePointer.type === 'Sentence') {
        setformListCache((prevCache) => {
          const current = prevCache[activeId]
          current.find(item => item.example_id === notePointer.id)!.note_content = content
          return { ...prevCache, [activeId]: current }
        })
      }
      if(notePointer.type === 'Grammar') {
        // setSidebarNavItems((prev) => {
        //   const current = prev.find(item => item.grammar_id === notePointer.id)!
        //   return [...prev.filter(item => item.grammar_id !== notePointer.id), { ...current, note_content: content }]
        // })
        setSidebarNavItems(sidebarNavItems.map(item => item.grammar_id === notePointer.id ? { ...item, note_content: content } : item))
      }
    } else {
      message.error('提交笔记失败')
    }
  }


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
            <SidebarNav 
              activeId={activeId} 
              items={sidebarNavItems} 
              onNavClick={ (id) => setActiveId(id) } 
            />
          </aside>
          <div className={cn("lg:max-w-4xl", noteShow ? "lg:w-2/5" : "lg:w-4/5")}>
            <MainForm 
              activeItem={ sidebarNavItems.find(item => item.id === activeId) } 
              formList={formListCache[activeId]} 
              onInputChange={onInputChange} 
              onPriorityChange={onPriorityChange} 
              onStatusChange={onStatusChange}
              onNoteShow={onNoteShowChange}
              onSetPointer={setNotePointer}
            />
          </div>
          <div className={cn("lg:w-2/5", noteShow ? "block" : "hidden")}>
            <NoteEditor onEditorSubmit={onNoteEditorSubmit} pointer={notePointer} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Form