"use client"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Grammar, Example, Sentence, postSentenceApi } from "@/api/modules/form"
import { store } from "@/redux";
import { message } from 'antd'


import { AttrDropdownRadio } from "./attrDropdownRadio"
import { priorities, statuses } from "@/views/list/data/data"
import { NotebookPen } from "lucide-react"

interface MainFormProps extends React.HTMLAttributes<HTMLElement> {
  activeItem: Grammar | undefined;
  formList: (Example & Sentence)[];
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onPriorityChange: (value: string, id: number) => void;
  onStatusChange: (value: string, id: number) => void;
}

export function MainForm({ activeItem, formList, onInputChange, onPriorityChange, onStatusChange }: MainFormProps) {

  const onShowNote = (example_id: number) => {
    console.log(example_id);
  }

  const onSubmit = async () => {
    // TODO: Implement form submission
    console.log(formList);
    const userId = store.getState().global.userId;
    formList.forEach((item) => {
      item.user_id = userId;
    })
    const data = await postSentenceApi(formList);
    console.log(data);
    if(data.code === 200) {
      message.success('提交成功');
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{ activeItem?.grammar_point }</h3>
        <p className="text-sm text-muted-foreground">
          { activeItem?.explanation }
        </p>
      </div>
      <Separator />
      <form>
        <div className="grid w-full items-center gap-12">
          {
            formList?.map((formItem: Example & Sentence, formIndex: number) => {
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
                              <NotebookPen className="w-4 h-4 cursor-pointer" onClick={() => onShowNote(formItem.example_id)} />
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