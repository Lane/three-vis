import type { InstancedMeshProps } from "@react-three/fiber";
import type { PointCloudOptions, PointCloudType } from "./PointCloud.d";
import { usePointCloud } from "./usePointCloud";

const defaultOptions = {};

export function PointCloud<T extends PointCloudType>({
  points,
  shape,
  options = defaultOptions,
  ...props
}: InstancedMeshProps & {
  points: number;
  shape: T;
  options?: PointCloudOptions[T];
}) {
  const meshRef = usePointCloud(points, shape, options);
  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, points]}
      frustumCulled={false}
      {...props}
    />
  );
}
