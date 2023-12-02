import { type FC, type HTMLAttributes } from "react";
import { type DbNameType } from "@/lib/schemas/schema";
import { SchemaFieldsTable } from "./schema-fields-table";

interface SchemaBodyProps extends HTMLAttributes<HTMLDivElement>, DbNameType {}

export const SchemaBody: FC<SchemaBodyProps> = () => {
  return (
    <section className="col-span-6 md:col-span-4 lg:col-span-9">
      <h2 className="text-2xl font-bold">Fields</h2>
      <SchemaFieldsTable />
    </section>
  );
};
