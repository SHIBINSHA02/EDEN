import { useEffect, useRef } from "react";
// Removed Three.js imports
// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const RedBullCan = ({ width = 200, height = 200 }) => {
  const mountRef = useRef(null);
  // Removed unused refs
  // const modelRef = useRef(null);
  // const rendererRef = useRef(null);
  // const sceneRef = useRef(null);
  // const cameraRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // No Three.js initialization and rendering needed

    // Cleanup
    return () => {
      // No need to clean up renderer
      // if (mountRef.current && renderer.domElement) {
      //   mountRef.current.removeChild(renderer.domElement);
      // }
      // renderer.dispose(); // No renderer to dispose
      // rendererRef.current = null; // No renderer reference
    };
  }, [width, height]);

  return (
    <div
      ref={mountRef}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        position: "relative",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <img 
        src="/Red Bull.svg" 
        alt="Red Bull Can" 
        style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
      />
    </div>
  );
};

export default RedBullCan;
