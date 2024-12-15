import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface attrDropdownRadioProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  value: string;
  onValueChange: (value: string) => void;
  dropdownMenuItems: { label: string; value: string, icon: React.ComponentType<{ className?: string }> }[];
}

export function AttrDropdownRadio({ title, value, onValueChange, dropdownMenuItems }: attrDropdownRadioProps) {

  const formItem = dropdownMenuItems.find(item => item.value === value)!

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={"cursor-pointer"}
        >
          {
            formItem.icon && <formItem.icon className="h-4 w-4" />
          }
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-28">
        <DropdownMenuLabel>{ title }</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
          {
            dropdownMenuItems.map((item: { label: string; value: string, icon: unknown }) => {
              return (
                <DropdownMenuRadioItem value={item.value}>{item.label}</DropdownMenuRadioItem>
              )
            })
          }
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}