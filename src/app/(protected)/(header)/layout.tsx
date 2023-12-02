import { Header } from "@/components/header/header";
import { type PropsWithChildren } from "react";

export default async function AuthOnboardingLayout({
  children,
}: PropsWithChildren) {
  return (
    <>
      <Header />
      <main className="content">{children}</main>
    </>
  );
}
