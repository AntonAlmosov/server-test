"use client";

import { api } from "@/trpc/react";

export const ClientComponent = () => {
  const { data } = api.post.hello.useQuery({ text: "hui" });
  return data?.greeting;
};
