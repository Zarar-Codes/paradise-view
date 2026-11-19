import * as THREE from 'three';
import { ProceduralTextureSet } from './textures';

export interface BackyardMaterials {
  paver: THREE.MeshStandardMaterial;
  coping: THREE.MeshStandardMaterial;
  wood: THREE.MeshStandardMaterial;
  darkSteel: THREE.MeshStandardMaterial;
  stainlessSteel: THREE.MeshPhysicalMaterial;
  graniteCounter: THREE.MeshStandardMaterial;
  stoneWall: THREE.MeshStandardMaterial;
  lawn: THREE.MeshStandardMaterial;
  cushionFabric: THREE.MeshStandardMaterial;
  accentPillow: THREE.MeshStandardMaterial;
  warmLed: THREE.MeshStandardMaterial;
  emberGlow: THREE.MeshStandardMaterial;
  poolInterior: THREE.MeshStandardMaterial;
  poolWater: THREE.MeshPhysicalMaterial;
  waterfallCurtain: THREE.MeshPhysicalMaterial;
  contactShadow: THREE.MeshBasicMaterial;
  foliageDark: THREE.MeshStandardMaterial;
  foliageGrass: THREE.MeshStandardMaterial;
  waterTimeUniform: { value: number };
  dispose: () => void;
}

