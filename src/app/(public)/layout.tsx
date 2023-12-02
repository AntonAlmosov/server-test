import { PropsWithChildren } from 'react'

export default async function AuthOnboardingLayout({
  children,
}: PropsWithChildren) {
  return <main className="content">{children}</main>
}
