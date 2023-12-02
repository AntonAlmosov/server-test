import { Button, ButtonProps } from '@/components/ui/button'
import { FC } from 'react'
import { cn } from '@/lib/utils'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { PanelRightOpen } from 'lucide-react'
import { SchemaNav } from '../nav/schema-nav'

interface SchemaNavSheetProps extends ButtonProps {}

export const SchemaNavSheet: FC<SchemaNavSheetProps> = ({
  className,
  ...props
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className={cn('md:hidden', className)}
          size="icon"
          variant={'outline'}
          {...props}
        >
          <PanelRightOpen className="stroke-slate-500" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-11/12 md:hidden">
        <SchemaNav />
      </SheetContent>
    </Sheet>
  )
}
