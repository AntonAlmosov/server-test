"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import isEqual from "deep-equal";
import { type FC, type HTMLAttributes } from "react";

type HeadingActionsProps = HTMLAttributes<HTMLDivElement>;

export const HeadingActions: FC<HeadingActionsProps> = (props) => {
  const { data: std } = api.schema.findAll.useQuery({ kind: "std" });
  const { data: tmp } = api.schema.findAll.useQuery({ kind: "tmp" });
  const equal = isEqual(std, tmp);
  const purgeMutation = api.schema.purge.useMutation();
  const pushMutation = api.schema.push.useMutation();
  return (
    <section className="flex gap-4" {...props}>
      <Button
        variant="secondary"
        onClick={() => purgeMutation.mutate()}
        disabled={equal}
      >
        Reset
      </Button>
      <Button onClick={() => pushMutation.mutate()} disabled={equal}>
        Push
      </Button>
    </section>
  );
};
