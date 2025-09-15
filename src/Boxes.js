import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

function Box({ color }) {
  const box = useRef();
  const time = useRef(0);
  const [position, setPosition] = useState(getInitialPosition());
  const [xRotSpeed] = useState(() => Math.random());
  const [yRotSpeed] = useState(() => Math.random());
  const [scale] = useState(() => Math.pow(Math.random(), 2.0) * 0.5 + 0.05);

  function getInitialPosition() {
    let v = new Vector3(
      (Math.random() * 2 - 1) * 3,  // X: -3 to 3
      Math.random() * 2.5 + 0.1,    // Y: 0.1 to 2.6
      Math.random() * 20 - 10        // Z: -10 to 10
    );
    if (v.x < 0) v.x -= 1.75;
    if (v.x > 0) v.x += 1.75;
    return v;
  }

  function resetPosition() {
    setPosition(getInitialPosition());
  }

  useFrame((state, delta) => {
    time.current += delta * 1.2;
    const newZ = position.z - time.current;

    if (newZ < -15) {
      resetPosition();
      time.current = 0;
      return;
    }

    box.current.position.set(position.x, position.y, newZ);
    box.current.rotation.x += delta * xRotSpeed;
    box.current.rotation.y += delta * yRotSpeed;
  }, [xRotSpeed, yRotSpeed, position]);

  return (
    <mesh ref={box} rotation-x={Math.PI * 0.5} scale={scale} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} envMapIntensity={0.15} />
    </mesh>
  );
}

export function Boxes() {
  return (
    <>
      {Array(100)
        .fill(0)
        .map((_, i) => (
          <Box
            key={i}
            color={i % 2 === 0 ? [0.4, 0.1, 0.1] : [0.05, 0.15, 0.4]}
          />
        ))}
    </>
  );
}