"use client";
import { type FC, type PropsWithChildren } from "react";
import { Sheet, SheetClose, SheetContent } from "@/components/ui/sheet";
import {
  type DbNameType,
  type SchemaFormActionType,
} from "@/lib/schemas/schema";
import type * as DialogPrimitive from "@radix-ui/react-dialog";
import { useParams } from "next/navigation";
import { SchemaForm } from "../forms/schema-form";
import { FieldForm } from "../forms/field-form";

interface FieldFormSheetProps
  extends DialogPrimitive.DialogProps,
    Partial<SchemaFormActionType>,
    DbNameType {
  className?: string;
  kind: "field" | "schema";
}

export const FormSheet: FC<PropsWithChildren<FieldFormSheetProps>> = ({
  action = "create",
  kind,
  children,
  ...props
}) => {
  const Form = kind === "field" ? FieldForm : SchemaForm;
  const params = useParams<{ dbName: string[] }>();
  const schemaDbName = kind === "field" ? params.dbName?.[0] : undefined;
  const dbName = kind === "field" ? props.dbName : params.dbName?.[0];

  return (
    <Sheet {...props}>
      {children}
      <SheetContent side="left" className="w-screen border-r-0">
        <Form
          action={action}
          schemaDbName={schemaDbName}
          dbName={dbName}
          button={(children) => <SheetClose asChild>{children}</SheetClose>}
        />
      </SheetContent>
    </Sheet>
  );
};
