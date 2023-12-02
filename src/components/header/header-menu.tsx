'use client'

import { NavigationMenuProps } from '@radix-ui/react-navigation-menu'
import { FC } from 'react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface HeaderMenuProps extends NavigationMenuProps {}

export const HeaderMenu: FC<HeaderMenuProps> = (props) => {
  const currentPath = usePathname().split('/')[1]
  return (
    <NavigationMenu {...props}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/content" legacyBehavior passHref>
            <NavigationMenuLink
              active={currentPath === 'content'}
              className={navigationMenuTriggerStyle()}
            >
              Content
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/schema" legacyBehavior passHref>
            <NavigationMenuLink
              active={currentPath === 'schema'}
              className={navigationMenuTriggerStyle()}
            >
              Schema
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/media" legacyBehavior passHref>
            <NavigationMenuLink
              active={currentPath === 'media'}
              className={navigationMenuTriggerStyle()}
            >
              Media
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/settings" legacyBehavior passHref>
            <NavigationMenuLink
              active={currentPath === 'settings'}
              className={navigationMenuTriggerStyle()}
            >
              Settings
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
