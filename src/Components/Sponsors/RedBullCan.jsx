import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const RedBullCan = ({ width = 200, height = 200 }) => {
  const mountRef = useRef(null);
  const modelRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);

    mountRef.current.appendChild(renderer.domElement);

    // Lighting setup optimized for the can
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const frontLight = new THREE.DirectionalLight(0xffffff, 1.0);
    frontLight.position.set(0, 1, 5);
    scene.add(frontLight);

    const leftLight = new THREE.DirectionalLight(0xffffff, 0.8);
    leftLight.position.set(-3, 1, 3);
    scene.add(leftLight);

    // Load textures
    const textureLoader = new THREE.TextureLoader();
    textureLoader.setPath("/textures/");

    // Load model
    const loader = new GLTFLoader();
    loader.setPath("/");
    loader.load(
      "scene.gltf",
      (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        modelRef.current = model;

        // Apply textures and material properties
        model.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material.roughness = 0.4;
            child.material.metalness = 0.6;
            child.material.envMapIntensity = 1.0;

            if (child.material.name === "silver") {
              textureLoader.load("silver_baseColor.png", (texture) => {
                texture.colorSpace = THREE.SRGBColorSpace;
                texture.generateMipmaps = false;
                texture.minFilter = THREE.LinearFilter;
                texture.magFilter = THREE.LinearFilter;
                child.material.map = texture;
                child.material.needsUpdate = true;
              });
              child.material.metalness = 0.9;
              child.material.roughness = 0.2;
            } else if (child.material.name === "top_part") {
              textureLoader.load("top_part_baseColor.jpeg", (texture) => {
                texture.colorSpace = THREE.SRGBColorSpace;
                texture.generateMipmaps = false;
                texture.minFilter = THREE.LinearFilter;
                texture.magFilter = THREE.LinearFilter;
                child.material.map = texture;
                child.material.needsUpdate = true;
              });
              child.material.metalness = 0.8;
              child.material.roughness = 0.3;
            } else if (child.material.name === "label") {
              textureLoader.load("label_baseColor.png", (texture) => {
                texture.colorSpace = THREE.SRGBColorSpace;
                texture.generateMipmaps = false;
                texture.minFilter = THREE.LinearFilter;
                texture.magFilter = THREE.LinearFilter;
                child.material.map = texture;
                child.material.needsUpdate = true;
              });
              textureLoader.load("label_metallicRoughness.png", (texture) => {
                texture.generateMipmaps = false;
                texture.minFilter = THREE.LinearFilter;
                texture.magFilter = THREE.LinearFilter;
                child.material.metalnessMap = texture;
                child.material.roughnessMap = texture;
                child.material.needsUpdate = true;
              });
            }
            child.material.needsUpdate = true;
          }
        });

        // Scale and position the model
        const box = new THREE.Box3().setFromObject(model);
        const modelSize = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(modelSize.x, modelSize.y, modelSize.z);
        const scale = 2.5 / maxDim;
        model.scale.set(scale, scale, scale);

        const center = new THREE.Vector3();
        box.getCenter(center);
        model.position.sub(center);
        model.position.set(0, 0, 0);
      },
      undefined,
      () => {
        // Error loading Red Bull can model
      }
    );

    // Set up camera
    camera.position.set(0, 0, 4);
    camera.lookAt(0, 0, 0);

    // Animation loop
    const animate = () => {
      if (!rendererRef.current) return;
      requestAnimationFrame(animate);

      if (modelRef.current) {
        modelRef.current.rotation.y += 0.01; // Slightly faster rotation for sponsor section
      }

      rendererRef.current.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      rendererRef.current = null;
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
    />
  );
};

export default RedBullCan;
