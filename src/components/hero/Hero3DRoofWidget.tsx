import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Rotate3d, Sparkles, Layers, ShieldCheck } from 'lucide-react';

export type HeroRoofMaterial = 'metal' | 'shingles' | 'tile' | 'tpo';

export const Hero3DRoofWidget: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeMaterial, setActiveMaterial] = useState<HeroRoofMaterial>('metal');

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const roofMeshesRef = useRef<THREE.Mesh[]>([]);
  const animFrameRef = useRef<number | null>(null);

  const isDraggingRef = useRef<boolean>(false);
  const prevMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotationRef = useRef<{ theta: number; phi: number }>({
    theta: Math.PI / 4,
    phi: Math.PI / 3.2
  });

  // Generate procedural texture for realistic finishes
  const createTexture = (mat: HeroRoofMaterial): THREE.CanvasTexture => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;

    if (mat === 'metal') {
      ctx.fillStyle = '#4A3B30';
      ctx.fillRect(0, 0, 256, 256);
      for (let x = 0; x < 256; x += 32) {
        ctx.fillStyle = '#221914';
        ctx.fillRect(x, 0, 3, 256);
        ctx.fillStyle = '#8C725E';
        ctx.fillRect(x + 3, 0, 2, 256);
      }
    } else if (mat === 'shingles') {
      ctx.fillStyle = '#2A323D';
      ctx.fillRect(0, 0, 256, 256);
      for (let y = 0; y < 256; y += 16) {
        ctx.fillStyle = '#161B22';
        ctx.fillRect(0, y + 14, 256, 2);
        for (let x = 0; x < 256; x += 32) {
          ctx.fillStyle = (x + y) % 3 === 0 ? '#384250' : '#28303B';
          ctx.fillRect(x + (y % 32 === 0 ? 0 : 16), y, 30, 14);
        }
      }
    } else if (mat === 'tile') {
      ctx.fillStyle = '#B44C20';
      ctx.fillRect(0, 0, 256, 256);
      for (let x = 0; x < 256; x += 24) {
        const grad = ctx.createLinearGradient(x, 0, x + 24, 0);
        grad.addColorStop(0, '#662711');
        grad.addColorStop(0.35, '#CE5E2D');
        grad.addColorStop(1, '#57200D');
        ctx.fillStyle = grad;
        ctx.fillRect(x, 0, 24, 256);
      }
    } else {
      ctx.fillStyle = '#F0F4F8';
      ctx.fillRect(0, 0, 256, 256);
      ctx.strokeStyle = '#CBD5E1';
      ctx.lineWidth = 2;
      for (let y = 0; y < 256; y += 64) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(256, y);
        ctx.stroke();
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(3, 3);
    return tex;
  };

  const updateMaterial = (mat: HeroRoofMaterial) => {
    setActiveMaterial(mat);
    if (roofMeshesRef.current.length === 0) return;

    const texture = createTexture(mat);
    let color = new THREE.Color('#3E3228');
    let roughness = 0.35;
    let metalness = 0.65;

    if (mat === 'metal') {
      color = new THREE.Color('#725D4C');
      roughness = 0.3;
      metalness = 0.68;
    } else if (mat === 'shingles') {
      color = new THREE.Color('#38414E');
      roughness = 0.85;
      metalness = 0.12;
    } else if (mat === 'tile') {
      color = new THREE.Color('#C95828');
      roughness = 0.68;
      metalness = 0.06;
    } else if (mat === 'tpo') {
      color = new THREE.Color('#F2F6FA');
      roughness = 0.22;
      metalness = 0.05;
    }

    roofMeshesRef.current.forEach((mesh) => {
      const standardMat = mesh.material as THREE.MeshStandardMaterial;
      standardMat.map = texture;
      standardMat.color = color;
      standardMat.roughness = roughness;
      standardMat.metalness = metalness;
      standardMat.needsUpdate = true;
    });
  };

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 460;
    const height = container.clientHeight || 420;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Ambient Lighting
    const ambLight = new THREE.AmbientLight('#B0C8E0', 1.3);
    scene.add(ambLight);

    const hemiLight = new THREE.HemisphereLight('#E2EDF8', '#344250', 1.0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight('#FFF5E6', 2.8);
    dirLight.position.set(6, 12, 8);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight('#A0C4E8', 1.5);
    fillLight.position.set(-6, 8, -6);
    scene.add(fillLight);

    // Model Group
    const houseGroup = new THREE.Group();
    scene.add(houseGroup);

    // Main House Walls
    const wallGeo = new THREE.BoxGeometry(4.8, 1.8, 3.6);
    const wallMat = new THREE.MeshStandardMaterial({ color: '#EBEAE5', roughness: 0.85 });
    const walls = new THREE.Mesh(wallGeo, wallMat);
    walls.position.y = 0.9;
    walls.castShadow = true;
    walls.receiveShadow = true;
    houseGroup.add(walls);

    // Modern Windows
    const winMat = new THREE.MeshStandardMaterial({ color: '#1B2A3A', roughness: 0.1, metalness: 0.9 });
    const winLeft = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.8, 0.08), winMat);
    winLeft.position.set(-1.2, 1.0, 1.84);
    houseGroup.add(winLeft);

    const winRight = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.8, 0.08), winMat);
    winRight.position.set(1.2, 1.0, 1.84);
    houseGroup.add(winRight);

    // Front Portico
    const portico = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.6, 1.2), wallMat);
    portico.position.set(0, 0.8, 2.0);
    portico.castShadow = true;
    houseGroup.add(portico);

    const doorMat = new THREE.MeshStandardMaterial({ color: '#D97736', roughness: 0.35 });
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.3, 0.05), doorMat);
    door.position.set(0, 0.7, 2.62);
    houseGroup.add(door);

    // --- ROOF GEOMETRIES ---
    const roofMeshes: THREE.Mesh[] = [];

    // Main Gable Roof
    const roofLength = 5.4;
    const roofWidth = 4.4;
    const roofHeight = 1.6;
    const roofY = 1.8;

    const prismShape = new THREE.Shape();
    prismShape.moveTo(-roofWidth / 2, 0);
    prismShape.lineTo(0, roofHeight);
    prismShape.lineTo(roofWidth / 2, 0);
    prismShape.closePath();

    const mainRoofGeo = new THREE.ExtrudeGeometry(prismShape, { depth: roofLength, bevelEnabled: false });
    mainRoofGeo.center();

    const initialTex = createTexture('metal');
    const roofMat = new THREE.MeshStandardMaterial({
      map: initialTex,
      color: '#46382D',
      roughness: 0.32,
      metalness: 0.72
    });

    const mainRoof = new THREE.Mesh(mainRoofGeo, roofMat);
    mainRoof.rotation.y = Math.PI / 2;
    mainRoof.position.set(0, roofY + roofHeight / 2, 0);
    mainRoof.castShadow = true;
    mainRoof.receiveShadow = true;
    houseGroup.add(mainRoof);
    roofMeshes.push(mainRoof);

    // Front Cross-Gable Dormer
    const dormerShape = new THREE.Shape();
    dormerShape.moveTo(-1.0, 0);
    dormerShape.lineTo(0, 0.9);
    dormerShape.lineTo(1.0, 0);
    dormerShape.closePath();

    const dormerGeo = new THREE.ExtrudeGeometry(dormerShape, { depth: 1.6, bevelEnabled: false });
    dormerGeo.center();

    const dormer = new THREE.Mesh(dormerGeo, roofMat.clone());
    dormer.position.set(0, 2.0, 1.8);
    dormer.castShadow = true;
    houseGroup.add(dormer);
    roofMeshes.push(dormer);

    // Copper Ridge Cap
    const ridgeCap = new THREE.Mesh(
      new THREE.BoxGeometry(roofLength + 0.1, 0.1, 0.22),
      new THREE.MeshStandardMaterial({ color: '#D97736', roughness: 0.4, metalness: 0.6 })
    );
    ridgeCap.position.set(0, roofY + roofHeight + 0.05, 0);
    ridgeCap.castShadow = true;
    houseGroup.add(ridgeCap);

    // Brick Chimney
    const chimney = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 1.8, 0.7),
      new THREE.MeshStandardMaterial({ color: '#8B3A2B', roughness: 0.9 })
    );
    chimney.position.set(1.4, 2.8, -0.5);
    chimney.castShadow = true;
    houseGroup.add(chimney);

    // Chimney Step Flashing Ring
    const flash = new THREE.Mesh(
      new THREE.BoxGeometry(0.78, 0.12, 0.78),
      new THREE.MeshStandardMaterial({ color: '#BDC4CE', roughness: 0.3, metalness: 0.85 })
    );
    flash.position.set(1.4, 2.38, -0.5);
    houseGroup.add(flash);

    roofMeshesRef.current = roofMeshes;

    houseGroup.position.set(0, -0.7, 0);

    // Initial Camera
    const updateCam = () => {
      const radius = 9.8;
      const { theta, phi } = rotationRef.current;
      camera.position.x = radius * Math.sin(phi) * Math.sin(theta);
      camera.position.y = radius * Math.cos(phi);
      camera.position.z = radius * Math.sin(phi) * Math.cos(theta);
      camera.lookAt(0, 1.3, 0);
    };
    updateCam();

    // Animation Loop
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      if (!isDraggingRef.current) {
        rotationRef.current.theta += 0.004;
        updateCam();
      }

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Mouse / Touch Drag Orbit Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    prevMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !cameraRef.current) return;
    const dx = e.clientX - prevMousePosRef.current.x;
    const dy = e.clientY - prevMousePosRef.current.y;

    rotationRef.current.theta -= dx * 0.008;
    rotationRef.current.phi = Math.max(0.3, Math.min(Math.PI / 2.2, rotationRef.current.phi - dy * 0.008));

    const radius = 9.8;
    const { theta, phi } = rotationRef.current;
    cameraRef.current.position.x = radius * Math.sin(phi) * Math.sin(theta);
    cameraRef.current.position.y = radius * Math.cos(phi);
    cameraRef.current.position.z = radius * Math.sin(phi) * Math.cos(theta);
    cameraRef.current.lookAt(0, 1.3, 0);

    prevMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      prevMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || !cameraRef.current || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - prevMousePosRef.current.x;
    const dy = e.touches[0].clientY - prevMousePosRef.current.y;

    rotationRef.current.theta -= dx * 0.01;
    rotationRef.current.phi = Math.max(0.3, Math.min(Math.PI / 2.2, rotationRef.current.phi - dy * 0.01));

    const radius = 9.8;
    const { theta, phi } = rotationRef.current;
    cameraRef.current.position.x = radius * Math.sin(phi) * Math.sin(theta);
    cameraRef.current.position.y = radius * Math.cos(phi);
    cameraRef.current.position.z = radius * Math.sin(phi) * Math.cos(theta);
    cameraRef.current.lookAt(0, 1.3, 0);

    prevMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  return (
    <div 
      className="relative w-full max-w-lg mx-auto select-none"
      onMouseLeave={() => {
        isDraggingRef.current = false;
      }}
    >
      {/* 3D Glassmorphic Container Card - Responsive padding & radius */}
      <div className="relative rounded-2xl sm:rounded-3xl bg-brand-slate/85 border border-slate-700/80 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl p-3.5 sm:p-5 overflow-hidden">
        
        {/* Top Header & Shaders Pill */}
        <div className="flex items-center justify-between gap-2 mb-2 sm:mb-2.5">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-brand-copper animate-ping" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white">
              Real-Time 3D Roof Model
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-mono font-bold bg-brand-copper/15 text-brand-copper border border-brand-copper/30 px-2 py-0.5 rounded-full shrink-0">
            <Rotate3d className="w-3 h-3" />
            <span>Interactive 360°</span>
          </span>
        </div>

        {/* 3D WebGL Canvas Viewport - touch-none prevents page scroll while orbiting */}
        <div 
          className="relative aspect-[4/3] w-full rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#101924] to-[#0A1017] border border-slate-800/80 overflow-hidden cursor-grab active:cursor-grabbing touch-none"
          style={{ touchAction: 'none' }}
        >
          <div
            ref={mountRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
            className="w-full h-full"
          />

          {/* Floating Micro-Badges Top Left */}
          <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 pointer-events-none flex flex-col gap-1 sm:gap-1.5">
            <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg bg-brand-navy/90 border border-slate-700/80 backdrop-blur-md text-[9px] sm:text-[10px] font-bold text-slate-200 shadow-md">
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-brand-copper" />
              <span>Real-Time Shaders</span>
            </div>
            <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg bg-brand-navy/90 border border-slate-700/80 backdrop-blur-md text-[9px] sm:text-[10px] font-bold text-green-400 shadow-md">
              <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span>Class 4 Impact</span>
            </div>
          </div>

          {/* Drag / Touch Helper Hint */}
          <div className="absolute bottom-2.5 sm:bottom-3 inset-x-0 flex justify-center pointer-events-none">
            <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-brand-navy/85 border border-slate-700/80 backdrop-blur-md text-[9px] sm:text-[10px] text-slate-300 font-semibold shadow">
              ← Drag / Swipe to Orbit →
            </span>
          </div>
        </div>

        {/* Real-Time Material Switcher Tabs */}
        <div className="mt-3 sm:mt-3.5 pt-2.5 sm:pt-3 border-t border-slate-800">
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            <span className="flex items-center gap-1 sm:gap-1.5 text-brand-copper">
              <Layers className="w-3 h-3" />
              <span>Switch Roof Finish</span>
            </span>
            <span className="text-[9px] sm:text-[10px] text-slate-400">Click to Preview</span>
          </div>

          <div className="grid grid-cols-4 gap-1 sm:gap-1.5">
            <button
              type="button"
              onClick={() => updateMaterial('metal')}
              className={`py-1.5 px-0.5 sm:px-1 rounded-lg border text-center transition-all ${
                activeMaterial === 'metal'
                  ? 'bg-brand-copper text-white border-brand-copper font-bold shadow-md'
                  : 'bg-slate-900/60 border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#46382D] border border-amber-500 mx-auto mb-1" />
              <span className="text-[9px] sm:text-[10px] block truncate font-medium">Metal</span>
            </button>

            <button
              type="button"
              onClick={() => updateMaterial('shingles')}
              className={`py-1.5 px-0.5 sm:px-1 rounded-lg border text-center transition-all ${
                activeMaterial === 'shingles'
                  ? 'bg-brand-copper text-white border-brand-copper font-bold shadow-md'
                  : 'bg-slate-900/60 border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#2A313C] border border-slate-500 mx-auto mb-1" />
              <span className="text-[9px] sm:text-[10px] block truncate font-medium">Shingles</span>
            </button>

            <button
              type="button"
              onClick={() => updateMaterial('tile')}
              className={`py-1.5 px-0.5 sm:px-1 rounded-lg border text-center transition-all ${
                activeMaterial === 'tile'
                  ? 'bg-brand-copper text-white border-brand-copper font-bold shadow-md'
                  : 'bg-slate-900/60 border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#B65328] border border-orange-500 mx-auto mb-1" />
              <span className="text-[9px] sm:text-[10px] block truncate font-medium">Clay Tile</span>
            </button>

            <button
              type="button"
              onClick={() => updateMaterial('tpo')}
              className={`py-1.5 px-0.5 sm:px-1 rounded-lg border text-center transition-all ${
                activeMaterial === 'tpo'
                  ? 'bg-brand-copper text-white border-brand-copper font-bold shadow-md'
                  : 'bg-slate-900/60 border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#EDF2F7] border border-slate-300 mx-auto mb-1" />
              <span className="text-[9px] sm:text-[10px] block truncate font-medium">Cool TPO</span>
            </button>
          </div>
        </div>

        {/* Footer Deep-Dive Link */}
        <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400">
          <span>Explore 6-layer cross-section:</span>
          <a
            href="#anatomy"
            className="text-brand-copper hover:text-brand-copper-hover font-bold flex items-center gap-1"
          >
            <span>Envelope Anatomy →</span>
          </a>
        </div>
      </div>
    </div>
  );
};
