import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import all extracted playground elements
import itemNothingBig from "/assets/playground/item_nothing_big.png";
import itemBrainsMessy from "/assets/playground/item_brains_messy.png";
import itemGoodWeather from "/assets/playground/item_good_weather.png";
import itemRandomShot from "/assets/playground/item_random_shot.png";
import itemTinyMoments from "/assets/playground/item_tiny_moments.png";
import itemNotSure from "/assets/playground/item_not_sure.png";
import itemBus from "/assets/playground/item_bus.png";
import itemFlower from "/assets/playground/item_flower.png";
import stickerRainbow from "/assets/playground/sticker_rainbow.png";
import stickerHeart from "/assets/playground/sticker_heart.png";
import stickerCactus from "/assets/playground/sticker_cactus.png";
import stickerSmiley from "/assets/playground/sticker_smiley.png";
import stickerDaisy from "/assets/playground/sticker_daisy.png";
import avatarImg from "/sandy-avatar.jpg";

// Brand Logo Mark (Same as all pages)
function Mark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

// Nav Icons exactly matching the rest of the site
function NavHomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 10.5L12 3L21 10.5V20C21 20.55 20.55 21 20 21H15V14H9V21H4C3.45 21 3 20.55 3 20V10.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function NavAboutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1-8h-2V7h2v2z"
        fill="currentColor"
      />
    </svg>
  );
}

function NavCaseStudyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6 3h12v4l-4 4 4 4v6H6v-6l4-4-4-4V3zm2 2v2.5l3.5 3.5-3.5 3.5V19h8v-2.5L14.5 13l3.5-3.5V5H8z" />
    </svg>
  );
}

function NavServicesIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="8" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="16" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

function NavJournalIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 3h10v2l-4 5v7l4 2v2H7v-2l4-2v-7l-4-5V3z" />
    </svg>
  );
}

function NavPlaygroundIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M5 19h4v-7H5v7zm5 0h4V9h-4v10zm5 0h4V5h-4v14z" />
    </svg>
  );
}

// Canvas item definition
interface CanvasItem {
  id: string;
  name: string;
  src: string;
  initX: number;
  initY: number;
  initRot: number;
  baseWidth: number;
  x: number;
  y: number;
  rot: number;
  zIndex: number;
  isSticker?: boolean;
}

