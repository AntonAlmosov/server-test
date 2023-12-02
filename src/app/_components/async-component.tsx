import { api } from "@/trpc/server";

export const AsyncComponent = async () => {
  const data = await api.post.getLatest.query();
  return data?.name;
};
