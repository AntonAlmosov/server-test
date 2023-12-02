import { type schemaItemDbNames } from "@/generated/schema";
import { SchemaHeading } from "./components/heading/schema-heading";
import { EditSchemaSidebar } from "./components/nav/schema-sidebar";
import { SchemaBody } from "./components/body/schema-body";

export default async function Onboarding({}: {
  params: { dbName: Array<(typeof schemaItemDbNames)[number]> };
}) {
  return (
    <>
      <SchemaHeading />
      <EditSchemaSidebar />
      <SchemaBody />
    </>
  );
}
