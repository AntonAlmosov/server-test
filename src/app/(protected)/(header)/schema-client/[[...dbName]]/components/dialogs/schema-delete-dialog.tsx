import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type FC, type PropsWithChildren } from "react";
import { type DialogProps } from "@radix-ui/react-dialog";

interface SchemaDeleteDialogProps extends DialogProps, PropsWithChildren {
  name?: string;
  label?: "field" | "schema";
  onClick: () => void;
}

export const SchemaDeleteDialog: FC<SchemaDeleteDialogProps> = ({
  label,
  name,
  children,
  onClick,
  ...props
}) => {
  return (
    <Dialog {...props}>
      {children}
      <DialogContent className="w-11/12 rounded-md sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{`Deleting ${label} ${name}`}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {label} {name}? This action is
            irreversible after you have pushed the changes.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="destructive"
              onClick={onClick}
            >{`Delete ${name}`}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
