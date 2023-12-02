import { createTRPCRouter } from "@/server/api/trpc";
import superjson from "superjson";
import {
  findSchemaIndex,
  removeFile,
  schemaProcedure,
  updateFile,
} from "./middleware/schemaMiddleware";
import { DBNameInput, Schema, SchemaKindInput } from "@/lib/schemas/schema";
import { schemaFieldsRouter } from "./schema/fields";

const PartialSchema = Schema.pick({
  name: true,
  dbName: true,
  singleton: true,
});

export const schemaRouter = createTRPCRouter({
  create: schemaProcedure
    .input(PartialSchema)
    .mutation(async ({ ctx, input }) => {
      const schema = ctx.tmp;
      schema.items.push({ ...input, fields: [] });
      updateFile("tmp", superjson.stringify(schema));
    }),
  update: schemaProcedure
    .input(PartialSchema)
    .mutation(async ({ ctx, input }) => {
      const schema = ctx.tmp;
      const index = findSchemaIndex(schema, input.dbName);
      if (!index) {
        return;
      }

      schema.items[index] = {
        ...input,
        fields: schema.items[index]?.fields ?? [],
      };
      updateFile("tmp", superjson.stringify(schema));
    }),
  delete: schemaProcedure
    .input(DBNameInput)
    .mutation(async ({ ctx, input }) => {
      const schema = ctx.tmp;
      const index = findSchemaIndex(schema, input.dbName);

      schema.items.splice(index, 1);
      updateFile("tmp", superjson.stringify(schema));
    }),
  duplicate: schemaProcedure
    .input(DBNameInput)
    .mutation(async ({ input, ctx }) => {
      const schema = ctx.tmp;
      const index = findSchemaIndex(schema, input.dbName);

      const target = schema.items[index];
      if (!target) {
        return;
      }
      schema.items.push({
        ...target,
        dbName: `${target?.dbName}Duplicate`,
        name: `${target?.name} Duplicate`,
      });
      updateFile("tmp", superjson.stringify(schema));

      return { dbName: `${target.dbName}Duplicate` };
    }),
  purge: schemaProcedure.mutation(async () => {
    removeFile("tmp");
  }),
  push: schemaProcedure.mutation(async ({ ctx }) => {
    updateFile("std", superjson.stringify(ctx.tmp));
  }),
  find: schemaProcedure
    .input(SchemaKindInput.merge(DBNameInput))
    .query(async ({ ctx, input }) => {
      const schema = input.kind === "tmp" ? ctx.tmp : ctx.schema;
      if (!input.dbName) {
        return null;
      }
      const index = findSchemaIndex(schema, input.dbName);

      return schema.items[index];
    }),
  findAll: schemaProcedure
    .input(SchemaKindInput)
    .query(async ({ ctx, input }) => {
      const schema = input.kind === "tmp" ? ctx.tmp : ctx.schema;
      return schema.items;
    }),
  fields: schemaFieldsRouter,
});
