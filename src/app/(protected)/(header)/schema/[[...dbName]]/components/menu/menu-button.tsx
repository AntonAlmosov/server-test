import { Button, ButtonProps } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { FC, useState } from 'react'
import { SchemaDeleteDialog } from '../dialogs/schema-delete-dialog'
import { FormSheet } from '../sheets/form-sheet'
import { SchemaDbNameType } from '@/lib/schemas/schema'

export interface MenuButtonProps extends ButtonProps, SchemaDbNameType {
  name: string
  duplicateDbName: string
  kind: 'field' | 'schema'
  buttonSize?: 'icon' | 'icon-xs'
  sheetClassName?: string
  iconSize?: number
  onDuplicateClick: () => void
  onDeleteClick: () => void
}

export const MenuButton: FC<MenuButtonProps> = ({
  buttonSize = 'icon',
  kind,
  name,
  iconSize,
  schemaDbName,
  sheetClassName,
  onDuplicateClick,
  onDeleteClick,
  ...props
}) => {
  const [editOpen, setEditOpen] = useState(false)
  const [duplicateOpen, setDuplicateOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          onClick={() => console.log('click')}
          size="icon"
          {...props}
        >
          <MoreHorizontal size={iconSize} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <FormSheet
            kind={kind}
            open={editOpen}
            action="update"
            schemaDbName={schemaDbName}
            className={sheetClassName}
            onOpenChange={setEditOpen}
          >
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault()
                setEditOpen(true)
              }}
            >
              Edit
            </DropdownMenuItem>
          </FormSheet>
          <FormSheet
            kind={kind}
            open={duplicateOpen}
            action="create"
            schemaDbName={schemaDbName}
            className={sheetClassName}
            onOpenChange={setDuplicateOpen}
          >
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault()
                onDuplicateClick()
              }}
            >
              Duplicate
            </DropdownMenuItem>
          </FormSheet>
          <DropdownMenuItem>Create entry</DropdownMenuItem>
          <SchemaDeleteDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            name={name}
            label={kind}
            onClick={onDeleteClick}
          >
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault()
                setDialogOpen(true)
              }}
              className="text-red-600"
            >
              Destroy
            </DropdownMenuItem>
          </SchemaDeleteDialog>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
