import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Layers,
  RotateCcw,
  Sun,
  Moon,
  Sunset,
} from 'lucide-react';
import {
  BackyardSceneEngine,
  CameraPresetId,
  LightingMoodId,
} from '../three/BackyardSceneEngine';
import { FinishPaletteId, PALETTES } from '../three/textures';
import { ProjectCategory, SITE_IMAGES } from '../data/siteData';
import { ResilientImage } from './BrandMark';

interface Backyard3DStudioProps {
  onRequestLayout: (category: ProjectCategory) => void;
}

const CAMERA_TABS: { id: CameraPresetId; label: string; category: ProjectCategory }[] = [
  { id: 'overview', label: 'Estate Overview', category: 'Backyard Transformation' },
  { id: 'kitchen', label: 'Outdoor Kitchen', category: 'Outdoor Kitchen' },
  { id: 'pool', label: 'Pool & Waterfall', category: 'Swimming Pool' },
  { id: 'pergola', label: 'Pergola & Fire Pit', category: 'Deck or Fence' },
];

const LIGHTING_TABS: { id: LightingMoodId; label: string; icon: React.ReactNode }[] = [
  { id: 'golden', label: 'Golden Hour', icon: <Sunset className="w-3.5 h-3.5" /> },
  { id: 'twilight', label: 'Twilight LED', icon: <Moon className="w-3.5 h-3.5" /> },
  { id: 'daylight', label: 'Daylight', icon: <Sun className="w-3.5 h-3.5" /> },
];

