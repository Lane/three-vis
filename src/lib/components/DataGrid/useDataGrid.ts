import { useMemo } from "react";
import { GridFormatter } from "./GridFormatter";

/**
 * Returns a flattened array that contains the row index, column index, and data point
 */
export function useDataGrid<T extends Json>(
  data: Array<T>,
  aspectRatio: number = 1
) {
  return useMemo(
    () => new GridFormatter(data, aspectRatio),
    [data, aspectRatio]
  );
}
