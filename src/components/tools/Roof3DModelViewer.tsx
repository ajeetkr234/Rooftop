import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { 
  Rotate3d, 
  Sun, 
  Sunset, 
  CloudRain, 
  RotateCcw, 
  Sparkles, 
  Eye, 
  Layers, 
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export type RoofMaterialType = 'shingles' | 'metal' | 'tile' | 'tpo';
export type LightingModeType = 'noon' | 'sunset' | 'storm';

interface Hotspot {
  id: string;
  name: string;
  category: string;
  position: [number, number, number];
  cameraTarget: [number, number, number];
  description: string;
  specStandard: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'hs-ridge',
    name: 'Continuous Ridge Exhaust Vent',
    category: 'Thermal Dynamics',
    position: [0, 4.25, 0],
    cameraTarget: [0, 5, 4],
    description: 'Baffled continuous ridge vent draws attic heat and humidity out 24/7 without allowing wind-driven rain penetration.',
    specStandard: 'ASTM D3462 / 18 sq. in. Net Free Area per Foot'
  },
  {
    id: 'hs-chimney',
    name: 'Masonry Step & Counter Flashing',
    category: 'Penetration Gasket',
    position: [1.8, 3.8, -0.6],
    cameraTarget: [2.5, 4.2, 1.2],
    description: 'Custom-bent L-shaped aluminum step flashing interlaced between every shingle layer, regletted and sealed into brick mortar joints.',
    specStandard: 'Heavy-Gauge Aluminum / ASTM B209'
  },
  {
    id: 'hs-valley',
    name: 'Engineered Valley Drainage Channel',
    category: 'High-Flow Hydro Armor',
    position: [-0.9, 3.1, 1.2],
    cameraTarget: [-1.8, 3.8, 3.2],
    description: 'Dual-ply self-adhering SBS ice & water shield beneath a 24-gauge pre-finished valley liner that directs torrential runoff.',
    specStandard: 'ASTM D1970 60-Mil Waterproof Membrane'
  },
  {
    id: 'hs-dormer',
    name: 'Cross-Gable Dormer & Eave Drip Edge',
    category: 'Architectural Transition',
    position: [-1.4, 3.4, 1.8],
    cameraTarget: [-2.2, 4.0, 3.5],
    description: 'Reinforced sidewall kickout flashing diverts rainwater away from home siding and into seamless 6-inch architectural gutters.',
    specStandard: 'SMACNA Architectural Sheet Metal Standard'
  }
];

