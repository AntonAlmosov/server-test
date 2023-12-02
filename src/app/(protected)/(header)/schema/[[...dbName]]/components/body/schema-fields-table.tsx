import { type FC, type HTMLAttributes } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { type SchemaFieldType } from "@/lib/schemas/schema";
import { FormSheet } from "../sheets/form-sheet";

interface EditSchemaFieldsTableProps extends HTMLAttributes<HTMLTableElement> {
  fields: SchemaFieldType[];
}

export const SchemaFieldsTable: FC<EditSchemaFieldsTableProps> = ({
  fields,
}) => {
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
            <TableCell></TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell>
            <FormSheet kind="field" action="create"></FormSheet>
          </TableCell>
          <TableCell />
          <TableCell />
        </TableRow>
      </TableBody>
    </Table>
  );
};
