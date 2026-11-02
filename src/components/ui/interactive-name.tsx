import { useState, useRef, useCallback } from "react";

export function InteractiveName() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 380, y: 190 });
  const [dims, setDims] = useState({ width: 620, height: 210 });

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setCursorPos({ x, y });
    setDims({ width: rect.width || 620, height: rect.height || 210 });
    setIsHovered(true);
  }, []);

  const handlePointerEnter = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setCursorPos({ x, y });
    setDims({ width: rect.width || 620, height: rect.height || 210 });
    setIsHovered(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  // Selection box size matching image_3129bc2a.png (approx 55% width, generous height)
  const boxW = Math.round(Math.min(360, Math.max(220, dims.width * 0.58)));
  const boxH = Math.round(Math.min(260, Math.max(170, dims.height * 1.15)));

  // The bottom-right corner of the black selection box tracks the cursor (x, y)
  // Constrain slightly so the box always has strong overlap with the letters
  const boxLeft = Math.min(dims.width - 60, Math.max(-boxW + 80, cursorPos.x - boxW));
  const boxTop = Math.min(dims.height - 40, Math.max(-boxH + 60, cursorPos.y - boxH));

  return (
    <div
      ref={containerRef}
      className="name-selection name-selection-interactive"
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {/* BASE LAYER: Dark SANDY lettering with Orange Bounding Box Handles */}
      <h1 className="display name-text-base">SANDY</h1>

      {/* Tilted Yellow Sticker from image_3129bc2a.png */}
      <div className="name-yellow-sticker" aria-hidden="true">
        Previously at Search...
      </div>

      {/* 4 Corner Bounding Handles (Orange theme matching image_3129bc2a.png) */}
      <i className="handle handle-orange handle-tl" aria-hidden="true" />
      <i className="handle handle-orange handle-tr" aria-hidden="true" />
      <i className="handle handle-orange handle-bl" aria-hidden="true" />
      <i className="handle handle-orange handle-br" aria-hidden="true" />

      {/* HOVER SELECTION OVERLAY: Matches image_3129bc2a.png
          Solid black rectangle box with 4 corner black handles and 'YOU' badge at bottom-right.
          Inside, the text SANDY is rendered in pure white (#ffffff) in exact registration! */}
      <div
        className="name-selection-overlay"
        style={{
          left: `${boxLeft}px`,
          top: `${boxTop}px`,
          width: `${boxW}px`,
          height: `${boxH}px`,
          opacity: isHovered ? 1 : 0,
        }}
        aria-hidden="true"
      >
        {/* 4 Black Corner Square Handles */}
        <span className="selection-handle handle-tl" />
        <span className="selection-handle handle-tr" />
        <span className="selection-handle handle-bl" />
        <span className="selection-handle handle-br" />

        {/* 'YOU' Badge at Bottom-Right Corner (at cursor) */}
        <div className="selection-cursor-badge mono">YOU</div>

        {/* Tilted Plum Sticker from image_3129bc2a.png overlapping the selection box */}
        <div className="name-plum-sticker">Currently at Meridian Health</div>

        {/* 1:1 Inverted Pure White SANDY Typography */}
        <div
          className="name-inverted-wrapper"
          style={{
            left: `${-boxLeft}px`,
            top: `${-boxTop}px`,
            width: `${dims.width}px`,
            height: `${dims.height}px`,
          }}
        >
          <h1 className="display name-text-inverted">SANDY</h1>
        </div>
      </div>
    </div>
  );
}
