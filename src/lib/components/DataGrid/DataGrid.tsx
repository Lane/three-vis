import type { GridItem } from "./types";
import { useDataGrid } from "./useDataGrid";

export function DataGrid<T extends Json>({
  data,
  aspectRatio = 1,
  renderFn,
}: {
  data: T[];
  aspectRatio?: number;
  renderFn: (params: GridItem<T>) => React.ReactNode;
}) {
  const grid = useDataGrid(data, aspectRatio);
  return grid.getGridData().map(renderFn);
}
