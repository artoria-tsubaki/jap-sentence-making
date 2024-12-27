import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { Button } from '@/components/ui/button'
import { NotePointer } from '../../views/form/interfaces'

interface NoteEditorProps extends React.HTMLAttributes<HTMLDivElement>{
  onNoteDelete: () => Promise<void>;
  onEditorSubmit: (value: string) => Promise<void>;
  pointer: NotePointer
}

export function NoteEditor ({ onNoteDelete, onEditorSubmit, pointer }: NoteEditorProps) {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null) // TS 语法
  const [html, setHtml] = useState<string>('')
  

  // // 模拟 ajax 请求，异步设置 html
  useEffect(() => {
    setTimeout(() => {
      setHtml(pointer.content || '')
    })
  }, [pointer])

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {} // TS 语法

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    // TS 语法
    placeholder: '请输入内容...',
  }

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  return (
    <>
      <div className='w-full relative' style={{ border: '1px solid #ccc', zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) => setHtml(editor.getHtml())}
          mode="default"
          style={{ height: '500px', overflowY: 'hidden' }}
          className='pb-[80px]'
        />
        <div className='flex flex-col justify-center px-4 absolute bottom-[10px] left-1/2 -translate-x-1/2 w-10/12 h-[60px] bg-primary rounded-lg'>
          <p className="text-white">{pointer.type}</p>
          <div className="text-zinc-300 truncate" title={pointer.title}>{pointer.title}</div>
        </div>
      </div>
      <div className='flex justify-center mt-4 align-center relative'>
        {
          pointer.note_id ? 
          <div 
            className='text-red-500 cursor-pointer py-2 absolute top-1/2 -translate-y-1/2 left-2'
            onClick={()=>{onNoteDelete()}}
          >Delete Note</div> :
          <></>
        }
        <Button onClick={() => {onEditorSubmit(html)}}>Submit Note</Button>
      </div>
    </>
  )
}