// Well-spaced layout with intentional logical 1-on-1 pairings
const PLAYGROUND_ITEMS: CanvasItem[] = [
  // Pair 1: Orange Sphere photo + Rainbow sticker above
  {
    id: "item-nothing-big",
    name: "Nothing Big, Still Feels Nice",
    src: itemNothingBig,
    initX: 180,
    initY: 140,
    initRot: -1.5,
    baseWidth: 280,
    x: 180,
    y: 140,
    rot: -1.5,
    zIndex: 8,
  },
  {
    id: "sticker-rainbow",
    name: "Rainbow Cloud Sticker",
    src: stickerRainbow,
    initX: 300,
    initY: 85,
    initRot: 2,
    baseWidth: 110,
    x: 300,
    y: 85,
    rot: 2,
    zIndex: 14,
    isSticker: true,
  },

  // Pair 2: Glass prism photo + Heart sticker at top-right
  {
    id: "item-brains-messy",
    name: "Brain's Messy, But It's Okay",
    src: itemBrainsMessy,
    initX: 620,
    initY: 120,
    initRot: 2,
    baseWidth: 270,
    x: 620,
    y: 120,
    rot: 2,
    zIndex: 7,
  },
  {
    id: "sticker-heart",
    name: "Heart Sticker",
    src: stickerHeart,
    initX: 840,
    initY: 90,
    initRot: 5,
    baseWidth: 92,
    x: 840,
    y: 90,
    rot: 5,
    zIndex: 13,
    isSticker: true,
  },

  // Pair 3: Good Weather house + Daisy botanical blooming beside it
  {
    id: "item-good-weather",
    name: "Good Weather",
    src: itemGoodWeather,
    initX: 1080,
    initY: 150,
    initRot: -1.5,
    baseWidth: 260,
    x: 1080,
    y: 150,
    rot: -1.5,
    zIndex: 9,
  },
  {
    id: "sticker-daisy",
    name: "Daisy Flowers Sticker",
    src: stickerDaisy,
    initX: 1280,
    initY: 200,
    initRot: 4,
    baseWidth: 84,
    x: 1280,
    y: 200,
    rot: 4,
    zIndex: 12,
    isSticker: true,
  },

  // Left-Center: Random Shot red studio photo
  {
    id: "item-random-shot",
    name: "Random Shot",
    src: itemRandomShot,
    initX: 200,
    initY: 530,
    initRot: 0,
    baseWidth: 260,
    x: 200,
    y: 530,
    rot: 0,
    zIndex: 10,
  },

  // Center: Tiny Moments doorway photo + Lavender Smiley beside it
  {
    id: "item-tiny-moments",
    name: "Tiny Moments",
    src: itemTinyMoments,
    initX: 610,
    initY: 530,
    initRot: 1,
    baseWidth: 240,
    x: 610,
    y: 530,
    rot: 1,
    zIndex: 6,
  },
  {
    id: "sticker-smiley",
    name: "Lavender Smiley Sticker",
    src: stickerSmiley,
    initX: 830,
    initY: 500,
    initRot: -4,
    baseWidth: 76,
    x: 830,
    y: 500,
    rot: -4,
    zIndex: 16,
    isSticker: true,
  },

  // Pair 4: Curved wall concrete photo + Cute Cactus perched on its curved baseboard
  {
    id: "item-not-sure",
    name: "Not Sure What I'm Doing",
    src: itemNotSure,
    initX: 1040,
    initY: 510,
    initRot: 3,
    baseWidth: 380,
    x: 1040,
    y: 510,
    rot: 3,
    zIndex: 11,
  },
  {
    id: "sticker-cactus",
    name: "Smiling Cactus Sticker",
    src: stickerCactus,
    initX: 1010,
    initY: 410,
    initRot: -2,
    baseWidth: 78,
    x: 1010,
    y: 410,
    rot: -2,
    zIndex: 15,
    isSticker: true,
  },

  // Bottom Left: Bus Bus Bus retro facade photo
  {
    id: "item-bus",
    name: "Bus Bus Bus",
    src: itemBus,
    initX: 230,
    initY: 920,
    initRot: -2.5,
    baseWidth: 280,
    x: 230,
    y: 920,
    rot: -2.5,
    zIndex: 5,
  },

  // Bottom Center: Flower orange pill & spices photo
  {
    id: "item-flower",
    name: "Flower!",
    src: itemFlower,
    initX: 670,
    initY: 930,
    initRot: -4.5,
    baseWidth: 320,
    x: 670,
    y: 930,
    rot: -4.5,
    zIndex: 8,
  },
];

