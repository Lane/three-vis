import type {
  CubePointCloudOptions,
  GridPointCloudOptions,
  PointCloudOptions,
  PointCloudType,
  SpherePointCloudOptions,
  SpiralPointCloudOptions,
} from "./PointCloud.d";

export class DataPointCloud<T extends { id: string }> {
  private points: number;
  private data: T[];

  constructor(data: T[]) {
    this.points = data.length;
    this.data = data;
  }

  createSphere(options: SpherePointCloudOptions = {}) {
    const radius = options.radius || 40;
    return this.data.map(({ id }) => {
      const r = radius * Math.cbrt(Math.random());

      // Generate random angles
      const theta = Math.random() * 2 * Math.PI; // Random angle in [0, 2π]
      const phi = Math.acos(2 * Math.random() - 1); // Random angle in [0, π] for uniform sphere distribution

      // Convert spherical coordinates to Cartesian coordinates
      return {
        id,
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
      };
    });
  }

  createCube(options: CubePointCloudOptions = {}) {
    const length = options.length || 50;
    const width = options.width || 50;
    const height = options.height || 50;
    return this.data.map(({ id }) => {
      return {
        id,
        x: Math.random() * length - length / 2,
        y: Math.random() * width - width / 2,
        z: Math.random() * height - height / 2,
      };
    });
  }

  createSpiral(options: SpiralPointCloudOptions = {}) {
    const tightness = options.tightness || 1;
    const spread = options.spread || 0.8;
    const depth = options.depth || 0;
    let theta = 0;
    return this.data.map(({ id }, index) => {
      const radius = Math.max(1, Math.sqrt(index + 1) * spread);
      theta += Math.asin(1 / radius) * tightness;
      return {
        id,
        x: radius * Math.cos(theta),
        y: radius * Math.sin(theta),
        z: index * depth,
      };
    });
  }

  createGrid(options: GridPointCloudOptions = {}) {
    const totalEntries = this.points;
    const spacing = options.spacing || 1.05;
    const aspectRatio = options.aspectRatio || 1;
    const columnCount = Math.round(Math.sqrt(totalEntries * aspectRatio));
    const rowCount = Math.ceil(totalEntries / columnCount);
    return this.data.map(({ id }, index) => {
      const col = (index % columnCount) - columnCount / 2;
      const row = Math.floor(index / columnCount) - rowCount / 2;
      return {
        id,
        x: col * spacing,
        y: row * spacing,
        z: 0,
      };
    });
  }

  create<T extends PointCloudType>(kind: T, options: PointCloudOptions[T]) {
    if (kind === "grid")
      return this.createGrid(options as GridPointCloudOptions);
    if (kind === "spiral")
      return this.createSpiral(options as SpiralPointCloudOptions);
    if (kind === "cube")
      return this.createCube(options as CubePointCloudOptions);
    if (kind === "sphere")
      return this.createSphere(options as SpherePointCloudOptions);
    throw new Error("Invalid layout");
  }
}
