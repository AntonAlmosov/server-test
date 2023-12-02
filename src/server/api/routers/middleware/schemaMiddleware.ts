import superjson from "superjson";
import path from "path";
import fs from "fs";
import { type SchemaCollectionType } from "@/lib/schemas/schema";
import { TRPCError } from "@trpc/server";
import { publicProcedure, trpcMiddleware } from "../../trpc";

export const schemaPath = path.resolve(process.cwd(), "src/app/schema.json");
export const tmpPath = path.resolve(__dirname, "src/app/tmp.json");

const schemaMiddleware = trpcMiddleware(async (opts) => {
  const { ctx } = opts;

  const schema = await readFileAsync("std", {
    items: [],
  });
  const tmp = await readFileAsync("tmp", schema);

  return opts.next({ ctx: { ...ctx, schema, tmp } });
});

export const schemaProcedure = publicProcedure.use(schemaMiddleware);

export const readFileAsync = async (
  kind: "std" | "tmp",
  defaultValue: SchemaCollectionType,
) => {
  const filePath = kind === "std" ? schemaPath : tmpPath;
  return new Promise<SchemaCollectionType>((resolve) =>
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          updateFile("std", superjson.stringify(defaultValue));
          resolve(defaultValue);
          return;
        }
        resolve(defaultValue);
        throw new Error(superjson.stringify(superjson.serialize(err)));
      }
      resolve(superjson.parse(data));
    }),
  );
};

export const updateFile = (kind: "std" | "tmp", data: string) => {
  const filePath = kind === "std" ? schemaPath : tmpPath;
  fs.writeFileSync(filePath, data);
};

export const removeFile = (kind: "std" | "tmp") => {
  fs.rmSync(kind === "std" ? schemaPath : tmpPath);
};

export const findSchemaIndex = (
  collection: SchemaCollectionType,
  dbName?: string,
) => {
  const index = collection.items.findIndex(
    (schema) => schema.dbName === dbName,
  );

  if (index === -1) {
    throw new TRPCError({ code: "NOT_FOUND" });
  }

  return index;
};

export const findFieldIndex = (
  collection: SchemaCollectionType,
  schemaIndex: number,
  dbName?: string,
) => {
  const index = collection.items[schemaIndex]?.fields.findIndex(
    (field) => field.dbName === dbName,
  );

  if (index === -1) {
    throw new TRPCError({ code: "NOT_FOUND" });
  }

  return index;
};
