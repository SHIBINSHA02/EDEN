"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import PixelArtBackground from '../Background/PixelArtbg';

const Redbull = () => {
  const mountRef = useRef(null);
  const modelRef = useRef(null); // To store the model for rotation
  const lastScrollY = useRef(0); // Track last scroll position
  const wasVisible = useRef(false); // Track visibility state

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Fully transparent background

    // Disable shadow mapping
    renderer.shadowMap.enabled = false;

    // Set correct color space
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    mountRef.current.appendChild(renderer.domElement);
    console.log('Canvas appended to mountRef');

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
        modelRef.current = model; // Store model for rotation

        console.log("GLTF Data:", gltf);

        // Process materials
        model.traverse((child) => {
          if (child.isMesh) {
            console.log("Found mesh:", child.name);

            if (child.material) {
              console.log("Material:", child.material.name);

              // Optimize material properties
              child.material.roughness = child.material.roughness || 0.4;
              child.material.metalness = child.material.metalness || 0.6;
              child.material.envMapIntensity = 1.0;

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
              } else if (child.material.name === "silver") {
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
              }

              child.material.needsUpdate = true;
            }
          }
        });

        // Scale and center model
        const box = new THREE.Box3().setFromObject(model);
        const height = box.max.y - box.min.y;
        const scale = 2.5 / height;
        model.scale.set(scale, scale, scale);

        // Center model
        const scaledBox = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        scaledBox.getCenter(center);
        model.position.sub(center);

        // Set initial position
        model.position.set(0, 1, 0); // X: 0, Y: 1, Z: 0

        // Set initial rotation
        model.rotation.set(Math.PI / 4, Math.PI, Math.PI / 6); // X: 45°, Y: 180°, Z: 30°
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.error("An error happened while loading the GLTF model:", error);
      }
    );

    // Position camera
    camera.position.set(3, 1, 4);
    camera.lookAt(0, 0, 0);

    // Scroll-based rotation
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      const rect = mountRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if component is in viewport
      const isVisible = rect.top < windowHeight && rect.bottom >= 0;
      const rotationSpeed = 0.1; // Adjust for smoother/faster rotation

      if (modelRef.current) {
        if (isVisible && !wasVisible.current) {
          // Entering viewport: positive rotation on all axes
          modelRef.current.rotation.x += rotationSpeed * 10; // Amplify for noticeable effect
          modelRef.current.rotation.y += rotationSpeed * 10;
          modelRef.current.rotation.z += rotationSpeed * 10;
        } else if (!isVisible && wasVisible.current) {
          // Leaving viewport: negative rotation on all axes
          modelRef.current.rotation.x -= rotationSpeed * 10;
          modelRef.current.rotation.y -= rotationSpeed * 10;
          modelRef.current.rotation.z -= rotationSpeed * 10;
        } else if (isVisible) {
          // While in viewport: subtle rotation based on scroll direction
          if (delta > 0) {
            // Scroll down: slight positive rotation
            modelRef.current.rotation.x += rotationSpeed;
            modelRef.current.rotation.y += rotationSpeed;
            modelRef.current.rotation.z += rotationSpeed;
          } else if (delta < 0) {
            // Scroll up: slight negative rotation
            modelRef.current.rotation.x -= rotationSpeed;
            modelRef.current.rotation.y -= rotationSpeed;
            modelRef.current.rotation.z -= rotationSpeed;
          }
        }
      }

      lastScrollY.current = currentScrollY;
      wasVisible.current = isVisible;
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
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