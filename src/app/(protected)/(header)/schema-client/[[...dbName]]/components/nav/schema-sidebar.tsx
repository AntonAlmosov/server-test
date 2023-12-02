"use client";
import { type FC } from "react";
import { Button } from "@/components/ui/button";
import { SheetTrigger } from "@/components/ui/sheet";
import { FormSheet } from "../sheets/form-sheet";
import { SchemaNav } from "./schema-nav";
import { api } from "@/trpc/react";

export const EditSchemaSidebar: FC = () => {
  const { data: schemaCollection } = api.schema.findAll.useQuery({
    kind: "tmp",
  });
  return (
    <section className="hidden md:col-span-2 md:block md:h-full md:gap-4 lg:col-span-3">
      <FormSheet kind="field" action="create">
        <SheetTrigger asChild>
          <Button variant="outline" className="hidden w-full md:inline">
            Create new Schema Item
          </Button>
        </SheetTrigger>
      </FormSheet>
      <SchemaNav
        schemaCollection={schemaCollection}
        className={"hidden md:block"}
      />
    </section>
  );
};
