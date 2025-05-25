import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import PixelArtBackground from "../Background/PixelArtbg";

const Redbull = () => {
  const mountRef = useRef(null);
  const modelRef = useRef(null);
  const controlsRef = useRef(null);
  const scaleRef = useRef(null);
  const rendererRef = useRef(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 768
  );
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (!mountRef.current) {
      return;
    }

    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      1, // Placeholder aspect ratio, updated in resize
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(window.devicePixelRatio); // Improve quality on high-DPI screens

    // Append renderer to DOM
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);

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
      new THREE.MeshStandardMaterial({ color: 0xff0000 }) // Red for visibility
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
            child.material.roughness = 0.4;
            child.material.metalness = 0.6;
            child.material.envMapIntensity = 1.0;
            child.material.side = THREE.DoubleSide;
            child.material.polygonOffset = true;
            child.material.polygonOffsetFactor = 1;
            child.material.polygonOffsetUnits = 1;
            child.material.depthTest = true;
            child.material.depthWrite = true;
            child.material.transparent = false;

            if (child.material.name === "silver") {
              textureLoader.load(
                "/textures/silver_baseColor.png",
                (texture) => {
                  texture.colorSpace = THREE.SRGBColorSpace;
                  texture.generateMipmaps = false;
                  texture.minFilter = THREE.LinearFilter;
                  texture.magFilter = THREE.LinearFilter;
                  child.material.map = texture;
                  child.material.needsUpdate = true;
                },
                undefined,
                () => {
                  // Error loading silver texture - use fallback color
                  child.material.color.set(0xc0c0c0);
                }
              );
              child.material.metalness = 0.9;
              child.material.roughness = 0.2;
              child.renderOrder = 1;
            } else if (child.material.name === "top_part") {
              textureLoader.load(
                "/textures/top_part_baseColor.jpeg",
                (texture) => {
                  texture.colorSpace = THREE.SRGBColorSpace;
                  texture.generateMipmaps = false;
                  texture.minFilter = THREE.LinearFilter;
                  texture.magFilter = THREE.LinearFilter;
                  child.material.map = texture;
                  child.material.needsUpdate = true;
                },
                undefined,
                () => {
                  // Error loading top part texture - use fallback color
                  child.material.color.set(0x8b5cf6);
                }
              );
              child.material.metalness = 0.8;
              child.material.roughness = 0.3;
              child.renderOrder = 1;
            } else if (child.material.name === "label") {
              textureLoader.load(
                "/textures/label_baseColor.png",
                (texture) => {
                  texture.colorSpace = THREE.SRGBColorSpace;
                  texture.generateMipmaps = false;
                  texture.minFilter = THREE.LinearFilter;
                  texture.magFilter = THREE.LinearFilter;
                  child.material.map = texture;
                  child.material.needsUpdate = true;
                },
                undefined,
                () => {
                  // Error loading label texture - use fallback color
                  child.material.color.set(0xff0000);
                }
              );
              textureLoader.load(
                "/textures/label_metallicRoughness.png",
                (texture) => {
                  texture.generateMipmaps = false;
                  texture.minFilter = THREE.LinearFilter;
                  texture.magFilter = THREE.LinearFilter;
                  child.material.metalnessMap = texture;
                  child.material.roughnessMap = texture;
                  child.material.needsUpdate = true;
                },
                undefined,
                () => {
                  // Error loading metallic roughness texture - use defaults
                  child.material.metalness = 0.5;
                  child.material.roughness = 0.5;
                }
              );
              child.material.polygonOffsetFactor = 2;
              child.material.polygonOffsetUnits = 2;
              child.renderOrder = 2;
            }
            child.material.needsUpdate = true;
          }
        });

        // Set scale and center
        if (!scaleRef.current) {
          const box = new THREE.Box3().setFromObject(model);
          const modelSize = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(modelSize.x, modelSize.y, modelSize.z);
          scaleRef.current = 3.5 / maxDim;
          model.scale.set(scaleRef.current, scaleRef.current, scaleRef.current);

          const center = new THREE.Vector3();
          box.getCenter(center);
          model.position.sub(center);
          model.position.set(0, 0, 0);
          model.rotation.set(0, 0, 0);
        }

        // Ensure model is within camera view
        camera.lookAt(0, 0, 0);
      },
      () => {
        // Model loading progress
      },
      () => {
        // Error loading GLTF model - keep cube if model fails to load
        cube.material.color.set(0xff0000); // Red to indicate error
      }
    );

    // Set up camera
    camera.position.set(0, 0, 5); // Slightly further for better view
    camera.lookAt(0, 0, 0);

    // Set up OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enablePan = false;
    controls.enableZoom = true; // Allow zoom for debugging
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 2;

    // Handle user interaction
    controls.addEventListener("start", () => {
      setIsInteracting(true);
    });
    controls.addEventListener("end", () => {
      setIsInteracting(false);
    });

    // Handle resize
    const handleResize = () => {
      if (mountRef.current && rendererRef.current) {
        const width = mountRef.current.clientWidth;
        const height =
          mountRef.current.clientHeight || window.innerHeight * 0.6; // Fallback height
        rendererRef.current.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        setIsMobile(window.innerWidth <= 768);
      }
    };

    // Initial resize and event listener
    handleResize();
    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      if (!rendererRef.current) return;
      requestAnimationFrame(animate);

      if (modelRef.current && !isInteracting) {
        modelRef.current.rotation.y += 0.005;
        modelRef.current.scale.set(
          scaleRef.current,
          scaleRef.current,
          scaleRef.current
        );
      }

      controls.update();
      rendererRef.current.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      rendererRef.current = null;
    };
  }, [isInteracting]);

  return (
    <div
      id="redbull-section"
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
          alignItems: "flex-start",
          justifyContent: "center",
          background: "transparent",
          position: isMobile ? "absolute" : "static",
          top: isMobile ? "0" : undefined,
          left: isMobile ? "50%" : undefined,
          transform: isMobile ? "translate(-50%, 0)" : undefined,
          zIndex: isMobile ? 10 : 2,
        }}
      >
        <img
          src="/energypartner.svg"
          alt="Energy Partner Logo"
          style={{
            width: isMobile ? "70%" : "50%",
            height: "auto",
            margin: "auto",
            zIndex: 10,
          }}
        />
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
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "#000",
          zIndex: 1,
        }}
      />
      <PixelArtBackground
        pixelSize={2}
        density={1}
        fadeDuration={3000}
        maxPlusSigns={100}
        initialPlusSigns={50}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      />
    </div>
  );
};

export default Redbull;
