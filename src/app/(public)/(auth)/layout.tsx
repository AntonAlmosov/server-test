import { PropsWithChildren } from 'react'

export default async function AuthLayout({ children }: PropsWithChildren) {
  return (
    <>
      <h2 className="col-center text-4xl font-bold text-slate-900">
        Esque Editor
      </h2>
      {children}
    </>
  )
}
