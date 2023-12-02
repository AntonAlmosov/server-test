import { SchemaHeading } from "./components/heading/schema-heading";
import { EditSchemaSidebar } from "./components/nav/schema-sidebar";
import { SchemaBody } from "./components/body/schema-body";
import { api } from "@/trpc/server";

export default async function Schema() {
  return (
    <>
      <SchemaHeading />
      <EditSchemaSidebar />
      <SchemaBody />
    </>
  );
}
