"use client";
import { type FC, useState } from "react";
import { MenuButton, type MenuButtonProps } from "./menu-button";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";

type SchemaMenuButtonProps = Pick<MenuButtonProps, "name" | "dbName">;

export const SchemaMenuButton: FC<SchemaMenuButtonProps> = (props) => {
  const [duplicateDbName, setDuplicateDbName] = useState("");
  const params = useParams<{ dbName?: string[] }>();

  const duplicateMutation = api.schema.duplicate.useMutation({
    onSuccess: (data) => setDuplicateDbName(data?.dbName ?? ""),
  });
  const deleteMutation = api.schema.delete.useMutation();

  return (
    <MenuButton
      {...props}
      kind="schema"
      buttonSize="icon-xs"
      sheetClassName="w-full border-r-0"
      duplicateDbName={duplicateDbName}
      onDuplicateClick={() =>
        duplicateMutation.mutate({ dbName: params.dbName?.[0] })
      }
      onDeleteClick={() =>
        deleteMutation.mutate({ dbName: params.dbName?.[0] })
      }
    />
  );
};