export const Roof3DModelViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeMaterial, setActiveMaterial] = useState<RoofMaterialType>('metal');
  const [activeLighting, setActiveLighting] = useState<LightingModeType>('noon');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);

  // References to Three.js instances to avoid re-instantiation
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const roofMeshesRef = useRef<THREE.Mesh[]>([]);
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  // Orbit controls state
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const cameraRotationRef = useRef<{ theta: number; phi: number; radius: number }>({
    theta: Math.PI / 4,
    phi: Math.PI / 3.4,
    radius: 12
  });

  // Procedural Textures Generator for realistic roofing finishes
  const generateProceduralRoofTexture = (type: RoofMaterialType): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    if (type === 'shingles') {
      // Architectural dimensional layered shingle texture
      ctx.fillStyle = '#222831';
      ctx.fillRect(0, 0, 512, 512);
      ctx.fillStyle = '#1B2028';
      const rows = 16;
      const rowHeight = 512 / rows;
      for (let r = 0; r < rows; r++) {
        const offset = (r % 2) * 32;
        for (let c = -32; c < 512 + 32; c += 64) {
          ctx.fillStyle = (r + c) % 3 === 0 ? '#1E232B' : '#2A303C';
          ctx.fillRect(c + offset, r * rowHeight, 60, rowHeight - 2);
          ctx.fillStyle = '#0F1318';
          ctx.fillRect(c + offset, (r + 1) * rowHeight - 2, 64, 2);
        }
      }
    } else if (type === 'metal') {
      // Standing-seam vertical ribbed metal panels
      ctx.fillStyle = '#2D2620';
      ctx.fillRect(0, 0, 512, 512);
      const seamWidth = 64;
      for (let x = 0; x < 512; x += seamWidth) {
        // Dark seam shadow
        ctx.fillStyle = '#17130F';
        ctx.fillRect(x, 0, 4, 512);
        // Highlight rib line
        ctx.fillStyle = '#4D4036';
        ctx.fillRect(x + 4, 0, 2, 512);
        // Surface subtle brushing
        ctx.fillStyle = '#2A241E';
        ctx.fillRect(x + 6, 0, seamWidth - 6, 512);
      }
    } else if (type === 'tile') {
      // Spanish clay S-barrel curved tiles
      ctx.fillStyle = '#A34823';
      ctx.fillRect(0, 0, 512, 512);
      const tileWidth = 48;
      for (let x = 0; x < 512; x += tileWidth) {
        const grad = ctx.createLinearGradient(x, 0, x + tileWidth, 0);
        grad.addColorStop(0, '#5D2511');
        grad.addColorStop(0.3, '#C4572C');
        grad.addColorStop(0.7, '#A34823');
        grad.addColorStop(1, '#4A1D0D');
        ctx.fillStyle = grad;
        ctx.fillRect(x, 0, tileWidth, 512);
      }
    } else {
      // White TPO cool roof membrane
      ctx.fillStyle = '#E6EBF2';
      ctx.fillRect(0, 0, 512, 512);
      ctx.strokeStyle = '#CBD5E1';
      ctx.lineWidth = 3;
      for (let y = 0; y < 512; y += 128) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(512, y);
        ctx.stroke();
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 3);
    return texture;
  };

  // Update Roof Materials in real time
  const applyMaterialToRoof = useCallback((type: RoofMaterialType) => {
    if (roofMeshesRef.current.length === 0) return;

    const texture = generateProceduralRoofTexture(type);

    let color = new THREE.Color('#3E3228');
    let roughness = 0.35;
    let metalness = 0.65;

    if (type === 'shingles') {
      color = new THREE.Color('#2B323D');
      roughness = 0.9;
      metalness = 0.1;
    } else if (type === 'metal') {
      color = new THREE.Color('#44372C'); // Matte Dark Bronze
      roughness = 0.32;
      metalness = 0.72;
    } else if (type === 'tile') {
      color = new THREE.Color('#B65328'); // Terracotta Clay
      roughness = 0.75;
      metalness = 0.05;
    } else if (type === 'tpo') {
      color = new THREE.Color('#EDF2F7'); // White TPO Membrane
      roughness = 0.25;
      metalness = 0.05;
    }

    roofMeshesRef.current.forEach((mesh) => {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.map = texture;
      mat.color = color;
      mat.roughness = roughness;
      mat.metalness = metalness;
      mat.needsUpdate = true;
    });
  }, []);

  // Update Environment Lighting in real time
  const applyLightingMode = useCallback((mode: LightingModeType) => {
    if (!dirLightRef.current || !ambientLightRef.current || !hemiLightRef.current) return;

    if (mode === 'noon') {
      dirLightRef.current.color.set('#FFF8F0');
      dirLightRef.current.intensity = 2.4;
      dirLightRef.current.position.set(6, 12, 8);
      ambientLightRef.current.color.set('#9FB8D0');
      ambientLightRef.current.intensity = 1.0;
      hemiLightRef.current.color.set('#C0D8F0');
      hemiLightRef.current.groundColor.set('#3A4B58');
      hemiLightRef.current.intensity = 0.9;
    } else if (mode === 'sunset') {
      dirLightRef.current.color.set('#FF7A30');
      dirLightRef.current.intensity = 3.0;
      dirLightRef.current.position.set(12, 4, 8);
      ambientLightRef.current.color.set('#5A3050');
      ambientLightRef.current.intensity = 0.8;
      hemiLightRef.current.color.set('#FF9E54');
      hemiLightRef.current.groundColor.set('#1D1828');
      hemiLightRef.current.intensity = 0.7;
    } else if (mode === 'storm') {
      dirLightRef.current.color.set('#8EA0B8');
      dirLightRef.current.intensity = 1.4;
      dirLightRef.current.position.set(-4, 10, -6);
      ambientLightRef.current.color.set('#3A4656');
      ambientLightRef.current.intensity = 1.2;
      hemiLightRef.current.color.set('#6B7C92');
      hemiLightRef.current.groundColor.set('#1A222B');
      hemiLightRef.current.intensity = 0.8;
    }
  }, []);

  // Initialize Three.js Scene
  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 700;
    const height = container.clientHeight || 500;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    cameraRef.current = camera;

    // 3. Renderer with antialiasing and shadow map
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight('#9FB8D0', 1.0);
    ambientLightRef.current = ambientLight;
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight('#C0D8F0', '#3A4B58', 0.9);
    hemiLightRef.current = hemiLight;
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight('#FFF8F0', 2.4);
    dirLight.position.set(6, 12, 8);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 30;
    dirLight.shadow.camera.left = -6;
    dirLight.shadow.camera.right = 6;
    dirLight.shadow.camera.top = 6;
    dirLight.shadow.camera.bottom = -6;
    dirLightRef.current = dirLight;
    scene.add(dirLight);

    // 5. Construct 3D Architectural Model
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // Base House / Walls
    const wallGeo = new THREE.BoxGeometry(5.4, 2.2, 4.2);
    const wallMat = new THREE.MeshStandardMaterial({
      color: '#EFEFEA',
      roughness: 0.8,
      metalness: 0.05
    });
    const walls = new THREE.Mesh(wallGeo, wallMat);
    walls.position.y = 1.1;
    walls.castShadow = true;
    walls.receiveShadow = true;
    modelGroup.add(walls);

    // Foundation plinth
    const baseGeo = new THREE.BoxGeometry(5.8, 0.4, 4.6);
    const baseMat = new THREE.MeshStandardMaterial({ color: '#2B323D', roughness: 0.9 });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = 0.2;
    baseMesh.receiveShadow = true;
    modelGroup.add(baseMesh);

    // Modern Windows
    const winMat = new THREE.MeshStandardMaterial({ color: '#1B2A3A', roughness: 0.1, metalness: 0.9 });
    const win1 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.0, 0.1), winMat);
    win1.position.set(-1.4, 1.2, 2.15);
    modelGroup.add(win1);

    const win2 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.0, 0.1), winMat);
    win2.position.set(1.4, 1.2, 2.15);
    modelGroup.add(win2);

    // Entrance Portico Box
    const porticoGeo = new THREE.BoxGeometry(1.4, 2.0, 1.4);
    const portico = new THREE.Mesh(porticoGeo, wallMat);
    portico.position.set(0, 1.0, 2.5);
    portico.castShadow = true;
    portico.receiveShadow = true;
    modelGroup.add(portico);

    // Door
    const doorMat = new THREE.MeshStandardMaterial({ color: '#D97736', roughness: 0.4 });
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.6, 0.08), doorMat);
    door.position.set(0, 0.9, 3.22);
    modelGroup.add(door);

    // --- ROOF GEOMETRIES ---
    const roofMeshes: THREE.Mesh[] = [];

    // Main Roof Prism (Gable Roof)
    const roofLength = 6.2;
    const roofWidth = 5.0;
    const roofHeight = 1.9;
    const roofY = 2.2;

    // Construct Pitch Roof Prism Geometry
    const prismShape = new THREE.Shape();
    prismShape.moveTo(-roofWidth / 2, 0);
    prismShape.lineTo(0, roofHeight);
    prismShape.lineTo(roofWidth / 2, 0);
    prismShape.closePath();

    const extrudeSettings = {
      depth: roofLength,
      bevelEnabled: false
    };

    const mainRoofGeo = new THREE.ExtrudeGeometry(prismShape, extrudeSettings);
    mainRoofGeo.center();

    const initialTexture = generateProceduralRoofTexture('metal');
    const mainRoofMat = new THREE.MeshStandardMaterial({
      map: initialTexture,
      color: '#44372C',
      roughness: 0.32,
      metalness: 0.72
    });

    const mainRoof = new THREE.Mesh(mainRoofGeo, mainRoofMat);
    mainRoof.rotation.y = Math.PI / 2;
    mainRoof.position.set(0, roofY + roofHeight / 2, 0);
    mainRoof.castShadow = true;
    mainRoof.receiveShadow = true;
    modelGroup.add(mainRoof);
    roofMeshes.push(mainRoof);

    // Cross-Gable / Front Entrance Dormer Roof
    const dormerWidth = 2.2;
    const dormerHeight = 1.2;
    const dormerLength = 2.2;

    const dormerShape = new THREE.Shape();
    dormerShape.moveTo(-dormerWidth / 2, 0);
    dormerShape.lineTo(0, dormerHeight);
    dormerShape.lineTo(dormerWidth / 2, 0);
    dormerShape.closePath();

    const dormerGeo = new THREE.ExtrudeGeometry(dormerShape, { depth: dormerLength, bevelEnabled: false });
    dormerGeo.center();

    const dormerRoof = new THREE.Mesh(dormerGeo, mainRoofMat.clone());
    dormerRoof.position.set(0, 2.5, 2.2);
    dormerRoof.castShadow = true;
    dormerRoof.receiveShadow = true;
    modelGroup.add(dormerRoof);
    roofMeshes.push(dormerRoof);

    // Continuous Ridge Cap Trim (Runs across apex)
    const ridgeCapGeo = new THREE.BoxGeometry(roofLength + 0.1, 0.12, 0.28);
    const ridgeCapMat = new THREE.MeshStandardMaterial({ color: '#D97736', roughness: 0.4, metalness: 0.6 });
    const ridgeCap = new THREE.Mesh(ridgeCapGeo, ridgeCapMat);
    ridgeCap.position.set(0, roofY + roofHeight + 0.05, 0);
    ridgeCap.castShadow = true;
    modelGroup.add(ridgeCap);

    // Chimney with Step Flashing Collar
    const chimGeo = new THREE.BoxGeometry(0.8, 2.2, 0.8);
    const chimMat = new THREE.MeshStandardMaterial({ color: '#8B3A2B', roughness: 0.9 });
    const chimney = new THREE.Mesh(chimGeo, chimMat);
    chimney.position.set(1.6, 3.4, -0.6);
    chimney.castShadow = true;
    modelGroup.add(chimney);

    // Step Flashing Band around Chimney
    const flashGeo = new THREE.BoxGeometry(0.88, 0.15, 0.88);
    const flashMat = new THREE.MeshStandardMaterial({ color: '#C0C6CE', roughness: 0.3, metalness: 0.85 });
    const flashing = new THREE.Mesh(flashGeo, flashMat);
    flashing.position.set(1.6, 2.95, -0.6);
    modelGroup.add(flashing);

    // Chimney Cap
    const chimCap = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.15, 1.0), baseMat);
    chimCap.position.set(1.6, 4.5, -0.6);
    modelGroup.add(chimCap);

    // Gutters along eaves
    const gutterMat = new THREE.MeshStandardMaterial({ color: '#1B2A3A', roughness: 0.3, metalness: 0.8 });
    const gutterLeft = new THREE.Mesh(new THREE.BoxGeometry(roofLength + 0.2, 0.15, 0.18), gutterMat);
    gutterLeft.position.set(0, 2.15, -roofWidth / 2 - 0.05);
    modelGroup.add(gutterLeft);

    const gutterRight = new THREE.Mesh(new THREE.BoxGeometry(roofLength + 0.2, 0.15, 0.18), gutterMat);
    gutterRight.position.set(0, 2.15, roofWidth / 2 + 0.05);
    modelGroup.add(gutterRight);

    // Ground plane (lawn / shadow receiver)
    const groundGeo = new THREE.CylinderGeometry(8, 8, 0.2, 32);
    const groundMat = new THREE.MeshStandardMaterial({ color: '#101B27', roughness: 0.95 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -0.1;
    ground.receiveShadow = true;
    modelGroup.add(ground);

    roofMeshesRef.current = roofMeshes;

    // Center model
    modelGroup.position.set(0, -1.0, 0);

    // 6. Camera Position helper
    const updateCameraPosition = () => {
      const { theta, phi, radius } = cameraRotationRef.current;
      camera.position.x = radius * Math.sin(phi) * Math.sin(theta);
      camera.position.y = radius * Math.cos(phi);
      camera.position.z = radius * Math.sin(phi) * Math.cos(theta);
      camera.lookAt(0, 1.8, 0);
    };
    updateCameraPosition();

    // 7. Render Loop
    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      if (autoRotate && !isDraggingRef.current && !selectedHotspot) {
        cameraRotationRef.current.theta += 0.0035;
        updateCameraPosition();
      }

      renderer.render(scene, camera);
    };
    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [autoRotate, selectedHotspot]);

  // Mouse & Touch Orbit Controls
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    setIsInteracting(true);
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !cameraRef.current) return;

    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    cameraRotationRef.current.theta -= deltaX * 0.007;
    cameraRotationRef.current.phi = Math.max(0.2, Math.min(Math.PI / 2.1, cameraRotationRef.current.phi - deltaY * 0.007));

    const { theta, phi, radius } = cameraRotationRef.current;
    cameraRef.current.position.x = radius * Math.sin(phi) * Math.sin(theta);
    cameraRef.current.position.y = radius * Math.cos(phi);
    cameraRef.current.position.z = radius * Math.sin(phi) * Math.cos(theta);
    cameraRef.current.lookAt(0, 1.8, 0);

    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setTimeout(() => setIsInteracting(false), 800);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (!cameraRef.current) return;
    const zoomDelta = e.deltaY * 0.008;
    cameraRotationRef.current.radius = Math.max(6, Math.min(18, cameraRotationRef.current.radius + zoomDelta));

    const { theta, phi, radius } = cameraRotationRef.current;
    cameraRef.current.position.x = radius * Math.sin(phi) * Math.sin(theta);
    cameraRef.current.position.y = radius * Math.cos(phi);
    cameraRef.current.position.z = radius * Math.sin(phi) * Math.cos(theta);
    cameraRef.current.lookAt(0, 1.8, 0);
  };

  // Touch Handlers for Mobile Orbit
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      setIsInteracting(true);
      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || !cameraRef.current || e.touches.length !== 1) return;

    const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
    const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

    cameraRotationRef.current.theta -= deltaX * 0.009;
    cameraRotationRef.current.phi = Math.max(0.2, Math.min(Math.PI / 2.1, cameraRotationRef.current.phi - deltaY * 0.009));

    const { theta, phi, radius } = cameraRotationRef.current;
    cameraRef.current.position.x = radius * Math.sin(phi) * Math.sin(theta);
    cameraRef.current.position.y = radius * Math.cos(phi);
    cameraRef.current.position.z = radius * Math.sin(phi) * Math.cos(theta);
    cameraRef.current.lookAt(0, 1.8, 0);

    previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  // Reset Camera View
  const handleResetCamera = () => {
    cameraRotationRef.current = {
      theta: Math.PI / 4,
      phi: Math.PI / 3.4,
      radius: 12
    };
    setSelectedHotspot(null);
    if (cameraRef.current) {
      const { theta, phi, radius } = cameraRotationRef.current;
      cameraRef.current.position.x = radius * Math.sin(phi) * Math.sin(theta);
      cameraRef.current.position.y = radius * Math.cos(phi);
      cameraRef.current.position.z = radius * Math.sin(phi) * Math.cos(theta);
      cameraRef.current.lookAt(0, 1.8, 0);
    }
  };

  // Click on a 3D structural hotspot pin
  const handleSelectHotspot = (hs: Hotspot) => {
    setSelectedHotspot(hs);
    setAutoRotate(false);
    if (!cameraRef.current) return;

    // Smoothly focus camera towards hotspot target
    cameraRotationRef.current.radius = 8;
    cameraRotationRef.current.theta = Math.atan2(hs.cameraTarget[0], hs.cameraTarget[2]);
    cameraRotationRef.current.phi = Math.PI / 3.8;

    const { theta, phi, radius } = cameraRotationRef.current;
    cameraRef.current.position.x = radius * Math.sin(phi) * Math.sin(theta);
    cameraRef.current.position.y = radius * Math.cos(phi);
    cameraRef.current.position.z = radius * Math.sin(phi) * Math.cos(theta);
    cameraRef.current.lookAt(hs.position[0], hs.position[1], hs.position[2]);
  };

  return (
    <section className="py-24 px-4 sm:px-6 bg-[#0B121C] text-white relative overflow-hidden border-t border-slate-800" id="3d-model">
      {/* Background Lighting Effects */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-3/4 h-80 bg-brand-copper/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-content mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-copper/15 border border-brand-copper/30 text-brand-copper text-xs font-bold uppercase tracking-widest mb-3">
              <Rotate3d className="w-3.5 h-3.5" />
              <span>Real-Time 3D WebGL Architectural Visualizer</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              360° Architectural Roof Model
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Drag to orbit around our interactive 3D estate model. Switch between architectural roof finishes, simulate lighting across different times of day, and click key structural junctions to inspect flashings and vents.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-700/80 rounded-xl p-2.5 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 font-bold text-white">
              <Sparkles className="w-3.5 h-3.5 text-brand-copper" />
              <span>Real-Time Shaders</span>
            </span>
            <span className="text-slate-500">•</span>
            <span>60 FPS WebGL</span>
            <span className="text-slate-500">•</span>
            <span>Interactive Hotspots</span>
          </div>
        </div>

        {/* 3D Canvas Box + Controls Shell */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Main 3D Viewport (8 Cols on Desktop) */}
          <div className="lg:col-span-8 relative min-h-[500px] sm:min-h-[580px] flex flex-col justify-between select-none">
            
            {/* Top Viewport Floating Controls */}
            <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
              {/* Lighting Mode Switcher */}
              <div className="flex items-center gap-1 bg-brand-navy/90 border border-slate-700/80 backdrop-blur-md rounded-xl p-1 pointer-events-auto shadow-lg">
                <button
                  type="button"
                  onClick={() => {
                    setActiveLighting('noon');
                    applyLightingMode('noon');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeLighting === 'noon' 
                      ? 'bg-amber-500 text-slate-950 shadow-md' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                  title="Daylight Sun Simulation"
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Noon</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveLighting('sunset');
                    applyLightingMode('sunset');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeLighting === 'sunset' 
                      ? 'bg-amber-600 text-white shadow-md' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                  title="Golden Hour Sunset Simulation"
                >
                  <Sunset className="w-3.5 h-3.5" />
                  <span>Sunset</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveLighting('storm');
                    applyLightingMode('storm');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeLighting === 'storm' 
                      ? 'bg-sky-600 text-white shadow-md' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                  title="Storm Diffused Sky Simulation"
                >
                  <CloudRain className="w-3.5 h-3.5" />
                  <span>Overcast</span>
                </button>
              </div>

              {/* Reset View & Orbit Toggle */}
              <div className="flex items-center gap-2 pointer-events-auto">
                <button
                  type="button"
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold backdrop-blur-md transition-all flex items-center gap-1.5 ${
                    autoRotate 
                      ? 'bg-brand-copper/20 border-brand-copper/60 text-brand-copper' 
                      : 'bg-brand-navy/80 border-slate-700 text-slate-300 hover:text-white'
                  }`}
                >
                  <Rotate3d className="w-3.5 h-3.5" />
                  <span>{autoRotate ? 'Orbit Active' : 'Orbit Paused'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetCamera}
                  className="p-2 rounded-xl bg-brand-navy/80 hover:bg-brand-navy border border-slate-700 text-slate-300 hover:text-white backdrop-blur-md transition-all shadow-md"
                  title="Reset Camera Angle"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Three.js Canvas Container */}
            <div 
              ref={mountRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUp}
              className="w-full h-full min-h-[500px] sm:min-h-[580px] cursor-grab active:cursor-grabbing outline-none"
            />

            {/* Bottom In-Canvas Helper Bar */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-[11px] text-slate-400 pointer-events-none">
              <span className="flex items-center gap-1.5 bg-brand-navy/80 px-3 py-1 rounded-full border border-slate-800 backdrop-blur-md">
                <Rotate3d className="w-3 h-3 text-brand-copper" />
                <span>Drag to Rotate • Scroll to Zoom</span>
              </span>

              {isInteracting && (
                <span className="bg-brand-copper/90 text-white font-bold px-2.5 py-0.5 rounded-full text-[10px] animate-fadeIn">
                  Orbiting...
                </span>
              )}
            </div>
          </div>

          {/* Right Control & Customization Sidebar (4 Cols on Desktop) */}
          <div className="lg:col-span-4 bg-brand-slate/90 border-t lg:border-t-0 lg:border-l border-slate-800 p-6 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* 1. Material Surface Switcher */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-copper flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Roofing Surface Material</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Real-Time</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveMaterial('metal');
                      applyMaterialToRoof('metal');
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      activeMaterial === 'metal'
                        ? 'bg-brand-navy border-brand-copper shadow-md ring-1 ring-brand-copper/60 text-white'
                        : 'bg-slate-900/60 border-slate-700/80 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-[#44372C] border border-amber-600/40 mb-1.5" />
                    <div className="font-extrabold text-xs">Standing Seam</div>
                    <div className="text-[10px] text-slate-400">24-Ga Dark Bronze</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveMaterial('shingles');
                      applyMaterialToRoof('shingles');
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      activeMaterial === 'shingles'
                        ? 'bg-brand-navy border-brand-copper shadow-md ring-1 ring-brand-copper/60 text-white'
                        : 'bg-slate-900/60 border-slate-700/80 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-[#2B323D] border border-slate-500/40 mb-1.5" />
                    <div className="font-extrabold text-xs">Charcoal Shingles</div>
                    <div className="text-[10px] text-slate-400">Class 4 Architectural</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveMaterial('tile');
                      applyMaterialToRoof('tile');
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      activeMaterial === 'tile'
                        ? 'bg-brand-navy border-brand-copper shadow-md ring-1 ring-brand-copper/60 text-white'
                        : 'bg-slate-900/60 border-slate-700/80 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-[#B65328] border border-orange-500/40 mb-1.5" />
                    <div className="font-extrabold text-xs">Spanish Barrel Tile</div>
                    <div className="text-[10px] text-slate-400">Terra-Cotta Clay</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveMaterial('tpo');
                      applyMaterialToRoof('tpo');
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      activeMaterial === 'tpo'
                        ? 'bg-brand-navy border-brand-copper shadow-md ring-1 ring-brand-copper/60 text-white'
                        : 'bg-slate-900/60 border-slate-700/80 hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-[#EDF2F7] border border-slate-300 mb-1.5" />
                    <div className="font-extrabold text-xs">Reflective TPO</div>
                    <div className="text-[10px] text-slate-400">Commercial Cool Roof</div>
                  </button>
                </div>
              </div>

              {/* 2. Interactive Structural Hotspots Selector */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-brand-copper" />
                    <span>3D Inspection Hotspots</span>
                  </span>
                  <span className="text-[10px] text-brand-copper font-bold">Click to Zoom</span>
                </div>

                <div className="space-y-2">
                  {HOTSPOTS.map((hs) => {
                    const isSelected = selectedHotspot?.id === hs.id;
                    return (
                      <button
                        key={hs.id}
                        type="button"
                        onClick={() => handleSelectHotspot(hs)}
                        className={`w-full text-left p-2.5 rounded-xl border transition-all text-xs flex items-center justify-between gap-2 ${
                          isSelected 
                            ? 'bg-brand-copper text-white border-brand-copper font-bold shadow-md' 
                            : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        <span className="truncate">{hs.name}</span>
                        <ArrowRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${isSelected ? 'translate-x-0.5' : 'opacity-40'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Selected Hotspot Details Box */}
              {selectedHotspot && (
                <div className="p-4 rounded-xl bg-slate-900/90 border border-brand-copper/50 animate-fadeIn">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-brand-copper mb-1">
                    <span>{selectedHotspot.category}</span>
                    <span className="text-green-400">Verified Spec</span>
                  </div>
                  <h4 className="font-bold text-sm text-white">{selectedHotspot.name}</h4>
                  <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">
                    {selectedHotspot.description}
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-slate-800 text-[10px] text-slate-400">
                    <strong className="text-slate-200">Engineering Standard:</strong> {selectedHotspot.specStandard}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Direct CTA */}
            <div className="mt-6 pt-5 border-t border-slate-800">
              <Link
                to="/request-estimate"
                className="w-full py-3 px-4 rounded-xl bg-brand-copper hover:bg-brand-copper-hover text-white font-extrabold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <span>Request Custom 3D Roof Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
