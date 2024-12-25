import { useMemo } from "react";
import { createLayout, LayoutOptions, LayoutType } from "../../layouts";

export function useDataLayout<T extends Json, L extends LayoutType>(
  kind: L,
  data: T[],
  layout?: LayoutOptions<L> | undefined
) {
  return useMemo(() => createLayout(kind, data, layout), [kind, data, layout]);
}