export function Backyard3DStudio({ onRequestLayout }: Backyard3DStudioProps) {
  const canvasMountRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef<BackyardSceneEngine | null>(null);

  const [webglFailed, setWebglFailed] = useState(false);
  const [cameraPreset, setCameraPreset] = useState<CameraPresetId>('overview');
  const [lightingMood, setLightingMood] = useState<LightingMoodId>('golden');
  const [palette, setPalette] = useState<FinishPaletteId>('limestone');
  const [explode, setExplode] = useState(0);
  const [controlsCollapsed, setControlsCollapsed] = useState(false);

  // Mount Three.js engine once in isolated ref container
  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container) return;

    try {
      const engine = new BackyardSceneEngine(container);
      engineRef.current = engine;
      return () => {
        engine.dispose();
        engineRef.current = null;
      };
    } catch {
      setWebglFailed(true);
      return undefined;
    }
  }, []);

  const handleCameraChange = (id: CameraPresetId) => {
    setCameraPreset(id);
    engineRef.current?.setCameraPreset(id);
  };

  const handleLightingChange = (mood: LightingMoodId) => {
    setLightingMood(mood);
    engineRef.current?.setLightingMood(mood);
  };

  const handlePaletteChange = (next: FinishPaletteId) => {
    setPalette(next);
    engineRef.current?.setPalette(next);
  };

  const handleExplodeChange = (val: number) => {
    setExplode(val);
    engineRef.current?.setExplodeAmount(val);
  };

  const handleReset = () => {
    handleCameraChange('overview');
    handleLightingChange('golden');
    handlePaletteChange('limestone');
    handleExplodeChange(0);
  };

  const activeCategory =
    CAMERA_TABS.find((t) => t.id === cameraPreset)?.category || 'Backyard Transformation';

  return (
    <section
      id="studio-3d"
      aria-labelledby="studio-3d-heading"
      className="relative w-full h-[84vh] min-h-[600px] max-h-[860px] bg-[#151515] text-white overflow-hidden border-y border-white/10"
    >
      {/* Dedicated isolated WebGL canvas container */}
      {!webglFailed ? (
        <div
          ref={canvasMountRef}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
          aria-label="Interactive 3D architectural backyard model. Drag to orbit, scroll to zoom."
        />
      ) : (
        <div className="absolute inset-0 w-full h-full">
          <ResilientImage
            src={SITE_IMAGES.hero}
            alt="Luxury architectural backyard concept preview"
            className="w-full h-full object-cover opacity-70"
          />
        </div>
      )}

      {/* Minimal Top-Left Architectural Spec Overlay (solid rgba surface, no backdrop-filter over WebGL) */}
      <div className="pointer-events-none absolute top-5 left-5 sm:top-7 sm:left-8 z-10 max-w-md">
        <div className="pointer-events-auto bg-[#151515]/88 border border-white/15 px-5 py-4">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-6 h-[2px] bg-[#D9E600]" aria-hidden="true" />
            <span className="font-display font-semibold text-[11px] tracking-[0.2em] text-[#D9E600]">
              INTERACTIVE 3D CONCEPT STUDIO
            </span>
          </div>
          <h2
            id="studio-3d-heading"
            className="font-display font-bold uppercase text-lg sm:text-2xl tracking-[-0.02em] leading-tight text-white"
          >
            EXPLORE HOW EVERY LAYER COMES TOGETHER.
          </h2>
          <p className="text-xs text-white/70 mt-1.5">
            Drag to orbit · Scroll to zoom · Switch finishes, lighting, and exploded build layers
          </p>
        </div>
      </div>

      {/* Unified Collapsible Bottom Control Dock (Zero side-panel clutter, solid rgba surface) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[94vw] max-w-[960px] flex flex-col items-center">
        <button
          type="button"
          onClick={() => setControlsCollapsed((prev) => !prev)}
          aria-expanded={!controlsCollapsed}
          className="inline-flex items-center gap-2 bg-[#151515]/94 hover:bg-[#222222] text-white/90 hover:text-[#D9E600] border border-b-0 border-white/20 px-4 py-1.5 text-[11px] font-display font-semibold tracking-[0.14em] transition-colors cursor-pointer"
        >
          {controlsCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5 text-[#D9E600]" />
              <span>SHOW 3D CONTROLS</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5 text-[#D9E600]" />
              <span>HIDE CONTROLS</span>
            </>
          )}
        </button>

        {!controlsCollapsed && (
          <div className="w-full bg-[#151515]/95 border border-white/18 px-4 py-3.5 sm:px-5 sm:py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Camera Views */}
              <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Camera views">
                {CAMERA_TABS.map((tab) => {
                  const active = cameraPreset === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleCameraChange(tab.id)}
                      className={`px-3 py-1.5 text-xs font-display font-semibold tracking-[0.06em] transition-colors whitespace-nowrap cursor-pointer ${
                        active
                          ? 'bg-[#D9E600] text-[#151515]'
                          : 'bg-[#222222] text-white/80 hover:text-white hover:bg-[#2C2C2C]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Lighting Moods */}
              <div className="flex items-center gap-1" role="group" aria-label="Lighting mood">
                {LIGHTING_TABS.map((m) => {
                  const active = lightingMood === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => handleLightingChange(m.id)}
                      title={m.label}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                        active
                          ? 'bg-white text-[#151515]'
                          : 'bg-[#222222] text-white/75 hover:text-white'
                      }`}
                    >
                      {m.icon}
                      <span className="hidden sm:inline">{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom row: Material finishes + Exploded layer slider + Reset + Inquiry CTA */}
            <div className="mt-3 pt-3 border-t border-white/12 flex flex-wrap items-center justify-between gap-4">
              {/* Stone & Timber Finishes */}
              <div className="flex items-center gap-2" role="group" aria-label="Material finish palette">
                <span className="text-[11px] font-display tracking-[0.14em] text-white/55 hidden md:inline">
                  FINISH
                </span>
                {(Object.keys(PALETTES) as FinishPaletteId[]).map((pid) => {
                  const spec = PALETTES[pid];
                  const active = palette === pid;
                  return (
                    <button
                      key={pid}
                      type="button"
                      onClick={() => handlePaletteChange(pid)}
                      className={`inline-flex items-center gap-2 px-2.5 py-1.5 text-xs border transition-colors whitespace-nowrap cursor-pointer ${
                        active
                          ? 'border-[#D9E600] bg-[#222222] text-white'
                          : 'border-white/15 bg-transparent text-white/70 hover:text-white'
                      }`}
                    >
                      <span className="inline-flex items-center">
                        <span
                          className="w-3 h-3 border border-white/30"
                          style={{ backgroundColor: spec.swatchStone }}
                        />
                        <span
                          className="w-3 h-3 border border-white/30 -ml-1"
                          style={{ backgroundColor: spec.swatchWood }}
                        />
                      </span>
                      <span className="hidden sm:inline">{spec.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Architectural Layer Separation Slider */}
              <div className="flex items-center gap-2.5">
                <Layers className="w-3.5 h-3.5 text-[#D9E600] shrink-0" />
                <label
                  htmlFor="explode-layers-range"
                  className="text-[11px] font-display tracking-[0.12em] text-white/75 whitespace-nowrap"
                >
                  LAYERS
                </label>
                <input
                  id="explode-layers-range"
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={explode}
                  onChange={(e) => handleExplodeChange(parseFloat(e.target.value))}
                  className="w-24 sm:w-28 accent-[#D9E600] cursor-pointer"
                />
                <button
                  type="button"
                  onClick={handleReset}
                  title="Reset 3D view"
                  aria-label="Reset 3D view"
                  className="w-8 h-8 flex items-center justify-center bg-[#222222] hover:bg-[#2F2F2F] text-white/80 hover:text-[#D9E600] cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Direct Lead CTA from 3D Studio */}
              <button
                type="button"
                onClick={() => onRequestLayout(activeCategory)}
                className="inline-flex items-center gap-2 bg-[#D9E600] hover:bg-[#C8D500] text-[#151515] font-display font-bold text-xs tracking-[0.08em] px-4 py-2 transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>REQUEST THIS LAYOUT</span>
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.4} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