export function PlaygroundPage() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<CanvasItem[]>(PLAYGROUND_ITEMS);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [topZ, setTopZ] = useState(25);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Infinite Canvas Zoom & Pan via cursor wheel
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 40, y: 30 });
  const isPanningRef = useRef(false);
  const panStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  // Top ruler inertia ref
  const rulerTrackRef = useRef<HTMLDivElement>(null);
  const rulerOffsetRef = useRef(0);
  const rulerVelocityRef = useRef(0);
  const lastXRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);

  // Audio Context (subtle acoustic feedback)
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playBlip = (freq = 520) => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio autoplay policy fallback
    }
  };

  // Wheel-based cursor zoom in and zoom out (No buttons)
  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const handleWheel = (e: WheelEvent) => {
      // Prevent page bounce
      e.preventDefault();

      const rect = canvasEl.getBoundingClientRect();
      const cursorX = e.clientX - rect.left;
      const cursorY = e.clientY - rect.top;

      // Smooth zoom factor calculation
      const zoomFactor = e.deltaY < 0 ? 1.09 : 0.91;

      setZoom((currentZoom) => {
        const nextZoom = Math.min(2.4, Math.max(0.45, currentZoom * zoomFactor));
        if (nextZoom === currentZoom) return currentZoom;

        const scaleRatio = nextZoom / currentZoom;
        setPan((prevPan) => ({
          x: cursorX - (cursorX - prevPan.x) * scaleRatio,
          y: cursorY - (cursorY - prevPan.y) * scaleRatio,
        }));

        return nextZoom;
      });
    };

    canvasEl.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      canvasEl.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // Top ruler inertia tracking
  const handleRulerMotion = (clientX: number) => {
    const now = performance.now();
    if (lastXRef.current !== null) {
      const dx = clientX - lastXRef.current;
      const dt = Math.max(1, now - lastTimeRef.current);
      const instantVelocity = (dx / dt) * 16;
      rulerVelocityRef.current += instantVelocity * 0.25;
    }
    lastXRef.current = clientX;
    lastTimeRef.current = now;
  };

  useEffect(() => {
    let animId: number;
    const DAMPING = 0.94;
    const tick = () => {
      if (Math.abs(rulerVelocityRef.current) > 0.01) {
        rulerOffsetRef.current += rulerVelocityRef.current;
        rulerVelocityRef.current *= DAMPING;
      } else {
        rulerVelocityRef.current = 0;
      }
      if (rulerTrackRef.current) {
        rulerTrackRef.current.style.transform = `translate3d(${rulerOffsetRef.current.toFixed(1)}px, 0, 0)`;
      }
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Drag interaction handlers for items (accounting for current zoom & pan)
  const handleItemPointerDown = (e: React.PointerEvent<HTMLDivElement>, item: CanvasItem) => {
    e.preventDefault();
    e.stopPropagation();

    const nextZ = topZ + 1;
    setTopZ(nextZ);
    setActiveDragId(item.id);

    // Compute pointer coordinates in zoomed canvas plane
    const planeX = (e.clientX - pan.x) / zoom;
    const planeY = (e.clientY - pan.y) / zoom;

    setDragOffset({
      x: planeX - item.x,
      y: planeY - item.y,
    });

    setItems((prev) => prev.map((el) => (el.id === item.id ? { ...el, zIndex: nextZ } : el)));
    playBlip(560);
  };

  // Background pointer down (for canvas panning)
  const handleCanvasPointerDown = (e: React.PointerEvent) => {
    if (activeDragId) return;
    isPanningRef.current = true;
    panStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (activeDragId) {
      // Dragging an object inside zoomed coordinate space
      const planeX = (e.clientX - pan.x) / zoom;
      const planeY = (e.clientY - pan.y) / zoom;
      const nextX = planeX - dragOffset.x;
      const nextY = planeY - dragOffset.y;

      setItems((prev) =>
        prev.map((item) => (item.id === activeDragId ? { ...item, x: nextX, y: nextY } : item)),
      );
    } else if (isPanningRef.current) {
      // Panning the canvas background
      const dx = e.clientX - panStartRef.current.x;
      const dy = e.clientY - panStartRef.current.y;
      setPan({
        x: panStartRef.current.panX + dx,
        y: panStartRef.current.panY + dy,
      });
    }
  };

  const handlePointerUp = () => {
    if (activeDragId) {
      playBlip(380);
      setActiveDragId(null);
    }
    isPanningRef.current = false;
  };

  return (
    <div
      className="playground-canvas-page"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* 1. TOP HEADER TOOLBAR (Exact Left Alignment matching all site pages) */}
      <header className="toolbar">
        {/* Left Brand Mark */}
        <Link to="/" className="brand" aria-label="Sandy home">
          <Mark />
        </Link>

        {/* Main Navigation (Aligned to left after brand, NOT centered) */}
        <nav className="nav-links" aria-label="Main navigation">
          <Button variant="toolbar" asChild>
            <Link to="/" activeOptions={{ exact: true }}>
              <NavHomeIcon />
              HOME
            </Link>
          </Button>
          <Button variant="toolbar" asChild>
            <Link to="/about">
              <NavAboutIcon />
              ABOUT
            </Link>
          </Button>
          <Button variant="toolbar" asChild>
            <Link to="/case-study">
              <NavCaseStudyIcon />
              CASE STUDY
            </Link>
          </Button>
          <Button variant="toolbar" asChild>
            <a href="/#services">
              <NavServicesIcon />
              SERVICES
            </a>
          </Button>
          <Button variant="toolbar" asChild>
            <Link to="/journal">
              <NavJournalIcon />
              JOURNAL
            </Link>
          </Button>
          {/* PLAYGROUND: Active cyan highlight, robust without glitching */}
          <Button variant="toolbar" className="active" asChild>
            <Link to="/playground">
              <NavPlaygroundIcon />
              PLAYGROUND
            </Link>
          </Button>
        </nav>

        {/* Right Contacts Group (Pushed to far right via margin-left: auto) */}
        <div className="nav-right">
          <div className="nav-contacts-group" aria-label="Quick contact links">
            {/* EM Button */}
            <div className="nav-contact-item">
              <button
                type="button"
                className="nav-circle-btn"
                aria-label="Email sandeep723ms@hmail.com"
                onClick={() => {
                  navigator.clipboard?.writeText("sandeep723ms@hmail.com");
                  window.location.href = "mailto:sandeep723ms@hmail.com";
                }}
              >
                EM
              </button>
              <div className="nav-contact-bubble" role="tooltip">
                <span className="bubble-notch" aria-hidden="true" />
                <span>sandeep723ms@hmail.com</span>
              </div>
            </div>

            {/* PH Button with Cyan Tooltip */}
            <div className="nav-contact-item">
              <button
                type="button"
                className="nav-circle-btn"
                aria-label="Phone +91 9121675082"
                onClick={() => {
                  navigator.clipboard?.writeText("+91 9121675082");
                  window.location.href = "tel:+919121675082";
                }}
              >
                PH
              </button>
              <div className="playground-cyan-bubble mono" role="tooltip">
                <span>+123456789</span>
              </div>
            </div>

            {/* Profile Avatar Button */}
            <div className="nav-contact-item">
              <Link to="/about" className="nav-avatar-btn" aria-label="Sandy profile">
                <img src={avatarImg} alt="Sandy profile avatar" width={34} height={34} />
              </Link>
            </div>
          </div>

          {/* CONTACT Button */}
          <Button variant="toolbar" className="nav-contact" asChild>
            <Link to="/contact">
              <Heart />
              LET'S TALK
            </Link>
          </Button>
        </div>
      </header>

      {/* 2. TOP METRIC RULER (Exact 0 to 1400 scale) */}
      <div
        className="playground-top-ruler"
        aria-hidden="true"
        onPointerMove={(e) => handleRulerMotion(e.clientX)}
      >
        <div
          className="playground-ruler-track"
          ref={rulerTrackRef}
          style={{ transform: "translate3d(0px, 0, 0)" }}
        >
          {Array.from({ length: 48 }, (_, i) => (
            <span key={i} className="playground-ruler-step">
              <span className="ruler-tick-mark" />
              <span className="ruler-num-label">{i * 100}</span>
            </span>
          ))}
        </div>
      </div>

      {/* 3. PURE OPEN CANVAS BOARD (Zoom in and out via cursor wheel, no buttons) */}
      <main
        className="playground-canvas-board"
        ref={canvasRef}
        onPointerDown={handleCanvasPointerDown}
        onPointerMove={(e) => handleRulerMotion(e.clientX)}
      >
        {/* Infinite Grid Background (Scales & Pans dynamically with Zoom) */}
        <div
          className="playground-canvas-grid-lines"
          style={{
            backgroundPosition: `${pan.x}px ${pan.y}px`,
            backgroundSize: `${100 * zoom}px ${100 * zoom}px`,
          }}
          aria-hidden="true"
        />

        {/* Movable Objects Layer (Smooth Zoom and Pan Transformation) */}
        <div
          className="playground-canvas-plane"
          style={{
            transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
            transformOrigin: "0 0",
          }}
        >
          {items.map((item) => {
            const isDragging = activeDragId === item.id;
            return (
              <div
                key={item.id}
                id={`obj-${item.id}`}
                className={`playground-canvas-item ${item.isSticker ? "sticker-item" : "photo-item"} ${isDragging ? "is-dragging" : ""}`}
                style={{
                  transform: `translate3d(${item.x}px, ${item.y}px, 0) rotate(${item.rot}deg)`,
                  zIndex: item.zIndex,
                  width: item.baseWidth,
                }}
                onPointerDown={(e) => handleItemPointerDown(e, item)}
                role="button"
                tabIndex={0}
                aria-label={`${item.name} movable canvas element`}
              >
                <img
                  src={item.src}
                  alt={item.name}
                  draggable={false}
                  className="playground-item-img"
                />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
