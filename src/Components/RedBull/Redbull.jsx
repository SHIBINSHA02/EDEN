"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import PixelArtBackground from '../Background/PixelArtbg';
import FluidContainer from './FluidContainer';

const Redbull = () => {
  const mountRef = useRef(null);
  const modelRef = useRef(null);
  const lastScrollY = useRef(0);
  const wasVisible = useRef(false);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth <= 768);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth * 0.3 / window.innerHeight, 0.1, 1000);
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

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(1, 1, 0);
    scene.add(cube);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.setPath("/textures/");

    const loader = new GLTFLoader();
    loader.setPath("/");
    loader.load(
      "scene.gltf",
      (gltf) => {
        const model = gltf.scene;
        scene.remove(cube);
        scene.add(model);
        modelRef.current = model;

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

        const box = new THREE.Box3().setFromObject(model);
        const modelSize = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(modelSize.x, modelSize.y, modelSize.z);
        const scale = 2 / maxDim; // Normalize to fit within 2 units
        model.scale.set(scale, scale, scale);

        const scaledBox = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        scaledBox.getCenter(center);
        model.position.sub(center);
        model.position.set(1, 1, 0);
        model.rotation.set(0, 3, 0);
      },
      (xhr) => console.log((xhr.loaded / xhr.total) * 100 + "% loaded"),
      (error) => console.error("Error loading GLTF model:", error)
    );

    camera.position.set(1, 1, 4);
    camera.lookAt(1, 1, 0);

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
          if (modelRef.current) {
            const box = new THREE.Box3().setFromObject(modelRef.current);
            const modelSize = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(modelSize.x, modelSize.y, modelSize.z);
            const scale = 2 / maxDim; // Maintain consistent size
            modelRef.current.scale.set(scale, scale, scale);
            const scaledBox = new THREE.Box3().setFromObject(modelRef.current);
            const center = new THREE.Vector3();
            scaledBox.getCenter(center);
            modelRef.current.position.sub(center);
            modelRef.current.position.set(1, 1, 0);
          }
        }
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      const rect = mountRef.current?.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const isVisible = rect && rect.top < windowHeight && rect.bottom >= 0;
      const rotationSpeed = 0.01;

      if (modelRef.current && isVisible) {
        const rotationDelta = delta * rotationSpeed;
        modelRef.current.rotation.y += rotationDelta + 0.01;
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

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

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
        width: isMobile ? 'auto' : '70%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        position: isMobile ? 'absolute' : 'static',
        top: isMobile ? '20%' : undefined,
        left: isMobile ? '50%' : undefined,
        transform: isMobile ? 'translate(-50%, -50%)' : undefined,
        zIndex: isMobile ? 10 : 2,
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
        width: isMobile ? '100%' : '30%',
        height: '70vh',
        position: 'relative',
        zIndex: 4,
      }}>
        <FluidContainer
          style={{
            position: 'absolute',
            top: 100,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 4,
            pointerEvents: 'none',
          }}
        />
        <div
          ref={mountRef}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 6,
          }}
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