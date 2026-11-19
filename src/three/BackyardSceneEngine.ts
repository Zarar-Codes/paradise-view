import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {
  buildFireLoungeGroup,
  buildLandscapingInstanced,
  buildOutdoorKitchenGroup,
  buildPergolaGroup,
  buildPoolAndWaterfallGroup,
  buildRetainingWallGroup,
  createBackyardMaterials,
  BackyardMaterials,
} from './models';
import {
  createProceduralTextureSet,
  FinishPaletteId,
  ProceduralTextureSet,
} from './textures';

export type CameraPresetId = 'overview' | 'kitchen' | 'pool' | 'pergola';
export type LightingMoodId = 'golden' | 'twilight' | 'daylight';

interface CameraPreset {
  position: [number, number, number];
  target: [number, number, number];
}

const CAMERA_PRESETS: Record<CameraPresetId, CameraPreset> = {
  overview: { position: [14.5, 9.2, 14.8], target: [0.0, 0.8, -0.8] },
  kitchen: { position: [-0.8, 3.2, 2.2], target: [-4.6, 1.1, -3.5] },
  pool: { position: [8.8, 4.2, 5.4], target: [3.2, 0.6, -1.6] },
  pergola: { position: [1.6, 3.6, 8.2], target: [-3.4, 1.2, 1.6] },
};

const LIGHTING_CONFIGS: Record<
  LightingMoodId,
  {
    bgHex: number;
    sunColor: number;
    sunIntensity: number;
    sunPos: [number, number, number];
    hemiSky: number;
    hemiGround: number;
    hemiIntensity: number;
    accentIntensity: number;
    ledIntensity: number;
    exposure: number;
  }
> = {
  golden: {
    bgHex: 0x1a1c20,
    sunColor: 0xffcfa0,
    sunIntensity: 2.35,
    sunPos: [16, 11, 10],
    hemiSky: 0x7fa2c9,
    hemiGround: 0x2c2924,
    hemiIntensity: 0.72,
    accentIntensity: 1.4,
    ledIntensity: 1.7,
    exposure: 1.08,
  },
  twilight: {
    bgHex: 0x10141c,
    sunColor: 0x89a8d9,
    sunIntensity: 0.85,
    sunPos: [-12, 14, -8],
    hemiSky: 0x3b5882,
    hemiGround: 0x1a1c20,
    hemiIntensity: 0.55,
    accentIntensity: 3.4,
    ledIntensity: 2.9,
    exposure: 1.05,
  },
  daylight: {
    bgHex: 0x262b30,
    sunColor: 0xfff5e4,
    sunIntensity: 2.6,
    sunPos: [12, 20, 14],
    hemiSky: 0xb7d4f0,
    hemiGround: 0x45423a,
    hemiIntensity: 0.92,
    accentIntensity: 0.35,
    ledIntensity: 0.45,
    exposure: 1.05,
  },
};

// Scratch vectors pre-allocated outside render loop (zero GC)
const _desiredCamPos = new THREE.Vector3();
const _desiredTarget = new THREE.Vector3();

