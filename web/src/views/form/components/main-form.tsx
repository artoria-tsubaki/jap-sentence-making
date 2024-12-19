"use client"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Grammar, Example, Sentence, putSentenceApi, Note } from "@/api/modules/form"
import { store } from "@/redux";
import { message } from 'antd'


import { AttrDropdownRadio } from "./attrDropdownRadio"
import { priorities, statuses } from "@/views/list/data/data"
import { NotebookPen } from "lucide-react"
import { NotePointer } from "../interfaces"

interface MainFormProps extends React.HTMLAttributes<HTMLElement> {
  activeItem: (Grammar & Note) | undefined;
  formList: (Example & Sentence & Note)[];
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onPriorityChange: (value: string, id: number) => void;
  onStatusChange: (value: string, id: number) => void;
  onNoteShow: (props: NotePointer) => void;
  onSetPointer: React.Dispatch<React.SetStateAction<NotePointer>>;
}

export function MainForm({ 
  activeItem, 
  formList, 
  onInputChange, 
  onPriorityChange, 
  onStatusChange,
  onNoteShow,
  onSetPointer 
}: MainFormProps) {
  console.log('main form');
  
  const onSubmit = async () => {
    // TODO: Implement form submission
    console.log(formList);
    const userId = store.getState().global.userId;
    formList.forEach((item) => {
      item.user_id = userId;
    })
    const data = await putSentenceApi(formList);
    console.log(data);
    if(data.code === 200) {
      message.success('提交成功');
    }
  }
  const onNoteIconCick = (props: NotePointer) => {
    onNoteShow(props);
    console.log('click', props);
    
    setTimeout(() => {
      onSetPointer(props);
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">{ activeItem?.grammar_point }</h3>
          <div 
            className="flex items-center justify-center border-zinc-400 border border-solid rounded-full h-8 w-8 cursor-pointer"
            onClick={() => onNoteIconCick({ id: activeItem?.id, type: 'Grammar', title: activeItem?.grammar_point, content: activeItem?.note_content, note_id: activeItem?.note_id })}
          >
            <NotebookPen className="h-4 w-4" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          { activeItem?.explanation }
        </p>
      </div>
      <Separator />
      <form>
        <div className="grid w-full items-center gap-12">
          {
            formList?.map((formItem: Example & Sentence & Note, formIndex: number) => {
              return (
                <div className="flex flex-col space-y-1.5" key={formItem.example_id}>
                  <Label htmlFor="name">{ (formIndex + 1) + '. ' + formItem.chinese_translation }</Label>
                  <Input value={formItem.jap_input} onChange={onInputChange} id={ String(formItem.example_id) } placeholder="" />
                  {
                    formItem.sentence_id && (
                      <>
                        <div className="flex align-center justify-between">
                          <span className="text-sm">Reference Sentence: <span className="text-red-500">{ formItem.japanese_sentence }</span></span>
                            <div className="flex gap-1.5">
                              <AttrDropdownRadio 
                                title="Priority"
                                value={formItem.priority} 
                                onValueChange={(value: string) => onPriorityChange(value, formItem.example_id)}
                                dropdownMenuItems={priorities}
                              ></AttrDropdownRadio>
                              <AttrDropdownRadio 
                                title="Status"
                                value={formItem.status} 
                                onValueChange={(value: string) => onStatusChange(value, formItem.example_id)}
                                dropdownMenuItems={statuses}
                              ></AttrDropdownRadio>
                              <NotebookPen className="w-4 h-4 cursor-pointer" onClick={() => onNoteIconCick({ id: formItem.example_id, type: 'Sentence', title: formItem.japanese_sentence, content: formItem?.note_content, note_id: formItem?.note_id })} />
                            </div>
                        </div>
                        <Separator className="bg-gray-400" />
                      </>
                    )
                  } 
                </div>
              )
            })
          }
          <div className="flex justify-end space-y-1.5">
            <Button type='button' onClick={() => onSubmit()}>Submit</Button>
          </div>
        </div>
      </form>
    </div>
  )
}