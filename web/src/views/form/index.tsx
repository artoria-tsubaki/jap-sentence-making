import { Separator } from '@/components/ui/separator'
import { SidebarNav } from './components/sidebar-nav'
import { MainForm } from './components/main-form'
import { NoteEditor } from '@/components/NoteEditor'
import { useEffect, useState } from 'react'

import { 
  getGrammarApi, 
  getExampleApi, 
  putSentenceApi, 
  postNoteApi, 
  putNoteApi, 
  deleteNoteApi, 
  Sentence, 
  Note,
  Proficiency, 
  NoteParams, 
  putProficiencyApi,
  ProficiencyParams
} from '@/api/modules/form'
import { Grammar, Example } from '@/api/modules/form'
import { cn } from '@/lib/utils'
import { NotePointer } from './interfaces'
import { store } from '@/redux'
import { message } from 'antd'
import { ResultData } from '@/api/interface'

const Form = () => {
  const [activeId, setActiveId] = useState<number>(0)
  const [sidebarNavItems, setSidebarNavItems] = useState<(Grammar & Note & Proficiency)[]>([])
  const [formListCache, setformListCache] = useState<{ [key: number]: (Example & Sentence & Note)[] }>({})
  const [noteShow, setNoteShow] = useState<boolean>(false)
  const [notePointer, setNotePointer] = useState<NotePointer>({})

  const userId = store.getState().global.userId;

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getGrammarApi({ level_id: '1,2,3,4,5,6', limit: 5, user_id: userId, proficiency: '1,2' })
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
      if(!formListCache[activeId] && activeId != 0) {
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
  const onProficiencyChange = async (value: string, id:number) => {
    const grammar = sidebarNavItems.find(item => item.id === activeId)!
    const params: ProficiencyParams = {
      user_id: userId,
      proficiency: value,
      grammar_id: grammar.id
    }
    if(grammar.proficiency_id) {
      params.id = grammar.proficiency_id
    }
    const { data } = await putProficiencyApi(params)
    setSidebarNavItems(sidebarNavItems.map(item => item.id === id ? { ...item, ...{ proficiency_id: data!.proficiency_id, proficiency: data!.proficiency } } : item))
    console.log(id, sidebarNavItems)
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
    let res: ResultData<number> | null = null;
    if(notePointer.note_id) {
      // 存在笔记调用编辑接口
      postParams['id'] = notePointer.note_id
      res = await putNoteApi(postParams);
    } else {
      res = await postNoteApi(postParams);
    }
    
    if(res?.code === 200) {
      message.success('提交笔记成功')
      _updateNoteData({content, note_id: res?.data})
    } else {
      message.error('提交笔记失败')
    }
  }

  const onFormSubmit = async () => {
    const userId = store.getState().global.userId;
    formListCache[activeId].forEach((item) => {
      item.user_id = userId;
    })
    const data = await putSentenceApi(formListCache[activeId]);
    if(data.code === 200) {
      message.success('提交成功');
      // 成功后刷新列表
      const { data: newList } = await getExampleApi({ grammar_id: activeId, user_id: userId })
      if(newList) {
        setformListCache((prevCache) => ({ ...prevCache, [activeId]: newList}))
      }
    }
  }

  const onNoteDelete = async () => {
    console.log(notePointer.note_id)
    const res = await deleteNoteApi(notePointer.note_id!)
    if(res?.code === 200) {
      message.success('删除笔记成功')
      _updateNoteData({content: undefined, note_id: undefined})
      
    }
  }

  const _updateNoteData = ({content, note_id}: NotePointer) => {
    if(notePointer.type === 'Sentence') {
      setformListCache((prevCache) => {
        const current = prevCache[activeId]
        const currentNote = current.find(item => item.example_id === notePointer.id)!
        currentNote.note_content = content
        currentNote.note_id = note_id
        return { ...prevCache, [activeId]: current }
      })
      setNotePointer({ ...notePointer, content: content, note_id: note_id })
    }
    if(notePointer.type === 'Grammar') {
      setSidebarNavItems(sidebarNavItems.map(item => item.id === notePointer.id ? { ...item, note_content: content, note_id: note_id } : item))
      setNotePointer({ ...notePointer, content: content, note_id: note_id })
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
              pointer={notePointer} 
              noteShow={noteShow} 
              onInputChange={onInputChange} 
              onProficiencyChange={onProficiencyChange} 
              onPriorityChange={onPriorityChange} 
              onStatusChange={onStatusChange}
              onNoteShow={onNoteShowChange}
              onSetPointer={setNotePointer}
              onFormSubmit={onFormSubmit}
            />
          </div>
          <div className={cn("lg:w-2/5", noteShow ? "block" : "hidden")}>
            <NoteEditor onNoteDelete={onNoteDelete} onEditorSubmit={onNoteEditorSubmit} pointer={notePointer} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Form