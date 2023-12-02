"use client";
import { type FC, type HTMLAttributes } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { FormSheet } from "../sheets/form-sheet";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";
import { FieldMenuButton } from "../menu/field-menu-button";
import { SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

type EditSchemaFieldsTableProps = HTMLAttributes<HTMLTableElement>;

export const SchemaFieldsTable: FC<EditSchemaFieldsTableProps> = () => {
  const params = useParams();
  const { data: fields } = api.schema.fields.findAll.useQuery(
    { kind: "tmp", dbName: params.dbName?.[0] },
    { enabled: !!params.dbName?.[0] },
  );
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-32">Name</TableHead>
          <TableHead>Kind</TableHead>
          <TableHead className="w-14" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {fields?.map((field) => (
          <TableRow key={field.name}>
            <TableCell className="font-medium">{field.name}</TableCell>
            <TableCell>{field.kind}</TableCell>
            <TableCell>
              <FieldMenuButton {...field} />
            </TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell>
            <FormSheet kind="field" action="create">
              <SheetTrigger asChild>
                <Button variant="link">Crete new field</Button>
              </SheetTrigger>
            </FormSheet>
          </TableCell>
          <TableCell />
          <TableCell />
        </TableRow>
      </TableBody>
    </Table>
  );
};
