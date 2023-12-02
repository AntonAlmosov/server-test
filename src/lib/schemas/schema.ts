import * as z from 'zod'

export const SchemaKind = [
  'string',
  'md',
  'number',
  'datetime',
  'boolean',
  'media',
  'reference',
] as const

export const SchemaFieldFilters = z.object({
  min: z.number().optional(),
  max: z.number().optional(),
  regexp: z.string().optional(),
  format: z.string().optional(),
})

export const SchemaFieldControls = z.object({
  kind: z.string(),
  options: z.string().array().optional(),
})
export const SchemaField = z.object({
  name: z.string().min(1, 'Please enter the name'),
  dbName: z.string().min(1, 'Please enter the DBName'),
  kind: z
    .union([
      z.literal('string'),
      z.literal('md'),
      z.literal('number'),
      z.literal('datetime'),
      z.literal('boolean'),
      z.literal('media'),
      z.literal('reference'),
    ])
    .refine((value) => !!value, 'You have to pick a kind'),
  order: z.number().optional(),
  required: z.boolean().optional(),
  description: z.string().optional(),
  filters: SchemaFieldFilters.optional(),
  controls: SchemaFieldControls.optional(),
  multiple: z.string().optional(),
})

export type SchemaFieldType = z.infer<typeof SchemaField>

export const Schema = z.object({
  name: z.string(),
  dbName: z.string(),
  singleton: z.boolean(),
  description: z.string().optional(),
  fields: SchemaField.array().min(1),
})

export type SchemaType = z.infer<typeof Schema>

export const SchemaCollection = z.object({
  items: Schema.array(),
})

export type SchemaCollectionType = z.infer<typeof SchemaCollection>

export const SchemaKindInput = z.object({
  kind: z.union([z.literal('tmp'), z.literal('std')]),
})
export const SchemaDBNameInput = z.object({
  schemaDbName: z.string().optional(),
})
export const DBNameInput = z.object({
  dbName: z.string().optional(),
})
export const SchemaFormAction = z.object({
  action: z.union([z.literal('update'), z.literal('create')]),
})
export type SchemaDbNameType = z.infer<typeof SchemaDBNameInput>
export type DbNameType = z.infer<typeof DBNameInput>
export type SchemaFormActionType = z.infer<typeof SchemaFormAction>
