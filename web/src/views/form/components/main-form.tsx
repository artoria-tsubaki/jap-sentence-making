"use client"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface MainFormProps extends React.HTMLAttributes<HTMLElement> {
  activeItem: {
    id: number
    title: string
  }
}

export function MainForm({ activeItem }: MainFormProps) {

  const onSubmit = () => {
    // TODO: Implement form submission
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{ activeItem.title }</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <form>
        <div className="grid w-full items-center gap-12">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="" />
          </div>
          <div className="flex justify-end space-y-1.5">
            <Button onClick={ () => onSubmit() }>Submit</Button>
          </div>
        </div>
      </form>
    </div>
  )
}