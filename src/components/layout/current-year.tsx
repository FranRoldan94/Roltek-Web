import { cacheLife } from "next/cache";

/** Cached so the static shell stays prerenderable; refreshes daily. */
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