export function createBackyardMaterials(
  textures: ProceduralTextureSet,
  isSoftwareGl: boolean,
): BackyardMaterials {
  const waterTimeUniform = { value: 0 };

  const paver = new THREE.MeshStandardMaterial({
    map: textures.paverColor,
    bumpMap: textures.paverBump,
    bumpScale: 0.035,
    roughness: 0.82,
    metalness: 0.04,
  });

  const coping = new THREE.MeshStandardMaterial({
    color: 0xd8d3c9,
    bumpMap: textures.paverBump,
    bumpScale: 0.015,
    roughness: 0.62,
    metalness: 0.05,
  });

  const wood = new THREE.MeshStandardMaterial({
    map: textures.woodColor,
    bumpMap: textures.woodBump,
    bumpScale: 0.025,
    roughness: 0.72,
    metalness: 0.04,
  });

  const darkSteel = new THREE.MeshStandardMaterial({
    color: 0x1d1f21,
    roughness: 0.34,
    metalness: 0.82,
  });

  const stainlessSteel = new THREE.MeshPhysicalMaterial({
    color: 0xd8dde2,
    bumpMap: textures.brushedSteelBump,
    bumpScale: 0.008,
    roughness: 0.22,
    metalness: 0.94,
    clearcoat: 0.3,
  });

  const graniteCounter = new THREE.MeshStandardMaterial({
    color: 0x26282a,
    roughness: 0.24,
    metalness: 0.12,
  });

  const stoneWall = new THREE.MeshStandardMaterial({
    map: textures.stoneWallColor,
    bumpMap: textures.stoneWallBump,
    bumpScale: 0.06,
    roughness: 0.9,
    metalness: 0.02,
  });

  const lawn = new THREE.MeshStandardMaterial({
    map: textures.lawnColor,
    roughness: 0.94,
    metalness: 0.0,
  });

  const cushionFabric = new THREE.MeshStandardMaterial({
    color: 0xdcd7cd,
    roughness: 0.92,
    metalness: 0.0,
  });

  const accentPillow = new THREE.MeshStandardMaterial({
    color: 0x344b38,
    roughness: 0.88,
    metalness: 0.0,
  });

  const warmLed = new THREE.MeshStandardMaterial({
    color: 0xffdf9e,
    emissive: 0xffb84d,
    emissiveIntensity: 1.6,
    roughness: 0.3,
    metalness: 0.1,
  });

  const emberGlow = new THREE.MeshStandardMaterial({
    color: 0xff7b29,
    emissive: 0xff5a14,
    emissiveIntensity: 2.2,
    roughness: 0.6,
    metalness: 0.0,
  });

  const poolInterior = new THREE.MeshStandardMaterial({
    color: 0x185c6b,
    roughness: 0.35,
    metalness: 0.05,
  });

  const poolWater = new THREE.MeshPhysicalMaterial({
    color: 0x2899ad,
    roughness: 0.08,
    metalness: 0.06,
    transparent: true,
    opacity: isSoftwareGl ? 0.62 : 0.78,
    transmission: isSoftwareGl ? 0 : 0.48,
    ior: 1.33,
    thickness: 1.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06,
    depthWrite: false,
  });

  // Extend PBR pool water with subtle animated ripples via onBeforeCompile
  poolWater.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = waterTimeUniform;
    shader.vertexShader =
      `uniform float uTime;\n` +
      shader.vertexShader.replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
        float waveA = sin(position.x * 2.1 + uTime * 1.45) * 0.018;
        float waveB = cos(position.y * 2.6 - uTime * 1.15) * 0.014;
        transformed.z += waveA + waveB;`,
      );
  };

  const waterfallCurtain = new THREE.MeshPhysicalMaterial({
    color: 0x99e6f0,
    emissive: 0x226677,
    emissiveIntensity: 0.35,
    roughness: 0.1,
    metalness: 0.05,
    transparent: true,
    opacity: 0.56,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const contactShadow = new THREE.MeshBasicMaterial({
    map: textures.contactShadow,
    transparent: true,
    opacity: 0.42,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });

  const foliageDark = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.86,
    metalness: 0.0,
  });

  const foliageGrass = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.82,
    metalness: 0.0,
  });

  const all = [
    paver,
    coping,
    wood,
    darkSteel,
    stainlessSteel,
    graniteCounter,
    stoneWall,
    lawn,
    cushionFabric,
    accentPillow,
    warmLed,
    emberGlow,
    poolInterior,
    poolWater,
    waterfallCurtain,
    contactShadow,
    foliageDark,
    foliageGrass,
  ];

  return {
    paver,
    coping,
    wood,
    darkSteel,
    stainlessSteel,
    graniteCounter,
    stoneWall,
    lawn,
    cushionFabric,
    accentPillow,
    warmLed,
    emberGlow,
    poolInterior,
    poolWater,
    waterfallCurtain,
    contactShadow,
    foliageDark,
    foliageGrass,
    waterTimeUniform,
    dispose: () => {
      all.forEach((m) => m.dispose());
    },
  };
}

function addContactShadow(
  parent: THREE.Object3D,
  w: number,
  d: number,
  y: number,
  mat: THREE.MeshBasicMaterial,
  geos: THREE.BufferGeometry[],
) {
  const geo = new THREE.PlaneGeometry(w, d);
  geos.push(geo);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = y;
  mesh.renderOrder = 1;
  parent.add(mesh);
}

/**
 * Composite 10-part Architectural Cedar & Steel Pergola (pivoted bottom-center at y=0)
 */
export function buildPergolaGroup(
  mats: BackyardMaterials,
  geos: THREE.BufferGeometry[],
): THREE.Group {
  const group = new THREE.Group();
  const width = 5.4;
  const depth = 4.2;
  const height = 3.05;

  const postPositions: [number, number][] = [
    [-width / 2 + 0.16, -depth / 2 + 0.16],
    [width / 2 - 0.16, -depth / 2 + 0.16],
    [-width / 2 + 0.16, depth / 2 - 0.16],
    [width / 2 - 0.16, depth / 2 - 0.16],
  ];

  // 1. Footing plinths & steel base brackets
  const plinthGeo = new THREE.BoxGeometry(0.36, 0.14, 0.36);
  const bracketGeo = new THREE.BoxGeometry(0.26, 0.18, 0.26);
  const postGeo = new THREE.BoxGeometry(0.22, height - 0.14, 0.22);
  geos.push(plinthGeo, bracketGeo, postGeo);

  for (const [px, pz] of postPositions) {
    const plinth = new THREE.Mesh(plinthGeo, mats.coping);
    plinth.position.set(px, 0.07, pz);
    plinth.castShadow = true;
    plinth.receiveShadow = true;
    group.add(plinth);

    const bracket = new THREE.Mesh(bracketGeo, mats.darkSteel);
    bracket.position.set(px, 0.2, pz);
    bracket.castShadow = true;
    group.add(bracket);

    const post = new THREE.Mesh(postGeo, mats.wood);
    post.position.set(px, 0.14 + (height - 0.14) / 2, pz);
    post.castShadow = true;
    post.receiveShadow = true;
    group.add(post);
  }

  // 2. Perimeter fascia beams (front/back & left/right)
  const frontBeamGeo = new THREE.BoxGeometry(width + 0.3, 0.32, 0.18);
  const sideBeamGeo = new THREE.BoxGeometry(0.18, 0.32, depth + 0.2);
  const capTrimGeo = new THREE.BoxGeometry(width + 0.38, 0.05, depth + 0.28);
  geos.push(frontBeamGeo, sideBeamGeo, capTrimGeo);

  [-depth / 2 + 0.16, depth / 2 - 0.16].forEach((z) => {
    const beam = new THREE.Mesh(frontBeamGeo, mats.darkSteel);
    beam.position.set(0, height + 0.12, z);
    beam.castShadow = true;
    beam.receiveShadow = true;
    group.add(beam);
  });

  [-width / 2 + 0.16, width / 2 - 0.16].forEach((x) => {
    const beam = new THREE.Mesh(sideBeamGeo, mats.darkSteel);
    beam.position.set(x, height + 0.12, 0);
    beam.castShadow = true;
    beam.receiveShadow = true;
    group.add(beam);
  });

  // 3. 13 Louvered architectural timber slats
  const slatGeo = new THREE.BoxGeometry(0.08, 0.18, depth - 0.24);
  geos.push(slatGeo);
  const slatCount = 13;
  for (let i = 0; i < slatCount; i++) {
    const t = i / (slatCount - 1);
    const sx = -width / 2 + 0.42 + t * (width - 0.84);
    const slat = new THREE.Mesh(slatGeo, mats.wood);
    slat.position.set(sx, height + 0.14, 0);
    slat.castShadow = true;
    group.add(slat);
  }

  // 4. Warm recessed architectural LED under-beam strips
  const ledStripGeo = new THREE.BoxGeometry(width - 0.6, 0.035, 0.04);
  geos.push(ledStripGeo);
  [-depth / 2 + 0.28, depth / 2 - 0.28].forEach((z) => {
    const strip = new THREE.Mesh(ledStripGeo, mats.warmLed);
    strip.position.set(0, height - 0.04, z);
    group.add(strip);
  });

  // 5. Rear cedar privacy feature screen on one side
  const screenSlatGeo = new THREE.BoxGeometry(0.05, 0.12, depth - 0.5);
  geos.push(screenSlatGeo);
  for (let r = 0; r < 15; r++) {
    const s = new THREE.Mesh(screenSlatGeo, mats.wood);
    s.position.set(-width / 2 + 0.16, 0.28 + r * 0.17, 0);
    s.castShadow = true;
    s.receiveShadow = true;
    group.add(s);
  }

  return group;
}

/**
 * Composite 12-part Natural Stone Outdoor Kitchen & Built-in BBQ (pivoted bottom-center at y=0)
 */
export function buildOutdoorKitchenGroup(
  mats: BackyardMaterials,
  geos: THREE.BufferGeometry[],
): THREE.Group {
  const group = new THREE.Group();

  // 1. Natural stone masonry island base
  const baseGeo = new THREE.BoxGeometry(4.1, 0.92, 1.05);
  geos.push(baseGeo);
  const base = new THREE.Mesh(baseGeo, mats.stoneWall);
  base.position.set(0, 0.46, 0);
  base.castShadow = true;
  base.receiveShadow = true;
  group.add(base);

  // 2. Cantilevered granite dining bar countertop with overhang
  const counterShape = new THREE.Shape();
  counterShape.moveTo(-2.15, -0.62);
  counterShape.lineTo(2.15, -0.62);
  counterShape.lineTo(2.15, 0.78);
  counterShape.lineTo(-2.15, 0.78);
  counterShape.closePath();

  const counterGeo = new THREE.ExtrudeGeometry(counterShape, {
    depth: 0.07,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.015,
    bevelSegments: 2,
  });
  counterGeo.rotateX(Math.PI / 2);
  geos.push(counterGeo);
  const counter = new THREE.Mesh(counterGeo, mats.graniteCounter);
  counter.position.set(0, 1.005, 0);
  counter.castShadow = true;
  counter.receiveShadow = true;
  group.add(counter);

  // 3. Under-counter warm LED glow strip
  const ledGeo = new THREE.BoxGeometry(3.96, 0.025, 0.03);
  geos.push(ledGeo);
  const led = new THREE.Mesh(ledGeo, mats.warmLed);
  led.position.set(0, 0.91, 0.54);
  group.add(led);

  // 4. Built-in Stainless Steel BBQ Grill chassis + curved hood + handle + control knobs
  const grillBodyGeo = new THREE.BoxGeometry(1.12, 0.38, 0.62);
  const hoodGeo = new THREE.CylinderGeometry(0.28, 0.28, 1.1, 16, 1, false, 0, Math.PI);
  hoodGeo.rotateZ(Math.PI / 2);
  const handleGeo = new THREE.CylinderGeometry(0.014, 0.014, 0.88, 10);
  handleGeo.rotateZ(Math.PI / 2);
  const knobGeo = new THREE.CylinderGeometry(0.024, 0.024, 0.03, 12);
  knobGeo.rotateX(Math.PI / 2);
  geos.push(grillBodyGeo, hoodGeo, handleGeo, knobGeo);

  const grillBody = new THREE.Mesh(grillBodyGeo, mats.stainlessSteel);
  grillBody.position.set(-0.25, 0.88, -0.06);
  grillBody.castShadow = true;
  group.add(grillBody);

  const hood = new THREE.Mesh(hoodGeo, mats.stainlessSteel);
  hood.position.set(-0.25, 1.07, -0.14);
  hood.castShadow = true;
  group.add(hood);

  const handle = new THREE.Mesh(handleGeo, mats.darkSteel);
  handle.position.set(-0.25, 1.17, 0.18);
  group.add(handle);

  for (let k = 0; k < 5; k++) {
    const knob = new THREE.Mesh(knobGeo, mats.darkSteel);
    knob.position.set(-0.65 + k * 0.2, 0.86, 0.26);
    group.add(knob);
  }

  // 5. Under-counter stainless beverage fridge + access doors
  const doorGeo = new THREE.BoxGeometry(0.66, 0.62, 0.04);
  geos.push(doorGeo);
  const fridgeDoor = new THREE.Mesh(doorGeo, mats.stainlessSteel);
  fridgeDoor.position.set(-1.38, 0.45, -0.52);
  group.add(fridgeDoor);

  const storageDoor = new THREE.Mesh(doorGeo, mats.stainlessSteel);
  storageDoor.position.set(1.2, 0.45, -0.52);
  group.add(storageDoor);

  // 6. Prep sink basin & arched faucet (TubeGeometry)
  const sinkGeo = new THREE.BoxGeometry(0.56, 0.04, 0.44);
  const faucetCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0.26, 0),
    new THREE.Vector3(0, 0.34, 0.11),
    new THREE.Vector3(0, 0.24, 0.18),
  ]);
  const faucetGeo = new THREE.TubeGeometry(faucetCurve, 14, 0.015, 8, false);
  geos.push(sinkGeo, faucetGeo);

  const sink = new THREE.Mesh(sinkGeo, mats.stainlessSteel);
  sink.position.set(1.22, 1.005, -0.05);
  group.add(sink);

  const faucet = new THREE.Mesh(faucetGeo, mats.stainlessSteel);
  faucet.position.set(1.22, 1.0, -0.27);
  group.add(faucet);

  // 7. Three composite architectural bar stools on dining side
  const legGeo = new THREE.BoxGeometry(0.035, 0.66, 0.035);
  const seatGeo = new THREE.BoxGeometry(0.42, 0.07, 0.38);
  const backGeo = new THREE.BoxGeometry(0.42, 0.22, 0.06);
  geos.push(legGeo, seatGeo, backGeo);

  [-1.25, 0, 1.25].forEach((sx) => {
    const stool = new THREE.Group();
    stool.position.set(sx, 0, 1.02);

    [
      [-0.17, -0.15],
      [0.17, -0.15],
      [-0.17, 0.15],
      [0.17, 0.15],
    ].forEach(([lx, lz]) => {
      const leg = new THREE.Mesh(legGeo, mats.darkSteel);
      leg.position.set(lx, 0.33, lz);
      leg.castShadow = true;
      stool.add(leg);
    });

    const seat = new THREE.Mesh(seatGeo, mats.cushionFabric);
    seat.position.set(0, 0.69, 0);
    seat.castShadow = true;
    stool.add(seat);

    const back = new THREE.Mesh(backGeo, mats.cushionFabric);
    back.position.set(0, 0.82, 0.17);
    back.castShadow = true;
    stool.add(back);

    addContactShadow(stool, 0.72, 0.72, 0.015, mats.contactShadow, geos);
    group.add(stool);
  });

  // 8. Rear stacked stone backsplash wall with warm architectural shelf glow
  const backWallGeo = new THREE.BoxGeometry(4.4, 2.35, 0.42);
  const shelfGeo = new THREE.BoxGeometry(3.5, 0.07, 0.24);
  const shelfLedGeo = new THREE.BoxGeometry(3.4, 0.025, 0.03);
  geos.push(backWallGeo, shelfGeo, shelfLedGeo);

  const backWall = new THREE.Mesh(backWallGeo, mats.stoneWall);
  backWall.position.set(0, 1.175, -1.32);
  backWall.castShadow = true;
  backWall.receiveShadow = true;
  group.add(backWall);

  const shelf = new THREE.Mesh(shelfGeo, mats.darkSteel);
  shelf.position.set(0, 1.52, -1.02);
  shelf.castShadow = true;
  group.add(shelf);

  const shelfLed = new THREE.Mesh(shelfLedGeo, mats.warmLed);
  shelfLed.position.set(0, 1.47, -1.08);
  group.add(shelfLed);

  addContactShadow(group, 4.8, 2.1, 0.015, mats.contactShadow, geos);
  return group;
}

/**
 * Composite Swimming Pool, Natural Stone Coping & Illuminated Waterfall Feature Wall
 */
export function buildPoolAndWaterfallGroup(
  mats: BackyardMaterials,
  geos: THREE.BufferGeometry[],
): THREE.Group {
  const group = new THREE.Group();
  const pw = 6.4;
  const pd = 3.8;

  // 1. Recessed pool interior floor & surround walls (elevated basin sit flush on patio)
  const basinFloorGeo = new THREE.BoxGeometry(pw, 0.12, pd);
  geos.push(basinFloorGeo);
  const basinFloor = new THREE.Mesh(basinFloorGeo, mats.poolInterior);
  basinFloor.position.set(0, 0.06, 0);
  basinFloor.receiveShadow = true;
  group.add(basinFloor);

  // 2. Pool coping frame (4 beveled limestone coping curbs)
  const copingLongGeo = new THREE.BoxGeometry(pw + 0.88, 0.28, 0.44);
  const copingShortGeo = new THREE.BoxGeometry(0.44, 0.28, pd);
  geos.push(copingLongGeo, copingShortGeo);

  [-pd / 2 - 0.22, pd / 2 + 0.22].forEach((z) => {
    const c = new THREE.Mesh(copingLongGeo, mats.coping);
    c.position.set(0, 0.14, z);
    c.castShadow = true;
    c.receiveShadow = true;
    group.add(c);
  });

  [-pw / 2 - 0.22, pw / 2 + 0.22].forEach((x) => {
    const c = new THREE.Mesh(copingShortGeo, mats.coping);
    c.position.set(x, 0.14, 0);
    c.castShadow = true;
    c.receiveShadow = true;
    group.add(c);
  });

  // 3. Underwater entry bench / steps
  const stepGeo = new THREE.BoxGeometry(1.1, 0.14, 1.4);
  geos.push(stepGeo);
  const step = new THREE.Mesh(stepGeo, mats.coping);
  step.position.set(-pw / 2 + 0.56, 0.12, pd / 2 - 0.72);
  group.add(step);

  // 4. Animated PBR water surface
  const waterGeo = new THREE.PlaneGeometry(pw - 0.04, pd - 0.04, 36, 22);
  geos.push(waterGeo);
  const water = new THREE.Mesh(waterGeo, mats.poolWater);
  water.rotation.x = -Math.PI / 2;
  water.position.set(0, 0.24, 0);
  water.renderOrder = 2;
  group.add(water);

  // 5. Ledger-stone sheer-descent waterfall feature wall at back edge
  const wallGeo = new THREE.BoxGeometry(3.8, 1.42, 0.52);
  const wallCapGeo = new THREE.BoxGeometry(3.96, 0.09, 0.62);
  const spillwayGeo = new THREE.BoxGeometry(1.36, 0.06, 0.18);
  const spillwayLedGeo = new THREE.BoxGeometry(1.32, 0.03, 0.04);
  const curtainGeo = new THREE.PlaneGeometry(1.26, 0.88);
  geos.push(wallGeo, wallCapGeo, spillwayGeo, spillwayLedGeo, curtainGeo);

  const wall = new THREE.Mesh(wallGeo, mats.stoneWall);
  wall.position.set(0, 0.71, -pd / 2 - 0.42);
  wall.castShadow = true;
  wall.receiveShadow = true;
  group.add(wall);

  const wallCap = new THREE.Mesh(wallCapGeo, mats.coping);
  wallCap.position.set(0, 1.46, -pd / 2 - 0.42);
  wallCap.castShadow = true;
  group.add(wallCap);

  const spillway = new THREE.Mesh(spillwayGeo, mats.stainlessSteel);
  spillway.position.set(0, 1.05, -pd / 2 - 0.12);
  group.add(spillway);

  const spillwayLed = new THREE.Mesh(spillwayLedGeo, mats.warmLed);
  spillwayLed.position.set(0, 1.0, -pd / 2 - 0.14);
  group.add(spillwayLed);

  const curtain = new THREE.Mesh(curtainGeo, mats.waterfallCurtain);
  curtain.position.set(0, 0.62, -pd / 2 - 0.04);
  curtain.rotation.x = -0.1;
  curtain.renderOrder = 3;
  group.add(curtain);

  return group;
}

/**
 * Composite Fire Pit Hearth (LatheGeometry) & Architectural Lounge Seating
 */
export function buildFireLoungeGroup(
  mats: BackyardMaterials,
  geos: THREE.BufferGeometry[],
): THREE.Group {
  const group = new THREE.Group();

  // 1. Cast-concrete sculptural fire bowl via LatheGeometry
  const points = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.56, 0.0),
    new THREE.Vector2(0.68, 0.42),
    new THREE.Vector2(0.56, 0.45),
    new THREE.Vector2(0.46, 0.34),
    new THREE.Vector2(0.0, 0.34),
  ];
  const bowlGeo = new THREE.LatheGeometry(points, 28);
  const emberGeo = new THREE.CylinderGeometry(0.44, 0.38, 0.08, 20);
  geos.push(bowlGeo, emberGeo);

  const bowl = new THREE.Mesh(bowlGeo, mats.coping);
  bowl.castShadow = true;
  bowl.receiveShadow = true;
  group.add(bowl);

  const ember = new THREE.Mesh(emberGeo, mats.emberGlow);
  ember.position.y = 0.36;
  group.add(ember);

  addContactShadow(group, 1.75, 1.75, 0.015, mats.contactShadow, geos);

  // 2. Two composite architectural timber & linen lounge sofas flanking fire pit
  const frameGeo = new THREE.BoxGeometry(2.3, 0.24, 0.88);
  const seatGeo = new THREE.BoxGeometry(2.16, 0.16, 0.78);
  const backGeo = new THREE.BoxGeometry(2.16, 0.42, 0.18);
  const pillowGeo = new THREE.BoxGeometry(0.36, 0.32, 0.12);
  geos.push(frameGeo, seatGeo, backGeo, pillowGeo);

  const buildSofa = (x: number, z: number, rotY: number) => {
    const sofa = new THREE.Group();
    sofa.position.set(x, 0, z);
    sofa.rotation.y = rotY;

    const frame = new THREE.Mesh(frameGeo, mats.wood);
    frame.position.y = 0.12;
    frame.castShadow = true;
    frame.receiveShadow = true;
    sofa.add(frame);

    const seat = new THREE.Mesh(seatGeo, mats.cushionFabric);
    seat.position.set(0, 0.32, 0.03);
    seat.castShadow = true;
    sofa.add(seat);

    const back = new THREE.Mesh(backGeo, mats.cushionFabric);
    back.position.set(0, 0.56, -0.32);
    back.castShadow = true;
    sofa.add(back);

    [-0.78, 0.78].forEach((px) => {
      const p = new THREE.Mesh(pillowGeo, mats.accentPillow);
      p.position.set(px, 0.53, -0.16);
      p.rotation.y = px < 0 ? 0.22 : -0.22;
      p.castShadow = true;
      sofa.add(p);
    });

    addContactShadow(sofa, 2.55, 1.15, 0.014, mats.contactShadow, geos);
    return sofa;
  };

  group.add(buildSofa(0, -1.68, 0));
  group.add(buildSofa(-1.75, 0.15, Math.PI / 2));

  return group;
}

/**
 * Composite Terraced Armour-Stone Retaining Wall, Raised Planter & Floating Limestone Steps
 */
export function buildRetainingWallGroup(
  mats: BackyardMaterials,
  geos: THREE.BufferGeometry[],
): THREE.Group {
  const group = new THREE.Group();

  const wallLongGeo = new THREE.BoxGeometry(10.8, 0.72, 0.56);
  const capLongGeo = new THREE.BoxGeometry(11.0, 0.08, 0.68);
  const treadGeo = new THREE.BoxGeometry(2.4, 0.14, 0.48);
  const stepLedGeo = new THREE.BoxGeometry(2.15, 0.024, 0.025);
  geos.push(wallLongGeo, capLongGeo, treadGeo, stepLedGeo);

  const leftWall = new THREE.Mesh(wallLongGeo, mats.stoneWall);
  leftWall.position.set(-4.6, 0.36, -6.2);
  leftWall.castShadow = true;
  leftWall.receiveShadow = true;
  group.add(leftWall);

  const leftCap = new THREE.Mesh(capLongGeo, mats.coping);
  leftCap.position.set(-4.6, 0.76, -6.2);
  leftCap.castShadow = true;
  group.add(leftCap);

  // Floating architectural limestone stairs (4 risers)
  for (let i = 0; i < 4; i++) {
    const tread = new THREE.Mesh(treadGeo, mats.coping);
    tread.position.set(2.4, 0.12 + i * 0.18, -5.1 - i * 0.46);
    tread.castShadow = true;
    tread.receiveShadow = true;
    group.add(tread);

    const sLed = new THREE.Mesh(stepLedGeo, mats.warmLed);
    sLed.position.set(2.4, 0.04 + i * 0.18, -4.88 - i * 0.46);
    group.add(sLed);
  }

  // Upper garden terrace bed behind retaining wall
  const upperSoilGeo = new THREE.BoxGeometry(11.2, 0.68, 2.8);
  geos.push(upperSoilGeo);
  const upperBed = new THREE.Mesh(upperSoilGeo, mats.lawn);
  upperBed.position.set(-4.4, 0.34, -7.8);
  upperBed.receiveShadow = true;
  group.add(upperBed);

  return group;
}

/**
 * Instanced Sculpted Conifers, Boxwoods, Ornamental Grasses & Perimeter Horizontal Cedar Fence
 */
export function buildLandscapingInstanced(
  mats: BackyardMaterials,
  geos: THREE.BufferGeometry[],
): THREE.Group {
  const group = new THREE.Group();

  // 1. Horizontal cedar privacy fence perimeter along back & left edge
  const fencePostGeo = new THREE.BoxGeometry(0.14, 2.2, 0.14);
  const fencePanelGeo = new THREE.BoxGeometry(2.4, 1.95, 0.08);
  geos.push(fencePostGeo, fencePanelGeo);

  for (let i = 0; i < 8; i++) {
    const x = -9.6 + i * 2.55;
    const post = new THREE.Mesh(fencePostGeo, mats.darkSteel);
    post.position.set(x, 1.1, -9.2);
    post.castShadow = true;
    group.add(post);

    if (i < 7) {
      const panel = new THREE.Mesh(fencePanelGeo, mats.wood);
      panel.position.set(x + 1.275, 1.08, -9.2);
      panel.castShadow = true;
      panel.receiveShadow = true;
      group.add(panel);
    }
  }

  for (let i = 0; i < 6; i++) {
    const z = -9.2 + i * 2.55;
    const post = new THREE.Mesh(fencePostGeo, mats.darkSteel);
    post.position.set(-9.6, 1.1, z);
    post.castShadow = true;
    group.add(post);

    if (i < 5) {
      const panel = new THREE.Mesh(fencePanelGeo, mats.wood);
      panel.rotation.y = Math.PI / 2;
      panel.position.set(-9.6, 1.08, z + 1.275);
      panel.castShadow = true;
      panel.receiveShadow = true;
      group.add(panel);
    }
  }

  // 2. InstancedMesh sculpted boxwoods & ornamental shrubs (36 instances)
  const shrubGeo = new THREE.IcosahedronGeometry(0.46, 2);
  shrubGeo.translate(0, 0.36, 0); // bottom-center pivot
  geos.push(shrubGeo);

  const shrubPositions: [number, number, number, number][] = [
    // Along retaining wall upper bed
    [-8.6, 0.68, -7.2, 1.15],
    [-7.4, 0.68, -7.4, 0.92],
    [-6.1, 0.68, -7.1, 1.08],
    [-4.8, 0.68, -7.3, 0.95],
    [-3.4, 0.68, -7.2, 1.12],
    [-2.0, 0.68, -7.3, 0.88],
    [-0.6, 0.68, -7.1, 1.05],
    // Along pool waterfall privacy hedge
    [4.4, 0.0, -7.4, 1.45],
    [5.6, 0.0, -7.5, 1.32],
    [6.8, 0.0, -7.4, 1.5],
    [8.0, 0.0, -7.3, 1.38],
    // Foreground border beds
    [-8.4, 0.0, -3.4, 1.02],
    [-8.5, 0.0, -1.6, 0.88],
    [-8.4, 0.0, 0.4, 1.1],
    [-8.3, 0.0, 2.4, 0.94],
    [-7.8, 0.0, 4.4, 1.05],
    [8.6, 0.0, -4.6, 1.12],
    [8.8, 0.0, -2.5, 0.95],
    [8.7, 0.0, -0.4, 1.18],
    [8.6, 0.0, 1.8, 0.92],
    [8.2, 0.0, 4.0, 1.08],
    // Accent clusters near steps
    [0.6, 0.0, -5.5, 0.82],
    [4.1, 0.0, -5.6, 0.85],
    [-5.6, 0.0, 5.2, 0.96],
    [-3.8, 0.0, 5.5, 0.84],
    [5.8, 0.0, 5.1, 0.92],
  ];

  const shrubInst = new THREE.InstancedMesh(shrubGeo, mats.foliageDark, shrubPositions.length);
  shrubInst.castShadow = true;
  shrubInst.receiveShadow = true;

  const dummy = new THREE.Object3D();
  const color = new THREE.Color();
  const paletteHexes = [0x2f4d32, 0x3b5d3a, 0x264129, 0x45683f];

  shrubPositions.forEach(([x, y, z, s], idx) => {
    dummy.position.set(x, y, z);
    const sx = s * (0.9 + ((idx * 17) % 10) * 0.022);
    const sy = s * (0.82 + ((idx * 13) % 10) * 0.025);
    const sz = s * (0.9 + ((idx * 7) % 10) * 0.02);
    dummy.scale.set(sx, sy, sz);
    dummy.rotation.y = idx * 0.7;
    dummy.updateMatrix();
    shrubInst.setMatrixAt(idx, dummy.matrix);
    color.setHex(paletteHexes[idx % paletteHexes.length]);
    shrubInst.setColorAt(idx, color);
  });
  shrubInst.instanceMatrix.needsUpdate = true;
  if (shrubInst.instanceColor) shrubInst.instanceColor.needsUpdate = true;
  shrubInst.computeBoundingSphere();
  group.add(shrubInst);

  // 3. InstancedMesh Architectural Columnar Cedars (22 privacy trees along back/sides)
  const cedarGeo = new THREE.ConeGeometry(0.55, 2.75, 9);
  cedarGeo.translate(0, 1.375, 0); // bottom-center pivot
  geos.push(cedarGeo);

  const cedarPositions: [number, number, number, number][] = [];
  for (let i = 0; i < 12; i++) {
    cedarPositions.push([-8.5 + i * 1.55, 0.0, -8.45, 0.92 + (i % 3) * 0.14]);
  }
  for (let i = 0; i < 10; i++) {
    cedarPositions.push([-8.85, 0.0, -7.2 + i * 1.35, 0.88 + (i % 4) * 0.1]);
  }

  const cedarInst = new THREE.InstancedMesh(cedarGeo, mats.foliageGrass, cedarPositions.length);
  cedarInst.castShadow = true;
  cedarInst.receiveShadow = true;

  cedarPositions.forEach(([x, y, z, s], idx) => {
    dummy.position.set(x, y, z);
    dummy.scale.set(s * 0.92, s * 1.05, s * 0.92);
    dummy.rotation.y = idx * 0.5;
    dummy.updateMatrix();
    cedarInst.setMatrixAt(idx, dummy.matrix);
    color.setHex(idx % 2 === 0 ? 0x243f27 : 0x2f5032);
    cedarInst.setColorAt(idx, color);
  });
  cedarInst.instanceMatrix.needsUpdate = true;
  if (cedarInst.instanceColor) cedarInst.instanceColor.needsUpdate = true;
  cedarInst.computeBoundingSphere();
  group.add(cedarInst);

  return group;
}
