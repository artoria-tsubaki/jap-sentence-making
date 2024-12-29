import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils";

interface attrDropdownRadioProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  value: string;
  onValueChange: (value: string) => void;
  dropdownMenuItems: { label: string; value: string, icon: React.ComponentType<{ className?: string }> }[];
  ClassName?: string;
}

export function AttrDropdownRadio({ title, value, onValueChange, dropdownMenuItems, ClassName }: attrDropdownRadioProps) {

  const formItem = dropdownMenuItems.find(item => item.value === value)!

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={"cursor-pointer"}
        >
          {
            formItem.icon && <formItem.icon className={cn(ClassName ? ClassName :"h-4 w-4" )}/>
          }
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-28 z-[10019991]">
        <DropdownMenuLabel>{ title }</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
          {
            dropdownMenuItems.map((item: { label: string; value: string, icon: unknown }) => {
              return (
                <DropdownMenuRadioItem key={item.value} value={item.value}>{item.label}</DropdownMenuRadioItem>
              )
            })
          }
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}