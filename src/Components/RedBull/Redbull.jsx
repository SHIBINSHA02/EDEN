"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import PixelArtBackground from '../Background/PixelArtbg';

const Redbull = () => {
  const mountRef = useRef(null);
  const modelRef = useRef(null);
  const lastScrollY = useRef(0);
  const wasVisible = useRef(false);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth * 0.3 / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth * 0.3, window.innerHeight); // 30% width
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
      console.log("Renderer appended to mountRef");
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
        modelRef.current = model;
        console.log("Model loaded successfully");

        // Process materials
        model.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material.roughness = child.material.roughness || 0.4;
            child.material.metalness = child.material.metalness || 0.6;
            child.material.envMapIntensity = 1.0;

            if (child.material.name === "label") {
              textureLoader.load(
                "label_baseColor.png",
                (texture) => {
                  texture.colorSpace = THREE.SRGBColorSpace;
                  child.material.map = texture;
                  child.material.needsUpdate = true;
                  console.log("Label texture applied");
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
        });

        // Scale and center model
        const box = new THREE.Box3().setFromObject(model);
        const height = box.max.y - box.min.y;
        const scale = 2.5 / height;
        model.scale.set(scale, scale, scale);

        const scaledBox = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        scaledBox.getCenter(center);
        model.position.sub(center);

        // Position model slightly right in the 30% canvas and face forward
        model.position.set(1, 1, 0); // X: 1 (right-aligned), Y: 1, Z: 0
        model.rotation.set(0, 0, 0); // Face forward
      },
      (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
      (error) => console.error("Error loading GLTF model:", error)
    );

    // Position camera to view the model
    camera.position.set(1, 1, 4); // Align with model
    camera.lookAt(1, 1, 0);

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth * 0.3;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      if (modelRef.current) {
        modelRef.current.position.set(1, 1, 0); // Keep right-aligned
        camera.position.set(1, 1, 4);
        camera.lookAt(1, 1, 0);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Scroll-based rotation (Y-axis only)
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      const rect = mountRef.current?.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const isVisible = rect && rect.top < windowHeight && rect.bottom >= 0;
      const rotationSpeed = 0.002;

      if (modelRef.current && isVisible) {
        const rotationDelta = delta * rotationSpeed;
        modelRef.current.rotation.y += rotationDelta;
        modelRef.current.rotation.y = THREE.MathUtils.clamp(
          modelRef.current.rotation.y,
          -1,
          1
        );
      }

      lastScrollY.current = currentScrollY;
      wasVisible.current = isVisible;
    };

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
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div style={{ display: 'flex', width: '100%', height: '100vh', position: 'relative' }}>
      <div style={{
        width: '70%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        zIndex: 2,
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          fontWeight: 'bold',
          color: '#ffffff',
          textAlign: 'center',
          fontFamily: '"Arial", sans-serif',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          margin: '0 20px',
        }}>
          Red Bull Gives You Wings
        </h1>
      </div>
      <div style={{
        width: '30%',
        height: '100vh',
        position: 'relative',
        zIndex: 2,
      }}>
        <div
          ref={mountRef}
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
        />
      </div>
      <PixelArtBackground 
        pixelSize={2} 
        density={1} 
        fadeDuration={3000} 
        maxPlusSigns={100} 
        initialPlusSigns={50} 
        style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1 }}
      />
    </div>
  );
};

export default Redbull;