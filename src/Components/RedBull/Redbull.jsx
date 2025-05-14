"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import PixelArtBackground from '../Background/PixelArtbg';

const Redbull = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Fully transparent background

    // Explicitly disable shadow mapping
    renderer.shadowMap.enabled = false;

    // Set correct color space
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    mountRef.current.appendChild(renderer.domElement);
    console.log('Canvas appended to mountRef'); // Debug to confirm canvas attachment

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 0, 0);

    // Lighting setup
    // Ambient light to reduce dark areas
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Increased to minimize shadow-like dark patches
    scene.add(ambientLight);

    // Main front light for strong front illumination
    const frontLight = new THREE.DirectionalLight(0xffffff, 1.2); // Increased intensity
    frontLight.position.set(0, 1, 8); // Directly in front, slightly elevated
    scene.add(frontLight);

    // Top light for additional illumination
    const topLight = new THREE.DirectionalLight(0xffffff, 0.6); // Slightly reduced to avoid washing out
    topLight.position.set(0, 6, 4); // Above and slightly forward
    scene.add(topLight);

    // Brighter left light for left-side emphasis
    const leftLight = new THREE.DirectionalLight(0xffffff, 1.5);
    leftLight.position.set(-6, 1, 6); // Left, slightly forward to light front-left
    scene.add(leftLight);

    // Right fill light, soft to maintain left-side dominance
    const rightLight = new THREE.DirectionalLight(0xffffff, 0.4);
    rightLight.position.set(6, 1, 6); // Right, slightly forward
    scene.add(rightLight);

    // Texture loader
    const textureLoader = new THREE.TextureLoader();
    textureLoader.setPath("/textures/");

    // Load GLTF model
    const loader = new GLTFLoader();
    loader.setPath("/");

    loader.load(
      "scene.gltf",
      (gltf) => {
        const model = gltf.scene;
        scene.add(model);

        console.log("GLTF Data:", gltf);

        // Rotate model to ensure front faces camera (adjust based on GLTF orientation)
        model.rotation.y = Math.PI; // 180 degrees to face forward (modify if needed)

        // Process materials
        model.traverse((child) => {
          if (child.isMesh) {
            console.log("Found mesh:", child.name);

            if (child.material) {
              console.log("Material:", child.material.name);

              // Optimize material properties for bright lighting
              child.material.roughness = child.material.roughness || 0.4; // Slightly smoother
              child.material.metalness = child.material.metalness || 0.6; // More metallic
              child.material.envMapIntensity = 1.0; // Stronger reflections

              if (child.material.name === "label") {
                textureLoader.load(
                  "label_baseColor.png",
                  (texture) => {
                    console.log("Label texture loaded successfully");
                    texture.colorSpace = THREE.SRGBColorSpace;
                    child.material.map = texture;
                    child.material.needsUpdate = true;
                  },
                  undefined,
                  (error) => console.error("Error loading label texture:", error),
                );
                textureLoader.load(
                  "label_metallicRoughness.png",
                  (texture) => {
                    child.material.metalnessMap = texture;
                    child.material.roughnessMap = texture;
                    child.material.needsUpdate = true;
                  },
                  undefined,
                  (error) => console.error("Error loading metallic roughness texture:", error),
                );
              } else if (child.material.name === "silver") {
                textureLoader.load(
                  "silver_baseColor.png",
                  (texture) => {
                    texture.colorSpace = THREE.SRGBColorSpace;
                    child.material.map = texture;
                    child.material.needsUpdate = true;
                  },
                  undefined,
                  (error) => console.error("Error loading silver texture:", error),
                );
                child.material.metalness = 0.9;
                child.material.roughness = 0.2;
              } else if (child.material.name === "top_part") {
                textureLoader.load(
                  "top_part_baseColor.jpeg",
                  (texture) => {
                    texture.colorSpace = THREE.SRGBColorSpace;
                    child.material.map = texture;
                    child.material.needsUpdate = true;
                  },
                  undefined,
                  (error) => console.error("Error loading top part texture:", error),
                );
                child.material.metalness = 0.8;
                child.material.roughness = 0.3;
              }

              child.material.needsUpdate = true;
            }
          }
        });

        // Scale and center model
        const box = new THREE.Box3().setFromObject(model);
        const height = box.max.y - box.min.y;
        const scale = 2.5 / height; // Prominent scale
        model.scale.set(scale, scale, scale);

        // Center model
        const scaledBox = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        scaledBox.getCenter(center);
        model.position.sub(center);
        model.position.y += 0.5; // Elevate slightly
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.error("An error happened while loading the GLTF model:", error);
      },
    );

    // Position camera
    camera.position.set(0, 1, 4); // Close, elevated view
    camera.lookAt(0, 0, 0);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <PixelArtBackground 
        pixelSize={2} 
        density={1} 
        fadeDuration={3000} 
        maxPlusSigns={100} 
        initialPlusSigns={50} 
      />
      <div
        ref={mountRef}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 1 }}
      />
    </div>
  );
};

export default Redbull;