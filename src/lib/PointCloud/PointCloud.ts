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

  createSpiralGrid(options: GridPointCloudOptions = {}) {
    const spacing = options.spacing || 1.5;
    function generateDirections(n: number): Array<"r" | "d" | "l" | "u"> {
      const dir = ["r", "d", "l", "u"] as const;
      const result = [];
      let step = 1;
      let index = 0;
      while (result.length < n) {
        for (let i = 0; i < 2; i++) {
          for (let j = 0; j < step; j++) {
            if (result.length < n) {
              result.push(dir[index % dir.length]);
            }
          }
          index++;
        }
        step++;
      }
      return result as Array<"r" | "d" | "l" | "u">;
    }
    function getNextPoint(
      currentPoint: [number, number],
      direction: "r" | "d" | "l" | "u"
    ): [number, number] {
      const [x, y] = currentPoint;
      if (direction === "r") return [x + 1, y];
      if (direction === "d") return [x, y + 1];
      if (direction === "l") return [x - 1, y];
      if (direction === "u") return [x, y - 1];
      return [x, y];
    }
    const directions = generateDirections(this.points);
    const totalEntries = this.points;
    const columnCount = Math.round(Math.sqrt(totalEntries));
    const rowCount = Math.ceil(totalEntries / columnCount);
    const midpoint: [number, number] = [
      Math.floor(columnCount / 2),
      Math.floor(rowCount / 2),
    ];
    let prevPoint = midpoint;
    const drawOrder = directions.map((dir, i) => {
      const prevDir = directions[i - 1];
      const point = i === 0 ? midpoint : getNextPoint(prevPoint, prevDir);
      prevPoint = point;
      return point;
    });
    return drawOrder.map(([x, y]) => {
      return {
        x: (x - columnCount / 2) * spacing,
        y: (y - rowCount / 2) * spacing,
        z: 0,
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
      const col = (index % columnCount) - columnCount / 2;
      const row = Math.floor(index / columnCount) - rowCount / 2;
      return {
        x: col * spacing,
        y: row * spacing,
        z: 0,
      };
    });
  }

  create<T extends PointCloudType>(kind: T, options: PointCloudOptions[T]) {
    if (kind === "grid")
      return this.createSpiralGrid(options as GridPointCloudOptions);
    if (kind === "spiral")
      return this.createSpiral(options as SpiralPointCloudOptions);
    if (kind === "cube")
      return this.createCube(options as CubePointCloudOptions);
    if (kind === "sphere")
      return this.createSphere(options as SpherePointCloudOptions);
    throw new Error("Invalid layout");
  }
}
