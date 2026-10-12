import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronsRight, MousePointer2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import polaroidRandomShot from "@/assets/images/polaroid_random_shot_1791803009783.jpg";
import polaroidTinyMoment from "@/assets/images/polaroid_tiny_moment_1791803021414.jpg";

export function NavHomeIcon() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M10 2.2L1.8 9.5h2.4v7.3h4.6v-4.8c0-.7.6-1.3 1.2-1.3s1.2.6 1.2 1.3v4.8h4.6V9.5h2.4L10 2.2z" />
    </svg>
  );
}

export function NavAboutIcon() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M10 7.4c-.9 0-1.6.6-1.8 1.4-.7-.3-1.5-.2-2 .4-.6.6-.7 1.4-.4 2.1-.8.2-1.4.9-1.4 1.8 0 .8.6 1.6 1.4 1.8-.3.7-.2 1.5.4 2.1.6.6 1.4.7 2.1.4.2.8.9 1.4 1.7 1.4s1.6-.6 1.7-1.4c.7.3 1.5.2 2.1-.4.6-.6.7-1.4.4-2.1.8-.2 1.4-1 1.4-1.8 0-.9-.6-1.6-1.4-1.8.3-.7.2-1.5-.4-2.1-.6-.6-1.4-.7-2.1-.4-.2-.8-.9-1.4-1.7-1.4z" />
    </svg>
  );
}

export function NavCaseStudyIcon() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M3.5 3h13v2.4c0 1.9-2 3.3-3.3 4.6 1.3 1.3 3.3 2.7 3.3 4.6V17h-13v-2.4c0-1.9 2-3.3 3.3-4.6C5.5 8.7 3.5 7.3 3.5 5.4V3z" />
    </svg>
  );
}

export function NavServicesIcon() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M5.5 6.2C3.6 6.2 2 7.8 2 9.8s1.6 3.6 3.5 3.6c1.8 0 3-1 4.5-2.2 1.5 1.2 2.7 2.2 4.5 2.2 1.9 0 3.5-1.6 3.5-3.6s-1.6-3.6-3.5-3.6c-1.8 0-3 1-4.5 2.2-1.5-1.2-2.7-2.2-4.5-2.2z" />
    </svg>
  );
}

export function NavJournalIcon() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M8.8 17.5V10.8L4.6 6.6 6.3 4.9 10 8.6l3.7-3.7 1.7 1.7-4.2 4.2v6.7H8.8z" />
    </svg>
  );
}

export function NavPlaygroundIcon() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M17.5 3v14H2.5v-4.5h5V8H12V3h5.5z" />
    </svg>
  );
}

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

// Stylized Contact Title using the exact Flux Variable display font like SANDY in the hero section
function ContactWordmark() {
  return (
    <div className="contact-wordmark-wrapper" aria-label="CONTACT">
      <h1 className="display contact-title">CONTACT</h1>
    </div>
  );
}

