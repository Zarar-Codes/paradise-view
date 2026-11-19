import * as THREE from 'three';

export type FinishPaletteId = 'limestone' | 'charcoal' | 'travertine';

export interface PaletteSpec {
  id: FinishPaletteId;
  label: string;
  paverBase: string;
  paverAccent: string;
  paverJoint: string;
  woodBase: string;
  woodGrain: string;
  stoneWallBase: string;
  stoneWallDark: string;
  swatchStone: string;
  swatchWood: string;
}

export const PALETTES: Record<FinishPaletteId, PaletteSpec> = {
  limestone: {
    id: 'limestone',
    label: 'Limestone & Cedar',
    paverBase: '#CFCAC0',
    paverAccent: '#BFB9AD',
    paverJoint: '#6B6861',
    woodBase: '#7D4E30',
    woodGrain: '#56311A',
    stoneWallBase: '#8E887E',
    stoneWallDark: '#5A554D',
    swatchStone: '#CFCAC0',
    swatchWood: '#7D4E30',
  },
  charcoal: {
    id: 'charcoal',
    label: 'Charcoal Slate & Teak',
    paverBase: '#45484C',
    paverAccent: '#393C40',
    paverJoint: '#222427',
    woodBase: '#9C6D3F',
    woodGrain: '#6B4622',
    stoneWallBase: '#4E5156',
    stoneWallDark: '#2E3034',
    swatchStone: '#45484C',
    swatchWood: '#9C6D3F',
  },
  travertine: {
    id: 'travertine',
    label: 'Travertine & Walnut',
    paverBase: '#D9CBB5',
    paverAccent: '#C9B89C',
    paverJoint: '#7E705D',
    woodBase: '#4A3326',
    woodGrain: '#2B1B12',
    stoneWallBase: '#B59E80',
    stoneWallDark: '#7C674E',
    swatchStone: '#D9CBB5',
    swatchWood: '#4A3326',
  },
};

function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface ProceduralTextureSet {
  paverColor: THREE.CanvasTexture;
  paverBump: THREE.CanvasTexture;
  woodColor: THREE.CanvasTexture;
  woodBump: THREE.CanvasTexture;
  stoneWallColor: THREE.CanvasTexture;
  stoneWallBump: THREE.CanvasTexture;
  lawnColor: THREE.CanvasTexture;
  brushedSteelBump: THREE.CanvasTexture;
  contactShadow: THREE.CanvasTexture;
  dispose: () => void;
}

function finalizeTexture(
  canvas: HTMLCanvasElement,
  isColor: boolean,
  repeatX: number,
  repeatY: number,
  maxAnisotropy: number,
): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeatX, repeatY);
  tex.colorSpace = isColor ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  tex.anisotropy = Math.min(maxAnisotropy, 8);
  tex.needsUpdate = true;
  return tex;
}

export function createPaverCanvases(spec: PaletteSpec): {
  colorCanvas: HTMLCanvasElement;
  bumpCanvas: HTMLCanvasElement;
} {
  const size = 512;
  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = size;
  colorCanvas.height = size;
  const ctx = colorCanvas.getContext('2d')!;

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bCtx = bumpCanvas.getContext('2d')!;

  ctx.fillStyle = spec.paverJoint;
  ctx.fillRect(0, 0, size, size);

  bCtx.fillStyle = '#252525';
  bCtx.fillRect(0, 0, size, size);

  const rand = mulberry32(42);
  const rows = 4;
  const rowH = size / rows;
  const joint = 5;

  for (let r = 0; r < rows; r++) {
    const cols = r % 2 === 0 ? 2 : 3;
    const colW = size / cols;
    const offset = r % 2 === 1 ? colW * 0.35 : 0;

    for (let c = -1; c <= cols; c++) {
      const x = c * colW + offset;
      const y = r * rowH;
      const useAccent = rand() > 0.55;

      ctx.fillStyle = useAccent ? spec.paverAccent : spec.paverBase;
      ctx.fillRect(x + joint, y + joint, colW - joint * 2, rowH - joint * 2);

      // Subtle stone mineral speckle
      for (let s = 0; s < 140; s++) {
        const sx = x + joint + rand() * (colW - joint * 2);
        const sy = y + joint + rand() * (rowH - joint * 2);
        const shade = rand() > 0.5 ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
        ctx.fillStyle = shade;
        ctx.fillRect(sx, sy, 2 + rand() * 5, 2 + rand() * 3);
      }

      // Bump map stone face
      bCtx.fillStyle = useAccent ? '#C8C8C8' : '#DCDCDC';
      bCtx.fillRect(x + joint, y + joint, colW - joint * 2, rowH - joint * 2);
      for (let s = 0; s < 90; s++) {
        const sx = x + joint + rand() * (colW - joint * 2);
        const sy = y + joint + rand() * (rowH - joint * 2);
        bCtx.fillStyle = rand() > 0.5 ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.09)';
        bCtx.fillRect(sx, sy, 3 + rand() * 4, 2 + rand() * 4);
      }
    }
  }

  return { colorCanvas, bumpCanvas };
}

