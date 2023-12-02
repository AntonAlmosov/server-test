import { FC } from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { HeaderMenu } from './header-menu'
import { HeaderCommand } from './header-command'

export const Header: FC = () => {
  return (
    <header className="fixed w-screen pt-4">
      <section className="content relative block pt-0">
        <HeaderMenu className="mx-auto hidden justify-self-center sm:flex" />
        <section className="absolute right-4 top-0 flex items-center gap-4 xl:right-0">
          <HeaderCommand />
          <Avatar>
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </section>
      </section>
    </header>
  )
}
