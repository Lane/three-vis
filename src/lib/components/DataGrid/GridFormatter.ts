import * as THREE from "three";
import type { GridItem } from "./types";

export class GridFormatter<T extends Json> {
  static scratchObject3D = new THREE.Object3D();
  data: T[];
  aspectRatio: number;

  constructor(data: T[], aspectRatio = 1) {
    this.data = data;
    this.aspectRatio = aspectRatio;
  }

  get points() {
    return this.data.length;
  }

  getColumnCount() {
    return Math.round(Math.sqrt(this.data.length * this.aspectRatio));
  }

  getRowCount() {
    return Math.ceil(this.data.length / this.getColumnCount());
  }

  getGridData(): GridItem<T>[] {
    const columnCount = this.getColumnCount();
    const rowCount = this.getRowCount();
    return this.data.map((dataPoint, index) => {
      const rowIndex = Math.floor(index / columnCount);
      const columnIndex = index % columnCount;
      return {
        data: dataPoint,
        rowIndex,
        totalRows: rowCount,
        columnIndex,
        totalColumns: columnCount,
      };
    });
  }

  createGridLayout(spacing: number) {
    const columnCount = this.getColumnCount();
    const rowCount = this.getRowCount();
    return this.data.map((dataPoint, index) => {
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

  createSpiralLayout() {
    let theta = 0;
    return this.data.map((dataPoint, index) => {
      const radius = Math.max(1, Math.sqrt(index + 1) * 0.8);
      theta += Math.asin(1 / radius) * 1;
      return {
        data: dataPoint,
        x: radius * Math.cos(theta),
        y: radius * Math.sin(theta),
        z: 0,
      };
    });
  }

  updateInstancedMesh(mesh: THREE.InstancedMesh) {
    for (const [
      index,
      { rowIndex, columnIndex },
    ] of this.getGridData().entries()) {
      const x = columnIndex * 1.05;
      const y = rowIndex * 1.05;
      const z = 0;
      GridFormatter.scratchObject3D.position.set(x, y, z);
      // cylinders face z direction
      GridFormatter.scratchObject3D.rotation.set(0.5 * Math.PI, 0, 0);
      GridFormatter.scratchObject3D.updateMatrix();
      mesh.setMatrixAt(index, GridFormatter.scratchObject3D.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }
}
