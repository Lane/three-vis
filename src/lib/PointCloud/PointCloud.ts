import type {
  CubePointCloudOptions,
  GridPointCloudOptions,
  PointCloudOptions,
  PointCloudType,
  SpherePointCloudOptions,
  SpiralPointCloudOptions,
} from "./PointCloud.d";

export class PointCloud {
  private points: number;
  private pointsArray: number[];

  constructor(points: number) {
    this.points = points;
    this.pointsArray = new Array(this.points).fill(0);
  }

  createSphere(options: SpherePointCloudOptions = {}) {
    const radius = options.radius || 40;
    return this.pointsArray.map(() => {
      const r = radius * Math.cbrt(Math.random());

      // Generate random angles
      const theta = Math.random() * 2 * Math.PI; // Random angle in [0, 2π]
      const phi = Math.acos(2 * Math.random() - 1); // Random angle in [0, π] for uniform sphere distribution

      // Convert spherical coordinates to Cartesian coordinates
      return {
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
    return this.pointsArray.map(() => {
      return {
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
    return this.pointsArray.map((_, index) => {
      const radius = Math.max(1, Math.sqrt(index + 1) * spread);
      theta += Math.asin(1 / radius) * tightness;
      return {
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
    return this.pointsArray.map((_, index) => {
      const col = (index % columnCount) + 1;
      const row = Math.floor(index / columnCount) + 1;
      return {
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
