export type PointCloudType = "grid" | "spiral" | "cube" | "sphere";

export type GridPointCloudOptions = {
  spacing?: number;
  aspectRatio?: number;
};

export type SpiralPointCloudOptions = {
  tightness?: number;
  spread?: number;
  depth?: number;
};

export type CubePointCloudOptions = {
  length?: number;
  width?: number;
  height?: number;
};

export type SpherePointCloudOptions = {
  radius?: number;
};

export type PointCloudOptions = {
  grid: GridPointCloudOptions;
  spiral: SpiralPointCloudOptions;
  cube: CubePointCloudOptions;
  sphere: SpherePointCloudOptions;
};
