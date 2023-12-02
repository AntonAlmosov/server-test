import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { type FC } from "react";
import { SheetTrigger } from "@/components/ui/sheet";
import { FormSheet } from "../sheets/form-sheet";
import { SchemaMenuButton } from "../menu/schema-menu-button";
import { type SchemaType } from "@/lib/schemas/schema";

export interface SchemaNavProps {
  className?: string;
  schemaCollection?: SchemaType[];
}

export const SchemaNav: FC<SchemaNavProps> = ({
  schemaCollection,
  ...props
}) => {
  return (
    <Command {...props}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions" className="md:hidden">
          <FormSheet kind="schema">
            <SheetTrigger className="w-full">
              <CommandItem>Create a new Schema</CommandItem>
            </SheetTrigger>
          </FormSheet>
        </CommandGroup>
        <CommandSeparator className="my-2 md:hidden" />
        <CommandGroup heading="Schema Items">
          {schemaCollection?.map((item) => {
            return (
              <CommandItem
                key={item.dbName}
                className="flex items-center justify-between"
              >
                {item.name}
                <SchemaMenuButton name={item.name} />
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};
