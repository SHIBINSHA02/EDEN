import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import vertexShader from '../Shades/vertexShader.glsl';
import fragmentShader from '../Shades/fragmentShader.glsl';

// Hex to RGB conversion
const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
};

// Colors
const baseColor = hexToRgb('#1d0a24');
const primaryCenter = hexToRgb('#a45f99');
const primarySurround = [
  hexToRgb('#a15d97'),
  hexToRgb('#552e55'),
  hexToRgb('#7c4675'),
  hexToRgb('#1d0b23'),
];
const fadeCenter = hexToRgb('#442344');
const fadeSurround = hexToRgb('#1d0a24');

// Generate plus signs
const generatePlusSigns = (width, height, density = 0.02) => {
  const plusSigns = [];
  const grid = new Set();
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      if (Math.random() < density && !grid.has(`${x},${y}`)) {
        const isPrimary = Math.random() < 0.5;
        plusSigns.push({ x, y, type: isPrimary ? 'primary' : 'fade' });
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            grid.add(`${x + dx},${y + dy}`);
          }
        }
      }
    }
  }
  return plusSigns;
};

export const Bg = ({ width = 600, height = 400 }) => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const materialRef = useRef(null);

  useEffect(() => {
    // Initialize Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    camera.position.z = 5;

    // Virtual grid size
    const gridWidth = 64;
    const gridHeight = Math.floor(gridWidth * (height / width));

    // Generate plus signs
    const plusSigns = generatePlusSigns(gridWidth, gridHeight, 0.02);

    // Create plane
    const geometry = new THREE.PlaneGeometry(10, 10 * (height / width));
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uResolution: { value: new THREE.Vector2(gridWidth, gridHeight) },
        uPixelSize: { value: 16.0 },
        uBaseColor: { value: new THREE.Vector3(...baseColor) },
        uPlusSigns: { value: plusSigns.map(sign => new THREE.Vector3(sign.x, sign.y, sign.type === 'primary' ? 1 : 0)) }, // Ensure valid Vector3
        uPrimaryCenter: { value: new THREE.Vector3(...primaryCenter) },
        uPrimarySurround: { value: primarySurround.map(c => new THREE.Vector3(...c)) },
        uFadeCenter: { value: new THREE.Vector3(...fadeCenter) },
        uFadeSurround: { value: new THREE.Vector3(...fadeSurround) },
      },
      vertexShader,
      fragmentShader,
    });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
    materialRef.current = material;

    // Handle resize
    const handleResize = () => {
      const parent = canvasRef.current.parentElement;
      const newWidth = parent.clientWidth;
      const newHeight = parent.clientHeight;
      renderer.setSize(newWidth, newHeight);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      const newGridHeight = Math.floor(gridWidth * (newHeight / newWidth));
      material.uniforms.uResolution.value.set(gridWidth, newGridHeight);
      const newPlusSigns = generatePlusSigns(gridWidth, newGridHeight, 0.02);
      material.uniforms.uPlusSigns.value = newPlusSigns.map(sign => new THREE.Vector3(sign.x, sign.y, sign.type === 'primary' ? 1 : 0)); // Ensure valid Vector3
      plane.geometry = new THREE.PlaneGeometry(10, 10 * (newHeight / newWidth));
    };
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [width, height]);

  return (
    <div className="w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};