export function createWoodCanvases(spec: PaletteSpec): {
  colorCanvas: HTMLCanvasElement;
  bumpCanvas: HTMLCanvasElement;
} {
  const size = 512;
  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = size;
  colorCanvas.height = size;
  const ctx = colorCanvas.getContext('2d')!;

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bCtx = bumpCanvas.getContext('2d')!;

  ctx.fillStyle = spec.woodBase;
  ctx.fillRect(0, 0, size, size);
  bCtx.fillStyle = '#B8B8B8';
  bCtx.fillRect(0, 0, size, size);

  const rand = mulberry32(108);
  const planks = 6;
  const plankH = size / planks;

  for (let p = 0; p < planks; p++) {
    const y = p * plankH;
    // Plank variation
    ctx.fillStyle = p % 2 === 0 ? 'rgba(255,255,255,0.035)' : 'rgba(0,0,0,0.045)';
    ctx.fillRect(0, y, size, plankH - 3);

    // Fine wood grain streaks
    for (let g = 0; g < 36; g++) {
      const gy = y + 3 + rand() * (plankH - 8);
      ctx.strokeStyle = spec.woodGrain;
      ctx.globalAlpha = 0.14 + rand() * 0.22;
      ctx.lineWidth = 1 + rand() * 2;
      ctx.beginPath();
      ctx.moveTo(0, gy);
      ctx.bezierCurveTo(
        size * 0.33,
        gy + (rand() - 0.5) * 6,
        size * 0.66,
        gy + (rand() - 0.5) * 6,
        size,
        gy,
      );
      ctx.stroke();

      bCtx.strokeStyle = 'rgba(70,70,70,0.22)';
      bCtx.lineWidth = 1.2;
      bCtx.beginPath();
      bCtx.moveTo(0, gy);
      bCtx.lineTo(size, gy);
      bCtx.stroke();
    }
    ctx.globalAlpha = 1;

    // Plank seam
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.fillRect(0, y + plankH - 3, size, 3);
    bCtx.fillStyle = '#202020';
    bCtx.fillRect(0, y + plankH - 3, size, 3);
  }

  return { colorCanvas, bumpCanvas };
}

export function createStoneWallCanvases(spec: PaletteSpec): {
  colorCanvas: HTMLCanvasElement;
  bumpCanvas: HTMLCanvasElement;
} {
  const size = 512;
  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = size;
  colorCanvas.height = size;
  const ctx = colorCanvas.getContext('2d')!;

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bCtx = bumpCanvas.getContext('2d')!;

  ctx.fillStyle = spec.stoneWallDark;
  ctx.fillRect(0, 0, size, size);
  bCtx.fillStyle = '#1E1E1E';
  bCtx.fillRect(0, 0, size, size);

  const rand = mulberry32(256);
  const rows = 10;
  const rowH = size / rows;

  for (let r = 0; r < rows; r++) {
    let x = -rand() * 40;
    while (x < size) {
      const w = 54 + rand() * 90;
      const y = r * rowH;
      const pad = 2.5;
      const bright = rand();

      ctx.fillStyle = bright > 0.35 ? spec.stoneWallBase : spec.stoneWallDark;
      ctx.fillRect(x + pad, y + pad, w - pad * 2, rowH - pad * 2);

      // Subtle mineral highlight
      ctx.fillStyle = bright > 0.65 ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)';
      ctx.fillRect(x + pad, y + pad, w - pad * 2, (rowH - pad * 2) * 0.45);

      const bumpLum = Math.floor(135 + rand() * 95);
      bCtx.fillStyle = `rgb(${bumpLum},${bumpLum},${bumpLum})`;
      bCtx.fillRect(x + pad, y + pad, w - pad * 2, rowH - pad * 2);

      x += w;
    }
  }

  return { colorCanvas, bumpCanvas };
}

