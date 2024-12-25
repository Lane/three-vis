import { TrackballControls } from "@react-three/drei";

export const Controls = () => {
  return (
    <TrackballControls
      dynamicDampingFactor={0.1}
      mouseButtons={{
        LEFT: 2, // Pan with left mouse button
        MIDDLE: 1, // Zoom with middle mouse button
        RIGHT: 0, // Rotate with right mouse button
      }}
    />
  );
};
