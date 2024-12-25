import { Canvas } from "@react-three/fiber";
import { Lights } from "./Lights";
import { Controls } from "./Controls";
import { ComponentProps, useEffect, useState } from "react";
import { PointCloud } from "../../PointCloud";

// const data = new Array(10000)
//   .fill(0)
//   .map((_, index) => ({ id: index, value: Math.random() * 1000 }))
//   .sort((a, b) => (a.value > b.value ? 1 : -1));

export const ThreePointVis = () => {
  const [shape, setShape] =
    useState<ComponentProps<typeof PointCloud>["shape"]>("grid");
  const [points, setPoints] = useState<number>(100);

  const setCube = () => {
    setShape("cube");
  };
  const setSpiral = () => {
    setShape("spiral");
  };
  const setGrid = () => {
    setShape("grid");
  };
  const setSphere = () => {
    setShape("sphere");
  };

  return (
    <>
      <Canvas camera={{ position: [0, 0, 100] }}>
        <Controls />
        <Lights />
        <PointCloud points={points} shape={shape}>
          <cylinderGeometry attach="geometry" args={[0.5, 0.5, 0.15, 32]} />
          <meshStandardMaterial attach="material" color="hotpink" />
        </PointCloud>
      </Canvas>
      <div
        style={{
          display: "flex",
          gap: 8,
          position: "absolute",
          top: 8,
          left: 8,
          zIndex: 999,
        }}
      >
        <button onClick={setGrid}>Grid</button>
        <button onClick={setCube}>Cube</button>
        <button onClick={setSphere}>Sphere</button>
        <button onClick={setSpiral}>Spiral</button>
        <button onClick={() => setPoints(points + 1)}>add point</button>
      </div>
    </>
  );
};
