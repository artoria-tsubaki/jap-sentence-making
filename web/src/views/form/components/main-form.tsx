"use client"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Grammar, Example } from "@/api/modules/form"

interface MainFormProps extends React.HTMLAttributes<HTMLElement> {
  activeItem: Grammar | undefined;
  formList: Example[];
}

export function MainForm({ activeItem, formList }: MainFormProps) {

  const onSubmit = () => {
    // TODO: Implement form submission
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
            formList?.map((formItem: Example, formIndex: number) => {
              return (
                <div className="flex flex-col space-y-1.5" key={formItem.id}>
                  <Label htmlFor="name">{ (formIndex + 1) + '. ' + formItem.chinese_translation }</Label>
                  <Input id={ String(formItem.id) } placeholder="" />
                </div>
              )
            })
          }
          <div className="flex justify-end space-y-1.5">
            <Button onClick={ () => onSubmit() }>Submit</Button>
          </div>
        </div>
      </form>
    </div>
  )
}