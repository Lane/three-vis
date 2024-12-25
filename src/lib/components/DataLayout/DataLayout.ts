export class DataLayout<T extends Json> {
  data: T[];

  constructor(data: T[]) {
    this.data = data;
  }

  get totalEntries() {
    return this.data.length;
  }

  get entries() {
    return this.data;
  }

  createGrid(options: { spacing?: number; aspectRatio?: number }) {
    const spacing = options.spacing || 1.05;
    const aspectRatio = options.aspectRatio || 1;
    const columnCount = Math.round(Math.sqrt(this.totalEntries * aspectRatio));
    const rowCount = Math.ceil(this.totalEntries / columnCount);
    return this.entries.map((dataPoint, index) => {
      const col = (index % columnCount) - columnCount / 2;
      const row = Math.floor(index / columnCount) - rowCount / 2;
      return {
        data: dataPoint,
        x: col * spacing,
        y: row * spacing,
        z: 0,
      };
    });
  }

  createSpiral(options: { tightness?: number; spread?: number }) {
    const tightness = options.tightness || 1;
    const spread = options.spread || 0.8;
    let theta = 0;
    return this.entries.map((dataPoint, index) => {
      const radius = Math.max(1, Math.sqrt(index + 1) * spread);
      theta += Math.asin(1 / radius) * tightness;
      return {
        data: dataPoint,
        x: radius * Math.cos(theta),
        y: radius * Math.sin(theta),
        z: 0,
      };
    });
  }
}
