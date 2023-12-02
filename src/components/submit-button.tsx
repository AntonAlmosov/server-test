import { FC } from 'react'
import { Button, ButtonProps } from './ui/button'

interface SchemaButtonProps extends ButtonProps {
  action: 'update' | 'create'
}

export const SubmitButton: FC<SchemaButtonProps> = ({ action, ...props }) => {
  return (
    <Button {...props} className="w-full" type="submit">
      {action.charAt(0).toUpperCase() + action.slice(1)}
    </Button>
  )
}
