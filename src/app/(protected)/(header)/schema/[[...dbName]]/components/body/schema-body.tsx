import { type FC, type HTMLAttributes } from "react";
import { type DbNameType, type SchemaFieldType } from "@/lib/schemas/schema";
import { SchemaFieldsTable } from "./schema-fields-table";
import { api } from "@/trpc/server";

interface SchemaBodyProps extends HTMLAttributes<HTMLDivElement>, DbNameType {}

export const SchemaBody: FC<SchemaBodyProps> = async ({ dbName }) => {
  let fields: SchemaFieldType[] = [];

  if (dbName) {
    fields =
      (await api.schema.fields.findAll.query({ dbName, kind: "tmp" })) ?? [];
  }

  return (
    <section className="col-span-6 md:col-span-4 lg:col-span-9">
      <h2 className="text-2xl font-bold">Fields</h2>
      <SchemaFieldsTable fields={fields} />
    </section>
  );
};
