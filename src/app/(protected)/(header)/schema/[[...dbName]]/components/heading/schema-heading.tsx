import { cn } from "@/lib/utils";
import { type FC, type HTMLAttributes } from "react";
import { type SchemaType, type DbNameType } from "@/lib/schemas/schema";
import { HeadingActions } from "./heading-actions";
import { SchemaNavSheet } from "../sheets/schema-nav-sheet";
import { api } from "@/trpc/server";

interface SchemaHeadingProps
  extends HTMLAttributes<HTMLDivElement>,
    DbNameType {
  name?: string;
}

export const SchemaHeading: FC<SchemaHeadingProps> = async ({
  className,
  dbName,
  ...props
}) => {
  let schema: SchemaType | undefined = undefined;

  if (dbName) {
    schema =
      (await api.schema.find.query({ dbName, kind: "tmp" })) ?? undefined;
  }
  return (
    <section
      className={cn(
        "col-span-6 flex h-min flex-wrap justify-between gap-4 lg:col-span-12",
        className,
      )}
      {...props}
    >
      <h1 className="h-max w-full text-3xl font-bold md:w-max">
        {" "}
        {schema ? `Edit ${schema.name}` : `Schema Editor`}
      </h1>

      <SchemaNavSheet name={schema ? schema.name : undefined} />
      <HeadingActions />
    </section>
  );
};
