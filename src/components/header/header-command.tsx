'use client'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { schema } from '@/generated/schema'
import { Search } from 'lucide-react'
import { FC, useCallback, useState } from 'react'
import { Button } from '../ui/button'

export interface HeaderCommandProps {
  className?: string
}

export const HeaderCommand: FC<HeaderCommandProps> = ({
  className,
  ...props
}) => {
  const [open, setOpen] = useState(false)
  const openDialog = useCallback(() => setOpen(true), [setOpen])
  return (
    <>
      <Button
        variant={'ghost'}
        size="icon"
        className={className}
        onClick={openDialog}
      >
        <Search />
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className="h-3/5 w-11/12 rounded-md"
        {...props}
      >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Actions" className="md:hidden">
            <CommandItem>
              <span>Create new Schema Item</span>
            </CommandItem>
            <CommandItem>
              <span>Create new Entry</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator className="my-2 md:hidden" />
          <CommandGroup heading="Schema Items">
            {schema.items.map((item) => (
              <CommandItem
                key={item.dbName}
                className="flex items-center justify-between"
              >
                {item.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
