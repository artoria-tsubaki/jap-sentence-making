"use client"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Grammar, Example, Sentence, postSentenceApi } from "@/api/modules/form"
import { store } from "@/redux";
import { message } from 'antd'

interface MainFormProps extends React.HTMLAttributes<HTMLElement> {
  activeItem: Grammar | undefined;
  formList: (Example & Sentence)[];
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
}

export function MainForm({ activeItem, formList, onInputChange }: MainFormProps) {

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
                <div className="flex flex-col space-y-1.5" key={formItem.id}>
                  <Label htmlFor="name">{ (formIndex + 1) + '. ' + formItem.chinese_translation }</Label>
                  <Input value={formItem.jap_input} onChange={onInputChange} id={ String(formItem.id) } placeholder="" /> 
                </div>
              )
            })
          }
          <div className="flex justify-end space-y-1.5">
            <Button type='button' onClick={ () => onSubmit() }>Submit</Button>
          </div>
        </div>
      </form>
    </div>
  )
}