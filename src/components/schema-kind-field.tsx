import { SchemaKind } from '@/lib/schemas/schema'
import {
  ToggleGroupField,
  ToggleGroupFieldBaseProps,
} from './toggle-group-field'
import { ReactNode } from 'react'
import {
  Asterisk,
  CalendarClock,
  Circle,
  CornerDownLeft,
  Link,
  TextCursorInput,
  Video,
} from 'lucide-react'
import { ToggleGroupItem } from './ui/toggle-group'
import { CardDescription } from './ui/card'
import { FieldValues } from 'react-hook-form'
import { cn } from '@/lib/utils'

interface FieldKindToggle {
  kind: (typeof SchemaKind)[number]
  icon: ReactNode
  label: string
}
const kindToggles: Array<FieldKindToggle> = [
  { kind: 'string', icon: <TextCursorInput />, label: 'String' },
  { kind: 'md', icon: <CornerDownLeft />, label: 'MD Text' },
  { kind: 'number', icon: <Asterisk />, label: 'Number' },
  { kind: 'boolean', icon: <Circle />, label: 'Boolean' },
  { kind: 'datetime', icon: <CalendarClock />, label: 'Datetime' },
  { kind: 'media', icon: <Video />, label: 'Media' },
  { kind: 'reference', icon: <Link />, label: 'Reference' },
]

type SchemaKindFieldFC = <
  TFieldValues extends FieldValues,
  TInput extends string & string[] = string & string[],
  TOutput = any,
>(
  props: Omit<
    ToggleGroupFieldBaseProps<TInput, TOutput, TFieldValues>,
    'type'
  > & { className?: string; containerClassName?: string },
) => ReactNode

export const SchemaKindField: SchemaKindFieldFC = (props) => {
  return (
    <ToggleGroupField
      {...props}
      label="Field type"
      description="You won't be able to change it later"
      type="single"
      variant="outline"
      gap="xl"
      size="xl"
      className={cn(
        '@md/form:grid-cols-4 @lg/form:grid-cols-5 grid grid-cols-3',
        props.className,
      )}
    >
      {kindToggles.map((props) => (
        <ToggleGroupItem
          key={props.kind}
          value={props.kind}
          className="col-span-1 w-full"
        >
          {props.icon}
          <CardDescription>{props.label}</CardDescription>
        </ToggleGroupItem>
      ))}
    </ToggleGroupField>
  )
}