export function ContactPage() {
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorInteracting, setCursorInteracting] = useState(false);
  const [playgroundOpen, setPlaygroundOpen] = useState(false);

  // Form step state
  const [step, setStep] = useState<1 | 2 | "success">(1);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);

  // Scale ruler motion - smooth, slow bidirectional scrolling logic
  const rulerTrackRef = useRef<HTMLDivElement>(null);
  const rulerOffsetRef = useRef(-200);
  const rulerVelocityRef = useRef(0);
  const lastXRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);

  const handleMotion = (clientX: number) => {
    const now = performance.now();
    if (lastXRef.current !== null) {
      const dt = now - lastTimeRef.current;
      if (dt >= 4 && dt < 160) {
        const dx = clientX - lastXRef.current;
        // Refined slow displacement: smoothly shifts both left and right
        rulerOffsetRef.current += dx * 0.16;

        // Controlled, gentle velocity measurement
        const instantV = Math.max(-8, Math.min(8, (dx / dt) * 2.8));
        rulerVelocityRef.current = rulerVelocityRef.current * 0.78 + instantV * 0.22;
      }
    }
    lastXRef.current = clientX;
    lastTimeRef.current = now;
  };

  useEffect(() => {
    let animId: number;
    // Slow, silky damping factor allowing smooth coasting
    const DAMPING = 0.958;
    const MIN_OFFSET = -1200;
    const MAX_OFFSET = 600;

    const tick = () => {
      const now = performance.now();
      if (now - lastTimeRef.current > 75) {
        lastXRef.current = null;
      }

      // Smooth slow decay
      if (Math.abs(rulerVelocityRef.current) > 0.01) {
        rulerOffsetRef.current += rulerVelocityRef.current;
        rulerVelocityRef.current *= DAMPING;
      } else {
        rulerVelocityRef.current = 0;
      }

      // Soft bidirectional spring boundaries
      if (rulerOffsetRef.current < MIN_OFFSET) {
        const over = MIN_OFFSET - rulerOffsetRef.current;
        rulerVelocityRef.current += over * 0.05;
        rulerVelocityRef.current *= 0.8;
      } else if (rulerOffsetRef.current > MAX_OFFSET) {
        const over = MAX_OFFSET - rulerOffsetRef.current;
        rulerVelocityRef.current += over * 0.05;
        rulerVelocityRef.current *= 0.8;
      }

      if (rulerTrackRef.current) {
        rulerTrackRef.current.style.transform = `translate3d(${rulerOffsetRef.current.toFixed(2)}px, 0, 0)`;
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    const handlePointerMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setCursorVisible(true);
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = !!target.closest(
          'button, a, input, textarea, [role="button"], .polaroid-card',
        );
        setCursorInteracting(isClickable);
      }
      handleMotion(e.clientX);
    };

    const handleMouseLeave = () => {
      setCursorVisible(false);
      lastXRef.current = null;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText("sandeep723ms@hmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (message.trim().length === 0) {
        setMessage("Hey Sandy, let's build something thoughtful together!");
      }
      setStep(2);
    } else if (step === 2) {
      setStep("success");
    }
  };

  return (
    <div className="contact-page-root">
      {cursorVisible && cursorPos && (
        <div
          className={`live-app-cursor ${cursorInteracting ? "interacting" : ""}`}
          style={{
            transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`,
          }}
          aria-hidden="true"
        >
          <MousePointer2 />
          <span>{cursorInteracting ? "CLICK" : "YOU"}</span>
        </div>
      )}

      {/* Top Header with the 6 nav items from attached image */}
      <header className="toolbar">
        <Link to="/" className="brand" aria-label="Sandy home">
          <Mark />
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          <Button variant="toolbar" asChild>
            <Link to="/">
              <NavHomeIcon />
              HOME
            </Link>
          </Button>
          <Button variant="toolbar" asChild>
            <a href="/#about">
              <NavAboutIcon />
              ABOUT
            </a>
          </Button>
          <Button variant="toolbar" asChild>
            <a href="/#work">
              <NavCaseStudyIcon />
              CASE STUDY
            </a>
          </Button>
          <Button variant="toolbar" asChild>
            <a href="/#work">
              <NavServicesIcon />
              SERVICES
            </a>
          </Button>
          <Button variant="toolbar" asChild>
            <a href="/#work">
              <NavJournalIcon />
              JOURNAL
            </a>
          </Button>
          <Button variant="toolbar" onClick={() => setPlaygroundOpen(true)}>
            <NavPlaygroundIcon />
            PLAYGROUND
          </Button>
        </nav>

        <div className="nav-right">
          <div className="nav-contacts-group" aria-label="Quick contact links">
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
              <div className="nav-contact-bubble" role="tooltip">
                <span className="bubble-notch" aria-hidden="true" />
                <span>+91 9121675082</span>
              </div>
            </div>

            <div className="nav-contact-item">
              <Link to="/" className="nav-avatar-btn" aria-label="Back to home profile">
                <img src="/sandy-avatar.jpg" alt="Sandy profile avatar" width={34} height={34} />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Canvas with Grid and Top Ruler */}
      <main className="canvas contact-canvas">
        <div className="ruler" aria-hidden="true">
          <div
            className="ruler-track"
            ref={rulerTrackRef}
            style={{ transform: "translate3d(0px, 0, 0)" }}
          >
            {Array.from({ length: 36 }, (_, i) => (
              <span key={i} className="ruler-step">
                {i * 100}
              </span>
            ))}
          </div>
        </div>

        {/* Contact Stage Container */}
        <div className="contact-stage">
          {/* Left Polaroid - "Random shot" */}
          <aside className="polaroid-card polaroid-left" aria-label="Polaroid photo: Random shot">
            <div className="polaroid-img-frame">
              <img
                src={polaroidRandomShot}
                alt="Random shot of Sandy by the coastline"
                className="polaroid-img"
              />
            </div>
            <p className="polaroid-caption">Random shot</p>
          </aside>

          {/* Right Polaroid - "tiny moment!" */}
          <aside className="polaroid-card polaroid-right" aria-label="Polaroid photo: tiny moment!">
            <div className="polaroid-img-frame">
              <img
                src={polaroidTinyMoment}
                alt="Minimalist art shot of bird on stone sphere"
                className="polaroid-img"
              />
            </div>
            <p className="polaroid-caption">tiny moment!</p>
          </aside>

          {/* Center Main Stage Content */}
          <div className="contact-center-cluster">
            {/* "leave me a note" annotation */}
            <div className="leave-note-annotation">
              <span className="leave-note-text">leave me a note</span>
              <span className="leave-note-double-underline" aria-hidden="true" />
            </div>

            {/* Bounding Box Framing "CONTACT" */}
            <div className="contact-selection-box">
              {/* Corner Handles */}
              <span className="box-handle handle-tl" aria-hidden="true" />
              <span className="box-handle handle-tr" aria-hidden="true" />
              <span className="box-handle handle-bl" aria-hidden="true" />
              <span className="box-handle handle-br" aria-hidden="true" />

              {/* Wordmark */}
              <ContactWordmark />
            </div>

            {/* Yellow Post-it Note Card */}
            <div className="yellow-postit-card">
              {step === 1 && (
                <form onSubmit={handleNextStep} className="postit-form">
                  <label htmlFor="postit-textarea" className="postit-heading mono">
                    WHAT'S ON YOUR MIND?
                  </label>
                  <textarea
                    id="postit-textarea"
                    className="postit-textarea"
                    placeholder="Tell me a story, or project idea..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    autoFocus
                  />
                  <div className="postit-corner-accent" aria-hidden="true" />
                  <button type="submit" className="postit-next-btn mono">
                    NEXT (1/2)
                  </button>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handleNextStep} className="postit-form">
                  <div className="postit-heading mono">HOW CAN I REACH YOU?</div>
                  <div className="postit-inputs-stack">
                    <input
                      type="text"
                      className="postit-input"
                      placeholder="Your name or company..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <input
                      type="email"
                      className="postit-input"
                      placeholder="Your email address..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="postit-btn-row">
                    <button
                      type="button"
                      className="postit-back-btn mono"
                      onClick={() => setStep(1)}
                    >
                      ← BACK
                    </button>
                    <button type="submit" className="postit-next-btn mono">
                      SEND NOTE (2/2) ↗
                    </button>
                  </div>
                </form>
              )}

              {step === "success" && (
                <div className="postit-success">
                  <div className="postit-heading mono">NOTE RECEIVED! ✳</div>
                  <p className="postit-success-msg">
                    Thanks for reaching out! I'll read your note and get back to you shortly.
                  </p>
                  <div className="postit-btn-row">
                    <button
                      type="button"
                      className="postit-back-btn mono"
                      onClick={handleCopyEmail}
                    >
                      {copied ? "COPIED EMAIL!" : "COPY DIRECT EMAIL"}
                    </button>
                    <button
                      type="button"
                      className="postit-next-btn mono"
                      onClick={() => {
                        setMessage("");
                        setName("");
                        setEmail("");
                        setStep(1);
                      }}
                    >
                      WRITE ANOTHER
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Availability Note with Curved Arrow */}
            <div className="availability-cluster">
              <svg
                className="curved-hand-arrow"
                viewBox="0 0 54 28"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 22 C 18 22, 34 16, 48 10 M 40 5 L 48 10 L 41 16" />
              </svg>
              <span className="availability-text">I'm available for new projects!</span>
            </div>

            {/* Social Links Card */}
            <div className="contact-social-card" role="navigation" aria-label="Social profiles">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="social-col-item"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z" />
                </svg>
                <span className="mono">FACEBOOK</span>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="social-col-item"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span className="mono">INSTAGRAM</span>
              </a>

              <a
                href="https://linkedin.com/in/sandeep-vadla"
                target="_blank"
                rel="noreferrer"
                className="social-col-item"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span className="mono">LINKEDIN</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Playground Dialog */}
      <Dialog open={playgroundOpen} onOpenChange={setPlaygroundOpen}>
        <DialogContent className="dialog-content">
          <DialogHeader>
            <DialogTitle>A little room to play.</DialogTitle>
            <DialogDescription className="dialog-description">
              DESIGN × CODE × A LITTLE CURIOSITY
            </DialogDescription>
          </DialogHeader>
          <div className="playground-body">
            <p>
              Interactive experiments, kinetic type, micro-interactions, and visual tools crafted by
              Sandy.
            </p>
            <div className="playground-grid">
              <div className="playground-item">
                <span className="mono">01 · FLUID SCALE</span>
                <p>Kinetic dampening and inertia-based ruler components.</p>
              </div>
              <div className="playground-item">
                <span className="mono">02 · STICKER CANVAS</span>
                <p>Drag, tilt, and reactive cursor physics.</p>
              </div>
              <div className="playground-item">
                <span className="mono">03 · CRIC SCORE UI</span>
                <p>Live cricket ball-by-ball momentum visualizer.</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
