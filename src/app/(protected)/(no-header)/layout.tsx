import { PropsWithChildren } from 'react'

export default async function NoHeaderLauout({ children }: PropsWithChildren) {
  return <main className="content">{children}</main>
}
