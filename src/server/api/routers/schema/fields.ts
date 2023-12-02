import { createTRPCRouter } from "@/server/api/trpc";
import superjson from "superjson";
import {
  findFieldIndex,
  findSchemaIndex,
  schemaProcedure,
  updateFile,
} from "../middleware/schemaMiddleware";
import {
  DBNameInput,
  SchemaDBNameInput,
  SchemaField,
  SchemaKindInput,
} from "@/lib/schemas/schema";

export const schemaFieldsRouter = createTRPCRouter({
  create: schemaProcedure
    .input(SchemaField.merge(SchemaDBNameInput))
    .mutation(async ({ ctx, input: { schemaDbName, ...input } }) => {
      const schema = ctx.tmp;
      const index = findSchemaIndex(schema, schemaDbName);

      if (!index) {
        return;
      }

      schema.items[index]?.fields.push(input);
      updateFile("tmp", superjson.stringify(schema));
    }),
  update: schemaProcedure
    .input(SchemaField.merge(SchemaDBNameInput))
    .mutation(async ({ ctx, input: { schemaDbName, ...input } }) => {
      const schema = ctx.tmp;
      const index = findSchemaIndex(schema, schemaDbName);
      const fieldIndex = findFieldIndex(schema, index, input.dbName);

      if (!index || !fieldIndex) {
        return;
      }
      if (schema.items[index]?.fields[fieldIndex]) {
        // @ts-expect-error This typechecking makes no sense
        schema.items[index].fields[fieldIndex] = input;
      }

      updateFile("tmp", superjson.stringify(schema));
    }),
  delete: schemaProcedure
    .input(SchemaDBNameInput.merge(DBNameInput))
    .mutation(async ({ ctx, input }) => {
      const schema = ctx.tmp;
      const index = findSchemaIndex(schema, input.schemaDbName);
      const fieldIndex = findFieldIndex(schema, index, input.dbName);

      if (!index || !fieldIndex) {
        return;
      }
      schema.items[index]?.fields.splice(fieldIndex, 1);
      updateFile("tmp", superjson.stringify(schema));
    }),
  duplicate: schemaProcedure
    .input(SchemaDBNameInput.merge(DBNameInput))
    .mutation(async ({ input, ctx }) => {
      const schema = ctx.tmp;
      const index = findSchemaIndex(schema, input.schemaDbName);
      const fieldIndex = findFieldIndex(schema, index, input.dbName);

      if (!index || !fieldIndex) {
        return;
      }
      const field = schema.items[index]?.fields[fieldIndex];

      if (!field) {
        return;
      }
      schema.items[index]?.fields.push({
        ...field,
        dbName: `${field?.dbName}Duplicate`,
        name: `${field?.name} Duplicate`,
      });
      updateFile("tmp", superjson.stringify(schema));

      return { dbName: `${field.dbName}Duplicate` };
    }),
  find: schemaProcedure
    .input(SchemaKindInput.merge(SchemaDBNameInput).merge(DBNameInput))
    .query(async ({ ctx, input }) => {
      const schema = input.kind === "tmp" ? ctx.tmp : ctx.schema;
      if (!input.dbName || !input.schemaDbName) {
        return null;
      }
      const index = findSchemaIndex(schema, input.schemaDbName);
      const fieldIndex = findFieldIndex(schema, index, input.dbName);
      if (!index || !fieldIndex) {
        return;
      }

      return schema.items[index]?.fields[fieldIndex];
    }),
  findAll: schemaProcedure
    .input(SchemaKindInput.merge(DBNameInput))
    .query(async ({ ctx, input }) => {
      const schema = input.kind === "tmp" ? ctx.tmp : ctx.schema;
      if (!input.dbName) {
        return null;
      }
      const index = findSchemaIndex(schema, input.dbName);
      return schema.items[index]?.fields;
    }),
});