function createLawnCanvas(): HTMLCanvasElement {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#365233';
  ctx.fillRect(0, 0, size, size);

  const rand = mulberry32(77);
  for (let i = 0; i < 6500; i++) {
    const x = rand() * size;
    const y = rand() * size;
    const h = 4 + rand() * 7;
    ctx.fillStyle =
      rand() > 0.5
        ? `rgba(88, 128, 68, ${0.22 + rand() * 0.25})`
        : `rgba(34, 58, 32, ${0.22 + rand() * 0.28})`;
    ctx.fillRect(x, y, 1.5, h);
  }
  return canvas;
}

function createBrushedSteelBumpCanvas(): HTMLCanvasElement {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, size, size);
  const rand = mulberry32(99);
  for (let y = 0; y < size; y++) {
    const v = Math.floor(110 + rand() * 40);
    ctx.fillStyle = `rgb(${v},${v},${v})`;
    ctx.fillRect(0, y, size, 1);
  }
  return canvas;
}

function createContactShadowCanvas(): HTMLCanvasElement {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createRadialGradient(size / 2, size / 2, 12, size / 2, size / 2, size / 2);
  grad.addColorStop(0, 'rgba(0,0,0,0.55)');
  grad.addColorStop(0.55, 'rgba(0,0,0,0.22)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  return canvas;
}

export function createProceduralTextureSet(
  paletteId: FinishPaletteId,
  maxAnisotropy: number,
): ProceduralTextureSet {
  const spec = PALETTES[paletteId];
  const pavers = createPaverCanvases(spec);
  const wood = createWoodCanvases(spec);
  const stoneWall = createStoneWallCanvases(spec);

  const paverColor = finalizeTexture(pavers.colorCanvas, true, 5, 4, maxAnisotropy);
  const paverBump = finalizeTexture(pavers.bumpCanvas, false, 5, 4, maxAnisotropy);
  const woodColor = finalizeTexture(wood.colorCanvas, true, 2, 2, maxAnisotropy);
  const woodBump = finalizeTexture(wood.bumpCanvas, false, 2, 2, maxAnisotropy);
  const stoneWallColor = finalizeTexture(stoneWall.colorCanvas, true, 3, 1.5, maxAnisotropy);
  const stoneWallBump = finalizeTexture(stoneWall.bumpCanvas, false, 3, 1.5, maxAnisotropy);
  const lawnColor = finalizeTexture(createLawnCanvas(), true, 8, 8, maxAnisotropy);
  const brushedSteelBump = finalizeTexture(createBrushedSteelBumpCanvas(), false, 2, 2, maxAnisotropy);

  const contactShadow = new THREE.CanvasTexture(createContactShadowCanvas());
  contactShadow.colorSpace = THREE.SRGBColorSpace;
  contactShadow.needsUpdate = true;

  return {
    paverColor,
    paverBump,
    woodColor,
    woodBump,
    stoneWallColor,
    stoneWallBump,
    lawnColor,
    brushedSteelBump,
    contactShadow,
    dispose: () => {
      paverColor.dispose();
      paverBump.dispose();
      woodColor.dispose();
      woodBump.dispose();
      stoneWallColor.dispose();
      stoneWallBump.dispose();
      lawnColor.dispose();
      brushedSteelBump.dispose();
      contactShadow.dispose();
    },
  };
}
