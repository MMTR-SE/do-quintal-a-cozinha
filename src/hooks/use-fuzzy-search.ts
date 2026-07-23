import { useMemo } from "react";
import Fuse, { IFuseOptions } from "fuse.js";

/**
 * Generic client-side fuzzy search hook backed by Fuse.js.
 *
 * Applies sensible defaults (`threshold: 0.4`, `ignoreLocation: true`) that
 * match the search behavior used across listing pages. Callers provide `keys`
 * (and may override any default) via the `options` argument.
 *
 * For best performance, pass a stable `options` reference (module-level
 * constant or `useMemo`) so the underlying Fuse instance isn't recreated on
 * every render.
 */
export function useFuzzySearch<T>(
  items: T[] | undefined,
  query: string,
  options: IFuseOptions<T>
): T[] {
  const fuse = useMemo(
    () =>
      new Fuse(items ?? [], {
        threshold: 0.4,
        ignoreLocation: true,
        ...options,
      }),
    [items, options]
  );

  return useMemo(() => {
    if (!items) return [];
    if (!query.trim()) return items;
    return fuse.search(query.trim()).map((r) => r.item);
  }, [items, query, fuse]);
}
