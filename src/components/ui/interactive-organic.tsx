import { useState, useRef, useCallback } from "react";

export function SandyOrganic({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 260, y: 280 });
  const [dims, setDims] = useState({ width: 330, height: 340 });

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setCursorPos({ x, y });
    setDims({ width: rect.width || 330, height: rect.height || 340 });
    setIsHovered(true);
  }, []);

  const handlePointerEnter = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setCursorPos({ x, y });
    setDims({ width: rect.width || 330, height: rect.height || 340 });
    setIsHovered(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  // Selection box dimensions (proportional to clover shape, matching image_3282a42b.png)
  const boxW = Math.round(Math.min(270, dims.width * 0.82));
  const boxH = Math.round(Math.min(320, dims.height * 0.94));

  // The bottom-right corner of the black selection box tracks the cursor (x, y)
  // Clamp so the box always has substantial visibility over the clover
  const boxLeft = Math.min(dims.width - 60, Math.max(-boxW + 80, cursorPos.x - boxW));
  const boxTop = Math.min(dims.height - 60, Math.max(-boxH + 80, cursorPos.y - boxH));

  return (
    <div
      ref={containerRef}
      className={`sandy-organic-interactive-container ${className}`}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      role="img"
      aria-label="Interactive Sandy organic clover graphic"
    >
      {/* BASE LAYER: Emerald green clover with black borders and black eyes */}
      <div className="sandy-organic base-layer" aria-hidden="true">
        <i className="lobe" />
        <i className="lobe" />
        <i className="lobe" />
        <i className="lobe" />
        <div className="organic-center" />
        <span className="organic-eyes">
          <i />
          <i />
        </span>
      </div>

      {/* HOVER SELECTION OVERLAY: Matches image_3282a42b.png
          Solid black rectangle box with 4 corner square handles and 'YOU' badge at bottom right.
          Inside, the clover turns magenta (#a8326a) with white border and white capsule eyes! */}
      <div
        className="organic-selection-box"
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

        {/* 1:1 Inverted Magenta Clover Interior */}
        <div
          className="organic-inverted-wrapper"
          style={{
            left: `${-boxLeft}px`,
            top: `${-boxTop}px`,
            width: `${dims.width}px`,
            height: `${dims.height}px`,
          }}
        >
          <div className="sandy-organic magenta-layer">
            <i className="lobe" />
            <i className="lobe" />
            <i className="lobe" />
            <i className="lobe" />
            <div className="organic-center" />
            <span className="organic-eyes">
              <i />
              <i />
            </span>
            {/* Small magenta corner handle as in image_3282a42b.png */}
            <span className="organic-magenta-handle" />
          </div>
        </div>
      </div>
    </div>
  );
}
