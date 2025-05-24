"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// Note: PixelArtBackground import commented out due to "not defined" error
// Ensure the file exists at src/Components/Background/PixelArtbg.jsx and exports correctly
import PixelArtBackground from "../Background/PixelArtbg";

const Redbull = () => {
  const mountRef = useRef(null);
  const modelRef = useRef(null);
  const controlsRef = useRef(null);
  const scaleRef = useRef(null); // Store scale to prevent recalculation
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 768
  );
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth * 0.3 / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    if (mountRef.current) {
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      mountRef.current.appendChild(renderer.domElement);
      console.log("Three.js canvas appended to mountRef");
    } else {
      console.error("mountRef.current is null");
      return;
    }

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const frontLight = new THREE.DirectionalLight(0xffffff, 1.2);
    frontLight.position.set(0, 1, 8);
    scene.add(frontLight);
    const topLight = new THREE.DirectionalLight(0xffffff, 0.6);
    topLight.position.set(0, 6, 4);
    scene.add(topLight);
    const leftLight = new THREE.DirectionalLight(0xffffff, 1.5);
    leftLight.position.set(-6, 1, 6);
    scene.add(leftLight);
    const rightLight = new THREE.DirectionalLight(0xffffff, 0.4);
    rightLight.position.set(6, 1, 6);
    scene.add(rightLight);

    // Placeholder cube
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color: 0xffffff })
    );
    cube.position.set(0, 0, 0);
    scene.add(cube);

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
        scene.remove(cube);
        scene.add(model);
        modelRef.current = model;

        // Apply textures and material properties
        model.traverse((child) => {
          if (child.isMesh && child.material) {
            // Base material settings for all meshes
            child.material.roughness = 0.4;
            child.material.metalness = 0.6;
            child.material.envMapIntensity = 1.0;
            child.material.side = THREE.DoubleSide; // Prevent flickering
            child.material.polygonOffset = true; // Reduce Z-fighting
            child.material.polygonOffsetFactor = 1;
            child.material.polygonOffsetUnits = 1;
            child.material.depthTest = true;
            child.material.depthWrite = true;
            child.material.transparent = false;

            if (child.material.name === "silver") {
              textureLoader.load(
                "silver_baseColor.png",
                (texture) => {
                  texture.colorSpace = THREE.SRGBColorSpace;
                  child.material.map = texture;
                  child.material.needsUpdate = true;
                },
                undefined,
                (error) => console.error("Error loading silver texture:", error)
              );
              child.material.metalness = 0.9;
              child.material.roughness = 0.2;
              child.renderOrder = 1; // Lower render order
            } else if (child.material.name === "top_part") {
              textureLoader.load(
                "top_part_baseColor.jpeg",
                (texture) => {
                  texture.colorSpace = THREE.SRGBColorSpace;
                  child.material.map = texture;
                  child.material.needsUpdate = true;
                },
                undefined,
                (error) => console.error("Error loading top part texture:", error)
              );
              child.material.metalness = 0.8;
              child.material.roughness = 0.3;
              child.renderOrder = 1; // Lower render order
            } else if (child.material.name === "label") {
              textureLoader.load(
                "label_baseColor.png",
                (texture) => {
                  texture.colorSpace = THREE.SRGBColorSpace;
                  child.material.map = texture;
                  child.material.needsUpdate = true;
                },
                undefined,
                (error) => console.error("Error loading label texture:", error)
              );
              textureLoader.load(
                "label_metallicRoughness.png",
                (texture) => {
                  child.material.metalnessMap = texture;
                  child.material.roughnessMap = texture;
                  child.material.needsUpdate = true;
                },
                undefined,
                (error) => console.error("Error loading metallic roughness texture:", error)
              );
              // Prioritize label rendering
              child.material.polygonOffsetFactor = 2; // Higher offset for label
              child.material.polygonOffsetUnits = 2;
              child.renderOrder = 2; // Higher render order to draw last
            }
            child.material.needsUpdate = true;
          }
        });

        // Set scale and center once
        if (!scaleRef.current) {
          const box = new THREE.Box3().setFromObject(model);
          const modelSize = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(modelSize.x, modelSize.y, modelSize.z);
          scaleRef.current = 3.5 / maxDim;
          model.scale.set(scaleRef.current, scaleRef.current, scaleRef.current);

          const center = new THREE.Vector3();
          box.setFromObject(model).getCenter(center);
          model.position.sub(center);
          model.position.set(0, 0, 0);
          model.rotation.set(0, 0, 0);
          console.log("Model scale set to:", scaleRef.current);
        }
      },
      (xhr) => console.log(`Model loading: ${(xhr.loaded / xhr.total) * 100}%`),
      (error) => console.error("Error loading GLTF model:", error)
    );

    // Set up camera
    camera.position.set(0, 0, 4);
    camera.lookAt(0, 0, 0);

    // Set up OrbitControls for Y-axis rotation
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minPolarAngle = Math.PI / 2; // Restrict to Y-axis
    controls.maxPolarAngle = Math.PI / 2; // Restrict to Y-axis

    // Handle user interaction
    controls.addEventListener("start", () => {
      console.log("User interaction started");
      setIsInteracting(true);
    });
    controls.addEventListener("end", () => {
      console.log("User interaction ended");
      setIsInteracting(false);
    });

    // Handle resize
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setIsMobile(window.innerWidth <= 768);
        if (mountRef.current) {
          const width = mountRef.current.clientWidth;
          const height = mountRef.current.clientHeight;
          renderer.setSize(width, height);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        }
      }, 100);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Continuous, endless Y rotation when not interacting
      if (modelRef.current && !isInteracting) {
        modelRef.current.rotation.y += 0.005; // Rotate endlessly
        modelRef.current.scale.set(scaleRef.current, scaleRef.current, scaleRef.current);
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: isMobile ? "100%" : "70%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          position: isMobile ? "absolute" : "static",
          top: isMobile ? "10%" : undefined,
          left: isMobile ? "50%" : undefined,
          transform: isMobile ? "translate(-50%, 0)" : undefined,
          zIndex: isMobile ? 10 : 2,
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 4rem)",
            fontWeight: "bold",
            color: "#ffffff",
            textAlign: "center",
            fontFamily: '"Arial", sans-serif',
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            margin: "0 20px",
          }}
        >
          Red Bull Gives You Wings
        </h1>
      </div>
      <div
        style={{
          width: isMobile ? "100%" : "30%",
          height: isMobile ? "60vh" : "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          zIndex: 4,
        }}
      >
        <div ref={mountRef} style={{ width: "100%", height: "100%" }} />
      </div>
      {/* Fallback for PixelArtBackground due to "not defined" error */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "#000", // Fallback background
          zIndex: 1,
        }}
      />
     
      <PixelArtBackground
        pixelSize={2}
        density={1}
        fadeDuration={3000}
        maxPlusSigns={100}
        initialPlusSigns={50}
        style={{ position: "absolute", width: "100%", height: "100%", zIndex: 1 }}
      />
     
    </div>
  );
};

export default Redbull;

// Consider adding an error boundary around the Redbull component to handle runtime errors.
// Example:
// import { Component } from 'react';
// class ErrorBoundary extends Component {
//   state = { hasError: false };
//   static getDerivedStateFromError() {
//     return { hasError: true };
//   }
//   render() {
//     if (this.state.hasError) {
//       return <h1>Something went wrong.</h1>;
//     }
//     return this.props.children;
//   }
// }
// Wrap Redbull in App.jsx: <ErrorBoundary><Redbull /></ErrorBoundary>
// See https://reactjs.org/link/error-boundaries for details.