function detectSoftwareWebGL(): boolean {
  try {
    const probeCanvas = document.createElement('canvas');
    const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

export class BackyardSceneEngine {
  private container: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;
  private isSoftwareGl: boolean;

  private textures: ProceduralTextureSet;
  private materials: BackyardMaterials;
  private geometries: THREE.BufferGeometry[] = [];
  private envRenderTarget: THREE.WebGLRenderTarget;

  // Lights
  private sunLight: THREE.DirectionalLight;
  private hemiLight: THREE.HemisphereLight;
  private warmAccents: THREE.PointLight[] = [];

  // Layer groups for smooth exploded view
  private layers: { group: THREE.Group; baseY: number; explodeOffset: number }[] = [];
  private targetExplode = 0;
  private currentExplode = 0;

  // Camera transition state
  private cameraTransitionActive = false;
  private clock = new THREE.Clock();
  private frameId = 0;
  private disposed = false;
  private isVisible = true;
  private reducedMotion = false;

  private resizeObserver: ResizeObserver;
  private intersectionObserver: IntersectionObserver;
  private onContextLostHandler: (e: Event) => void;
  private onContextRestoredHandler: () => void;

  constructor(container: HTMLElement) {
    this.container = container;
    this.isSoftwareGl = detectSoftwareWebGL();
    this.reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const width = Math.max(container.clientWidth, 320);
    const height = Math.max(container.clientHeight, 320);

    // 1. Renderer setup per Three.js studio PBR pipeline
    this.renderer = new THREE.WebGLRenderer({
      antialias: !this.isSoftwareGl,
      powerPreference: 'high-performance',
    });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.08;
    this.renderer.setPixelRatio(this.isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(width, height);
    this.renderer.shadowMap.enabled = !this.isSoftwareGl;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.domElement.style.display = 'block';
    this.renderer.domElement.style.width = '100%';
    this.renderer.domElement.style.height = '100%';
    container.appendChild(this.renderer.domElement);

    // 2. Scene, horizon fog & RoomEnvironment studio IBL
    this.scene = new THREE.Scene();
    const initialMood = LIGHTING_CONFIGS.golden;
    this.scene.background = new THREE.Color(initialMood.bgHex);
    this.scene.fog = new THREE.FogExp2(initialMood.bgHex, 0.018);

    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    this.envRenderTarget = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    this.scene.environment = this.envRenderTarget.texture;
    pmremGenerator.dispose();

    // 3. Camera & OrbitControls
    this.camera = new THREE.PerspectiveCamera(42, width / height, 0.25, 160);
    const initialPreset = CAMERA_PRESETS.overview;
    this.camera.position.set(...initialPreset.position);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(...initialPreset.target);
    this.controls.enableDamping = !this.isSoftwareGl;
    this.controls.dampingFactor = 0.06;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.06;
    this.controls.minPolarAngle = 0.22;
    this.controls.minDistance = 5.5;
    this.controls.maxDistance = 28;
    this.controls.enablePan = true;
    this.controls.addEventListener('start', () => {
      // Immediately hand control to user on pointer drag
      this.cameraTransitionActive = false;
    });
    this.controls.update();

    // 4. Procedural Textures & Materials
    const maxAniso = this.renderer.capabilities.getMaxAnisotropy();
    this.textures = createProceduralTextureSet('limestone', maxAniso);
    this.materials = createBackyardMaterials(this.textures, this.isSoftwareGl);

    // 5. Balanced 3-Point Studio + Architectural Landscape Lighting Rig
    this.sunLight = new THREE.DirectionalLight(initialMood.sunColor, initialMood.sunIntensity);
    this.sunLight.position.set(...initialMood.sunPos);
    this.sunLight.castShadow = !this.isSoftwareGl;
    this.sunLight.shadow.mapSize.set(2048, 2048);
    const d = 16;
    this.sunLight.shadow.camera.left = -d;
    this.sunLight.shadow.camera.right = d;
    this.sunLight.shadow.camera.top = d;
    this.sunLight.shadow.camera.bottom = -d;
    this.sunLight.shadow.camera.near = 2;
    this.sunLight.shadow.camera.far = 48;
    this.sunLight.shadow.bias = -0.0005;
    this.sunLight.shadow.normalBias = 0.02;
    this.scene.add(this.sunLight);

    this.hemiLight = new THREE.HemisphereLight(
      initialMood.hemiSky,
      initialMood.hemiGround,
      initialMood.hemiIntensity,
    );
    this.scene.add(this.hemiLight);

    // Warm architectural landscape accent lights (fire pit, kitchen, pergola, pool waterfall)
    const accentSpecs: [number, number, number, number][] = [
      [-3.4, 0.9, 1.6, 0xff8a3d], // fire pit glow
      [-4.6, 1.6, -3.2, 0xffd28a], // outdoor kitchen glow
      [3.2, 1.3, -3.5, 0x7de0f5], // waterfall & pool glow
    ];
    for (const [ax, ay, az, hex] of accentSpecs) {
      const pt = new THREE.PointLight(hex, initialMood.accentIntensity, 10, 1.8);
      pt.position.set(ax, ay, az);
      this.scene.add(pt);
      this.warmAccents.push(pt);
    }

    // 6. Assemble Layered Architectural Backyard Model
    this.buildArchitecturalScene();

    if (!this.isSoftwareGl) {
      this.renderer.compile(this.scene, this.camera);
    }

    // 7. Observers & Context Loss Recovery
    this.resizeObserver = new ResizeObserver(() => this.handleResize());
    this.resizeObserver.observe(this.container);

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        this.isVisible = Boolean(entry?.isIntersecting);
      },
      { threshold: 0.05 },
    );
    this.intersectionObserver.observe(this.container);

    this.onContextLostHandler = (event: Event) => {
      event.preventDefault();
      this.stopLoop();
    };
    this.onContextRestoredHandler = () => {
      this.startLoop();
    };
    this.renderer.domElement.addEventListener('webglcontextlost', this.onContextLostHandler);
    this.renderer.domElement.addEventListener('webglcontextrestored', this.onContextRestoredHandler);

    // Start loop
    this.startLoop();
  }

  private buildArchitecturalScene() {
    // Layer 0: Extended natural estate lawn & compacted gravel base foundation
    const baseGroup = new THREE.Group();
    const groundGeo = new THREE.PlaneGeometry(120, 120);
    const gravelBaseGeo = new THREE.BoxGeometry(16.8, 0.14, 13.4);
    this.geometries.push(groundGeo, gravelBaseGeo);

    const ground = new THREE.Mesh(groundGeo, this.materials.lawn);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.02;
    ground.receiveShadow = true;
    baseGroup.add(ground);

    const gravelMat = new THREE.MeshStandardMaterial({
      color: 0x3b3b38,
      roughness: 0.95,
      metalness: 0.0,
    });
    const gravel = new THREE.Mesh(gravelBaseGeo, gravelMat);
    gravel.position.set(0, 0.05, -0.4);
    gravel.receiveShadow = true;
    baseGroup.add(gravel);
    this.scene.add(baseGroup);
    this.layers.push({ group: baseGroup, baseY: 0, explodeOffset: 0 });

    // Layer 1: Interlocking Stone Patio Terrace & Retaining Wall / Floating Steps
    const hardscapeGroup = new THREE.Group();
    const patioMainGeo = new THREE.BoxGeometry(15.6, 0.14, 11.8);
    const patioBorderGeo = new THREE.BoxGeometry(16.0, 0.12, 12.2);
    this.geometries.push(patioMainGeo, patioBorderGeo);

    const patioBorder = new THREE.Mesh(patioBorderGeo, this.materials.coping);
    patioBorder.position.set(0, 0.14, -0.4);
    patioBorder.receiveShadow = true;
    hardscapeGroup.add(patioBorder);

    const patioMain = new THREE.Mesh(patioMainGeo, this.materials.paver);
    patioMain.position.set(0, 0.16, -0.4);
    patioMain.receiveShadow = true;
    hardscapeGroup.add(patioMain);

    const retainingWall = buildRetainingWallGroup(this.materials, this.geometries);
    retainingWall.position.y = 0.22;
    hardscapeGroup.add(retainingWall);

    // Architectural stepping pavers leading out onto lawn
    const stepStoneGeo = new THREE.BoxGeometry(1.4, 0.08, 0.62);
    this.geometries.push(stepStoneGeo);
    for (let i = 0; i < 4; i++) {
      const stone = new THREE.Mesh(stepStoneGeo, this.materials.coping);
      stone.position.set(-0.6, 0.04, 6.2 + i * 0.92);
      stone.receiveShadow = true;
      stone.castShadow = true;
      hardscapeGroup.add(stone);
    }

    this.scene.add(hardscapeGroup);
    this.layers.push({ group: hardscapeGroup, baseY: 0, explodeOffset: 1.05 });

    // Layer 2: Hero Structures (Pool + Waterfall, Outdoor Kitchen, Pergola, Fire Lounge)
    const structuresGroup = new THREE.Group();

    const poolGroup = buildPoolAndWaterfallGroup(this.materials, this.geometries);
    poolGroup.position.set(3.2, 0.23, -1.6);
    structuresGroup.add(poolGroup);

    const kitchenGroup = buildOutdoorKitchenGroup(this.materials, this.geometries);
    kitchenGroup.position.set(-4.6, 0.23, -3.3);
    structuresGroup.add(kitchenGroup);

    const pergolaGroup = buildPergolaGroup(this.materials, this.geometries);
    pergolaGroup.position.set(-3.4, 0.23, 1.7);
    structuresGroup.add(pergolaGroup);

    const fireLounge = buildFireLoungeGroup(this.materials, this.geometries);
    fireLounge.position.set(-3.2, 0.23, 1.85);
    structuresGroup.add(fireLounge);

    // Modern poolside loungers on right terrace
    const loungerFrameGeo = new THREE.BoxGeometry(0.76, 0.14, 1.92);
    const loungerPadGeo = new THREE.BoxGeometry(0.7, 0.08, 1.35);
    const loungerBackGeo = new THREE.BoxGeometry(0.7, 0.08, 0.56);
    this.geometries.push(loungerFrameGeo, loungerPadGeo, loungerBackGeo);

    [1.4, 2.75, 4.1].forEach((lx) => {
      const lounger = new THREE.Group();
      lounger.position.set(lx, 0.23, 2.55);

      const frame = new THREE.Mesh(loungerFrameGeo, this.materials.wood);
      frame.position.y = 0.14;
      frame.castShadow = true;
      lounger.add(frame);

      const pad = new THREE.Mesh(loungerPadGeo, this.materials.cushionFabric);
      pad.position.set(0, 0.25, -0.22);
      pad.castShadow = true;
      lounger.add(pad);

      const back = new THREE.Mesh(loungerBackGeo, this.materials.cushionFabric);
      back.position.set(0, 0.4, 0.64);
      back.rotation.x = -0.52;
      back.castShadow = true;
      lounger.add(back);

      structuresGroup.add(lounger);
    });

    this.scene.add(structuresGroup);
    this.layers.push({ group: structuresGroup, baseY: 0, explodeOffset: 2.35 });

    // Layer 3: Privacy Fencing & Instanced Botanical Planting
    const foliageGroup = buildLandscapingInstanced(this.materials, this.geometries);
    this.scene.add(foliageGroup);
    this.layers.push({ group: foliageGroup, baseY: 0, explodeOffset: 3.4 });
  }

  public setCameraPreset(presetId: CameraPresetId) {
    const preset = CAMERA_PRESETS[presetId];
    if (!preset) return;
    _desiredCamPos.set(...preset.position);
    _desiredTarget.set(...preset.target);
    this.cameraTransitionActive = true;
  }

  public setLightingMood(moodId: LightingMoodId) {
    const cfg = LIGHTING_CONFIGS[moodId];
    if (!cfg) return;
    this.scene.background = new THREE.Color(cfg.bgHex);
    if (this.scene.fog instanceof THREE.FogExp2) {
      this.scene.fog.color.setHex(cfg.bgHex);
    }
    this.sunLight.color.setHex(cfg.sunColor);
    this.sunLight.intensity = cfg.sunIntensity;
    this.sunLight.position.set(...cfg.sunPos);
    this.hemiLight.color.setHex(cfg.hemiSky);
    this.hemiLight.groundColor.setHex(cfg.hemiGround);
    this.hemiLight.intensity = cfg.hemiIntensity;
    this.warmAccents.forEach((pt) => {
      pt.intensity = cfg.accentIntensity;
    });
    this.materials.warmLed.emissiveIntensity = cfg.ledIntensity;
    this.renderer.toneMappingExposure = cfg.exposure;
  }

  public setPalette(paletteId: FinishPaletteId) {
    const maxAniso = this.renderer.capabilities.getMaxAnisotropy();
    const nextTextures = createProceduralTextureSet(paletteId, maxAniso);

    this.materials.paver.map = nextTextures.paverColor;
    this.materials.paver.bumpMap = nextTextures.paverBump;
    this.materials.paver.needsUpdate = true;

    this.materials.wood.map = nextTextures.woodColor;
    this.materials.wood.bumpMap = nextTextures.woodBump;
    this.materials.wood.needsUpdate = true;

    this.materials.stoneWall.map = nextTextures.stoneWallColor;
    this.materials.stoneWall.bumpMap = nextTextures.stoneWallBump;
    this.materials.stoneWall.needsUpdate = true;

    this.materials.coping.color.setHex(
      paletteId === 'charcoal' ? 0x676b70 : paletteId === 'travertine' ? 0xdfd3be : 0xd8d3c9,
    );

    const old = this.textures;
    this.textures = nextTextures;
    old.dispose();
  }

  public setExplodeAmount(amount: number) {
    this.targetExplode = THREE.MathUtils.clamp(amount, 0, 1);
  }

  private handleResize() {
    if (this.disposed) return;
    const width = Math.max(this.container.clientWidth, 320);
    const height = Math.max(this.container.clientHeight, 320);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private afterDraw(cb: () => void) {
    const gl = this.renderer.getContext() as WebGL2RenderingContext;
    if (typeof gl.fenceSync === 'function') {
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (this.disposed) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          this.frameId = window.setTimeout(poll, 6);
        } else {
          if (sync) gl.deleteSync(sync);
          this.frameId = window.setTimeout(cb, 80);
        }
      };
      this.frameId = window.setTimeout(poll, 6);
    } else {
      this.frameId = window.setTimeout(cb, 80);
    }
  }

  private tick = () => {
    if (this.disposed) return;

    const delta = Math.min(this.clock.getDelta(), 0.05);

    if (this.isVisible) {
      // 1. Animate pool water & warm fire embers
      if (!this.reducedMotion) {
        this.materials.waterTimeUniform.value += delta;
        const t = this.materials.waterTimeUniform.value;
        this.materials.emberGlow.emissiveIntensity = 1.9 + Math.sin(t * 4.5) * 0.35;
      }

      // 2. Smooth exponential damping for camera preset glides
      if (this.cameraTransitionActive) {
        const lambda = 5.2;
        const alpha = 1 - Math.exp(-lambda * delta);
        this.camera.position.lerp(_desiredCamPos, alpha);
        this.controls.target.lerp(_desiredTarget, alpha);
        if (
          this.camera.position.distanceToSquared(_desiredCamPos) < 0.002 &&
          this.controls.target.distanceToSquared(_desiredTarget) < 0.002
        ) {
          this.camera.position.copy(_desiredCamPos);
          this.controls.target.copy(_desiredTarget);
          this.cameraTransitionActive = false;
        }
      }

      // 3. Smooth exponential damping for architectural exploded view layers
      this.currentExplode = THREE.MathUtils.damp(this.currentExplode, this.targetExplode, 6.0, delta);
      for (const layer of this.layers) {
        layer.group.position.y = layer.baseY + layer.explodeOffset * this.currentExplode;
      }

      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    }

    if (this.isSoftwareGl) {
      this.afterDraw(this.tick);
    } else {
      this.frameId = requestAnimationFrame(this.tick);
    }
  };

  private startLoop() {
    this.stopLoop();
    this.clock.start();
    this.tick();
  }

  private stopLoop() {
    cancelAnimationFrame(this.frameId);
    clearTimeout(this.frameId);
  }

  public dispose() {
    this.disposed = true;
    this.stopLoop();
    this.resizeObserver.disconnect();
    this.intersectionObserver.disconnect();
    this.renderer.domElement.removeEventListener('webglcontextlost', this.onContextLostHandler);
    this.renderer.domElement.removeEventListener('webglcontextrestored', this.onContextRestoredHandler);
    this.controls.dispose();
    this.geometries.forEach((g) => g.dispose());
    this.materials.dispose();
    this.textures.dispose();
    this.envRenderTarget.dispose();
    this.renderer.dispose();
    if (this.renderer.domElement.parentNode === this.container) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}
