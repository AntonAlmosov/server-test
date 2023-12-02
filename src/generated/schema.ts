import { SchemaCollectionType } from '@/lib/schemas/schema'

export const schemaItemDbNames = ['posts']
export const schemaItemsMap: Record<
  (typeof schemaItemDbNames)[number],
  number
> = {
  posts: 0,
}
export const schema: SchemaCollectionType = {
  items: [
    {
      name: 'Posts',
      dbName: 'posts',
      singleton: false,
      fields: [
        {
          name: 'title',
          dbName: 'title',
          kind: 'string',
          order: 0,
          required: true,
          description: 'Name of the post',
          filters: { max: 128 },
          controls: { kind: 'input' },
        },
      ],
    },
    {
      name: 'Home Page',
      dbName: 'homePage',
      singleton: true,
      fields: [
        {
          name: 'title',
          dbName: 'title',
          kind: 'string',
          order: 0,
          required: true,
          description: 'Name of the post',
          filters: { max: 128 },
          controls: { kind: 'input' },
        },
      ],
    },
    {
      name: 'Site Settings',
      dbName: 'siteSettings',
      singleton: false,
      fields: [
        {
          name: 'title',
          dbName: 'title',
          kind: 'string',
          order: 0,
          required: true,
          description: 'Name of the post',
          filters: { max: 128 },
          controls: { kind: 'input' },
        },
      ],
    },
  ],
}
