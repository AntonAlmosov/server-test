"use client";
import { CreateFieldFormContent } from "@/components/form/create-field-form-content";
import { SetUpFieldFormContent } from "@/components/form/set-up-field-form-content";
import { SubmitButton } from "@/components/submit-button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import {
  type DbNameType,
  type SchemaDbNameType,
  SchemaField,
  type SchemaFieldType,
  type SchemaFormActionType,
} from "@/lib/schemas/schema";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FC, type HTMLAttributes, type ReactNode, useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

interface EditSchemaFieldForm
  extends Omit<HTMLAttributes<HTMLFormElement>, "onSubmit">,
    SchemaDbNameType,
    Partial<DbNameType>,
    SchemaFormActionType {
  button?: (children: ReactNode) => ReactNode;
}

export const FieldForm: FC<EditSchemaFieldForm> = ({
  action,
  className,
  schemaDbName,
  dbName,
  button,
  ...props
}) => {
  const { data: defaultValues } = api.schema.fields.find.useQuery(
    {
      kind: "tmp",
      dbName: dbName ?? "",
      schemaDbName,
    },
    { enabled: !!dbName },
  );

  const methods = useForm<SchemaFieldType>({
    resolver: zodResolver(SchemaField),
    defaultValues: defaultValues ?? { required: false },
  });
  const name = methods.watch("name");
  const kind = methods.watch("kind");

  useEffect(() => {
    if (defaultValues) {
      methods.reset(defaultValues);
    }
  }, [defaultValues, methods]);

  const createFieldMutation = api.schema.fields.create.useMutation();
  const updateFieldMutation = api.schema.fields.update.useMutation();

  const onSubmit: SubmitHandler<SchemaFieldType> = (values) => {
    if (action === "update") {
      updateFieldMutation.mutate({ ...values, schemaDbName });
    } else {
      createFieldMutation.mutate({ ...values, schemaDbName });
    }
  };

  return (
    <Form {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={cn("@container/form flex flex-col gap-4", className)}
        {...props}
      >
        <CardHeader className="px-0">
          <CardTitle>
            {action === "update" ? `Edit field ${name}` : "Create a Field"}
          </CardTitle>
          <CardDescription>
            Schema are building blocks of Esque Editor
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 px-0">
          <CreateFieldFormContent action={action} />
          <section
            className={cn("flex-col gap-4", !name || !kind ? "hidden" : "flex")}
          >
            <SetUpFieldFormContent />
          </section>
        </CardContent>
        <CardFooter className="px-0">
          {button ? (
            button(
              <SubmitButton
                disabled={!methods.formState.isValid}
                action={action}
              />,
            )
          ) : (
            <SubmitButton
              disabled={!methods.formState.isValid}
              action={action}
            />
          )}
        </CardFooter>
      </form>
    </Form>
  );
};
