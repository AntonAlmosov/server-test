'use client'
import { FC, useState } from 'react'
import { MenuButton, MenuButtonProps } from './menu-button'
import { api } from '@/trpc/react'
import { useParams } from 'next/navigation'
import { DbNameType } from '@/lib/schemas/schema'

interface SchemaMenuButtonProps
  extends Pick<MenuButtonProps, 'name'>,
    Required<DbNameType> {}

export const FieldMenuButton: FC<SchemaMenuButtonProps> = (props) => {
  const [duplicateDbName, setDuplicateDbName] = useState('')
  const params = useParams<{ dbName?: string[] }>()

  const duplicateMutation = api.schema.fields.duplicate.useMutation({
    onSuccess: (data) => setDuplicateDbName(data.dbName),
  })
  const deleteMutation = api.schema.fields.delete.useMutation()

  return (
    <MenuButton
      {...props}
      schemaDbName={params.dbName?.[0]}
      kind="schema"
      buttonSize="icon-xs"
      sheetClassName="w-11/12"
      duplicateDbName={duplicateDbName}
      onDuplicateClick={() =>
        duplicateMutation.mutate({
          dbName: props.dbName,
          schemaDbName: params.dbName?.[0],
        })
      }
      onDeleteClick={() =>
        deleteMutation.mutate({
          dbName: props.dbName,
          schemaDbName: params.dbName?.[0],
        })
      }
    />
  )
}
