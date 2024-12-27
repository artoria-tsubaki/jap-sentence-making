import { message, Modal } from "antd";
import { NoteEditor } from '@/components/NoteEditor'
import { Row } from "@tanstack/react-table"
import { RowDataType } from "../data/data"
import { useState } from "react";
import { NotePointer } from "@/views/form/interfaces";
import { deleteNoteApi, NoteParams, postNoteApi, putNoteApi } from "@/api/modules/form";
import { ResultData } from "@/api/interface";
import { store } from "@/redux";

interface RowNoteProps<TData> {
  row: Row<TData>;
  isModalOpen: boolean;
  handleCancel: () => void;
}

export function RowNote<TData> ({ row, isModalOpen, handleCancel }: RowNoteProps<TData>) {
  const rowData = row.original as RowDataType;
  const [notePointer, setNotePointer] = useState<NotePointer>({
    id: rowData.sentence_id,
    type: 'Sentence',
    title: rowData.japanese_sentence,
    content: rowData.note_content,
    note_id: rowData.note_id
  })
  const userId = store.getState().global.userId;

  const onNoteDelete = async () => {
    const res = await deleteNoteApi(notePointer.note_id!)
    if(res?.code === 200) {
      message.success('删除笔记成功')
      setNotePointer({ ...notePointer, content: undefined, note_id: undefined })
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
      setNotePointer({ ...notePointer, content: content, note_id: res?.data })
    } else {
      message.error('提交笔记失败')
    }
  }

  return (
    <>
      <Modal title="Note" 
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <NoteEditor
          onNoteDelete={onNoteDelete} 
          onEditorSubmit={onNoteEditorSubmit} 
          pointer={notePointer}
        ></NoteEditor>
      </Modal>
    </>
  )
}