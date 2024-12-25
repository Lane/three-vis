import { useRef } from "react";
import { InstancedMesh, Object3D } from "three";
import { useSpring } from "@react-spring/web";
import { usePrevious } from "../Shared";
import { PointCloud } from "./PointCloud";
import type { PointCloudOptions, PointCloudType } from "./PointCloud.d";

const scratchObject3D = new Object3D();

function interpolate(
  source: { x: number; y: number; z: number }[],
  target: { x: number; y: number; z: number }[],
  progress: number
) {
  return target.map((targetPoint, i) => {
    const sourceX = source[i]?.x || source[source.length - 1]?.x || 0;
    const sourceY = source[i]?.y || source[source.length - 1]?.y || 0;
    const sourceZ = source[i]?.z || source[source.length - 1]?.z || 0;
    const { x, y, z } = targetPoint;
    const coords = {
      x: (1 - progress) * sourceX + progress * x,
      y: (1 - progress) * sourceY + progress * y,
      z: (1 - progress) * sourceZ + progress * z,
    };
    return coords;
  });
}

function updateInstancedMeshMatrices(
  mesh: InstancedMesh | null,
  pointCloud: { x: number; y: number; z: number }[]
) {
  if (!mesh) return;
  for (let i = 0; i < pointCloud.length; ++i) {
    const { x = 0, y = 0, z = 0 } = pointCloud[i];
    // const height = 1 + 0.05 * i;
    const height = 1;
    scratchObject3D.position.set(x, y, z);
    scratchObject3D.rotation.set(0.5 * Math.PI, 0, 0); // cylinders face z direction
    scratchObject3D.scale.set(1, height, 1);
    scratchObject3D.updateMatrix();
    mesh.setMatrixAt(i, scratchObject3D.matrix);
  }
  mesh.instanceMatrix.needsUpdate = true;
}

export function usePointCloud<T extends PointCloudType>(
  points: number,
  shape: T,
  options: PointCloudOptions[T]
) {
  const meshRef = useRef<InstancedMesh>(null);
  const pointCloud = new PointCloud(points);
  const targetCloud = pointCloud.create(shape, options);
  const prevShape = useRef(shape);
  const sourceCloud = usePrevious(targetCloud) || [];
  const hasShapeChanged = shape !== prevShape.current;
  const havePointsChanged = sourceCloud.length !== targetCloud.length;
  useSpring({
    progress: 1,
    from: { progress: 0 },
    reset: hasShapeChanged || havePointsChanged,
    onChange: ({ value: { progress } }) => {
      if (!meshRef.current) return;
      const interpolatedCloud = interpolate(sourceCloud, targetCloud, progress);
      updateInstancedMeshMatrices(meshRef.current, interpolatedCloud);
    },
  });
  prevShape.current = shape;
  return meshRef;
}
